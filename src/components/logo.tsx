import { LinkIcon } from 'lucide-react';
import Link from 'next/link';

export const Logo = () => {
    return (
        <Link href="/" className="flex items-center gap-2">
            <LinkIcon />
            <div className="text-2xl font-bold tracking-tight -space-y-3.5">
                <div>URL</div>
                <div>Shortener</div>
            </div>
        </Link>
    );
};
