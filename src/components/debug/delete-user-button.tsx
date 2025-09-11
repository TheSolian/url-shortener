'use client';

import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

export const DeleteUserButton = () => {
    const router = useRouter();

    return (
        <Button
            className="cursor-pointer absolute bottom-4 right-4"
            onClick={async () => {
                await authClient.deleteUser();
                router.push('/sign-up');
            }}
        >
            Delete User
        </Button>
    );
};
