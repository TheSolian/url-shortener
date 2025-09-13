import { authClient } from '@/lib/auth-client';
import { useCallback } from 'react';

export const useSessionRefresh = () => {
    const session = authClient.useSession();

    const refreshSession = useCallback(async () => {
        try {
            await authClient.getSession();
        } catch (error) {
            console.error('Failed to refresh session:', error);
        }
    }, []);

    return {
        session: session.data,
        isPending: session.isPending,
        refreshSession,
    };
};
