import { LoadingSpinner } from '@/components/loading-spinner';
import { db } from '@/db';
import { urls } from '@/db/schema/url';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';

export default async function Page(context: {
    params: Promise<{ code: string }>;
}) {
    const { code } = await context.params;

    let isLoading = true;
    let url: string | null = null;

    try {
        const result = await db.select().from(urls).where(eq(urls.code, code));
        url = result[0].url;
        isLoading = false;

        await db
            .update(urls)
            .set({ uses: result[0].uses + 1 })
            .where(eq(urls.id, result[0].id));
    } catch {
        isLoading = false;
    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <LoadingSpinner />
            </div>
        );
    }

    return redirect(url ?? '/');
}
