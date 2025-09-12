import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { haveIBeenPwned } from 'better-auth/plugins';
import { admin } from 'better-auth/plugins';
import { passkey } from 'better-auth/plugins/passkey';
import { db } from '@/db';
import * as schema from '@/db/schema/auth';

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: 'pg',
        schema,
    }),
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: false,
    },
    socialProviders: {
        github: {
            enabled: true,
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        },
    },
    user: {
        deleteUser: {
            enabled: true,
        },
    },
    plugins: [
        haveIBeenPwned(),
        passkey({
            rpID: 'localhost',
            rpName: 'Localhost',
            origin: 'https://localhost:3000',
        }),
        admin(),
    ],
});
