'use client';

import { CopyButton } from '@/components/copy-button';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { api } from '@/lib/axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { ArrowRightIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
    url: z.url(),
});

export const ShortenUrlForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [shortenedUrl, setShortenedUrl] = useState<string | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            url: '',
        },
    });

    const { mutate } = useMutation({
        mutationFn: async (data: z.infer<typeof formSchema>) => {
            const res = await api.post('/shorten', data);
            return res.data;
        },
        onSuccess: (data) => {
            setShortenedUrl(data.url);
        },
    });

    const onSubmit = (data: z.infer<typeof formSchema>) => {
        setIsLoading(true);

        mutate(data);

        setIsLoading(false);
    };

    return (
        <Card className="min-w-xl max-w-xl">
            <CardHeader>
                <CardTitle>
                    <h1 className="text-2xl font-bold">Shorten URL</h1>
                </CardTitle>
            </CardHeader>
            <CardContent>
                {!shortenedUrl ? (
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="flex gap-2"
                        >
                            <FormField
                                control={form.control}
                                name="url"
                                render={({ field }) => (
                                    <FormItem className="grow">
                                        <FormControl>
                                            <Input
                                                type="url"
                                                className="grow"
                                                placeholder="https://example.com"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button
                                loading={isLoading}
                                className="cursor-pointer shrink-0 min-w-[120px]"
                            >
                                Shorten <ArrowRightIcon />
                            </Button>
                        </form>
                    </Form>
                ) : (
                    <div className="bg-muted p-4 rounded-md flex items-center">
                        <div className="grow">{shortenedUrl}</div>
                        <CopyButton text={shortenedUrl} />
                    </div>
                )}
            </CardContent>
            {shortenedUrl ? (
                <CardFooter className="justify-center">
                    <Button
                        variant="link"
                        className="cursor-pointer"
                        onClick={() => setShortenedUrl(null)}
                    >
                        Shorten another URL
                    </Button>
                </CardFooter>
            ) : null}
        </Card>
    );
};
