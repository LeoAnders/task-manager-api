# Task Manager API

Uma API para gerenciamento de tarefas com funcionalidades de CRUD e importação em massa por arquivo CSV.  

## Funcionalidades

A API permite realizar operações CRUD em tarefas, além de importar tarefas em massa por meio de um arquivo CSV. As funcionalidades incluem:

- Criação de uma task.
- Listagem de todas as tasks.
- Atualização de uma task pelo `id`.
- Marcar uma task como completa ou incompleta pelo `id`.
- Importação de tasks em massa a partir de um arquivo CSV.

---

## Estrutura da Task

Cada task possui os seguintes campos:

- **id**: Identificador único da tarefa (gerado automaticamente).
- **title**: Título da tarefa.
- **description**: Descrição detalhada da tarefa.
- **completed_at**: Data de conclusão da tarefa (inicialmente `null`).
- **created_at**: Data de criação da tarefa (gerado automaticamente).
- **updated_at**: Data da última atualização da tarefa (gerado automaticamente).

---

## Rotas da API

`POST - /tasks`
- Cria uma nova tarefa.
- Campos no `body` da requisição:
  - `title` (obrigatório)
  - `description` (obrigatório)
- Os campos `id`, `created_at`, `updated_at` e `completed_at` são gerados automaticamente.

---

`GET - /tasks`
- Retorna a lista de todas as tarefas.
- Suporte a busca com filtros:
  - `title`
  - `description`

---
`PUT - /tasks/:id`
- Atualiza uma tarefa pelo seu `id`.
- Campos no `
- body` da requisição:
  - `title` (opcional)
  - `description` (opcional)
- Valida se o `id` existe antes de atualizar.

---

`DELETE - /tasks/:id`
- Remove uma tarefa pelo seu `id`.
- Valida se o `id` existe antes de remover.

---

`PATCH - /tasks/:id/complete`
- Marca uma tarefa como completa ou reverte para incompleta.
- Valida se o `id` existe antes de atualizar.

---

## Importação de Tasks em Massa

A importação em massa utiliza arquivos CSV com o seguinte formato:

```csv
title,description
Task 01,Descrição da Task 01
Task 02,Descrição da Task 02
Task 03,Descrição da Task 03
Task 04,Descrição da Task 04
Task 05,Descrição da Task 05
