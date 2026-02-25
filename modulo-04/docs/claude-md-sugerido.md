# CLAUDE.md sugerido para o tab-stash

Copie este conteúdo para um arquivo `CLAUDE.md` na raiz do tab-stash clonado.
Isso dá contexto a Claude sobre o projeto e sua intenção.

---

```markdown
# Tab Stash — Chrome Extension

## Sobre
Extensão Chrome (Manifest V3) para salvar abas e ler depois.
Projeto open source: https://github.com/iannuttall/tab-stash

## Stack
- TypeScript + React 18 + Vite (multi-entry build)
- Tailwind CSS + shadcn/ui
- Dexie (IndexedDB wrapper) para persistência local
- Chrome APIs: tabs, storage, sidePanel, commands, runtime

## Arquitetura
- `src/background/` — Service worker: hub central, todas operações de banco
- `src/sidepanel/` — UI principal na sidebar do Chrome
- `src/dashboard/` — Página full-tab com busca, filtros, bulk actions
- `src/popup/` — Quick stash (2 botões)
- `src/options/` — Configurações
- `src/shared/` — DB, messaging, types, utils

## Comunicação
UI → background via `chrome.runtime.sendMessage` (typed protocol em shared/messaging.ts)
Background → UI via broadcast `EVENT_ITEMS_CHANGED`

## Comandos úteis
- `npm run dev` — Dev mode com watch
- `npm run build` — Build para dist/
- `npm run typecheck` — TypeScript check sem emit

## Meu objetivo
Estou aprendendo a trabalhar com codebases desconhecidos usando Claude Code.
Quero entender, avaliar, e evoluir este projeto.
```
