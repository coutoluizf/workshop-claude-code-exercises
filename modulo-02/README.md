# Módulo 2 — Context Engineering

Scaffold para os exercícios do Módulo 2 do Workshop Claude Code.

## O que é este projeto?

Um **Notes App** mínimo — bloco de notas com Next.js 16 e SQLite local. Funcional mas propositalmente simples. Ao longo da aula, cada aluno vai escrever um PRD e usar PlanMode para que Claude transforme este scaffold no seu próprio Notes App.

## Stack

- **Next.js 16** (App Router)
- **SQLite** via better-sqlite3 (SQL direto, sem ORM)
- **Tailwind CSS**

## Setup

```bash
npm install
npm run dev
```

Abra `http://localhost:3000` — você verá uma lista de notas básica com 3 notas seed.

## Estrutura

```
modulo-02/
├── app/
│   ├── api/notes/          ← API CRUD (GET, POST, PUT, DELETE)
│   ├── layout.tsx          ← Layout raiz
│   └── page.tsx            ← Página principal (lista de notas)
├── lib/
│   └── db.ts               ← SQLite setup + seed data
├── data/
│   └── notes.db            ← Banco SQLite (criado automaticamente)
└── docs/
    └── prd-notes-app.md    ← Seu PRD vai aqui (exercício 1)
```

## Exercícios

Siga as instruções nos slides do workshop:

1. **Escrever o PRD** — Defina como você quer que o Notes App seja
2. **PRD → PlanMode → Build** — Claude constrói o app a partir do seu PRD
3. **Context Explosion** — Compare abordagens de leitura de contexto
4. **Ciclo Completo** — Adicione uma feature nova com PRD → Plan → Execute
5. **Context Handoff** — Pratique handoff entre sessões

## API

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/api/notes` | Lista todas as notas |
| POST | `/api/notes` | Cria nova nota |
| GET | `/api/notes/:id` | Busca nota por ID |
| PUT | `/api/notes/:id` | Atualiza nota |
| DELETE | `/api/notes/:id` | Deleta nota |
