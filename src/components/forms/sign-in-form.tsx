'use client';

import { Button, buttonVariants } from '@/components/ui/button';
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
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { authClient } from '@/lib/auth-client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { SocialSignIn } from '../social-sign-in';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const formSchema = z.object({
    email: z.email('Invalidate Email'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const SignInForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setIsLoading(true);

        const res = await authClient.signIn.email({
            email: data.email,
            password: data.password,
        });

        if (res.error) {
            console.log(res.error);
            setIsLoading(false);
            return;
        }

        setIsLoading(false);

        router.push('/');
    };

    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle>
                    <h1 className="text-2xl font-bold">URL Shortener</h1>
                </CardTitle>
                <h2 className="text-muted-foreground">Create an account</h2>
            </CardHeader>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                    id="sign-up-form"
                >
                    <CardContent className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="example@example.com"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="password"
                                            placeholder="********"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                </form>
                <CardFooter className="flex flex-col gap-4">
                    <div className="flex w-full">
                        <Button
                            className="grow cursor-pointer"
                            form="sign-up-form"
                            loading={isLoading}
                        >
                            Sign In
                        </Button>
                    </div>
                    <Link
                        href="/sign-up"
                        className={cn(buttonVariants({ variant: 'link' }))}
                    >
                        Don&apos;t have an account? Sign Up
                    </Link>
                    <div className="flex items-center gap-4 w-full ">
                        <Separator className="shrink bg-gray-300" />
                        <div>Or</div>
                        <Separator className="shrink bg-gray-300" />
                    </div>
                    <SocialSignIn />
                </CardFooter>
            </Form>
        </Card>
    );
};
