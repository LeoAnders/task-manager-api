import { randomUUID } from 'node:crypto'
import { Database } from "./database.js";
import { buildRoutePath } from './utils/build-route-path.js';

const database = new Database

export const routes = [
  {
    method: "GET",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const tasks = database.select('tasks')

      return res
        .setHeader('Content-type', 'application/json')
        .end(JSON.stringify(tasks))
    }
  },
  {
    method: "POST",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const { title, description } = req.body;

      const task = {
        id: randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: new Date(),
        updated_at: new Date()
      }

      database.insert('tasks', task)

      return res.writeHead(201).end()
    },
  },
  {
    method: 'PUT',
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params
      const { title, description } = req.body;

      if (!title && !description) {
        return res.writeHead(400).end(JSON.stringify({
          error: "Envie pelo menos 'title' ou 'description'."
        }));
      }

      if (title && description) {
        return res.writeHead(400).end(JSON.stringify({
          error: "Envie somente 'title' ou 'description', mas não ambos."
        }));
      }

      const updates = {};
      if (title) updates.title = title;
      if (description) updates.description = description;

      try {
        database.update('tasks', id, updates);
        return res.writeHead(204).end();
      } catch (error) {
        return res.writeHead(404).end(JSON.stringify({
          error: error.message
        }));
      }
    }
  },
  {
    method: 'PATCH',
    path: buildRoutePath('/tasks/:id/complete'),
    handler: (req, res) => {
      const { id } = req.params;

      const tasks = database.select('tasks');
      const task = tasks.find(task => task.id === id);

      if (!task) {
        return res.writeHead(404).end(JSON.stringify({
          error: "Task não encontrada."
        }));
      }

      const updates = {
        completed_at: task.completed_at ? null : new Date(),
        updated_at: new Date()
      };

      try {
        database.update('tasks', id, updates);
        return res.writeHead(204).end();
      } catch (error) {
        return res.writeHead(500).end(JSON.stringify({
          error: "Erro ao atualizar a task."
        }));
      }
    }
  },
  {
    method: "DELETE",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params

      database.delete('tasks', id)

      return res.writeHead(204).end()
    }
  }
]