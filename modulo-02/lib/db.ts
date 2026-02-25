/**
 * SQLite database setup — better-sqlite3 direto, sem ORM.
 * O banco fica em ./data/notes.db (criado automaticamente).
 */

import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

// Garante que o diretório data/ existe
const dataDir = path.join(process.cwd(), "data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, "notes.db");
const db = new Database(dbPath);

// WAL mode para melhor performance em dev
db.pragma("journal_mode = WAL");

// Cria a tabela se não existir
db.exec(`
  CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL DEFAULT 'Sem título',
    content TEXT NOT NULL DEFAULT '',
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
  )
`);

// Seed: insere notas iniciais se a tabela estiver vazia
const count = db.prepare("SELECT COUNT(*) as count FROM notes").get() as { count: number };
if (count.count === 0) {
  const insert = db.prepare("INSERT INTO notes (title, content) VALUES (?, ?)");

  insert.run(
    "Bem-vindo ao Notes App",
    "# Bem-vindo! 👋\n\nEste é o seu **Notes App** — um bloco de notas local com Markdown.\n\n## O que você pode fazer\n- Criar e editar notas\n- Escrever em Markdown\n- As notas ficam salvas no SQLite local\n\n## Stack\n- Next.js 16 (App Router)\n- SQLite via better-sqlite3\n- Tailwind CSS\n\n> Este scaffold é o ponto de partida. O PRD que você escrever define o que o app vai se tornar."
  );

  insert.run(
    "Exemplo de Markdown",
    "# Título\n\n## Subtítulo\n\nTexto normal com **negrito** e *itálico*.\n\n### Lista\n- Item 1\n- Item 2\n- Item 3\n\n### Código\n```javascript\nconst hello = 'world';\nconsole.log(hello);\n```\n\n### Citação\n> Markdown é simples e poderoso."
  );

  insert.run(
    "Ideias para o PRD",
    "## Features que eu poderia pedir no PRD\n\n- [ ] Editor com preview Markdown lado a lado\n- [ ] Sidebar com lista de notas\n- [ ] Busca por texto\n- [ ] Import/export de arquivos .md\n- [ ] Tags ou categorias\n- [ ] Dark mode\n- [ ] Atalhos de teclado\n\nLembre: o PRD deve ter **10-20 linhas**. Escolha o que importa pra você."
  );
}

export default db;
