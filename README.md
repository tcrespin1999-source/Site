# Tamara Crespin — Portfólio

Site pessoal e portfólio de [Tamara Crespin](https://tamaracrespin.com) — arquiteta, pesquisadora e designer. O site é organizado como um **grafo de conhecimento interativo**: cada trabalho é um nó, e as conexões emergem automaticamente de tags compartilhadas.

---

## Início Rápido (ambiente de desenvolvimento)

```bash
npm install      # instala dependências (só na primeira vez)
npm run dev      # abre o site em http://localhost:4321
npm run build    # gera versão de produção em /dist
npm run preview  # visualiza o build local antes de publicar
```

> Os scripts `predev` e `prebuild` regeneram automaticamente `public/graph-data.json` — o grafo reflete sempre o estado atual do conteúdo.

---

## Como Criar um Novo Trabalho

Você só precisa criar **um arquivo de texto** na pasta certa. O site atualiza grafo, listagem e página individual automaticamente — sem tocar em mais nada.

### 1. Criar o arquivo

Na pasta `src/content/trabalhos/`, crie um arquivo com extensão `.md`.

**Nome do arquivo:** use apenas letras minúsculas, números e hífens. Sem acentos, sem espaços. Esse nome vira a URL da página.

```
eruv-artificio-territorializacao.md   ✓
Eruv Artifício Territorialização.md   ✗
```

### 2. Preencher os metadados

Todo arquivo começa com um bloco entre `---`. Copie o template e preencha os campos que se aplicam — delete as linhas que não usar:

```yaml
---
title: "Título do trabalho"
year: 2025
type: ensaio
description: "Uma frase descrevendo o trabalho."
tags: [judaico, ensaio]
venue: "Nome da publicação ou instituição"
collaborators: ["Nome Sobrenome"]
externalUrl: "https://link-externo.com"
image: "/images/trabalhos/nome-do-arquivo.jpg"
pdf: "https://drive.google.com/file/d/ID/view"
video: "https://www.youtube.com/watch?v=ID"
videoLast: false
lang: pt
draft: false
externalOnly: false
hideFromList: false
---
```

Campos **obrigatórios**: `title`, `type`, `tags`. Inclua pelo menos um entre `year` e `date`.

### O que cada campo faz

| Campo | Obrigatório? | O que faz |
|-------|-------------|-----------|
| `title` | **Sim** | Título do trabalho, exibido na página e na listagem |
| `type` | **Sim** | Categoria do trabalho — ver tabela de tipos abaixo |
| `tags` | **Sim** | Temas — conectam este trabalho a outros no grafo |
| `year` | Recomendado | Ano exibido na listagem e usado para ordenação |
| `date` | Opcional | Data completa (`AAAA-MM-DD`). Permite ordenação precisa dentro do mesmo ano |
| `description` | Não | Resumo curto, exibido quando não há texto e nos metadados da página |
| `venue` | Não | Onde foi publicado ou realizado (revista, museu, evento…) |
| `collaborators` | Não | Lista de envolvidos. Formato: `["Nome 1", "Nome 2"]` |
| `externalUrl` | Não | Link externo. Se o trabalho não tem texto próprio, a página exibe um botão para esse link |
| `image` | Não | Imagem de capa — ver §Imagens |
| `pdf` | Não | PDF via Google Drive — ver §PDFs |
| `video` | Não | YouTube ou Vimeo — ver §Vídeos |
| `videoLast` | Não | `true` = vídeo aparece após o texto. `false` (padrão) = aparece antes |
| `lang` | Não | Idioma: `pt` (padrão), `en` ou `es` |
| `draft` | Não | `true` = rascunho invisível em todo o site |
| `externalOnly` | Não | `true` = não cria página interna; link na listagem abre direto o `externalUrl` |
| `hideFromList` | Não | `true` = aparece no grafo mas fica oculto na listagem `/projetos` |

### Tipos válidos (`type`)

| Valor | Quando usar |
|-------|-------------|
| `ensaio` | Texto reflexivo ou crítico de autoria própria |
| `artigo` | Artigo acadêmico ou jornalístico |
| `performance` | Ação, evento ao vivo, intervenção |
| `design` | Peça gráfica, identidade visual, projeto editorial |
| `curadoria` | Seleção e organização de obras ou exposição |
| `colagem` | Obra em colagem (visual ou textual) |
| `ilustracao` | Ilustração ou obra visual |
| `traducao` | Tradução de texto de outro autor |
| `projeto-cultural` | Projeto coletivo, bloco, evento, programa cultural |
| `editorial` | Publicação, zine, livro, catálogo |
| `poesia` | Poema ou prosa poética |

### Tags válidas

Tags conectam os trabalhos no grafo e ativam os filtros da página `/projetos`. Use apenas as tags abaixo:

| Tag | O que representa | Categoria no grafo |
|-----|-----------------|-------------------|
| `judaico` | Cultura, história e espaços judaicos | Estudos judaicos |
| `diaspora` | Identidade e deslocamento diaspórico | Diáspora |
| `literatura` | Escrita literária e crítica literária | Literatura |
| `curadoria` | Práticas curatoriais | Curadoria |
| `arte` | Cultura material e artes visuais | Cultura material |
| `urbano` | Espaço urbano, cidade, arquitetura | Estudos urbanos |
| `design` | Design gráfico e editorial | Design gráfico |
| `cultural` | Projetos e produções culturais | Projetos culturais |
| `performance` | Performance e artes ao vivo | Performance |
| `editorial` | Publicações e projetos editoriais | Editorial |
| `ensaio` | Formato: escrita ensaística | — |
| `artigo` | Formato: artigo | — |
| `colagem` | Formato: colagem | — |
| `ilustracao` | Formato: ilustração | — |
| `traducao` | Formato: tradução | — |

**Atenção:** `diaspora` e `ilustracao` são escritos **sem acento** — é a convenção interna. Tags fora desta lista não ativam hub nem filtro.

### 3. Escrever o conteúdo

Abaixo do segundo `---`, escreva em Markdown:

```markdown
---
(metadados)
---

Primeiro parágrafo.

**Negrito**, *itálico*, [links](https://exemplo.com).

**Nome em destaque** · outra informação · mais uma
```

Se o trabalho é só um link externo, PDF ou vídeo, deixe o conteúdo vazio — a página usa o `description` e exibe o botão de acesso.

### Imagens

Salve na pasta `public/images/trabalhos/` e referencie assim:

```yaml
image: "/images/trabalhos/nome-do-arquivo.jpg"
```

Formatos aceitos: `.jpg`, `.png`, `.webp`.

### PDFs

Use o link de compartilhamento do Google Drive (formato `/view`):

```yaml
pdf: "https://drive.google.com/file/d/SEU_ID_AQUI/view?usp=drive_link"
```

O site converte automaticamente para embed. Não use links `/export` — use sempre `/view`.

### Vídeos

Cole a URL normal do YouTube ou Vimeo:

```yaml
video: "https://www.youtube.com/watch?v=ID"
video: "https://vimeo.com/123456789"
```

Para o vídeo aparecer depois do texto, adicione `videoLast: true`.

### 4. Publicar

Faça push para o repositório. O Vercel detecta a mudança e publica automaticamente em alguns minutos.

Para testar localmente antes de publicar: use `draft: true` e rode `npm run dev`.

---

## Como Editar um Trabalho Existente

Abra o arquivo `.md` correspondente em `src/content/trabalhos/` e edite diretamente. Qualquer alteração de metadados ou texto é publicada no próximo push.

Para encontrar o arquivo de um trabalho, basta olhar a URL da página: `/trabalhos/bloco-klezmer` → arquivo `bloco-klezmer.md`.

---

## Como Editar as Páginas Fixas

As páginas fixas do site são arquivos `.astro` em `src/pages/`. Você edita o conteúdo diretamente no HTML — não há CMS.

| Página | Arquivo |
|--------|---------|
| Sobre (PT) | `src/pages/sobre.astro` |
| About (EN) | `src/pages/about.astro` |
| Currículo (PT) | `src/pages/curriculo.astro` |
| CV (EN) | `src/pages/cv.astro` |

### Onde encontrar cada bloco de conteúdo

Os arquivos são longos, mas organizados com comentários HTML que funcionam como âncoras. Para localizar rapidamente um trecho, procure pelo comentário da seção:

```html
<!-- ─── Nome da seção ─── -->
```

No currículo/CV, os blocos seguem este padrão:

```html
<div class="cv-entry">
    <span class="cv-year">2025–present</span>
    <div class="cv-entry-body">
        <p class="cv-entry-main">Cargo ou atividade</p>
        <p class="cv-entry-sub">Instituição ou contexto</p>
    </div>
</div>
```

Para **adicionar uma entrada**, copie um bloco `cv-entry` existente e edite o conteúdo. Para **remover**, apague o bloco inteiro entre `<div class="cv-entry">` e o `</div>` correspondente.

### Adicionar ou remover um link

Para adicionar um link dentro do texto:
```html
<a href="https://endereco.com" target="_blank" rel="noopener noreferrer">Texto do link</a>
```

Para remover um link mas manter o texto, substitua a tag `<a>` pelo texto puro:
```html
<!-- antes -->
<a href="https://casadopovo.org.br/">Casa do Povo</a>

<!-- depois -->
Casa do Povo
```

---

## Como Adicionar um Novo Tipo de Trabalho

O campo `type` é validado pelo schema. Para aceitar um novo valor:

1. Abra `src/content.config.ts`
2. Localize o `z.enum([...])` do campo `type`
3. Adicione o novo valor à lista:

```ts
type: z.enum([
    "ensaio",
    "artigo",
    // ... existentes ...
    "novo-tipo",   // ← adicione aqui
]),
```

4. Atualize a tabela de tipos neste README.

Após salvar, o novo tipo já é aceito nos frontmatters dos arquivos `.md`.

---

## Como Adicionar uma Nova Tag / Categoria no Grafo

Tags novas não aparecem automaticamente como hubs (categorias) no grafo e na página `/projetos` — elas precisam ser registradas em dois lugares.

### 1. Registrar na página `/projetos`

Abra `src/pages/projetos.astro` e localize o array `HUBS_DEF`. Adicione um objeto:

```ts
{ id: "hub-nova-tag", label: "Nome da Categoria", matchTags: ["nova-tag"] },
```

### 2. Registrar no grafo

Abra `src/components/GraphView.astro` e localize o array `HUBS`. Adicione um objeto com as coordenadas de posição no grafo:

```ts
{ id: "hub-nova-tag", label: "Nome da Categoria", matchTags: ["nova-tag"], px: 0.5, py: 0.5, pxM: 0.5, pyM: 0.5 },
```

Os valores `px`/`py` são posições relativas (0 a 1) no espaço do grafo — `px: 0.5, py: 0.5` é o centro. `pxM`/`pyM` são as posições equivalentes no mobile.

### 3. Atualizar o README

Adicione a nova tag na tabela "Tags válidas" acima.

---

## Como Renomear uma Categoria (label visível)

O label exibido no grafo e nos filtros da página `/projetos` é independente da tag interna. Para renomear apenas o que o visitante vê:

1. Em `src/components/GraphView.astro`, localize o hub e altere o campo `label`
2. Em `src/pages/projetos.astro`, localize o mesmo hub em `HUBS_DEF` e altere o `label`

Se quiser renomear também o que aparece nas páginas individuais de cada trabalho (na lista de tags abaixo do título), edite o mapeamento em `src/components/TagList.astro`:

```ts
const TAG_LABELS: Record<string, string> = {
    design: "design gráfico",  // tag interna → label exibido
};
```

---

## Grafo de Conhecimento

O grafo é o elemento central do site, alimentado por `public/graph-data.json`.

| Aspecto | Detalhe |
|---------|---------|
| Geração | Automática no build/dev via `src/utils/generateGraphData.ts` |
| Conexão | Dois nós são ligados quando compartilham ≥ 1 tag |
| Modo `full` | Home — drag + zoom habilitados |
| Modo `mini` | Páginas internas — sidebar compacta, nó atual destacado |
| Mobile | `full`: 60vh, interação desabilitada · `mini`: oculto |

Após editar frontmatter de qualquer trabalho, reinicie o dev server (`npm run dev`) para regenerar o grafo.
Para regenerar manualmente sem reiniciar: `npx tsx src/utils/generateGraphData.ts`

---

## Estrutura do Projeto

```
src/
├── components/
│   ├── GraphView.astro        # Visualização D3.js — modos full e mini
│   ├── RelatedItems.astro     # Itens relacionados por tag (páginas internas)
│   └── TagList.astro          # Lista de tags com links de filtro
├── content/
│   └── trabalhos/             # Todos os trabalhos em arquivos .md
├── content.config.ts          # Schema dos dados — fonte da verdade
├── layouts/
│   └── Layout.astro           # Layout base: nav + slot + footer
├── pages/
│   ├── index.astro            # Home: grafo + splash
│   ├── projetos.astro         # Índice de trabalhos com filtro por categoria
│   ├── sobre.astro            # Bio em português
│   ├── about.astro            # Bio em inglês
│   ├── curriculo.astro        # Currículo estruturado (PT)
│   ├── cv.astro               # CV estruturado (EN)
│   └── trabalhos/[slug].astro # Template de trabalho individual
├── styles/
│   └── global.css             # Design tokens (CSS custom properties)
└── utils/
    └── generateGraphData.ts   # Gera graph-data.json a partir dos trabalhos
```

---

## Design System

Definido em `src/styles/global.css` como CSS custom properties.

| Token | Valor | Uso |
|-------|-------|-----|
| `--color-bg` | `#F8F6F1` | Fundo — off-white quente |
| `--color-surface` | `#EDEAE3` | Cards, áreas elevadas |
| `--color-ink` | `#1A1A18` | Texto principal |
| `--color-ink-muted` | `#6B6860` | Metadados, texto secundário |
| `--color-border` | `#D4D0C8` | Divisórias |
| `--color-accent` | `#C0392B` | Terracota — acento único |

**Fontes:** `Guarujá Neue` auto-hospedada em `public/fonts/` · `Instrument Serif` via Google Fonts (itálico/citações).

---

## Deploy

Deploy automático no Vercel a cada push para `main`. Nenhuma variável de ambiente necessária — o site é completamente estático.

```bash
npm run build   # verificar localmente antes de fazer push
```

Domínio configurado em `astro.config.mjs`.
