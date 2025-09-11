import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { db } from '@/db';
import { urls } from '@/db/schema/url';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export const POST = async (req: NextRequest) => {
    const { url } = await req.json();

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const code = crypto.randomBytes(6).toString('base64url');

    try {
        await db.insert(urls).values({
            id: crypto.randomUUID(),
            code,
            url,
            userId: session.user.id,
        });
    } catch {
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }

    return NextResponse.json({
        url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/${code}`,
    });
};
