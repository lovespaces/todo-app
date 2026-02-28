import { client } from "../lib/client";

export const deleteTask = async (ids: number[]) => {
    await client.db.delete.$delete({
        "json": {
            ids: ids
        }
    })
}
