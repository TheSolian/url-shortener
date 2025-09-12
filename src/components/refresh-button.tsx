'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useQueryClient } from '@tanstack/react-query';
import { RefreshCwIcon } from 'lucide-react';
import { useState } from 'react';

interface RefreshButtonProps {
    queryKey: unknown[];
    onRefresh?: () => void | Promise<void>;
    disabled?: boolean;
}

export const RefreshButton = ({
    queryKey,
    onRefresh,
    disabled = false,
}: RefreshButtonProps) => {
    const queryClient = useQueryClient();
    const [isRefreshing, setIsRefreshing] = useState(false);

    const handleRefresh = async () => {
        setIsRefreshing(true);
        try {
            await queryClient.invalidateQueries({ queryKey });
            if (onRefresh) {
                await onRefresh();
            }
        } finally {
            setTimeout(() => setIsRefreshing(false), 500);
        }
    };

    return (
        <Button
            onClick={handleRefresh}
            disabled={disabled || isRefreshing}
            variant="outline"
        >
            <RefreshCwIcon
                className={cn({
                    'animate-spin': isRefreshing,
                })}
            />
        </Button>
    );
};
