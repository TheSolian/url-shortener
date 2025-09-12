'use client';

import { ShortenUrlDialog } from '@/components/dialogs/shorten-url-dialog';
import { RefreshButton } from '@/components/refresh-button';
import { urlTableColumns } from '@/components/table-columns/url-table-columns';
import { DataTable } from '@/components/ui/data-table';
import { Url } from '@/db/schema/url';
import { authClient } from '@/lib/auth-client';
import { api } from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';

export default function Page() {
    const session = authClient.useSession();

    const { data, isPending } = useQuery<Url[]>({
        queryKey: ['urls'],
        queryFn: async () => {
            const res = await api.get(`/users/${session?.data?.user.id}/urls`);
            return res.data;
        },
        enabled: !!session?.data?.user.id,
    });

    const tableUrls = data?.map((url) => ({
        ...url,
        shortUrl: `${process.env.NEXT_PUBLIC_APPLICATION_URL}/${url.code}`,
    }));

    return (
        <div className="p-4 space-y-4">
            <div className="flex justify-end gap-2">
                <RefreshButton queryKey={['urls']} />
                <ShortenUrlDialog
                    trigger={{
                        label: {
                            text: 'Shorten new',
                        },
                    }}
                />
            </div>
            <DataTable
                columns={urlTableColumns}
                data={tableUrls ?? []}
                pending={isPending}
            />
        </div>
    );
}
