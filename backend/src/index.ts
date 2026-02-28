import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { eq, inArray } from "drizzle-orm";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

import { tasksTable } from "./db/schema";

const db = drizzle(process.env.DATABASE_URL!);

const app = new Hono()
    .use(cors({
        origin: process.env.FRONTEND_URL!,
    }))
    .get("/db", async (c) => {
        try {
            const tasks = await db.select().from(tasksTable).orderBy(tasksTable.id);

            return c.json(tasks, 200);
        } catch (e) {
            return c.json({ message: "DB Error" }, 500);
        }
    })
    .post("/db/create",
        zValidator("json", z.object({ name: z.string(), description: z.string()
      })), async (c) => {
        try {
            const { name, description } = c.req.valid("json");

            const task: typeof tasksTable.$inferInsert = {
                name: name,
                description: description,
                is_completed: false
            }

            await db.insert(tasksTable).values(task);

            return c.json({ message: "Added" }, 200);
        } catch (e) {
            return c.json({ message: "Error" }, 500);
        }
    })
    .delete("/db/delete",
        zValidator("json", z.object({ ids: z.array(z.number()) })),
        async (c) => {
            try {
                const { ids } = c.req.valid("json");
                
                await db.delete(tasksTable).where(inArray(tasksTable.id, ids))

                return c.json({ message: "Deleted" }, 200);
            } catch (e) {
                return c.json({ message: "Error" }, 500);
            }
        }
    )
    .patch("/db/completed",
        zValidator("json", z.object({ id: z.int(), is_completed: z.boolean() })),
        async (c) => {
          try {
              const { id, is_completed } = c.req.valid("json");

              await db
                  .update(tasksTable)
                  .set({ is_completed: is_completed })
                  .where(eq(tasksTable.id, id));

              return c.json({ message: "Done" }, 200);
          } catch (e) {
              return c.json({ message: "DB Error" }, 500);
          }
    });

export type AppType = typeof app;
export default app;
