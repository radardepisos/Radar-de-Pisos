import AuthForm from '@/components/auth/AuthForm';
import Link from 'next/link';

export default function LoginPage() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-neutral-50 dark:bg-neutral-900">
            <Link href="/" className="mb-12 text-3xl font-bold premium-gradient bg-clip-text text-transparent">
                Alquiler Sniper
            </Link>
            <AuthForm view="login" />
        </main>
    );
}
