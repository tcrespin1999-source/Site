import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const trabalhos = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/trabalhos" }),
    schema: z.object({
        title: z.string(),
        date: z.coerce.date().optional(),
        year: z.number().optional(),
        type: z.enum([
            "ensaio",
            "artigo",
            "performance",
            "design",
            "curadoria",
            "colagem",
            "ilustracao",
            "traducao",
            "projeto-cultural",
            "editorial",
            "poesia",
        ]),
        description: z.string().optional(),
        tags: z.array(z.string()),
        venue: z.string().optional(),
        collaborators: z.array(z.string()).optional(),
        externalUrl: z.string().url().optional(),
        image: z.string().optional(),
        pdf: z.string().url().optional(),
        video: z.string().url().optional(),
        videoLast: z.boolean().default(false),
        lang: z.enum(["pt", "en", "es"]).default("pt"),
        draft: z.boolean().default(false),
        externalOnly: z.boolean().default(false),
        hideFromList: z.boolean().default(false),
    }),
});

export const collections = { trabalhos };
