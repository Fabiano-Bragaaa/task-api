import { parse } from "csv-parse";
import fs from "node:fs";

const csvFilePath = new URL("../../tasks.csv", import.meta.url);

const parser = fs
  .createReadStream(csvFilePath)
  .pipe(parse({ columns: true, trim: true }));

const API_URL = "http:localhost:3333/tasks";

(async () => {
  for await (const recored of parser) {
    const { title, description } = recored;
    try {
      const now = new Date().toISOString();

      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          created_at: now,
          updated_at: now,
          completed_at: null,
        }),
      });
    } catch (err) {
      console.error(` Falha na requisição para "${title}":`, err.message);
    }
  }

  console.log("Importação concluída!");
})();
