import { client } from "../lib/client";

export const postTask = async (data: { name: string, description: string }) => {
    const res = await client.db.create.$post({
        "json": {
            "name": data.name,
            "description": data.description
        }
    });
    if (!res.ok) {
        throw new Error("404");
    }
}
