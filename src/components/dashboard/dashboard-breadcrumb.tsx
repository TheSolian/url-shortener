'use client';

import React from 'react';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { usePathname } from 'next/navigation';

export const DashboardBreadcrumb = () => {
    const pathname = usePathname();

    const breadcrumbItems = pathname.split('/').filter((item) => item);
    // .slice(1);

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {breadcrumbItems.map((item, index) => {
                    const href =
                        index === 0
                            ? '/dashboard'
                            : '/dashboard/' +
                              breadcrumbItems.slice(0, index + 1).join('/');
                    const isLast = index === breadcrumbItems.length - 1;

                    return (
                        <React.Fragment key={item}>
                            {index > 0 ? (
                                <BreadcrumbSeparator className="hidden md:block" />
                            ) : null}
                            <BreadcrumbItem>
                                {isLast ? (
                                    <BreadcrumbPage className="capitalize">
                                        {item}
                                    </BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink
                                        href={href}
                                        className="capitalize"
                                    >
                                        {item}
                                    </BreadcrumbLink>
                                )}
                            </BreadcrumbItem>
                        </React.Fragment>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
};
