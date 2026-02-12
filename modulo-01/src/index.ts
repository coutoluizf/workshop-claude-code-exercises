/**
 * Módulo 1 — API de Tarefas
 *
 * App Hono com CRUD de tarefas (in-memory).
 * Projeto base para os exercícios do workshop.
 */

import { Hono } from 'hono';
import { tasksRoutes } from './routes/tasks';
import { healthRoutes } from './routes/health';

const app = new Hono();

// Registra rotas
app.route('/health', healthRoutes);
app.route('/tasks', tasksRoutes);

// Rota raiz
app.get('/', (c) => {
  return c.json({
    name: 'Tasks API',
    version: '1.0.0',
    endpoints: ['/health', '/tasks'],
  });
});

export default app;
