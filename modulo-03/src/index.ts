#!/usr/bin/env node

/**
 * MCP Server seed — "text-tools"
 *
 * Duas ferramentas simples para demonstrar a estrutura de um MCP Server.
 * Os alunos vão explorar este código, testá-lo com o MCP Inspector,
 * e depois escrever um PRD para que Claude evolua este MCP.
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// Criar instância do servidor MCP
const server = new McpServer({
  name: "text-tools",
  version: "1.0.0",
});

// Tool 1: Contar palavras, caracteres e linhas em um texto
server.tool(
  "contar-palavras",
  "Conta o número de palavras, caracteres e linhas em um texto",
  { texto: z.string().describe("O texto para analisar") },
  async ({ texto }) => {
    const palavras = texto.trim().split(/\s+/).filter(Boolean).length;
    const caracteres = texto.length;
    const linhas = texto.split("\n").length;

    return {
      content: [
        {
          type: "text",
          text: `Palavras: ${palavras}\nCaracteres: ${caracteres}\nLinhas: ${linhas}`,
        },
      ],
    };
  }
);

// Tool 2: Gerar slug URL-friendly a partir de um título
server.tool(
  "gerar-slug",
  "Transforma um título em slug URL-friendly (lowercase, sem acentos, hífens)",
  { titulo: z.string().describe("O título para converter em slug") },
  async ({ titulo }) => {
    // Normalizar: lowercase, remover acentos, substituir espaços por hífens
    const slug = titulo
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Remove diacríticos (acentos)
      .replace(/[^a-z0-9\s-]/g, "") // Remove caracteres especiais
      .replace(/\s+/g, "-") // Espaços viram hífens
      .replace(/-+/g, "-") // Múltiplos hífens viram um
      .trim();

    return {
      content: [{ type: "text", text: slug }],
    };
  }
);

// Conectar via stdio transport (comunicação com Claude Code)
const transport = new StdioServerTransport();
await server.connect(transport);
