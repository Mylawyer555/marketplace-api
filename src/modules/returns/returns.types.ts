import {z} from "zod";
import { returnSchema } from "./returns.validation";

export type Returns = z.infer<typeof returnSchema>