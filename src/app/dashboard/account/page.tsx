'use client';

import { AccountForm } from '@/components/forms/account-form';
import { LoadingSpinner } from '@/components/loading-spinner';
import { authClient } from '@/lib/auth-client';

export default function Page() {
    const session = authClient.useSession();

    if (session.isPending) {
        return <LoadingSpinner className="fill-accent-foreground" />;
    }

    if (!session.data?.user) {
        return <LoadingSpinner className="fill-accent-foreground" />;
    }

    return (
        <div className="p-4 space-y-4">
            {/* <AccountDetailsSection user={session.data.user} /> */}
            <AccountForm />
        </div>
    );
}
