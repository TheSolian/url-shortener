import { DashboardBreadcrumb } from '@/components/dashboard/dashboard-breadcrumb';
import { DashboardSidebar } from '@/components/dashboard/dashboard-sidebar';
import { LoadingSpinner } from '@/components/loading-spinner';
import { Separator } from '@/components/ui/separator';
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from '@/components/ui/sidebar';
import { authClient } from '@/lib/auth-client';

export default async function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await authClient.getSession();

    if (!session) {
        return (
            <div className="flex justify-center items-center h-screen">
                <LoadingSpinner className="fill-accent-foreground" />
            </div>
        );
    }

    return (
        <SidebarProvider>
            <DashboardSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator
                            orientation="vertical"
                            className="mr-2 data-[orientation=vertical]:h-4"
                        />
                        <DashboardBreadcrumb />
                    </div>
                </header>
                <>{children}</>
            </SidebarInset>
        </SidebarProvider>
    );
}
