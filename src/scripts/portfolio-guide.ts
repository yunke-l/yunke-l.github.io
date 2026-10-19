import { nearestGuideEdge, type DockEdge } from "./guide-position";
import { createYukiSignal } from "./yuki-signal";

const guide = document.querySelector<HTMLElement>("[data-guide]");
const toggle = guide?.querySelector<HTMLButtonElement>("[data-guide-toggle]");
const panel = guide?.querySelector<HTMLElement>(".guide__panel");
const restore = guide?.querySelector<HTMLButtonElement>("[data-guide-restore]");

if (guide && toggle && panel && restore) {
  const guideName = guide.dataset.guideName;
  const storageKey = "yunke.guide.position.v1";
  const margin = 16;
  let docked: DockEdge | null = null;
  let position: { x: number; y: number } | null = null;
  let drag: { id: number; x: number; y: number; left: number; top: number; moved: boolean } | null = null;
  let suppressClick = false;
  const speech = guide.querySelector<HTMLElement>("[data-guide-speech]");
  const detectSignal = createYukiSignal();
  let surpriseTimer = 0;
  let lastTap: { at: number; x: number; y: number } | null = null;

  const clamp = (value: number, max: number) => Math.max(margin, Math.min(value, Math.max(margin, max)));

  function positionPopover(popover: HTMLElement) {
    const anchor = guide!.getBoundingClientRect();
    // Offset dimensions exclude entrance animation transforms.
    const width = popover.offsetWidth;
    const height = popover.offsetHeight;
    const above = anchor.top - height - 18;
    const top = above >= margin ? above : anchor.bottom + 18;
    popover.style.left = `${clamp(anchor.right - width, window.innerWidth - width - margin)}px`;
    popover.style.top = `${clamp(top, window.innerHeight - height - margin)}px`;
  }

  function positionPanel() {
    if (!panel!.hidden) positionPopover(panel!);
    if (speech && !speech.hidden) positionPopover(speech);
  }

  function clearSurprise() {
    window.clearTimeout(surpriseTimer);
    guide!.removeAttribute("data-surprise");
    if (speech) speech.hidden = true;
  }

  function surprise(kind: "stars" | "signal" | "puff") {
    setOpen(false, panel!.contains(document.activeElement));
    clearSurprise();
    // Restart the small burst when a visitor finds another surprise.
    void guide!.offsetWidth;
    guide!.dataset.surprise = kind;
    if (speech) {
      speech.textContent = {
        stars: "Cosmic high five! You found my happy dance.",
        signal: "Signal received. Secret handshake: Y-U-K-I.",
        puff: "Puff is the real boss around here."
      }[kind];
      speech.hidden = false;
      positionPopover(speech);
    }
    surpriseTimer = window.setTimeout(clearSurprise, 6000);
  }

  function place() {
    if (position) {
      const width = guide!.offsetWidth;
      const height = guide!.offsetHeight;
      guide!.style.left = `${docked === "left" ? 0 : docked === "right" ? window.innerWidth - width : clamp(position.x, window.innerWidth - width - margin)}px`;
      guide!.style.top = `${docked === "top" ? 0 : docked === "bottom" ? window.innerHeight - height : clamp(position.y, window.innerHeight - height - margin)}px`;
      guide!.style.right = "auto";
      guide!.style.bottom = "auto";
    }
    positionPanel();
  }

  function savePosition() {
    const rect = guide!.getBoundingClientRect();
    if (!docked) position = { x: rect.left, y: rect.top };
    if (!position) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify({
        x: position.x / window.innerWidth,
        y: position.y / window.innerHeight,
        docked: docked !== null,
        edge: docked
      }));
    } catch { /* Movement remains available without browser storage. */ }
  }

  function setDocked(value: DockEdge | null, focus = false) {
    clearSurprise();
    if (!position) {
      const rect = guide!.getBoundingClientRect();
      position = { x: rect.left, y: rect.top };
    }
    setOpen(false);
    docked = value;
    if (value) guide!.dataset.docked = value;
    else guide!.removeAttribute("data-docked");
    toggle!.hidden = value !== null;
    restore!.hidden = value === null;
    if (value) {
      restore!.setAttribute("aria-label", `Restore YUKI from the ${value} edge`);
    }
    place();
    savePosition();
    if (focus) (value ? restore : toggle)!.focus({ preventScroll: true });
  }

  function setOpen(open: boolean, restoreFocus = false) {
    panel!.hidden = !open;
    toggle!.setAttribute("aria-expanded", String(open));
    toggle!.setAttribute("aria-label", `${open ? "Close" : "Open"} ${guideName}, your Easter egg guide`);
    if (open) {
      clearSurprise();
      positionPanel();
      panel!.querySelector<HTMLElement>("[data-guide-action]")?.focus({ preventScroll: true });
    } else if (restoreFocus) toggle!.focus({ preventScroll: true });
  }

  toggle.addEventListener("click", (event) => {
    if (suppressClick) { suppressClick = false; event.preventDefault(); return; }
    const now = Date.now();
    if (event.detail > 0 && lastTap && now - lastTap.at < 350 && Math.hypot(event.clientX - lastTap.x, event.clientY - lastTap.y) < 16) {
      lastTap = null;
      surprise("stars");
      return;
    }
    lastTap = event.detail > 0 ? { at: now, x: event.clientX, y: event.clientY } : null;
    setOpen(panel.hidden);
  });
  toggle.addEventListener("pointerdown", (event) => {
    if (!event.isPrimary || event.button !== 0) return;
    suppressClick = false;
    const rect = guide.getBoundingClientRect();
    drag = { id: event.pointerId, x: event.clientX, y: event.clientY, left: rect.left, top: rect.top, moved: false };
    toggle.setPointerCapture(event.pointerId);
  });
  toggle.addEventListener("pointermove", (event) => {
    if (!drag || drag.id !== event.pointerId) return;
    const dx = event.clientX - drag.x;
    const dy = event.clientY - drag.y;
    if (!drag.moved && Math.hypot(dx, dy) < 6) return;
    if (!drag.moved) { setOpen(false); clearSurprise(); lastTap = null; drag.moved = true; guide.setAttribute("data-dragging", ""); }
    position = { x: drag.left + dx, y: drag.top + dy };
    place();
  });
  function endDrag(event: PointerEvent) {
    if (!drag || drag.id !== event.pointerId) return;
    const moved = drag.moved;
    drag = null;
    guide!.removeAttribute("data-dragging");
    suppressClick = moved;
    if (toggle!.hasPointerCapture(event.pointerId)) toggle!.releasePointerCapture(event.pointerId);
    if (!moved) return;
    const rect = guide!.getBoundingClientRect();
    const edge = nearestGuideEdge(rect, window.innerWidth, window.innerHeight, 24);
    if (event.type === "pointerup" && edge) setDocked(edge, true);
    else savePosition();
  }
  toggle.addEventListener("pointerup", endDrag);
  toggle.addEventListener("pointercancel", endDrag);
  toggle.addEventListener("lostpointercapture", endDrag);
  toggle.addEventListener("keydown", (event) => {
    const directions: Record<string, [number, number]> = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] };
    const direction = directions[event.key];
    if (!direction) return;
    event.preventDefault();
    const rect = guide.getBoundingClientRect();
    const step = event.shiftKey ? 40 : 10;
    position = { x: rect.left + direction[0] * step, y: rect.top + direction[1] * step };
    place();
    savePosition();
  });
  guide.querySelector("[data-guide-dock]")?.addEventListener("click", () => {
    setDocked(nearestGuideEdge(guide.getBoundingClientRect(), window.innerWidth, window.innerHeight), true);
  });
  restore.addEventListener("click", () => { suppressClick = false; setDocked(null, true); });
  guide.querySelector("[data-guide-close]")?.addEventListener("click", () => setOpen(false, true));
  guide.querySelectorAll("[data-guide-link]").forEach((link) => {
    link.addEventListener("click", (event) => {
      if (event instanceof MouseEvent && (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey)) return;
      setOpen(false);
    });
  });
  guide.querySelector("[data-guide-puff]")?.addEventListener("click", () => {
    setOpen(false);
    document.querySelector<HTMLElement>(".terminal")?.dispatchEvent(new Event("terminal:hint"));
  });
  document.querySelector(".terminal")?.addEventListener("terminal:puff", () => surprise("puff"));
  document.addEventListener("pointerdown", (event) => {
    if (!panel.hidden && event.target instanceof Node && !guide.contains(event.target)) setOpen(false);
  });
  document.addEventListener("keydown", (event) => {
    const editable = event.target instanceof Element && !!event.target.closest("input, textarea, select, [contenteditable]:not([contenteditable='false']), [role='textbox']");
    if (detectSignal(event.key, Date.now(), editable || event.ctrlKey || event.metaKey || event.altKey || event.isComposing || event.repeat)) surprise("signal");
    if (event.key === "Escape") clearSurprise();
    if (event.key === "Escape" && !panel.hidden) { event.preventDefault(); setOpen(false, true); }
  });
  window.addEventListener("popstate", () => setOpen(false));
  window.addEventListener("hashchange", () => setOpen(false));
  guide.hidden = false;
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) ?? "null");
    if (saved && Number.isFinite(saved.x) && Number.isFinite(saved.y) && typeof saved.docked === "boolean") {
      position = { x: Math.max(0, Math.min(1, saved.x)) * window.innerWidth, y: Math.max(0, Math.min(1, saved.y)) * window.innerHeight };
      const edge = ["left", "right", "top", "bottom"].includes(saved.edge) ? saved.edge as DockEdge : "right";
      setDocked(saved.docked ? edge : null);
    }
  } catch { /* Ignore unavailable storage or an invalid saved position. */ }
  window.addEventListener("resize", place);
}

