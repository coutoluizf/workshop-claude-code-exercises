# Módulo 4 — PRD Reverso & Projeto Desconhecido

Exercícios do Módulo 4 do Workshop Claude Code.

## O conceito

Você foi alocado num projeto que não conhece. Não conhece a stack. Não conhece o código. Só tem Claude Code. E isso basta.

## O projeto: tab-stash

Uma extensão de Chrome open source que permite salvar abas para ler depois.
Você **não precisa** saber como extensões de Chrome funcionam — Claude vai explicar tudo.

## Setup

### 1. Clonar o projeto
```bash
git clone https://github.com/iannuttall/tab-stash.git
cd tab-stash
```

### 2. Instalar e buildar
```bash
npm install
npm run build
```

### 3. Carregar no Chrome
1. Abra `chrome://extensions`
2. Ative o **Developer mode** (toggle no canto superior direito)
3. Clique **Load unpacked**
4. Selecione a pasta `dist/` dentro do tab-stash
5. A extensão aparece na barra do Chrome — clique no ícone para testar

## Exercícios

### Exercício 1: PRD Reverso (20 min)
Claude analisa o codebase inteiro e gera um PRD — objetivo, stack, arquitetura, decisões de design.

Template: `docs/template-prd-reverso.md`

### Exercício 2: Code Review (20 min)
Claude audita a qualidade do código — patterns, bugs, tipagem, erros silenciados.

### Exercício 3: Refactoring (20 min)
Escreva uma spec de refactoring e Claude executa.

Template: `docs/template-spec.md`

### Exercício 4: Feature Nova (20 min)
Cada aluno escolhe uma feature e customiza a extensão para si.

Lista de features sugeridas em `docs/features-sugeridas.md`

## Templates disponíveis

| Arquivo | Para que serve |
|---------|---------------|
| `docs/template-prd-reverso.md` | Exercício 1 — estrutura do PRD reverso |
| `docs/template-spec.md` | Exercícios 3 e 4 — spec de mudança |
| `docs/features-sugeridas.md` | Exercício 4 — ideias de features |
| `docs/claude-md-sugerido.md` | CLAUDE.md para adicionar ao tab-stash |
