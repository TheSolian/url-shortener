import z from 'zod';

export const shortenUrlSchema = z.object({
    url: z.url(),
});

export type ShortenUrlSchema = z.infer<typeof shortenUrlSchema>;
