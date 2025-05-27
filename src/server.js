import http from "node:http";

const tasks = [];

const server = http.createServer((request, response) => {
  const { method, url } = request;

  if (method === "GET" && url === "/tasks") {
    return response
      .setHeader("Content-type", "application/json")
      .end(JSON.stringify(tasks));
  }
  if (method === "POST" && url === "/tasks") {
    tasks.push({
      id: 1,
      title: "ola",
      description: "essa task é nova",
      completed_at: null,
      created_at: "2025-05-25T10:00:00Z",
      updated_at: "2025-05-25T10:00:00Z",
    });
    return response.writeHead(201).end();
  }

  return response.writeHead(404).end("Not found");
});

server.listen(3333);
