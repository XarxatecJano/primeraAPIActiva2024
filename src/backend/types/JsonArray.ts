import { JsonObject } from "./JsonObject";

export type JsonArray = Array<string | number | boolean | null | JsonObject | JsonArray>;