# Módulo 1 — Fundamentos do Claude Code

Projeto base para os exercícios do Módulo 1 do Workshop Claude Code.

## O que é este projeto?

Uma API REST de tarefas (to-do list) construída com **Hono** rodando em **Cloudflare Workers**. Simples, mas com um bug intencional para você encontrar e corrigir usando Claude Code.

## Setup

```bash
npm install
npm test      # Roda os testes (2 vão falhar — é intencional!)
npm run dev   # Inicia servidor local
```

## Rotas

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/health` | Health check |
| GET | `/tasks` | Lista todas as tarefas |
| POST | `/tasks` | Cria nova tarefa |
| GET | `/tasks/:id` | Busca tarefa por ID |
| DELETE | `/tasks/:id` | Deleta tarefa |

## Exercícios

Siga as instruções nos slides do workshop. Os exercícios usam este projeto como base:

1. **Explorar e encontrar o bug** — Use Claude Code para analisar o projeto
2. **Criar CLAUDE.md** — Configure a memória do projeto
3. **Configurar permissões** — Setup de allowedTools
4. **Criar custom commands** — Skills reutilizáveis
5. **Hook de session history** — Automatizar logging de sessões
