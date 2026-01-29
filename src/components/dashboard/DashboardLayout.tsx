'use client';

import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const supabase = createClient();
    const router = useRouter();

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push('/');
        router.refresh();
    };

    return (
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white dark:bg-neutral-800 border-r border-neutral-100 dark:border-neutral-700 hidden lg:flex flex-col">
                <div className="p-6">
                    <Link href="/dashboard" className="text-xl font-bold premium-gradient bg-clip-text text-transparent">
                        Alquiler Sniper
                    </Link>
                </div>

                <nav className="flex-1 px-4 space-y-1">
                    <Link href="/dashboard" className="flex items-center px-4 py-3 text-sm font-medium rounded-xl bg-primary/10 text-primary">
                        <span className="mr-3 text-lg">📊</span> Panel Principal
                    </Link>
                    <Link href="/dashboard/preferences" className="flex items-center px-4 py-3 text-sm font-medium rounded-xl text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors">
                        <span className="mr-3 text-lg">🎯</span> Mis Preferencias
                    </Link>
                    <Link href="/dashboard/alerts" className="flex items-center px-4 py-3 text-sm font-medium rounded-xl text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors">
                        <span className="mr-3 text-lg">🔔</span> Historial Alertas
                    </Link>
                    <Link href="/dashboard/billing" className="flex items-center px-4 py-3 text-sm font-medium rounded-xl text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors">
                        <span className="mr-3 text-lg">💳</span> Suscripción
                    </Link>
                </nav>

                <div className="p-4 border-t border-neutral-100 dark:border-neutral-700">
                    <button
                        onClick={handleSignOut}
                        className="w-full flex items-center px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
                    >
                        <span className="mr-3 text-lg">🚪</span> Cerrar Sesión
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-h-screen overflow-y-auto">
                <header className="lg:hidden h-16 bg-white dark:bg-neutral-800 border-b border-neutral-100 dark:border-neutral-700 flex items-center justify-between px-6">
                    <Link href="/dashboard" className="text-xl font-bold premium-gradient bg-clip-text text-transparent">
                        Alquiler Sniper
                    </Link>
                    <button className="text-2xl">☰</button>
                </header>

                <div className="p-6 lg:p-10 max-w-5xl">
                    {children}
                </div>
            </main>
        </div>
    );
}
