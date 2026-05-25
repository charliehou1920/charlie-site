import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    category: z.enum(['AIVC', 'Comp. Herbology']),
    excerpt: z.string(),
    readTime: z.string(),
  }),
});

export const collections = { blog };