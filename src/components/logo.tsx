import Link from 'next/link';

export const Logo = () => {
    return (
        <Link
            href="/"
            className="text-2xl font-bold tracking-tight -space-y-3.5"
        >
            <div>URL</div>
            <div>Shortener</div>
        </Link>
    );
};
