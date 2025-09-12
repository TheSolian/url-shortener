'use client';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Url } from '@/db/schema/url';
import { authClient } from '@/lib/auth-client';
import { api } from '@/lib/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import {
    CopyIcon,
    MoreHorizontalIcon,
    SquareArrowOutUpRightIcon,
    Trash2Icon,
} from 'lucide-react';
import { toast } from 'sonner';

type TableUrl = Url & {
    shortUrl: string;
};

export const urlTableColumns: ColumnDef<TableUrl>[] = [
    {
        accessorKey: 'id',
        header: ({ table }) => {
            return (
                <Checkbox
                    checked={
                        table.getIsAllRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && 'indeterminate')
                    }
                    onCheckedChange={(value) =>
                        table.toggleAllPageRowsSelected(!!value)
                    }
                    aria-label="Select all"
                />
            );
        },
        cell: ({ row }) => {
            return (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            );
        },
    },
    {
        accessorKey: 'url',
        header: 'URL',
        cell: ({ row }) => {
            const url = new URL(row.original.url).origin;
            return <div>{url}</div>;
        },
    },
    {
        accessorKey: 'code',
        header: 'Code',
    },
    {
        accessorKey: 'shortUrl',
        header: 'Short URL',
        cell: ({ row }) => {
            return (
                <a
                    href={row.original.shortUrl}
                    target="_blank"
                    className="flex items-center gap-2 hover:underline underline-offset-4"
                >
                    <span>{row.original.shortUrl}</span>
                    <SquareArrowOutUpRightIcon className="size-3" />
                </a>
            );
        },
    },
    {
        accessorKey: 'uses',
        header: 'Uses',
    },
    {
        accessorKey: 'createdAt',
        header: 'Created At',
        cell: ({ row }) => {
            const date = new Date(row.original.createdAt);
            const formatted = new Intl.DateTimeFormat('de-DE', {
                dateStyle: 'short',
            }).format(date);
            return <div>{formatted}</div>;
        },
    },
    {
        id: 'actions',
        header: ({ table }) => {
            const ids = table
                .getSelectedRowModel()
                .rows.map((row) => row.original.id);

            if (
                !table.getIsAllRowsSelected() &&
                !table.getIsSomePageRowsSelected()
            )
                return <></>;

            return <UrlMultipleActions ids={ids} />;
        },
        cell: ({ row, table }) => {
            if (
                table.getIsAllRowsSelected() ||
                table.getIsSomePageRowsSelected()
            )
                return <></>;

            return <UrlRowActions tableUrl={row.original} />;
        },
    },
];

const UrlRowActions = ({ tableUrl }: { tableUrl: TableUrl }) => {
    const queryClient = useQueryClient();
    const queryKey = ['urls'];
    const session = authClient.useSession();

    const { mutate: deleteUrl } = useMutation({
        mutationFn: async () => {
            await api.delete(
                `users/${session?.data?.user.id}/urls/${tableUrl.id}`
            );
        },
        onMutate: async () => {
            await queryClient.cancelQueries({ queryKey });

            const previousUrls = queryClient.getQueryData<TableUrl[]>(queryKey);

            queryClient.setQueryData(
                queryKey,
                (old: TableUrl[]) =>
                    old?.filter((item) => item.id !== tableUrl.id) || []
            );

            return { previousData: previousUrls };
        },
        onError: (error, variables, context) => {
            queryClient.setQueryData(queryKey, context?.previousData);
            toast.error('Failed to delete URL', {
                position: 'top-center',
            });
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey });
            toast.success('URL deleted', {
                position: 'top-center',
            });
        },
    });

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="cursor-pointer">
                    <MoreHorizontalIcon />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem
                    onClick={() => {
                        navigator.clipboard.writeText(tableUrl.shortUrl);
                        toast.success('Copied to clipboard', {
                            position: 'top-center',
                        });
                    }}
                >
                    <CopyIcon />
                    Copy
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => deleteUrl()}>
                    <Trash2Icon />
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

const UrlMultipleActions = ({ ids }: { ids: string[] }) => {
    const queryClient = useQueryClient();
    const queryKey = ['urls'];
    const session = authClient.useSession();

    const { mutate: deleteUrls } = useMutation({
        mutationFn: async () => {
            await api.delete(`users/${session?.data?.user.id}/urls`, {
                data: {
                    ids,
                },
            });
        },
        onMutate: async () => {
            await queryClient.cancelQueries({ queryKey });

            const previousUrls = queryClient.getQueryData<TableUrl[]>(queryKey);

            queryClient.setQueryData(
                queryKey,
                (old: TableUrl[]) =>
                    old?.filter((item) => !ids.includes(item.id)) || []
            );

            return { previousData: previousUrls };
        },
        onError: (error, variables, context) => {
            queryClient.setQueryData(
                queryKey,
                context?.previousData as TableUrl[]
            );
            toast.error('Failed to delete URLs', {
                position: 'top-center',
            });
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey });
            toast.success('URLs deleted', {
                position: 'top-center',
            });
        },
    });

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="cursor-pointer">
                    <MoreHorizontalIcon />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => deleteUrls()}>
                    <Trash2Icon />
                    Delete Selected
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
