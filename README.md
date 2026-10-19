# Yunke Li — Developer Workspace

A personal portfolio built with Astro and TypeScript. The interface takes its cues from a code editor: a file explorer, editor tabs, syntax-highlighted profile, and a small terminal. Electric cyan, muted violet, and a graphite background carry through every route. Each visit or refresh selects the palette before the first paint using the visitor's local time: light from 06:00 to 17:59, dark from 18:00 to 05:59. The sun/moon button beside Email switches the palette for the current document; refreshing recalculates it from local time.

Every document load starts with only About and Work open. About is selected unless the URL requests Work. Other files open when selected in the explorer or through an in-page link, and can be closed and reopened during the visit. Refreshing any workspace file resets the tabs to About and Work; a URL for another file resets to About as well.

## Development

Use Node.js 24 and pnpm 10.15.1 (specified in `package.json`).

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open the local URL printed by Astro. To build and preview the production site:

```sh
pnpm build
pnpm preview
```

## Content and structure

- `src/data/site.ts`: personal details, experience, skills, education, research, and contact links.
- `src/data/workspace.ts`: file navigation, terminal text, and editor metadata.
- `src/components/WorkspaceFiles.astro`: shared workspace containing About, Work, Research, Message, Resume, and Repositories panes. All workspace entry routes render the same panes so switching files updates the URL and active pane without reloading the shell, tabs, or terminal.
- `src/content/projects/`: Markdown project entries, rendered into `/projects/` and individual detail pages.
- `src/pages/index.astro`, `src/pages/resume.astro`, and `src/pages/github.astro`: entry routes for the shared workspace. File selection updates the URL and supports browser history during the visit. Entry or refresh resets to the default tabs described above. `ResumeFile.astro` and `RepositoriesFile.astro` hold their content. Without JavaScript, all workspace sections remain readable.
- `src/components/`: shared workspace navigation, tabs, terminal, and status bar.
- `src/styles/global.css`: design tokens, responsive layouts, focus states, and reduced-motion support.
- `assets/`: existing images and resume PDF, exposed through the tracked `public/assets` symlink.

No React runtime or animation dependency is required. Astro produces static pages and bundles the small TypeScript file-switching enhancement.

## Messages

The Explorer's **+** opens a closable `message.md` tab. The form uses [FormSubmit](https://formsubmit.co/) to deliver messages to `site.email` in `src/data/site.ts`; no mail credentials are shipped to the browser. `MessageFile.astro` supplies the form and `src/scripts/message.ts` handles submission, validation feedback, and a session-only draft that survives closing/reopening the tab or changing routes. Accepted submissions clear the draft; errors retain it. A successful API response confirms acceptance by FormSubmit, not arrival in the recipient's mailbox.

Before making this form available to visitors, submit a test from the deployed website, then open the FormSubmit activation email in `yunkeli.work@gmail.com` and confirm the form. Check spam if necessary. Activation is required before FormSubmit forwards messages; changing the destination address requires confirming it again. After activation, send another test and check the inbox to verify delivery. No external test email is sent by the automated checks.

To check submission behavior without sending mail, run `node --experimental-strip-types --test tests/message.test.mjs`.

Run `pnpm build && node --experimental-strip-types --test tests/*.test.mjs` for all checks, including tab stability and the presence of every workspace pane on each direct entry route. The route checks guard against Resume or Repositories falling back to a full page reload when selected.

## Deployment

`.github/workflows/deploy.yml` installs locked pnpm dependencies, builds Astro into `dist/`, and publishes that directory to the existing `gh-pages` branch on pushes to `main` or `master`. Pull requests build without publishing. The GitHub Pages source should remain the root of `gh-pages`; the workflow preserves this repository's branch-based deployment approach.

`public/.nojekyll` ensures GitHub Pages serves Astro's `_astro` directory. No Ruby, Jekyll, or Docker setup is required for the current site. The older al-folio files remain as migration reference and are not part of the Astro build.

## Credits

Earlier versions of this repository used [al-folio](https://github.com/alshedivat/al-folio). Its retained source and assets remain subject to their original license; see `LICENSE`.
