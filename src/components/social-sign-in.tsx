'use client';

import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

export const SocialSignIn = () => {
    const router = useRouter();

    const handleSignInWithSocial = async (provider: string) => {
        const { error } = await authClient.signIn.social({
            provider,
        });

        if (error) {
            console.log(error);
            return;
        }

        router.push('/');
    };

    return (
        <div className="flex flex-col gap-2 w-full">
            <Button
                variant="outline"
                className="grow cursor-pointer"
                onClick={() => handleSignInWithSocial('github')}
            >
                Sign In with Github
            </Button>
            {/* <Button
                variant="outline"
                className="grow cursor-pointer"
                onClick={handleSignInWithPasskey}
            >
                Sign In with Passkey
            </Button> */}
        </div>
    );
};
