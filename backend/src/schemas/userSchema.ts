import { z} from "zod";

export const userRegistrationSchema = z.object({
    fullname: z.object({
        firstname: z.string().min(3, 'First name should be at least 3 characters'),
        lastname: z.string().min(3, 'Last name should be at least 3 characters'),
      }),    
    email: z.string().email('Enter a valid email address'),
    password: z
    .string()
    .min(8, 'Password should be at least 8 characters')
    .regex(/[a-zA-Z]/, 'Password must contain at least one letter'),
  socketId: z.string().optional(),
});

export const userLoginSchema = z.object({
  email: z.string().email('Enter a valid email address'),
  password: z
    .string()
    .min(8, 'Password should be atleast 8 charachters')
    .regex(/[a-zA-Z]/, 'Password must conatain at least one letter'),
})

export type UserRegistration = z.infer<typeof userRegistrationSchema>;
export type UserLogin = z.infer<typeof userLoginSchema>;