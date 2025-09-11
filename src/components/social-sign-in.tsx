'use client';

import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';

export const SocialSignIn = () => {
    const handleSignInWithPasskey = async () => {
        const res = await authClient.signIn.passkey({
            email: 'levin.gsell@bluewin.ch',
            autoFill: true,
        });

        console.log(res);
    };

    return (
        <div className="flex flex-col gap-2 w-full">
            <Button variant="outline" className="grow cursor-pointer">
                Sign In with Github
            </Button>
            <Button
                variant="outline"
                className="grow cursor-pointer"
                onClick={handleSignInWithPasskey}
            >
                Sign In with Passkey
            </Button>
        </div>
    );
};
