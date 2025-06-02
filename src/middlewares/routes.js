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

      if (!title || !description) {
        return response
          .writeHead(400)
          .end("titulo e/ou descrição esta em falta");
      }

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
    method: "PUT",
    path: buildRoutePath("/tasks/:id"),
    handler: (request, response) => {
      const { id } = request.params;

      const task = database.select("tasks").find((task) => task.id === id);

      if (!task) {
        return response.writeHead(404).end("Não existe uma task com esse id");
      }

      const { title, description } = request.body;

      if (!title && !description) {
        return response.writeHead(400).end("titulo e descrição esta em falta");
      }

      database.update("tasks", id, { title, description });

      return response.writeHead(204).end();
    },
  },
  {
    method: "PATCH",
    path: buildRoutePath("/tasks/:id/complete"),
    handler: (request, response) => {
      const { id } = request.params;

      const task = database.select("tasks").find((task) => task.id === id);

      if (!task) {
        return response.writeHead(404).end("Não existe uma task com esse id");
      }

      const isCompleted = !!task.completed_at;

      database.update("tasks", id, {
        completed_at: isCompleted ? null : new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

      return response.writeHead(204).end();
    },
  },
  {
    method: "DELETE",
    path: buildRoutePath("/tasks/:id"),
    handler: (request, response) => {
      const { id } = request.params;

      const task = database.select("tasks").find((task) => task.id === id);

      if (!task) {
        return response.writeHead(404).end("Não existe uma task com esse id");
      }

      database.delete("tasks", id);
      return response.writeHead(204).end();
    },
  },
];
