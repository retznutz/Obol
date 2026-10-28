#!/usr/bin/env bash
# Builds RetroArc games as ES modules (ROM embedded) and copies them into
# games/<system>/ as <name>_interp.mjs + <name>_interp.wasm.
#
#   scripts/sync-games.sh 1942 1943 altbeast
#
# Env: RETROARC (default ../RetroArc next to this repo), SYSTEM (default arcade).
set -euo pipefail

here="$(cd "$(dirname "$0")/.." && pwd)"
retroarc="${RETROARC:-$here/../RetroArc}"
system="${SYSTEM:-arcade}"
build="$retroarc/build/web-module"

if [ $# -eq 0 ]; then
  echo "usage: $0 <game> [game...]   e.g. $0 1942 1943 altbeast" >&2
  exit 1
fi

targets=()
for g in "$@"; do targets+=("${g}_interp"); done

cd "$retroarc"
# shellcheck disable=SC1091
source .emsdk/emsdk_env.sh >/dev/null
[ -f "$build/CMakeCache.txt" ] || emcmake cmake -S . -B "$build" -DEMBED_ROM=ON -DWEB_MODULE=ON
cmake --build "$build" -j --target "${targets[@]}"

mkdir -p "$here/games/$system"
for t in "${targets[@]}"; do
  cp "$build/$t.mjs" "$build/$t.wasm" "$here/games/$system/"
  echo "copied $t -> games/$system/"
done
