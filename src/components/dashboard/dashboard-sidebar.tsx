'use client';

import { SidebarUser } from '@/components/sidebar-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSkeleton,
    useSidebar,
} from '@/components/ui/sidebar';
import { authClient } from '@/lib/auth-client';
import { cn } from '@/lib/utils';
import { HomeIcon, LinkIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const sidebarItems = [
    {
        href: '/dashboard',
        icon: HomeIcon,
        label: 'Dashboard',
    },
    {
        href: '/dashboard/urls',
        icon: LinkIcon,
        label: 'My URLs',
    },
    // {
    //     href: '/dashboard/statistics',
    //     icon: ChartAreaIcon,
    //     label: 'Statistics',
    // },
];

export const DashboardSidebar = ({
    ...props
}: React.ComponentProps<typeof Sidebar>) => {
    const { open } = useSidebar();
    const pathname = usePathname();

    const session = authClient.useSession();

    const user = session?.data?.user;

    return (
        <Sidebar variant="inset" {...props} collapsible="icon">
            <SidebarHeader>
                <Link href="/">
                    <SidebarMenuButton
                        className={cn('flex items-center gap-2 h-fit', {
                            'justify-center': !open,
                        })}
                    >
                        <LinkIcon />
                        {open ? (
                            <div className="text-2xl font-bold tracking-tight -space-y-3.5">
                                <div>URL</div>
                                <div>Shortener</div>
                            </div>
                        ) : null}
                    </SidebarMenuButton>
                </Link>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        {sidebarItems.map((item) => (
                            <SidebarMenuItem key={item.href}>
                                <Link href={item.href}>
                                    <SidebarMenuButton
                                        className={cn({
                                            'bg-sidebar-accent':
                                                pathname === item.href,
                                        })}
                                    >
                                        <item.icon />
                                        {item.label}
                                    </SidebarMenuButton>
                                </Link>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                {user ? <SidebarUser user={user} /> : <SidebarMenuSkeleton />}
            </SidebarFooter>
        </Sidebar>
    );
};
