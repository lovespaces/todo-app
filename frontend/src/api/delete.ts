import { client } from "../lib/client";

export const deleteTask = async (ids: number[]) => {
    const res = await client.db.delete.$delete({
        "json": {
            ids: ids
        }
    });

    if (!res.ok) {
        throw new Error("404");
    }
}
