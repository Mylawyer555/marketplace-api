import {z} from "zod";
import { orderStatusSchema } from "./orders.validation";

export type Order_Status = z.infer<typeof orderStatusSchema>;