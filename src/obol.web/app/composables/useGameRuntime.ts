import type { CreateGame, GameModule, GameModuleOptions } from '~/types/game'

export type GameStatus = 'loading' | 'running' | 'error'

const NV_PREFIX = 'obol.nv.'

/**
 * Runs one RetroArc game (an Emscripten ES module) on `canvas` for the
 * lifetime of the calling component, and shuts it down on unmount so SDL's
 * main loop, audio and keyboard listeners don't outlive the game view.
 *
 * `screen` is the canvas's sized box; it gets `--game-aspect` set on it.
 */
export function useGameRuntime(
  scriptUrl: MaybeRefOrGetter<string>,
  canvas: Ref<HTMLCanvasElement | null>,
  screen: Ref<HTMLElement | null>,
) {
  const status = ref<GameStatus>('loading')
  const error = ref<string | null>(null)
  /** Native width / height of the game's screen. */
  const aspect = ref(4 / 3)
  const controls = ref('')
  /** Browsers keep WebAudio suspended until the first user gesture. */
  const audioSuspended = ref(false)

  let mod: GameModule | null = null
  let disposed = false

  function audioContext() {
    return mod?.SDL2?.audioContext
  }

  function resumeAudio() {
    const ctx = audioContext()
    if (ctx && ctx.state !== 'running') ctx.resume().catch(() => {})
  }

  function watchAudio() {
    const ctx = audioContext()
    if (!ctx) return
    const update = () => { audioSuspended.value = ctx.state !== 'running' }
    ctx.addEventListener('statechange', update)
    update()
  }

  function fail(message: string) {
    status.value = 'error'
    error.value = message
  }

  onMounted(async () => {
    if (!canvas.value) return
    // The game calls these hooks while it is still starting up, before
    // createGame() resolves, so they read memory through `options` (which
    // Emscripten turns into the module instance) rather than `mod`.
    const options = {
      canvas: canvas.value,
      // Runs just before main(). SDL sizes the canvas from its CSS box when
      // main() creates the window, so the box must already have the game's
      // aspect: set it on the element now instead of waiting for a re-render.
      onRuntimeInitialized: () => {
        const game = options as GameModule
        aspect.value = game._ra_screen_w() / game._ra_screen_h()
        screen.value?.style.setProperty('--game-aspect', String(aspect.value))
      },
      print: text => console.log(text),
      printErr: text => console.warn(text),
      nvLoad: (name, ptr, length) => {
        try {
          const saved = localStorage.getItem(NV_PREFIX + name)
          if (!saved) return
          const bytes = Uint8Array.from(atob(saved), c => c.charCodeAt(0))
          ;(options as GameModule).HEAPU8.set(bytes.subarray(0, length), ptr)
        } catch { /* storage unavailable or corrupt: start fresh */ }
      },
      nvSave: (name, ptr, length) => {
        try {
          const bytes = (options as GameModule).HEAPU8.subarray(ptr, ptr + length)
          localStorage.setItem(NV_PREFIX + name, btoa(String.fromCharCode(...bytes)))
        } catch { /* storage unavailable: high scores just won't persist */ }
      },
    } satisfies GameModuleOptions

    try {
      const { default: createGame } = await import(/* @vite-ignore */ toValue(scriptUrl)) as { default: CreateGame }
      const instance = await createGame(options)
      if (disposed) {
        shutdown(instance)
        return
      }
      mod = instance
      controls.value = mod.UTF8ToString(mod._ra_controls())
    } catch (e) {
      console.error(e)
      fail(`Couldn't start the game: ${e instanceof Error ? e.message : String(e)}`)
      return
    }

    // main() loads the embedded ROM and opens audio; give it a tick to run.
    setTimeout(() => {
      if (!mod || disposed) return
      if (!mod._ra_is_loaded()) {
        fail(`The ROM ${mod.UTF8ToString(mod._ra_romset())} didn't load (see console).`)
        return
      }
      status.value = 'running'
      watchAudio()
      canvas.value?.focus()
    }, 0)

    window.addEventListener('pointerdown', resumeAudio, { capture: true })
    window.addEventListener('keydown', resumeAudio, { capture: true })
  })

  onBeforeUnmount(() => {
    disposed = true
    window.removeEventListener('pointerdown', resumeAudio, { capture: true })
    window.removeEventListener('keydown', resumeAudio, { capture: true })
    if (mod) shutdown(mod)
    mod = null
  })

  return { status, error, aspect, controls, audioSuspended, resumeAudio }
}

function shutdown(instance: GameModule) {
  try {
    instance._ra_shutdown()
  } catch (e) {
    console.warn('game shutdown failed', e)
  }
  instance.SDL2?.audioContext?.close().catch(() => {})
  // Free the WebGL context now rather than waiting for GC; browsers cap live contexts.
  const gl = instance.canvas.getContext('webgl2') ?? instance.canvas.getContext('webgl')
  gl?.getExtension('WEBGL_lose_context')?.loseContext()
}
