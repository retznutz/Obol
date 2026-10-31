import type { Direction } from '~/composables/useControls'

export interface Rect {
  x: number
  y: number
  w: number
  h: number
}

interface Node<T> {
  item: T
  area: number
}

// Squarified treemap (Bruls, Huizing, van Wijk): keeps tiles as close to square as the weights allow.
export function squarify<T>(items: { item: T, value: number }[], frame: Rect): (Rect & { item: T })[] {
  const total = items.reduce((sum, i) => sum + i.value, 0)
  const scale = (frame.w * frame.h) / total
  const nodes: Node<T>[] = items.map(i => ({ item: i.item, area: i.value * scale }))
  const out: (Rect & { item: T })[] = []

  const worst = (row: Node<T>[], side: number) => {
    const sum = row.reduce((s, n) => s + n.area, 0)
    const max = Math.max(...row.map(n => n.area))
    const min = Math.min(...row.map(n => n.area))
    return Math.max((side * side * max) / (sum * sum), (sum * sum) / (side * side * min))
  }

  const place = (row: Node<T>[], r: Rect): Rect => {
    const sum = row.reduce((s, n) => s + n.area, 0)
    if (r.w >= r.h) {
      const colW = sum / r.h
      let y = r.y
      for (const n of row) {
        const h = n.area / colW
        out.push({ x: r.x, y, w: colW, h, item: n.item })
        y += h
      }
      return { x: r.x + colW, y: r.y, w: r.w - colW, h: r.h }
    }
    const rowH = sum / r.w
    let x = r.x
    for (const n of row) {
      const w = n.area / rowH
      out.push({ x, y: r.y, w, h: rowH, item: n.item })
      x += w
    }
    return { x: r.x, y: r.y + rowH, w: r.w, h: r.h - rowH }
  }

  let rest = { ...frame }
  let row: Node<T>[] = []
  let i = 0
  while (i < nodes.length) {
    const side = Math.min(rest.w, rest.h)
    const next = nodes[i]!
    if (row.length === 0 || worst([...row, next], side) <= worst(row, side)) {
      row.push(next)
      i++
    }
    else {
      rest = place(row, rest)
      row = []
    }
  }
  if (row.length) place(row, rest)
  return out
}

// Merge edges that fall within `tolerance` of each other into one shared seam, so neighbouring
// rows and columns line up. The frame's own edges never move.
function snapEdges(values: number[], fixed: number[], tolerance: number): Map<number, number> {
  const sorted = [...new Set(values)].sort((a, b) => a - b)
  const map = new Map<number, number>()
  let cluster: number[] = []
  const flush = () => {
    if (!cluster.length) return
    const pinned = cluster.find(v => fixed.some(f => Math.abs(f - v) < 0.5))
    const target = Math.round(pinned ?? cluster.reduce((s, v) => s + v, 0) / cluster.length)
    for (const v of cluster) map.set(v, target)
    cluster = []
  }
  for (const v of sorted) {
    if (cluster.length && v - cluster[cluster.length - 1]! > tolerance) flush()
    cluster.push(v)
  }
  flush()
  return map
}

// Lay out tiles in a frame with a fixed gap, on whole pixels, largest first, with near-miss seams
// merged. Each weight is floored at `floor` of the total so a small library still gets a usable target.
export function layoutMosaic<T>(items: { item: T, value: number }[], frame: Rect, gap: number, floor = 0.06, tolerance = 40) {
  const total = items.reduce((sum, i) => sum + i.value, 0)
  const weighted = items
    .map(i => ({ item: i.item, value: Math.max(i.value, total * floor) }))
    .sort((a, b) => b.value - a.value)
  const grown = { x: frame.x, y: frame.y, w: frame.w + gap, h: frame.h + gap }
  const rects = squarify(weighted, grown)
  const xs = snapEdges(rects.flatMap(r => [r.x, r.x + r.w]), [grown.x, grown.x + grown.w], tolerance)
  const ys = snapEdges(rects.flatMap(r => [r.y, r.y + r.h]), [grown.y, grown.y + grown.h], tolerance)
  return rects.map((r) => {
    const x0 = xs.get(r.x)!
    const y0 = ys.get(r.y)!
    const x1 = xs.get(r.x + r.w)!
    const y1 = ys.get(r.y + r.h)!
    return { item: r.item, x: x0, y: y0, w: x1 - x0 - gap, h: y1 - y0 - gap }
  })
}

// The nearest rect in a direction: overlap on the cross axis wins, then distance.
export function nearest<T extends Rect>(from: Rect, candidates: T[], dir: Direction): T | undefined {
  const cx = from.x + from.w / 2
  const cy = from.y + from.h / 2
  let best: T | undefined
  let bestScore = Infinity
  for (const c of candidates) {
    if (c === from) continue
    let gap: number
    let overlap: number
    let offset: number
    if (dir === 'left' || dir === 'right') {
      gap = dir === 'right' ? c.x - (from.x + from.w) : from.x - (c.x + c.w)
      overlap = Math.min(from.y + from.h, c.y + c.h) - Math.max(from.y, c.y)
      offset = Math.abs(c.y + c.h / 2 - cy)
    }
    else {
      gap = dir === 'down' ? c.y - (from.y + from.h) : from.y - (c.y + c.h)
      overlap = Math.min(from.x + from.w, c.x + c.w) - Math.max(from.x, c.x)
      offset = Math.abs(c.x + c.w / 2 - cx)
    }
    if (gap < -1) continue
    const score = gap + (overlap > 0 ? 0 : 10000) + offset * 0.5
    if (score < bestScore) {
      bestScore = score
      best = c
    }
  }
  return best
}
