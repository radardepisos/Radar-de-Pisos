import Link from 'next/link';
import { ShieldCheck, Zap, Bell, Search } from 'lucide-react';

export default function Hero() {
    return (
        <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-80"></div>
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10 animate-pulse"></div>
            <div className="absolute top-1/2 -left-24 w-72 h-72 bg-accent/5 rounded-full blur-3xl -z-10 animate-pulse delay-700"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-2xl bg-white dark:bg-neutral-800/50 border border-neutral-100 dark:border-neutral-700 text-neutral-900 dark:text-white text-sm font-bold mb-8 shadow-sm backdrop-blur-sm">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    <span>Monitorización 24/7 en directo</span>
                </div>

                <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black text-neutral-900 dark:text-white mb-6 lg:mb-8 leading-[1.1] tracking-tighter">
                    El radar más rápido <br />
                    <span className="premium-gradient bg-clip-text text-transparent">del mercado inmobiliario</span>
                </h1>

                <p className="max-w-3xl mx-auto text-lg sm:text-xl lg:text-2xl text-neutral-600 dark:text-neutral-400 mb-10 lg:mb-12 leading-relaxed px-4 sm:px-0">
                    No pierdas tiempo refrescando portales. Recibe alertas instantáneas en <span className="text-primary font-bold">WhatsApp</span> el mismo segundo que se publica un piso.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-16 lg:mb-20 px-4 sm:px-0">
                    <Link
                        href="/register"
                        className="w-full sm:w-auto px-10 py-5 bg-primary hover:bg-primary-dark text-white rounded-2xl font-black text-xl transition-all shadow-2xl shadow-primary/30 transform hover:-translate-y-1 active:scale-95"
                    >
                        Activar mi radar gratis
                    </Link>
                    <Link
                        href="#features"
                        className="w-full sm:w-auto px-10 py-5 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white rounded-2xl font-bold text-xl transition-all hover:bg-neutral-50 dark:hover:bg-neutral-700 shadow-lg"
                    >
                        Ver demostración
                    </Link>
                </div>

                {/* Trust badges / Features grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    <div className="flex items-center space-x-4 p-6 rounded-3xl bg-white dark:bg-neutral-800/50 border border-neutral-100 dark:border-neutral-700 shadow-sm transition-all hover:shadow-md">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                            <Zap className="w-6 h-6" />
                        </div>
                        <div className="text-left">
                            <h3 className="font-bold text-lg">Velocidad Sniper</h3>
                            <p className="text-sm text-neutral-500">Avisos en menos de 1 min.</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4 p-6 rounded-3xl bg-white dark:bg-neutral-800/50 border border-neutral-100 dark:border-neutral-700 shadow-sm transition-all hover:shadow-md">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                            <Bell className="w-6 h-6" />
                        </div>
                        <div className="text-left">
                            <h3 className="font-bold text-lg">Alertas WhatsApp</h3>
                            <p className="text-sm text-neutral-500">Directo a tu móvil.</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4 p-6 rounded-3xl bg-white dark:bg-neutral-800/50 border border-neutral-100 dark:border-neutral-700 shadow-sm transition-all hover:shadow-md">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        <div className="text-left">
                            <h3 className="font-bold text-lg">Multi-Portal</h3>
                            <p className="text-sm text-neutral-500">Idealista, Fotocasa y más.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
