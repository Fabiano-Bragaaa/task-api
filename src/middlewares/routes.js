import { buildRoutePath } from "../utils/build-route-path.js";
import { Database } from "./database.js";
import { randomUUID } from "node:crypto";

const database = new Database();

export const routes = [
  {
    method: "GET",
    path: buildRoutePath("/tasks"),
    handler: (request, response) => {
      const tasks = database.select("tasks");
      return response.end(JSON.stringify(tasks));
    },
  },
  {
    method: "POST",
    path: buildRoutePath("/tasks"),
    handler: (request, response) => {
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
    },
  },
  {
    method: "DELETE",
    path: buildRoutePath("/task/:id"),
    handler: (request, response) => {
      const { id } = request.params;

      database.delete("tasks", id);
      return response.writeHead(204).end();
    },
  },
];
