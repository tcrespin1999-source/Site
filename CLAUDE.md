# CLAUDE.md — Tamara Crespin Portfólio

Instruções permanentes para sessões de desenvolvimento com Claude Code.
Leia este arquivo no início de cada sessão antes de escrever qualquer código.

---

## Contexto do Projeto

**Quem:** Tamara Crespin — arquiteta, pesquisadora e designer baseada em SP.
**O quê:** portfólio pessoal como grafo de conhecimento. Cada trabalho é um nó; conexões emergem de tags compartilhadas.
**Estética:** editorial/acadêmica. Tipografia com propósito. Mínimo de elementos decorativos.

**Stack:** Astro 5 (static) · Tailwind CSS 4 · D3.js 7 · TypeScript strict · Deploy Vercel

**Pipeline de dados:**
```
src/content/**/*.md  →  generateGraphData.ts (build)  →  public/graph-data.json  →  GraphView.astro (D3, runtime)
```

---

## Regras Invioláveis

### Tipografia
- **Display (títulos) + Body / UI:** `Guarujá Neue` (auto-hospedada em `public/fonts/`)
- **Citações / itálico:** `Instrument Serif` (Google Fonts)
- **Fallback display:** `DM Serif Display` · **Fallback body:** `DM Sans`
- **Proibido:** Inter, Roboto, Space Grotesk, qualquer fonte monospace

### Motion
- Nenhuma animação com `duration > 400ms`
- Proibido: parallax, scroll-jacking, intersection observer em cada elemento
- Tokens: `--transition-fast: 150ms` · `--transition-base: 250ms` · `--transition-slow: 400ms`

### CSS
- Tudo via Tailwind + CSS custom properties do `src/styles/global.css`
- **Sem** `<style>` scoped em componentes Astro (exceto casos excepcionais justificados)
- Nunca criar nova variável CSS sem adicionar ao `global.css`

### Dados e Schema
- **Nunca** adicionar campo novo ao frontmatter sem atualizar `src/content/config.ts` primeiro
- Tags: sempre `kebab-case`. Lista oficial na seção §Tags abaixo
- O `config.ts` é a fonte da verdade — TypeScript valida o schema no build

### GraphView
- Após qualquer mudança de frontmatter, o `graph-data.json` é regenerado automaticamente com `npm run dev`
- Para forçar regeneração manual: `npx tsx src/utils/generateGraphData.ts`
- Testar sempre em modo `full` (home) e `mini` (páginas internas) após mudanças no componente

### Qualidade
- Commits apenas por fase completa — nunca commitar trabalho parcial
- Sem `Lorem ipsum`, sem imagens placeholder — deixar vazio com `<!-- TODO: conteúdo real -->`
- Sem `console.log` em produção

---

## Arquivos-Chave

| Arquivo | Responsabilidade |
|---------|-----------------|
| `src/content/config.ts` | Schema de dados — fonte da verdade |
| `src/styles/global.css` | Design tokens (CSS custom properties) |
| `src/components/GraphView.astro` | Componente D3 (modo `full` e `mini`) |
| `src/utils/generateGraphData.ts` | Script de build que gera o grafo |
| `public/graph-data.json` | Dados do grafo (gerado automaticamente, não editar à mão) |
| `astro.config.mjs` | Configuração do Astro, domínio do site |
| `ROADMAP.md` | Estado atual do projeto e próximas etapas |

---

## Taxonomia de Tags

Tags são o motor do grafo. Usar apenas estas (definidas pela cliente).

| Categoria | Tags |
|-----------|------|
| Formato | `ensaio` · `performance` · `design` · `colagem` · `curadoria` · `ilustracao` · `artigo` · `traducao` |
| Conteúdo | `judaico` · `urbano` · `diaspora` · `literatura` · `cultural` · `arte` · `editorial` |

**Nota:** `diaspora` e `ilustracao` sem acento (convenção interna, hubs do grafo usam esses valores).
**Hubs do grafo** (matchTags → label): `judaico` → "estudos judaicos" · `diaspora` → "diáspora" · `literatura` → "literatura" · `curadoria` → "curadoria" · `arte` → "cultura material" · `urbano` → "estudos urbanos" · `design` → "design gráfico" · `cultural` → "projetos culturais" · `performance` → "performance" · `editorial` → "editorial"

---

## Decisões de Design Confirmadas

| Decisão | Valor |
|---------|-------|
| Cor de acento | `#C0392B` — terracota |
| Idioma principal | Português (PT) |
| Grafo | D3 client-side, dados gerados em build-time |
| CMS | Sem CMS externo — Markdown local |
| Fontes | Google Fonts via `<link>` no `<head>` (não via npm) |

---

## Decisões Pendentes com Tamara

Não implementar nada que dependa destas decisões sem confirmação:

1. Domínio final (`tamaracrespin.com` assumido por enquanto)
2. Foto de perfil na `/sobre`
3. Visual do `/acervo` (lista simples ou grid editorial)
4. Escopo multilíngue (PT apenas ou PT+EN+ES)

---

## Fluxo de Trabalho

```bash
npm run dev     # inicia dev server (predev regenera graph-data.json)
npm run build   # build de produção (prebuild regenera graph-data.json)
npm run preview # preview do build estático
```

Deploy: push para `main` → Vercel faz deploy automático.

---

## O Que Vem a Seguir

Ver `ROADMAP.md` para detalhes. Resumo de prioridade:

1. **Fase 8** — `RelatedItems.astro`: navegação por itens relacionados (sem decisão pendente)
2. **Fase 10 parcial** — `404.astro`: página de erro personalizada (rápido)
3. **Fase 9** — `/acervo`: acervo de referências (aguarda decisão visual)
