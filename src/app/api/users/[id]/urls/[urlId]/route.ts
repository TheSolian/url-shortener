import { db } from '@/db';
import { urls } from '@/db/schema/url';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export const DELETE = async (
    req: NextRequest,
    context: { params: Promise<{ urlId: string }> }
) => {
    const { urlId } = await context.params;

    try {
        const res = await db.delete(urls).where(eq(urls.id, urlId));

        if (res.rowCount === 0) {
            return NextResponse.json(
                { error: 'URL not found' },
                { status: 404 }
            );
        }
    } catch {
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }

    return NextResponse.json({ message: 'URL deleted' }, { status: 200 });
};
