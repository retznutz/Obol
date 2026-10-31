export type Direction = 'up' | 'down' | 'left' | 'right'
export type Action = Direction | 'confirm' | 'back' | 'prev' | 'next'
export type InputDevice = 'keyboard' | 'gamepad'

export interface Hint {
  input: 'move' | 'confirm' | 'back' | 'switch'
  label: string
}

const device = ref<InputDevice>('keyboard')

const KEYS: Record<string, Action> = {
  ArrowUp: 'up',
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowRight: 'right',
  Enter: 'confirm',
  ' ': 'confirm',
  Escape: 'back',
  Backspace: 'back',
  PageUp: 'prev',
  PageDown: 'next',
}

// Standard gamepad mapping: 0 bottom face, 1 right face, 4/5 shoulders, 12-15 d-pad.
const PAD_BUTTONS: [number, Action][] = [
  [12, 'up'], [13, 'down'], [14, 'left'], [15, 'right'], [0, 'confirm'], [1, 'back'], [4, 'prev'], [5, 'next'],
]
const REPEATS = new Set<Action>(['up', 'down', 'left', 'right'])
const REPEAT_DELAY = 380
const REPEAT_RATE = 110
const STICK = 0.55

export function useInputDevice() {
  return readonly(device)
}

// Listens to keyboard and every connected gamepad, and calls `onAction` once per press
// (with key-repeat style auto-repeat for directions held down).
export function useControls(onAction: (action: Action) => void) {
  let frame = 0
  const held = new Map<Action, number>()

  const onKey = (e: KeyboardEvent) => {
    const action = KEYS[e.key]
    if (!action || e.altKey || e.ctrlKey || e.metaKey) return
    e.preventDefault()
    device.value = 'keyboard'
    if (e.repeat && !REPEATS.has(action)) return
    onAction(action)
  }

  const poll = (now: number) => {
    const pressed = new Set<Action>()
    for (const pad of navigator.getGamepads?.() ?? []) {
      if (!pad) continue
      for (const [index, action] of PAD_BUTTONS) {
        if (pad.buttons[index]?.pressed) pressed.add(action)
      }
      const [ax = 0, ay = 0] = pad.axes
      if (ax < -STICK) pressed.add('left')
      if (ax > STICK) pressed.add('right')
      if (ay < -STICK) pressed.add('up')
      if (ay > STICK) pressed.add('down')
    }
    for (const action of pressed) {
      const since = held.get(action)
      if (since === undefined) {
        held.set(action, now)
        device.value = 'gamepad'
        onAction(action)
      }
      else if (REPEATS.has(action) && now - since >= REPEAT_DELAY) {
        held.set(action, now - REPEAT_DELAY + REPEAT_RATE)
        onAction(action)
      }
    }
    for (const action of [...held.keys()]) {
      if (!pressed.has(action)) held.delete(action)
    }
    frame = requestAnimationFrame(poll)
  }

  onMounted(() => {
    window.addEventListener('keydown', onKey)
    frame = requestAnimationFrame(poll)
  })
  onBeforeUnmount(() => {
    window.removeEventListener('keydown', onKey)
    cancelAnimationFrame(frame)
  })
}

export function usePrefersReducedMotion() {
  const reduced = ref(false)
  onMounted(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    reduced.value = query.matches
    query.addEventListener('change', e => (reduced.value = e.matches))
  })
  return reduced
}
