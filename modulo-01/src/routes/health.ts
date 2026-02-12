/**
 * Health check route
 *
 * Endpoint simples para verificar se a API está rodando.
 */

import { Hono } from 'hono';

export const healthRoutes = new Hono();

// GET /health — retorna status da API
healthRoutes.get('/', (c) => {
  return c.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});
