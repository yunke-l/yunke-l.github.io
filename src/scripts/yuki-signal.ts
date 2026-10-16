// Keep only a short, temporary sequence; never observe text entered in fields.
export function createYukiSignal() {
  let sequence = "";
  let lastKeyAt = 0;
  return (key: string, now: number, ignore = false): boolean => {
    if (ignore || !/^[a-z]$/i.test(key)) { sequence = ""; return false; }
    if (now - lastKeyAt > 2000) sequence = "";
    lastKeyAt = now;
    sequence = (sequence + key.toLowerCase()).slice(-4);
    if (sequence !== "yuki") return false;
    sequence = "";
    return true;
  };
}
