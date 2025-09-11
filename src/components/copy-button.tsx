'use client';

import { Button } from '@/components/ui/button';
import { CheckIcon, CopyIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

type Props = {
    text: string;
};

export const CopyButton = ({ text }: Props) => {
    const [isCopied, setIsCopied] = useState(false);

    return (
        <Button
            variant="ghost"
            className="cursor-pointer"
            onClick={() => {
                setIsCopied(true);

                navigator.clipboard.writeText(text);
                toast.success('Copied to clipboard', {
                    position: 'top-center',
                });

                setTimeout(() => {
                    setIsCopied(false);
                }, 2000);
            }}
        >
            {isCopied ? <CheckIcon /> : <CopyIcon />}
        </Button>
    );
};
