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
        <div className="w-full max-w-sm p-10 bg-white rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-neutral-100">
            <h1 className="text-3xl font-black text-neutral-900 text-center mb-2 tracking-tight">
                {view === 'login' ? 'Bienvenido' : 'Crea tu cuenta'}
            </h1>
            <p className="text-neutral-500 text-center text-sm font-bold mb-10">
                {view === 'login'
                    ? 'Introduce tus datos para acceder.'
                    : 'Recibe alertas de inversión en tiempo real.'}
            </p>

            <form onSubmit={handleAuth} className="space-y-6">
                <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-neutral-400 mb-2">Email</label>
                    <input
                        type="email"
                        required
                        className="w-full px-5 py-3 rounded-2xl border border-neutral-200 bg-neutral-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-bold text-neutral-900 placeholder:text-neutral-300"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="ejemplo@email.com"
                    />
                </div>
                <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-neutral-400 mb-2">Contraseña</label>
                    <input
                        type="password"
                        required
                        className="w-full px-5 py-3 rounded-2xl border border-neutral-200 bg-neutral-50 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-bold text-neutral-900 placeholder:text-neutral-300"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                    />
                </div>

                {error && (
                    <div className="p-4 rounded-2xl bg-red-50 text-red-600 text-xs font-bold border border-red-100">
                        {error}
                    </div>
                )}

                <button
                    disabled={loading}
                    className="w-full py-4 bg-primary hover:bg-primary-dark text-white rounded-2xl font-black text-lg transition-all shadow-xl shadow-primary/25 disabled:opacity-50 transform active:scale-95"
                >
                    {loading ? 'Cargando...' : view === 'login' ? 'Entrar ahora' : 'Registrarse'}
                </button>
            </form>

            <div className="mt-10 text-center text-sm font-bold text-neutral-500">
                {view === 'login' ? (
                    <p>
                        ¿No tienes cuenta?{' '}
                        <Link href="/register" className="text-primary font-black hover:underline underline-offset-4">
                            Regístrate gratis
                        </Link>
                    </p>
                ) : (
                    <p>
                        ¿Ya tienes cuenta?{' '}
                        <Link href="/login" className="text-primary font-black hover:underline underline-offset-4">
                            Inicia sesión
                        </Link>
                    </p>
                )}
            </div>
        </div>
    );
}
