'use client';

import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';
import { usePathname, useRouter } from 'next/navigation';

type Props = {
    variant: React.ComponentProps<typeof Button>['variant'];
};

export const SignOutButton = ({ variant }: Props) => {
    const pathname = usePathname();
    const router = useRouter();

    return (
        <Button
            variant={variant}
            className="cursor-pointer"
            onClick={async () => {
                await authClient.signOut();
                router.push(pathname !== '/' ? '/sign-in' : '/');
            }}
        >
            Sign Out
        </Button>
    );
};
