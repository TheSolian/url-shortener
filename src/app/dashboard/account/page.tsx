import { AccountDetailsSection } from '@/components/dashboard/account/account-details-section';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export default async function Page() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    return (
        <div className="p-4 space-y-4">
            <AccountDetailsSection user={session?.user} />
        </div>
    );
}
