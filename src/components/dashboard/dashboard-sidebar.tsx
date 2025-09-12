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
    SidebarSeparator,
    useSidebar,
} from '@/components/ui/sidebar';
import { authClient } from '@/lib/auth-client';
import { cn } from '@/lib/utils';
import { ArrowLeftIcon, LayoutDashboardIcon, LinkIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const sidebarItems = [
    {
        href: '/dashboard',
        icon: LayoutDashboardIcon,
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
    const { open, setOpenMobile } = useSidebar();
    const pathname = usePathname();

    const session = authClient.useSession();

    const user = session?.data?.user;

    return (
        <Sidebar
            {...props}
            collapsible="icon"
            // className="md:flex md:items-center"
        >
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
                <SidebarSeparator className="mx-0" />
                <SidebarGroup className="py-0">
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <Link href="/">
                                    <ArrowLeftIcon />
                                    Back to home
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroup>
                <SidebarSeparator className="mx-0" />
                <SidebarGroup>
                    <SidebarMenu>
                        {sidebarItems.map((item) => (
                            <SidebarMenuItem key={item.href}>
                                <SidebarMenuButton
                                    asChild
                                    isActive={pathname === item.href}
                                >
                                    <Link
                                        href={item.href}
                                        onClick={() => setOpenMobile(false)}
                                    >
                                        <item.icon />
                                        {item.label}
                                    </Link>
                                </SidebarMenuButton>
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
