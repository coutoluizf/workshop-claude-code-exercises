# Módulo 3 — MCPs (Model Context Protocol)

Scaffold para os exercícios do Módulo 3 do Workshop Claude Code.

## O que é este projeto?

Um **MCP Server** mínimo — duas ferramentas de texto prontas para usar. Ao longo da aula, cada aluno vai escrever um PRD e usar PlanMode para que Claude evolua este scaffold no seu próprio MCP Server.

## Stack

- **TypeScript** + tsx (roda direto, sem build)
- **@modelcontextprotocol/sdk** — SDK oficial do MCP
- **Zod** — Validação de schemas

## Setup

```bash
npm install
```

## Testar com MCP Inspector

```bash
npm run inspect
```

Abre `http://localhost:6274` — você verá os 2 tools: `contar-palavras` e `gerar-slug`.

## Registrar no Claude Code

```bash
claude mcp add --transport stdio text-tools -- npx tsx $(pwd)/src/index.ts
```

Verifique com `/mcp` dentro do Claude Code.

## Estrutura

```
modulo-03/
├── src/
│   └── index.ts          ← MCP Server (2 tools seed)
├── docs/
│   └── prd-meu-mcp.md   ← Seu PRD vai aqui (exercício 3)
├── package.json
└── tsconfig.json
```

## Tools incluídos

| Tool | O que faz | Exemplo de input |
|------|-----------|-----------------|
| `contar-palavras` | Conta palavras, caracteres e linhas | `"Hello world"` |
| `gerar-slug` | Gera slug URL-friendly de um título | `"Minha Primeira Nota!"` → `minha-primeira-nota` |

## Exercícios

Siga as instruções nos slides do workshop:

1. **Explorar e testar** — Rodar o Inspector, ver os tools, entender a estrutura
2. **Escrever PRD** — Definir que MCP você quer construir
3. **PRD → PlanMode → Build** — Claude evolui o scaffold
4. **Usar no Notes App** — Integrar seu MCP no workflow do Notes App
