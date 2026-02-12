import { describe, it, expect, beforeEach } from 'vitest';

/**
 * Testes da Tasks API
 *
 * Alguns testes passam, outros falham intencionalmente.
 * Os alunos devem usar Claude Code para encontrar e corrigir o bug.
 */

// Importa o app para testes diretos
import app from '../src/index';

// Helper para criar requests
function createRequest(path: string, options?: RequestInit) {
  return new Request(`http://localhost${path}`, options);
}

describe('Health Check', () => {
  it('GET /health retorna status ok', async () => {
    const res = await app.fetch(createRequest('/health'));
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.status).toBe('ok');
    expect(data.timestamp).toBeDefined();
  });
});

describe('Tasks API', () => {
  it('GET /tasks retorna lista vazia inicialmente', async () => {
    const res = await app.fetch(createRequest('/tasks'));
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.tasks).toBeDefined();
    expect(data.total).toBeGreaterThanOrEqual(0);
  });

  it('POST /tasks cria tarefa com título válido', async () => {
    const res = await app.fetch(
      createRequest('/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'Aprender Claude Code' }),
      })
    );
    const data = await res.json();

    expect(res.status).toBe(201);
    expect(data.id).toBeDefined();
    expect(data.title).toBe('Aprender Claude Code');
    expect(data.completed).toBe(false);
  });

  it('GET /tasks/:id retorna tarefa criada', async () => {
    // Cria uma tarefa primeiro
    const createRes = await app.fetch(
      createRequest('/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'Tarefa para buscar' }),
      })
    );
    const created = await createRes.json();

    // Busca a tarefa
    const res = await app.fetch(createRequest(`/tasks/${created.id}`));
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.title).toBe('Tarefa para buscar');
  });

  it('GET /tasks/:id retorna 404 para tarefa inexistente', async () => {
    const res = await app.fetch(createRequest('/tasks/999'));

    expect(res.status).toBe(404);
  });

  it('DELETE /tasks/:id deleta tarefa existente', async () => {
    // Cria uma tarefa
    const createRes = await app.fetch(
      createRequest('/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: 'Tarefa para deletar' }),
      })
    );
    const created = await createRes.json();

    // Deleta
    const res = await app.fetch(
      createRequest(`/tasks/${created.id}`, { method: 'DELETE' })
    );
    expect(res.status).toBe(200);

    // Verifica que não existe mais
    const getRes = await app.fetch(createRequest(`/tasks/${created.id}`));
    expect(getRes.status).toBe(404);
  });

  // ==========================================
  // TESTES QUE FALHAM (bug intencional)
  // ==========================================

  it('POST /tasks rejeita tarefa sem título', async () => {
    // Envia body sem campo title
    const res = await app.fetch(
      createRequest('/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      })
    );

    // Deveria retornar 400 (Bad Request), mas o bug faz retornar 201
    expect(res.status).toBe(400);
  });

  it('POST /tasks rejeita tarefa com título vazio', async () => {
    // Envia body com title vazio
    const res = await app.fetch(
      createRequest('/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: '' }),
      })
    );

    // Deveria retornar 400 (Bad Request), mas o bug faz retornar 201
    expect(res.status).toBe(400);
  });
});
