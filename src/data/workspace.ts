export const workspaceFiles = [
  { id: "about", label: "about.md", type: "M↓", href: "/#about", language: "Markdown", focus: "Product interfaces. Reusable systems. Thoughtful details." },
  { id: "work", label: "work.tsx", type: "TS", href: "/#work", language: "TypeScript React", focus: "Shared quiz components. Web + mobile. Learning experiences." },
  { id: "research", label: "research.py", type: "Py", href: "/#research", language: "Python", focus: "Exploring the balance between model accuracy and efficiency." },
  { id: "resume", label: "resume.pdf", type: "CV", href: "/resume/", language: "Resume", focus: "Experience, education, and the tools I build with." },
  { id: "github", label: "projects.json", type: "{}", href: "/github/", language: "JSON", focus: "Selected personal and university projects, from full-stack platforms to engineering experiments." },
  { id: "message", label: "message.md", type: "mail", href: "/#message", language: "Markdown", focus: "Leave a note for Yunke." }
] as const;

export const defaultOpenFiles = ["about", "work"] as const;

export function getWorkspaceFile(pathname: string) {
  if (pathname.startsWith("/projects")) return workspaceFiles[1];
  if (pathname.startsWith("/resume")) return workspaceFiles[3];
  if (pathname.startsWith("/github")) return workspaceFiles[4];
  return workspaceFiles[0];
}
