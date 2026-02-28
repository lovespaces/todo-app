import { client } from "../lib/client";
import type { GetDist } from "../types/db";

export const getDatas = async (): Promise<GetDist> => {
    const res = await client.db.$get();
    
    if (!res.ok) {
        throw new Error("failed");
    }

    const data = await res.json();
    return data as unknown as GetDist;
}
