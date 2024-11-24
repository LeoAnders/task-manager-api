import http from 'http'
import { json } from './middleware/json.js';

const task = []

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res)

  if (method === 'GET' && url === '/tasks') {
    return res
      .setHeader('Content-type', 'application/json')
      .end(JSON.stringify(task))
  }

  if (method === 'PUT' && url === '/tasks') {
    const { title, description } = req.body;

    task.push(
      {
        "id": 1,
        "title": title,
        "description": description,
        "completed_at": null,
        "created_at": "2024-11-01T10:00:00Z",
        "updated_at": "2024-11-01T10:00:00Z"
      },
    )

    return res.writeHead(201).end()
  }

  return res.writeHead(404).end()
})

server.listen(3333)