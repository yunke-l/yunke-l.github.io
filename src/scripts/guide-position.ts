export type DockEdge = "left" | "right" | "top" | "bottom";

export function nearestGuideEdge(
  rect: { left: number; right: number; top: number; bottom: number },
  width: number,
  height: number,
  threshold = Infinity
): DockEdge | null {
  const distances: [DockEdge, number][] = [
    ["left", rect.left], ["right", width - rect.right],
    ["top", rect.top], ["bottom", height - rect.bottom]
  ];
  const [edge, distance] = distances.reduce((nearest, entry) => entry[1] < nearest[1] ? entry : nearest);
  return distance <= threshold ? edge : null;
}
