'use client';

import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

type Props = {
    variant: React.ComponentProps<typeof Button>['variant'];
};

export const SignOutButton = ({ variant }: Props) => {
    const router = useRouter();

    return (
        <Button
            variant={variant}
            className="cursor-pointer"
            onClick={async () => {
                await authClient.signOut();
                router.push('/sign-in');
            }}
        >
            Sign Out
        </Button>
    );
};
