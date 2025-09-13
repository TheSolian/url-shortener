import z from 'zod';

export const accountFormSchema = z.object({
    email: z.email('Invalid email'),
    name: z.string().min(1, 'Name is required'),
    image: z.string().optional(),
});

export type AccountFormSchema = z.infer<typeof accountFormSchema>;
