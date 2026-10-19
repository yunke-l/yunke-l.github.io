import { defineCollection, z } from "astro:content";

const projects = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string(),
    importance: z.number(),
    role: z.string(),
    stack: z.string(),
    github: z.string().url()
  })
});

export const collections = { projects };
