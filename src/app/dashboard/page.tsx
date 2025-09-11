'use client';

import { LoadingSpinner } from '@/components/loading-spinner';
import { Url } from '@/db/schema/url';
import { authClient } from '@/lib/auth-client';
import { api } from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';

export default function Page() {
    const session = authClient.useSession();

    const { data, isLoading } = useQuery<Url[]>({
        queryKey: ['urls'],
        queryFn: async () => {
            const res = await api.get(`/users/${session.data?.user.id}/urls`);
            return res.data;
        },
        enabled: !!session.data?.user.id,
    });

    return (
        <div>
            {isLoading ? (
                <LoadingSpinner />
            ) : (
                <div className="space-y-4">
                    {data?.map((url) => (
                        <div
                            key={url.id}
                            className="bg-muted p-4 rounded-md max-w-sm"
                        >
                            <div>{url.url}</div>
                            <div>
                                {process.env.NEXT_PUBLIC_APPLICATION_URL}/
                                {url.code}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
