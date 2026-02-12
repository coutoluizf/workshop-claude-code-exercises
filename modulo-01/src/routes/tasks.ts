/**
 * Tasks CRUD routes
 *
 * API de tarefas com armazenamento in-memory.
 *
 * BUG INTENCIONAL: POST /tasks não valida se o campo "title"
 * está presente ou vazio. Isso permite criar tarefas sem título,
 * o que quebra a listagem e causa problemas downstream.
 *
 * Os alunos devem encontrar e corrigir este bug durante o exercício.
 */

import { Hono } from 'hono';

// Tipo de uma tarefa
interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

// Storage in-memory (reseta a cada deploy)
const tasks: Map<string, Task> = new Map();

// Contador para IDs sequenciais
let nextId = 1;

export const tasksRoutes = new Hono();

// GET /tasks — lista todas as tarefas
tasksRoutes.get('/', (c) => {
  const allTasks = Array.from(tasks.values());
  return c.json({ tasks: allTasks, total: allTasks.length });
});

// GET /tasks/:id — busca tarefa por ID
tasksRoutes.get('/:id', (c) => {
  const id = c.req.param('id');
  const task = tasks.get(id);

  if (!task) {
    return c.json({ error: 'Tarefa não encontrada' }, 404);
  }

  return c.json(task);
});

// POST /tasks — cria nova tarefa
// BUG: não valida se title está presente ou é string vazia
tasksRoutes.post('/', async (c) => {
  const body = await c.req.json();

  const id = String(nextId++);
  const task: Task = {
    id,
    title: body.title, // BUG: pode ser undefined ou ""
    completed: false,
    createdAt: new Date().toISOString(),
  };

  tasks.set(id, task);

  return c.json(task, 201);
});

// DELETE /tasks/:id — deleta tarefa
tasksRoutes.delete('/:id', (c) => {
  const id = c.req.param('id');

  if (!tasks.has(id)) {
    return c.json({ error: 'Tarefa não encontrada' }, 404);
  }

  tasks.delete(id);
  return c.json({ deleted: true });
});
