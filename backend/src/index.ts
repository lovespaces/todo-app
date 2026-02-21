import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

import { tasksTable } from "./db/schema";

const db = drizzle(process.env.DATABASE_URL!);

function parseBool(v: string): boolean | null {
    if (v === "true") return true;
    if (v === "false") return false;

    return null;
}

const app = new Hono()
    .use(cors({
        origin: process.env.FRONTEND_URL!,
    }))
    .get("/db", async (c) => {
        try {
            const tasks = await db.select().from(tasksTable);

            return c.json(tasks, 200);
        } catch (e) {
            return c.json({ message: "DB Error" }, 500);
        }
    })
    .patch("/db/completed/:id",
        zValidator("json", z.object({ is_completed: z.boolean() })),
        async (c) => {
          const id: number = Number(c.req.param("id"));

          if (!id) {
              return c.json({ message: "UNKNOWN PARAM" }, 404);
          }

          try {
              const { is_completed } = c.req.valid("json");

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
