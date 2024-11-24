import http from 'http'

const task = []

const server = http.createServer((req, res) => {
  const { method, url } = req;

  if (method === 'GET' && url === '/tasks') {
    return res
      .setHeader('Content-type', 'application/json')
      .end(JSON.stringify(task))
  }

  if (method === 'PUT' && url === '/tasks') {
    task.push(
      {
        "id": 1,
        "title": "Finalizar relatório semanal",
        "description": "Concluir e enviar o relatório semanal de desempenho para o gerente.",
        "completed_at": null,
        "created_at": "2024-11-01T10:00:00Z",
        "updated_at": "2024-11-01T10:00:00Z"
      },
      {
        "id": 2,
        "title": "Atualizar site da empresa",
        "description": "Revisar as informações da página inicial e atualizar imagens.",
        "completed_at": null,
        "created_at": "2024-11-15T14:30:00Z",
        "updated_at": "2024-11-18T09:00:00Z"
      }
    )

    return res.writeHead(201).end()
  }

  return res.writeHead(404).end()
})

server.listen(3333)