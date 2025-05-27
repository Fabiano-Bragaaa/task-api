import http from "node:http";

const tasks = [];

const server = http.createServer(async (request, response) => {
  const buffers = [];

  for await (const chunck of request) {
    buffers.push(chunck);
  }

  try {
    request.body = JSON.parse(Buffer.concat(buffers).toString());
  } catch {
    request.body = null;
  }

  const { method, url } = request;

  if (method === "GET" && url === "/tasks") {
    return response
      .setHeader("Content-type", "application/json")
      .end(JSON.stringify(tasks));
  }
  if (method === "POST" && url === "/tasks") {
    const { title, description, completed_at, created_at, updated_at } =
      request.body;
    tasks.push({
      id: 1,
      title,
      description,
      completed_at,
      created_at,
      updated_at,
    });
    return response.writeHead(201).end();
  }

  return response.writeHead(404).end("Not found");
});

server.listen(3333);
