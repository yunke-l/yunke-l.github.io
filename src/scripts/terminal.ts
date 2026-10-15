import { puffPhotos } from "../data/puff";

const terminal = document.querySelector<HTMLElement>(".terminal");
const form = terminal?.querySelector<HTMLFormElement>("[data-terminal-form]");
const input = form?.querySelector<HTMLInputElement>("input");
const gallery = terminal?.querySelector<HTMLElement>("[data-cat-gallery]");
const photo = gallery?.querySelector<HTMLImageElement>("[data-cat-photo]");

if (terminal && form && input && gallery && photo) {
  const response = terminal.querySelector<HTMLElement>("[data-terminal-result]");
  const help = terminal.querySelector<HTMLElement>("[data-terminal-help]");
  const file = terminal.querySelector<HTMLElement>("[data-terminal-file]");
  const thumbnails = [...gallery.querySelectorAll<HTMLButtonElement>("[data-cat-index]")];
  const history: string[] = [];
  let historyIndex = 0;
  let draft = "";
  let photoIndex = 0;
  terminal.classList.add("is-interactive");

  function respond(text: string, error = false) {
    if (!response) return;
    response.textContent = text;
    response.hidden = false;
    response.classList.toggle("sr-only", !error);
    response.dataset.kind = error ? "error" : "success";
  }

  function showPhoto(index: number) {
    photoIndex = (index + puffPhotos.length) % puffPhotos.length;
    const selected = puffPhotos[photoIndex];
    photo!.src = selected.src;
    photo!.alt = selected.alt;
    gallery!.hidden = false;
    if (help) help.hidden = true;
    if (file) file.textContent = "puff.gallery";
    const position = gallery!.querySelector("[data-cat-position]");
    if (position) position.textContent = `${photoIndex + 1} of ${puffPhotos.length}`;
    thumbnails.forEach((button, i) => button.setAttribute("aria-pressed", String(i === photoIndex)));
    respond(`Puff has entered the chat. Photo ${photoIndex + 1} of ${puffPhotos.length}.`);
    gallery!.scrollIntoView({ block: "nearest", behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }

  function runCommand(raw: string) {
    const command = raw.trim();
    if (!command) return;
    if (history.at(-1) !== command) history.push(command);
    if (history.length > 20) history.shift();
    historyIndex = history.length;
    draft = "";

    const normalized = command.toLowerCase().replace(/\s+/g, " ");
    const cat = normalized.match(/^(?:cat|puff)(?: ([1-6]))?$/);
    if (cat) {
      showPhoto(cat[1] ? Number(cat[1]) - 1 : gallery!.hidden ? photoIndex : photoIndex + 1);
    } else if (normalized === "next" || normalized === "prev") {
      showPhoto(photoIndex + (normalized === "next" ? 1 : -1));
    } else if (normalized === "help") {
      gallery!.hidden = true;
      if (help) help.hidden = false;
      if (file) file.textContent = "help";
      respond("A few things to try. Use ↑ / ↓ to revisit your commands.");
    } else if (normalized === "clear" || normalized === "focus" || normalized === "cat focus.txt") {
      gallery!.hidden = true;
      if (help) help.hidden = true;
      if (response) { response.textContent = ""; response.hidden = true; }
      if (file) file.textContent = "shell";
    } else {
      respond(`Command not found: ${command}. Try help, cat, or puff.`, true);
    }
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const command = input.value;
    input.value = "";
    runCommand(command);
  });

  terminal.addEventListener("click", (event) => {
    const button = event.target instanceof Element ? event.target.closest<HTMLButtonElement>("button") : null;
    if (!button) return;
    if (button.dataset.terminalCommand) runCommand(button.dataset.terminalCommand);
    else if (button.dataset.catIndex !== undefined) runCommand(`cat ${Number(button.dataset.catIndex) + 1}`);
  });

  input.addEventListener("keydown", (event) => {
    if (!history.length || (event.key !== "ArrowUp" && event.key !== "ArrowDown")) return;
    event.preventDefault();
    if (historyIndex === history.length) draft = input.value;
    historyIndex = Math.max(0, Math.min(history.length, historyIndex + (event.key === "ArrowUp" ? -1 : 1)));
    input.value = historyIndex === history.length ? draft : history[historyIndex];
    input.setSelectionRange(input.value.length, input.value.length);
  });

  gallery.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    runCommand(event.key === "ArrowRight" ? "next" : "prev");
  });

  photo.addEventListener("error", () => respond("This photo couldn't load. Try another thumbnail or type next.", true));
}
