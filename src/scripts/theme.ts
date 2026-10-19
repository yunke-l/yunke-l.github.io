const themeToggle = document.querySelector<HTMLButtonElement>("[data-theme-toggle]");

if (themeToggle) {
  const applyTheme = (theme: "dark" | "light") => {
    document.documentElement.dataset.theme = theme;
    const label = `Switch to ${theme === "dark" ? "light" : "dark"} mode`;
    themeToggle.setAttribute("aria-label", label);
    themeToggle.title = label;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "light" ? "#eef0f3" : "#080c14");
  };

  applyTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark");
  themeToggle.hidden = false;

  themeToggle.addEventListener("click", () => {
    const theme = document.documentElement.dataset.theme === "light" ? "dark" : "light";
    applyTheme(theme);
  });
}
