import { defaultOpenFiles, getWorkspaceFile, workspaceFiles } from "../data/workspace";
import { syncWorkspaceTabs } from "./workspace-tabs";

type FileId = (typeof workspaceFiles)[number]["id"];
const workspace = document.querySelector<HTMLElement>(".workspace-shell");

if (workspace) {
  const panes = [...workspace.querySelectorAll<HTMLElement>("[data-workspace-pane]")];
  const fileLinks = [...workspace.querySelectorAll<HTMLAnchorElement>("[data-workspace-file]")];
  const tabItems = [...workspace.querySelectorAll<HTMLElement>("[data-tab-file]")];
  const tabBar = workspace.querySelector<HTMLElement>(".editor-tabs");
  const content = workspace.querySelector<HTMLElement>("[data-workspace-content]");
  const empty = workspace.querySelector<HTMLElement>("[data-empty-workspace]");
  workspace.classList.add("is-enhanced");

  function isFileId(value: unknown): value is FileId {
    return workspaceFiles.some((file) => file.id === value);
  }

  const openFiles: FileId[] = [...defaultOpenFiles];
  let activeId: FileId | null = null;
  let scrollFrame = 0;

  function resetScroll() {
    cancelAnimationFrame(scrollFrame);
    window.scrollTo({ top: 0, behavior: "instant" });
    // Switching hidden panes changes document height. Reset again after layout
    // so scroll anchoring and a pending smooth scroll cannot shift the new file.
    scrollFrame = requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "instant" });
    });
  }

  function announce(message: string) {
    const live = document.querySelector("[data-file-announcement]");
    if (live) live.textContent = message;
  }

  function render() {
    const active = workspaceFiles.find((file) => file.id === activeId);
    syncWorkspaceTabs(tabBar, tabItems, openFiles);
    fileLinks.forEach((link) => {
      if (active && link.dataset.workspaceFile === active.id) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
    panes.forEach((pane) => { pane.hidden = pane.id !== activeId; });
    if (content) content.hidden = !active;
    if (empty) empty.hidden = !!active;
    workspace?.classList.toggle("is-empty", !active);

    const filename = workspace?.querySelector("[data-current-file]");
    if (filename) filename.textContent = active?.label ?? "workspace";
    if (panes.length) document.title = `${active?.label ?? "Workspace"} | ${workspace?.dataset.siteName}`;
  }

  function initialize() {
    const hashId = window.location.pathname === "/" ? window.location.hash.slice(1) : "";
    const requested = isFileId(hashId) ? hashId : getWorkspaceFile(window.location.pathname).id;
    // Every document load starts with About and Work, including refreshes of other files.
    activeId = openFiles.includes(requested) ? requested : "about";
    if (panes.length && activeId !== requested) {
      history.replaceState(null, "", workspaceFiles.find((file) => file.id === activeId)!.href);
    }
    render();
    resetScroll();
  }

  function openFile(id: FileId, replace = false, focusContent = false) {
    const file = workspaceFiles.find((file) => file.id === id)!;
    if (!openFiles.includes(id)) openFiles.push(id);

    const url = new URL(file.href, window.location.origin);
    const canDisplay = panes.some((pane) => pane.id === id);
    if (!canDisplay) {
      if (replace) window.location.replace(file.href);
      else window.location.assign(file.href);
      return;
    }

    activeId = id;
    if (window.location.href !== url.href) {
      if (replace) history.replaceState(null, "", file.href);
      else history.pushState(null, "", file.href);
    }
    render();
    announce(`${file.label} opened`);
    if (focusContent) {
      const heading = (panes.find((pane) => pane.id === id) ?? content)?.querySelector<HTMLElement>("h1");
      heading?.setAttribute("tabindex", "-1");
      heading?.focus({ preventScroll: true });
    }
    resetScroll();
  }

  function closeFile(id: FileId) {
    const index = openFiles.indexOf(id);
    if (index < 0) return;
    openFiles.splice(index, 1);
    if (activeId === id) {
      const neighbour = openFiles[index] ?? openFiles[index - 1];
      if (neighbour) openFile(neighbour, true);
      else {
        activeId = null;
        history.replaceState(null, "", window.location.pathname + window.location.search);
        render();
        document.querySelector<HTMLElement>("#empty-workspace-title")?.focus({ preventScroll: true });
        resetScroll();
      }
    } else render();

    if (activeId) fileLinks.find((link) => link.classList.contains("editor-tab") && link.dataset.workspaceFile === activeId)?.focus({ preventScroll: true });
    const label = workspaceFiles.find((file) => file.id === id)?.label;
    announce(`${label} closed.${activeId ? "" : " No files open. Choose a file from the explorer."}`);
  }

  function selectFromLocation() {
    const id = window.location.pathname === "/" ? window.location.hash.slice(1) || "about" : getWorkspaceFile(window.location.pathname).id;
    if (!isFileId(id) || !panes.some((pane) => pane.id === id)) return;
    if (!openFiles.includes(id)) openFiles.push(id);
    activeId = id;
    render();
    resetScroll();
  }

  initialize();
  // A directly opened /#work URL can also trigger native fragment scrolling.
  window.addEventListener("load", resetScroll, { once: true });
  window.addEventListener("hashchange", selectFromLocation);
  window.addEventListener("popstate", selectFromLocation);

  document.addEventListener("click", (event) => {
    if (!(event instanceof MouseEvent) || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (!(event.target instanceof Element)) return;
    const close = event.target.closest<HTMLButtonElement>("button[data-close-file]");
    if (close && isFileId(close.dataset.closeFile)) {
      event.preventDefault();
      closeFile(close.dataset.closeFile);
      return;
    }
    const link = event.target.closest<HTMLAnchorElement>("a[data-workspace-file]");
    const id = link?.dataset.workspaceFile;
    if (!link || link.target || !isFileId(id)) return;
    event.preventDefault();
    openFile(id, false, link.hasAttribute("data-create-message") || link.hasAttribute("data-guide-link") || !!link.closest("[data-workspace-pane], [data-empty-workspace]"));
  });
}
