import { sql } from "drizzle-orm";
import {
    integer,
    pgTable,
    varchar,
    boolean,
    timestamp,
} from "drizzle-orm/pg-core";

export const tasksTable = pgTable("tasks", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    title: varchar({ length: 255 }).notNull(),
    isCompleted: boolean().notNull(),
    whenCreated: timestamp().default(sql`now()`),
});
