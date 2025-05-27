import http from "node:http";
import { randomUUID } from "node:crypto";
import { json } from "./middlewares/json.js";
import { Database } from "./middlewares/database.js";

const database = new Database();

const server = http.createServer(async (request, response) => {
  const { method, url } = request;

  await json(request, response);

  if (method === "GET" && url === "/tasks") {
    const tasks = database.select("tasks");
    return response.end(JSON.stringify(tasks));
  }
  if (method === "POST" && url === "/tasks") {
    const { title, description, completed_at, created_at, updated_at } =
      request.body;
    const tasks = {
      id: randomUUID(),
      title,
      description,
      completed_at,
      created_at,
      updated_at,
    };

    database.insert("tasks", tasks);
    return response.writeHead(201).end();
  }

  return response.writeHead(404).end("Not found");
});

server.listen(3333);
