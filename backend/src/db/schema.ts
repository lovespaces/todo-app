import { sql } from "drizzle-orm";
import {
    serial,
    pgTable,
    text,
    boolean,
    date,
} from "drizzle-orm/pg-core";

export const tasksTable = pgTable("tasks", {
    id: serial().primaryKey(),
    name: text().notNull(),
    description: text(),
    is_completed: boolean("is_completed").notNull().default(false),
    when_created: date("when_created").notNull().default(sql`CURRENT_DATE`)
});
