/**
 * Página principal — lista de notas básica.
 * Funcional mas propositalmente sem estilo elaborado.
 * O aluno vai transformar isso no seu Notes App via PRD + PlanMode.
 */

import db from "@/lib/db";

// Tipo da nota
interface Note {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

// Força renderização dinâmica (lê do SQLite a cada request)
export const dynamic = "force-dynamic";

export default function Home() {
  // Busca todas as notas direto do SQLite (Server Component)
  const notes = db
    .prepare("SELECT * FROM notes ORDER BY updated_at DESC")
    .all() as Note[];

  return (
    <main className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-2">Notes App</h1>
      <p className="text-gray-500 mb-6">
        Scaffold do Módulo 2 — {notes.length} nota{notes.length !== 1 ? "s" : ""}
      </p>

      {/* Lista de notas — simples e sem estilo de propósito */}
      <ul className="space-y-4">
        {notes.map((note) => (
          <li key={note.id} className="border p-4 rounded">
            <h2 className="font-semibold">{note.title}</h2>
            <p className="text-sm text-gray-400 mt-1">
              Atualizado: {new Date(note.updated_at).toLocaleString("pt-BR")}
            </p>
            {/* Mostra as primeiras 100 chars do conteúdo como preview */}
            <p className="text-gray-600 mt-2 text-sm">
              {note.content.slice(0, 100)}
              {note.content.length > 100 ? "..." : ""}
            </p>
          </li>
        ))}
      </ul>

      {/* Lembrete para o aluno */}
      <div className="mt-8 p-4 bg-gray-100 rounded text-sm text-gray-600">
        <p>
          <strong>Próximo passo:</strong> Escreva um PRD em{" "}
          <code className="bg-gray-200 px-1 rounded">docs/prd-notes-app.md</code>{" "}
          descrevendo como você quer que este app seja. Depois use PlanMode para
          Claude construir.
        </p>
      </div>
    </main>
  );
}
