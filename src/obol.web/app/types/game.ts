/** Mirrors Obol.Api.Games.GameInfo. */
export interface GameInfo {
  system: string
  id: string
  title: string
  /** ES module exporting the Emscripten `createGame` factory; its .wasm sits beside it. */
  scriptUrl: string
}

/** Options passed to a RetroArc `createGame()` factory (an Emscripten Module object). */
export interface GameModuleOptions {
  canvas: HTMLCanvasElement
  print?: (text: string) => void
  printErr?: (text: string) => void
  /** Called by the game with NVRAM bytes to fill in at `ptr`. */
  nvLoad?: (name: string, ptr: number, length: number) => void
  /** Called by the game with NVRAM bytes at `ptr` to persist. */
  nvSave?: (name: string, ptr: number, length: number) => void
  onRomLoaded?: () => void
  /** Emscripten hook: exports are ready and main() is about to run. */
  onRuntimeInitialized?: () => void
}

/** The instance a RetroArc `createGame()` resolves to (see RetroArc runtime/platform/sdl_main.c). */
export interface GameModule extends GameModuleOptions {
  HEAPU8: Uint8Array
  UTF8ToString: (ptr: number) => string
  SDL2?: { audioContext?: AudioContext }
  _ra_screen_w: () => number
  _ra_screen_h: () => number
  _ra_is_loaded: () => number
  _ra_romset: () => number
  _ra_controls: () => number
  _ra_shutdown: () => void
}

export type CreateGame = (options: GameModuleOptions) => Promise<GameModule>
