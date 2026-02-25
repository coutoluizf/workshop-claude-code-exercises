# PRD: Notes App — Bloco de Notas Moderno

## Contexto
Scaffold Next.js 16 com SQLite local (better-sqlite3).
Lista de notas básica já funcional, sem estilo.
API CRUD pronta em `/api/notes`.

## Objetivo
Transformar o scaffold num bloco de notas moderno com editor Markdown.

## Requisitos
- Editor de notas com preview Markdown lado a lado
- Sidebar com lista de notas (título + data)
- Criar, editar e deletar notas
- Busca por texto no título e conteúdo
- Importar/exportar arquivos .md

## Não-requisitos
- Sem autenticação (app local)
- Sem ORM (SQL direto com better-sqlite3)
- Sem deploy (roda em localhost)
- Não precisa ser mobile-responsive

## Critérios de sucesso
- App funciona no browser em localhost:3000
- Notas persistem no SQLite (sobrevivem restart)
- Import/export de .md funciona
