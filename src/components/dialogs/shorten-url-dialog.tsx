'use client';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { api } from '@/lib/axios';
import { cn } from '@/lib/utils';
import {
    ShortenUrlSchema,
    shortenUrlSchema,
} from '@/schemas/shorten-url-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PlusIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

type Props = {
    trigger?: {
        label?: {
            icon?: React.ReactNode;
            text?: string;
        };
        props?: React.ComponentProps<typeof Button>;
    };
};

export const ShortenUrlDialog = ({ trigger }: Props) => {
    const [open, setOpen] = useState(false);

    const queryClient = useQueryClient();

    const form = useForm<ShortenUrlSchema>({
        resolver: zodResolver(shortenUrlSchema),
        defaultValues: {
            url: '',
        },
    });

    const { mutate, isPending } = useMutation({
        mutationFn: async (data: ShortenUrlSchema) => {
            const res = await api.post('/shorten', data);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['urls'] });
            form.reset();
            setOpen(false);
            toast.success('URL shortened', {
                position: 'top-center',
            });
        },
    });

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    {...trigger?.props}
                    className={cn(trigger?.props?.className, 'cursor-pointer')}
                >
                    <div className="flex items-center gap-2">
                        {trigger?.label?.icon ?? <PlusIcon />}
                        {trigger?.label?.text ?? 'Shorten URL'}
                    </div>
                </Button>
            </DialogTrigger>
            <DialogContent className="flex flex-col gap-8">
                <DialogHeader>
                    <DialogTitle>
                        {trigger?.label?.text ?? 'Shorten URL'}
                    </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(() =>
                            mutate(form.getValues())
                        )}
                        className="space-y-4"
                    >
                        <FormField
                            control={form.control}
                            name="url"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>URL</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="https://example.com"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button
                                type="button"
                                variant="secondary"
                                className="cursor-pointer min-w-20"
                                onClick={() => {
                                    form.reset();
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                className="cursor-pointer min-w-20"
                                loading={isPending}
                            >
                                Shorten
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};
