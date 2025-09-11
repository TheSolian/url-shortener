import { Logo } from '@/components/logo';
import { SignOutButton } from '@/components/sign-out-button';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export const AppHeader = () => {
    return (
        <div className="sticky h-16 bg-white opacity-80 border-b flex items-center justify-between px-8">
            <Logo />
            <div>
                <SignOutButton variant="link" />
                <Link
                    href="/dashboard"
                    className={cn(buttonVariants({ variant: 'link' }))}
                >
                    Dashboard
                </Link>
            </div>
        </div>
    );
};
