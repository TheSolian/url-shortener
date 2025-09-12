import { db } from '@/db';
import { urls } from '@/db/schema/url';
import { auth } from '@/lib/auth';
import { eq, inArray } from 'drizzle-orm';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) => {
    const { id } = await context.params;

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const result = await db.select().from(urls).where(eq(urls.userId, id));

    return NextResponse.json(result);
};

export const DELETE = async (
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) => {
    const { id } = await context.params;
    const { ids } = (await req.json()) as { ids?: string[] };

    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        let res;
        if (ids) {
            res = await db.delete(urls).where(inArray(urls.id, ids));
        } else {
            res = await db.delete(urls).where(eq(urls.userId, id));
        }

        if (res.rowCount === 0) {
            return NextResponse.json(
                { error: 'No URLs found for user' },
                { status: 404 }
            );
        }
    } catch {
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }

    return NextResponse.json({ message: 'URLs deleted' }, { status: 200 });
};
