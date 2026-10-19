/** Preserve existing tab nodes and focus when only the active file changes. */
export function syncWorkspaceTabs(tabBar: HTMLElement | null, tabItems: HTMLElement[], openFiles: readonly string[]) {
  const open = new Set(openFiles);
  tabItems.forEach((item) => { item.hidden = !open.has(item.dataset.tabFile!); });
  if (!tabBar) return;

  // Walk backwards so reopening a file only moves that file to the end.
  let current = tabBar.lastElementChild as HTMLElement | null;
  for (const id of [...openFiles].reverse()) {
    const item = tabItems.find((item) => item.dataset.tabFile === id);
    if (!item) continue;
    while (current?.hidden) current = current.previousElementSibling as HTMLElement | null;
    if (current === item) current = current.previousElementSibling as HTMLElement | null;
    else tabBar.insertBefore(item, current?.nextElementSibling ?? null);
  }
  tabBar.hidden = openFiles.length === 0;
}
