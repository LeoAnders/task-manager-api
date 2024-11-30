import fs from 'node:fs';
import { parse } from 'csv-parse';

(async () => {
  const filePath = './tasks.csv';

  const fileStream = fs.createReadStream(filePath).pipe(
    parse({
      columns: true,
      skip_empty_lines: true,
    })
  );

  console.log('Iniciando a leitura do arquivo CSV...');

  for await (const record of fileStream) {
    const { title, description } = record

    await fetch('http://localhost:3333/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
      })
    })

    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  console.log('Leitura do CSV concluída!');
})();