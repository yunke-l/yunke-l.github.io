const dialog = document.querySelector<HTMLDialogElement>("#coursework-preview-dialog");
const gallery = dialog?.querySelector<HTMLElement>("[data-coursework-gallery]");
const title = dialog?.querySelector<HTMLElement>("#coursework-preview-title");
const readme = dialog?.querySelector<HTMLAnchorElement>("[data-coursework-readme]");

if (dialog && gallery && title && readme) {
  document.querySelectorAll<HTMLAnchorElement>("[data-coursework-preview]").forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || typeof dialog.showModal !== "function") return;
      event.preventDefault();
      const group = trigger.closest<HTMLElement>("[data-preview-project]");
      const previews = group ? [...group.querySelectorAll<HTMLAnchorElement>("[data-coursework-preview]")] : [trigger];
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      title.textContent = group?.dataset.previewProject ?? trigger.dataset.previewTitle ?? "Project preview";
      gallery.classList.toggle("coursework-preview-dialog__canvas--gallery", previews.length > 1);
      gallery.replaceChildren(...previews.map((preview) => {
        const figure = document.createElement("figure");
        const image = document.createElement("img");
        image.alt = preview.dataset.previewAlt ?? "";
        image.decoding = "async";
        image.src = preview.href.endsWith(".gif") && reducedMotion
          ? preview.querySelector("img")!.src
          : preview.href;
        figure.append(image);
        if (preview.dataset.previewLabel) {
          const caption = document.createElement("figcaption");
          caption.textContent = preview.dataset.previewLabel;
          figure.append(caption);
        }
        return figure;
      }));
      readme.href = trigger.dataset.previewReadme!;
      dialog.showModal();
      dialog.scrollTop = 0;
      document.documentElement.classList.add("coursework-preview-is-open");
    });
  });

  dialog.addEventListener("click", (event) => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });

  dialog.addEventListener("close", () => {
    document.documentElement.classList.remove("coursework-preview-is-open");
    // Stop the animated droplet preview while the dialog is closed.
    gallery.replaceChildren();
  });

  const closePreview = () => { if (dialog.open) dialog.close(); };
  window.addEventListener("hashchange", closePreview);
  window.addEventListener("popstate", closePreview);
}
