import type { AppType } from "@backend/index";
import { hc } from "hono/client";

export const client = hc<AppType>(import.meta.env.VITE_API_URL);
