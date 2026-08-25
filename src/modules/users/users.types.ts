import { z } from "zod";
import { updateProfileSchema } from "./users.validation";

export type UpdateProfile = z.infer<typeof updateProfileSchema>;
