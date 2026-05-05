/**
 * generateGraphData.ts
 *
 * Lê todos os arquivos .md da collection `trabalhos`,
 * extrai nós e calcula arestas por interseção de tags.
 * Gera `public/graph-data.json` para consumo do GraphView em runtime.
 *
 * Executado via `tsx` como prebuild/predev.
 */

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

// ─── Tipos ───

interface GraphNode {
    id: string;
    title: string;
    type: "trabalho";
    tags: string[];
    url: string;
    image?: string;
}

interface GraphLink {
    source: string;
    target: string;
    sharedTags: string[];
}

interface GraphData {
    nodes: GraphNode[];
    links: GraphLink[];
}

// ─── Helpers ───

const ROOT = path.resolve(import.meta.dirname, "../..");
const CONTENT_DIR = path.join(ROOT, "src/content");
const OUTPUT_PATH = path.join(ROOT, "public/graph-data.json");

/**
 * Lê todos os arquivos .md de uma pasta e retorna os nós do grafo.
 */
function readCollection(folder: string): GraphNode[] {
    const dir = path.join(CONTENT_DIR, folder);
    if (!fs.existsSync(dir)) return [];

    return fs
        .readdirSync(dir)
        .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"))
        .map((filename) => {
            const raw = fs.readFileSync(path.join(dir, filename), "utf-8");
            const { data } = matter(raw);

            // Slug = nome do arquivo sem extensão
            const slug = filename.replace(/\.mdx?$/, "");

            const externalOnly = data.externalOnly === true;
            const nodeUrl = externalOnly && data.externalUrl
                ? (data.externalUrl as string)
                : `/${folder}/${slug}`;

            return {
                id: slug,
                title: (data.title as string) || slug,
                type: "trabalho" as const,
                tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
                url: nodeUrl,
                ...(data.image ? { image: data.image as string } : {}),
            };
        })
        .filter((node) => {
            const raw = fs.readFileSync(
                path.join(dir, `${node.id}.md`),
                "utf-8",
            );
            const { data } = matter(raw);
            return data.draft !== true;
        });
}

/**
 * Calcula a interseção de duas listas de strings.
 */
function intersection(a: string[], b: string[]): string[] {
    const setB = new Set(b);
    return a.filter((tag) => setB.has(tag));
}

/**
 * Para cada par de nós (A, B):
 *   sharedTags = intersection(A.tags, B.tags)
 *   if (sharedTags.length > 0) → criar link A–B
 */
function generateLinks(nodes: GraphNode[]): GraphLink[] {
    const links: GraphLink[] = [];

    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            const shared = intersection(nodes[i].tags, nodes[j].tags);
            if (shared.length > 0) {
                links.push({
                    source: nodes[i].id,
                    target: nodes[j].id,
                    sharedTags: shared,
                });
            }
        }
    }

    return links;
}

// ─── Main ───

function main() {
    const nodes = readCollection("trabalhos");
    const links = generateLinks(nodes);

    const data: GraphData = { nodes, links };

    // Garantir que o diretório public/ existe
    const publicDir = path.dirname(OUTPUT_PATH);
    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
    }

    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(data, null, 2), "utf-8");

    console.log(
        `✓ graph-data.json gerado: ${nodes.length} nós, ${links.length} links`,
    );
}

main();
