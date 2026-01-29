import AuthForm from '@/components/auth/AuthForm';
import Link from 'next/link';

export default function RegisterPage() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-neutral-50">
            <Link href="/" className="mb-12 text-4xl font-black text-neutral-900 uppercase tracking-tighter">
                INMO<span className="text-primary">ALERT</span>
            </Link>
            <AuthForm view="register" />
        </main>
    );
}
