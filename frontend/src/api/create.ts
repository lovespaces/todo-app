import { client } from "../lib/client";

export const postTask = async (data: { name: string, description: string }) => {
    await client.db.create.$post({
        "json": {
            "name": data.name,
            "description": data.description
        }
    })
}
