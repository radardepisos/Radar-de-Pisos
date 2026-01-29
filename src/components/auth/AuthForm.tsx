'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AuthForm({ view }: { view: 'login' | 'register' }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const supabase = createClient();

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (view === 'register') {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        emailRedirectTo: `${window.location.origin}/auth/callback`,
                    },
                });
                if (error) throw error;
                alert('Revisa tu email para confirmar la cuenta');
            } else {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;
                router.push('/dashboard');
                router.refresh();
            }
        } catch (err: any) {
            setError(err.message || 'Ocurrió un error inesperado');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-sm p-8 bg-white dark:bg-neutral-800 rounded-3xl shadow-xl border border-neutral-100 dark:border-neutral-700">
            <h1 className="text-2xl font-bold text-center mb-2">
                {view === 'login' ? 'Bienvenido de nuevo' : 'Crea tu cuenta'}
            </h1>
            <p className="text-neutral-500 text-center text-sm mb-8">
                {view === 'login'
                    ? 'Introduce tus datos para acceder a tu radar.'
                    : 'Empieza a recibir alertas de pisos en tiempo real.'}
            </p>

            <form onSubmit={handleAuth} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                        type="email"
                        required
                        className="w-full px-4 py-2 rounded-xl border border-neutral-200 dark:border-neutral-600 bg-transparent focus:ring-2 focus:ring-primary outline-none"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="ejemplo@email.com"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Contraseña</label>
                    <input
                        type="password"
                        required
                        className="w-full px-4 py-2 rounded-xl border border-neutral-200 dark:border-neutral-600 bg-transparent focus:ring-2 focus:ring-primary outline-none"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                    />
                </div>

                {error && (
                    <div className="p-3 rounded-lg bg-red-50 text-red-600 text-xs border border-red-100">
                        {error}
                    </div>
                )}

                <button
                    disabled={loading}
                    className="w-full py-3 bg-primary hover:bg-primary-dark text-white rounded-xl font-bold transition-all disabled:opacity-50"
                >
                    {loading ? 'Cargando...' : view === 'login' ? 'Entrar' : 'Registrarse'}
                </button>
            </form>

            <div className="mt-8 text-center text-sm">
                {view === 'login' ? (
                    <p>
                        ¿No tienes cuenta?{' '}
                        <Link href="/register" className="text-primary font-bold hover:underline">
                            Regístrate gratis
                        </Link>
                    </p>
                ) : (
                    <p>
                        ¿Ya tienes cuenta?{' '}
                        <Link href="/login" className="text-primary font-bold hover:underline">
                            Inicia sesión
                        </Link>
                    </p>
                )}
            </div>
        </div>
    );
}
