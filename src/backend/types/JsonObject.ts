import { JsonArray } from "./JsonArray";

export interface JsonObject {
    [key: string]: string | number | boolean | null | JsonObject | JsonArray;
}