'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { User } from 'better-auth';
import { CameraIcon } from 'lucide-react';

type Props = {
    user?: User;
};

export const AccountDetailsSection = ({ user }: Props) => {
    if (!user) {
        return <AccountDetailsSkeleton />;
    }

    return (
        <section className="bg-muted/50 rounded-xl p-8 space-y-8 max-w-5xl mx-auto">
            <div className="text-lg font-bold">Account Details</div>
            <div className="flex items-center gap-8">
                <div className="group relative">
                    <Avatar className="size-40">
                        <AvatarImage
                            src={user.image ?? 'https://github.com/shadcn.png'}
                        />
                        <AvatarFallback className="text-4xl">
                            {user.name.charAt(0)}
                        </AvatarFallback>
                    </Avatar>
                    <Dialog>
                        <DialogTrigger asChild>
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex transition-all duration-150 rounded-full items-center justify-center cursor-pointer">
                                <CameraIcon className="size-10" />
                            </div>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>
                                    Upload Profile Picture
                                </DialogTitle>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>
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
