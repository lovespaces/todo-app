import { client } from "../lib/client";

export const CompleteTask = async (id: number, toggle: boolean) => {
    const res = await client.db.completed.$patch({
        "json": { id: id, is_completed: toggle }
    });

    if (!res.ok) {
        throw new Error("404");
    }
}
