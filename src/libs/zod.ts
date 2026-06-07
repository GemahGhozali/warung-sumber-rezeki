import * as z from "zod";
import { ErrorFields } from "@/types";

export function formatZodError(error: z.ZodError): ErrorFields {
  const { fieldErrors } = z.flattenError(error);

  // Map fieldErrors into => [fieldName, errorMessage]
  const errors = Object.entries<string[]>(fieldErrors).map(([field, messages]) => [field, messages[0]]);

  // Change mapped fieldErrors into an object => { fieldName: errorMessage }
  return Object.fromEntries(errors);
}
