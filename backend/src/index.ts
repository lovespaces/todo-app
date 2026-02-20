import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
import { eq } from 'drizzle-orm';
import { Hono } from 'hono'

import { tasksTable } from './db/schema';

const db = drizzle(process.env.DATABASE_URL!);
const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
});

app.get('/db/get', async (c) => {
  try {
    const tasks = await db.select().from(tasksTable);

    return c.json(tasks, 201);
  } catch (e) {
    return c.json({ message: 'DB Error' }, 500);
  }
});

app.patch('/db/completed/:id/:bool', async (c) => {
  // id | bool 取得、念のためifで不適切なものははじくように

  try {
    const tasks = await db.select().from(tasksTable);

    if (tasks.length === 0) {
      return c.json({ message: 'NOT FOUND'}, 404);
    }

    return c.json({ message: 'Boolean edited' }, 201);
  } catch (e) {
    return c.json({ message: 'DB Error' }, 500)
  }
});

export default app
