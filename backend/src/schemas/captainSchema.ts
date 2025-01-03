import { z} from "zod";

export const captainRegistrationSchema = z.object({
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
    status: z.string().optional(),
    vehicle: z.object({
      color: z.string().min(3, 'Color should be atleast 3 char'),
      plate: z.string(). min(3, 'Plate should be atleast 3 char'),
      capacity: z.number().min(1, 'Capacity should be atleast 1'),
      vehicleType: z.enum(["car", "motorcycle", "auto"]),
      
    })
}).strict();

