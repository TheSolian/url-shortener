'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
    FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useSessionRefresh } from '@/hooks/use-session-refresh';
import { authClient } from '@/lib/auth-client';
import { cn } from '@/lib/utils';
import {
    AccountFormSchema,
    accountFormSchema,
} from '@/schemas/account-form-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export const AccountForm = () => {
    const { session, isPending, refreshSession } = useSessionRefresh();
    const user = session?.user;
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<AccountFormSchema>({
        resolver: zodResolver(accountFormSchema),
        defaultValues: {
            name: user?.name || '',
            email: user?.email || '',
        },
    });

    useEffect(() => {
        if (user) {
            form.reset({
                name: user.name,
                email: user.email,
            });
        }
    }, [user, form]);

    if (isPending || !user) {
        return <div>Loading...</div>;
    }

    const onSubmit = async (values: AccountFormSchema) => {
        if (!user) return;

        setIsLoading(true);

        try {
            if (form.getFieldState('email').isDirty) {
                await authClient.changeEmail({
                    newEmail: values.email,
                });
            }

            if (form.getFieldState('name').isDirty) {
                await authClient.updateUser({
                    name: values.name,
                });
            }

            await refreshSession();
        } catch (error) {
            console.error('Failed to update user:', error);
        } finally {
            setIsLoading(false);
            toast.success('Account details updated!', {
                position: 'top-center',
            });
        }
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                id="account-details-form"
            >
                <FormSection
                    title="Account Details"
                    footer={{
                        enabled: form.formState.isDirty,
                        children: (
                            <>
                                <Button
                                    variant="outline"
                                    className="cursor-pointer"
                                    disabled={isLoading}
                                    onClick={() => form.reset()}
                                >
                                    Reset
                                </Button>
                                <Button
                                    className="min-w-[80px] cursor-pointer"
                                    form="account-details-form"
                                    loading={isLoading}
                                >
                                    Save
                                </Button>
                            </>
                        ),
                    }}
                >
                    <div className="grid grid-cols-[auto_1fr] items-center gap-8">
                        <div className="group relative">
                            <Avatar className="size-50">
                                <AvatarImage
                                    src={
                                        user.image ?? '' // 'https://github.com/shadcn.png'
                                    }
                                />
                                <AvatarFallback className="text-5xl">
                                    {user.name.charAt(0)}
                                </AvatarFallback>
                            </Avatar>
                            {/* <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex transition-all duration-150 rounded-full items-center justify-center cursor-pointer">
                                <CameraIcon className="text-white size-10" />
                            </div> */}
                        </div>
                        <div className="space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                </FormSection>
            </form>
        </Form>
    );
};

const FormSection = ({
    title,
    children,
    footer,
}: {
    title: string;
    children: React.ReactNode;
    footer?: {
        enabled?: boolean;
        props?: React.ComponentProps<typeof CardFooter>;
        children?: React.ReactNode;
    };
}) => {
    return (
        <section className="max-w-5xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg font-bold">{title}</CardTitle>
                </CardHeader>
                <CardContent>{children}</CardContent>
                {footer && (
                    <CardFooter
                        {...footer.props}
                        className={cn(
                            footer.props?.className,
                            'justify-end gap-2 transition-all duration-300 ease-in-out',
                            footer.enabled
                                ? 'opacity-100 translate-y-0 max-h-20'
                                : 'opacity-0 -translate-y-2 max-h-0 overflow-hidden'
                        )}
                    >
                        {footer.children}
                    </CardFooter>
                )}
            </Card>
        </section>
    );
};
