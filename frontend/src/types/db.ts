import type { AppType } from "@backend/index";
import { hc } from "hono/client";
import type { InferResponseType } from "hono/client";

type client = ReturnType<typeof hc<AppType>>;
export type Dist = InferResponseType<client["db"]["$get"], 200>;
