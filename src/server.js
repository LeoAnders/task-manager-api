import http from 'http'
import { json } from './middleware/json.js';
import { Database } from "./database.js";
import { randomUUID } from 'node:crypto'

const database = new Database

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res)

  if (method === 'GET' && url === '/tasks') {
    const tasks = database.select('tasks')

    return res
      .setHeader('Content-type', 'application/json')
      .end(JSON.stringify(tasks))
  }

  if (method === 'POST' && url === '/tasks') {
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
  }

  return res.writeHead(404).end()
})

server.listen(3333)