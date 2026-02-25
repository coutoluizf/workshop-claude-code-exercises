/**
 * API de notas — CRUD básico com SQL direto.
 * GET /api/notes — lista todas as notas
 * POST /api/notes — cria nova nota
 */

import { NextResponse } from "next/server";
import db from "@/lib/db";

// Tipo da nota (usado internamente)
interface Note {
  id: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

// GET — lista todas as notas (ordenadas por última atualização)
export async function GET() {
  const notes = db
    .prepare("SELECT * FROM notes ORDER BY updated_at DESC")
    .all() as Note[];

  return NextResponse.json(notes);
}

// POST — cria nova nota
export async function POST(request: Request) {
  const body = await request.json();
  const title = body.title || "Sem título";
  const content = body.content || "";

  const result = db
    .prepare("INSERT INTO notes (title, content) VALUES (?, ?)")
    .run(title, content);

  const note = db
    .prepare("SELECT * FROM notes WHERE id = ?")
    .get(result.lastInsertRowid) as Note;

  return NextResponse.json(note, { status: 201 });
}
