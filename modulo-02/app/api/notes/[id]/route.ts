/**
 * API de nota individual — GET, PUT, DELETE por ID.
 * GET /api/notes/:id — busca nota
 * PUT /api/notes/:id — atualiza nota
 * DELETE /api/notes/:id — deleta nota
 */

import { NextResponse } from "next/server";
import db from "@/lib/db";

// Tipo da nota
interface Note {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

// GET — busca nota por ID
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const note = db.prepare("SELECT * FROM notes WHERE id = ?").get(id) as Note | undefined;

  if (!note) {
    return NextResponse.json({ error: "Nota não encontrada" }, { status: 404 });
  }

  return NextResponse.json(note);
}

// PUT — atualiza nota
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  // Verifica se a nota existe
  const existing = db.prepare("SELECT * FROM notes WHERE id = ?").get(id) as Note | undefined;
  if (!existing) {
    return NextResponse.json({ error: "Nota não encontrada" }, { status: 404 });
  }

  // Atualiza apenas os campos fornecidos
  const title = body.title ?? existing.title;
  const content = body.content ?? existing.content;

  db.prepare(
    "UPDATE notes SET title = ?, content = ?, updated_at = datetime('now') WHERE id = ?"
  ).run(title, content, id);

  const updated = db.prepare("SELECT * FROM notes WHERE id = ?").get(id) as Note;
  return NextResponse.json(updated);
}

// DELETE — deleta nota
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const existing = db.prepare("SELECT * FROM notes WHERE id = ?").get(id) as Note | undefined;

  if (!existing) {
    return NextResponse.json({ error: "Nota não encontrada" }, { status: 404 });
  }

  db.prepare("DELETE FROM notes WHERE id = ?").run(id);
  return NextResponse.json({ deleted: true });
}
