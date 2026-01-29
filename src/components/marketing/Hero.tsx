import Link from 'next/link';
import { ShieldCheck, Zap, Bell, Search } from 'lucide-react';

export default function Hero() {
    return (
        <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-white">
            {/* Soft Ambient Background Glows */}
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10"></div>
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[100px] -z-10"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="inline-flex items-center space-x-2 px-6 py-2 rounded-2xl bg-primary/5 border border-primary/10 text-primary text-xs font-black tracking-[0.2em] uppercase mb-10">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    <span>Monitoring Real-Time</span>
                </div>

                <h1 className="text-5xl sm:text-7xl lg:text-9xl font-black text-neutral-900 mb-8 leading-[1.05] tracking-tight">
                    El radar de <br />
                    <span className="premium-gradient">inversión definitiva</span>
                </h1>

                <p className="max-w-3xl mx-auto text-xl lg:text-3xl text-neutral-600 mb-12 leading-relaxed px-4 font-bold">
                    No pierdas tiempo refrescando portales. Recibe alertas instantáneas en <span className="text-primary underline decoration-2 underline-offset-4">WhatsApp</span> el mismo segundo que se publica un piso.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-24 px-4 sm:px-0">
                    <Link
                        href="/register"
                        className="w-full sm:w-auto px-12 py-6 bg-primary hover:bg-primary-dark text-white rounded-[2rem] font-black text-xl transition-all shadow-2xl shadow-primary/25 transform hover:-translate-y-1 active:scale-95"
                    >
                        Activar mi radar gratis
                    </Link>
                    <Link
                        href="#features"
                        className="w-full sm:w-auto px-12 py-6 bg-neutral-50 border border-neutral-200 text-neutral-900 rounded-[2rem] font-black text-xl transition-all hover:bg-white hover:shadow-xl shadow-sm"
                    >
                        Ver demostración
                    </Link>
                </div>

                {/* Trust badges / Features grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    <StatsCard
                        icon={<Zap className="w-6 h-6 text-primary" />}
                        title="VELOCIDAD"
                        desc="Avisos en menos de 60 segundos"
                    />
                    <StatsCard
                        icon={<Bell className="w-6 h-6 text-primary" />}
                        title="NOTIFICACIÓN"
                        desc="Alertas directas a tu WhatsApp"
                    />
                    <StatsCard
                        icon={<ShieldCheck className="w-6 h-6 text-primary" />}
                        title="TOTAL"
                        desc="Idealista, Fotocasa y todos los demás"
                    />
                </div>
            </div>
        </div>
    );
}

function StatsCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
    return (
        <div className="flex flex-col items-center p-8 rounded-[2.5rem] bg-white border border-neutral-100 shadow-sm transition-all hover:shadow-md hover:border-primary/20">
            <div className="mb-4">{icon}</div>
            <h3 className="text-xs font-black tracking-widest text-neutral-400 mb-2">{title}</h3>
            <p className="text-neutral-900 font-bold text-lg">{desc}</p>
        </div>
    );
}
