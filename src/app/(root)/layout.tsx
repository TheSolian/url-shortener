import { AppHeader } from '@/components/header/app-header';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <AppHeader />
            {children}
        </>
    );
}
