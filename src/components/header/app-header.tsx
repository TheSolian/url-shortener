import { Logo } from '@/components/logo';
import { SignOutButton } from '@/components/sign-out-button';
import { buttonVariants } from '@/components/ui/button';
import { auth } from '@/lib/auth';
import { cn } from '@/lib/utils';
import { ArrowRightIcon } from 'lucide-react';
import { headers } from 'next/headers';
import Link from 'next/link';

export const AppHeader = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    return (
        <div className="sticky h-16 bg-white dark:bg-primary-foreground border-b flex items-center justify-between px-8">
            <Logo />
            <div>
                {session ? (
                    <div>
                        <SignOutButton variant="link" />
                        <Link
                            href="/dashboard"
                            className={cn(
                                buttonVariants({ variant: 'default' })
                            )}
                        >
                            Dashboard
                        </Link>
                    </div>
                ) : (
                    <Link
                        href="/sign-in"
                        className={cn(buttonVariants({ variant: 'default' }))}
                    >
                        Sign In
                        <ArrowRightIcon className="w-4 h-4" />
                    </Link>
                )}
            </div>
        </div>
    );
};
