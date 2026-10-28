# Obol

A browser game console. A .NET 10 API serves the game files and a game list, and a Nuxt 4 app shows the library and plays the games on a 16:9 stage.

```
games/<system>/<name>.mjs + <name>.wasm   games (RetroArc ES-module builds, ROM embedded)
src/Obol.Api/                             .NET 10 API + host (serves /api and /games)
src/obol.web/                             Nuxt 4 front end
scripts/sync-games.sh                     rebuild games from ../RetroArc and copy them in
```

## Run

```sh
dotnet run --project src/Obol.Api
```

This starts the API on http://localhost:5080, and SpaProxy starts the Nuxt dev server on http://localhost:3000 (it runs `npm install` first if needed). The browser is sent to Nuxt, which forwards `/api` and `/games` back to the API.

## Games

A game is a pair of files in `games/<system>/`: an Emscripten ES module that exports `createGame`, and its `.wasm`. The `.wasm` alone won't run, because it needs its module's JS bindings. The index picks up new pairs without a restart, and titles come from the file name (`altbeast_interp` → "altbeast").

To build games from RetroArc (in `../RetroArc`, with the ROM embedded):

```sh
scripts/sync-games.sh 1942 1943 altbeast
```

## API

| Route | Returns |
| --- | --- |
| `GET /api/systems` | system folder names |
| `GET /api/games?system=arcade` | games (`system`, `id`, `title`, `scriptUrl`) |
| `GET /api/games/{system}/{id}` | one game, or 404 |
| `GET /games/{system}/{file}` | game files (`.mjs` as `text/javascript`, `.wasm` as `application/wasm`) |

## Publish

```sh
dotnet publish src/Obol.Api -c Release -o out
cd out && dotnet Obol.Api.dll
```

The publish runs `nuxt generate` into `wwwroot/` and copies `games/` next to the app. From then on the API serves everything from one origin. Set `Games:Root` to point at a different games folder.
