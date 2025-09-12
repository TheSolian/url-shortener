'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import { User } from 'better-auth';

type Props = {
    user?: User;
};

export const AccountDetailsSection = ({ user }: Props) => {
    if (!user) {
        return <AccountDetailsSkeleton />;
    }

    return (
        <section className="bg-muted/50 rounded-xl p-8 space-y-8">
            <div className="text-lg font-bold">Account Details</div>
            <div className="flex items-center gap-8">
                <Avatar className="size-40">
                    <AvatarImage src={user.image ?? ''} />
                    <AvatarFallback className="text-4xl">
                        {user.name.charAt(0)}
                    </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                    <h1 className="text-4xl font-bold">{user.name}</h1>
                    <p className="text-md text-muted-foreground">
                        {user.email}
                    </p>
                </div>
            </div>
        </section>
    );
};

const AccountDetailsSkeleton = () => {
    return (
        <section className="bg-muted/50 rounded-xl p-8">
            <Skeleton className="w-10 h-10 rounded-full" />
        </section>
    );
};
