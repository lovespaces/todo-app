import { client } from "../lib/client";

export const CompleteTask = async (id: number, toggle: boolean) => {
    await client.db.completed.$patch({
        "json": { id: id, is_completed: toggle }
    });
}
