import { DeleteUserButton } from '@/components/debug/delete-user-button';
import { ShortenUrlForm } from '@/components/forms/shorten-url-form';

export default function Page() {
    return (
        <div className="flex justify-center pt-20">
            <ShortenUrlForm />
            <DeleteUserButton />
        </div>
    );
}
