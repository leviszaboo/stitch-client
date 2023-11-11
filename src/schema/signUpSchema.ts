import * as z from "zod"
 
export const signUpSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address."}),
  password: z.string().min(8, { message: "Password must be at least 8 characters long." }),
  confirmPassword: z.string().min(8, { message: "Password must be at least 8 characters long." })
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirm"], 
});