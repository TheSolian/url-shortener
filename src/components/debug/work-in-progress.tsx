import { ConstructionIcon } from 'lucide-react';

export const WorkInProgress = () => {
    return (
        <div className="flex flex-col gap-4 items-center justify-center pt-16">
            <ConstructionIcon className="size-20 text-yellow-500" />
            <h1 className="text-4xl md:text-5xl font-bold">Work in Progress</h1>
            <p className="text-sm md:text-md text-muted-foreground">
                This feature is currently under development.
            </p>
        </div>
    );
};
