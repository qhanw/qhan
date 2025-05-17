import { object, string } from "zod";

export const signInSchema = object({
  message: string({ required_error: "Message is required" }),
  signature: string({ required_error: "Signature is required" }),
});
