import Link from 'next/link';

export default function Hero() {
    return (
        <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
            {/* Background patterns */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-50"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8 animate-fade-in">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    <span>Alertas en tiempo real vía WhatsApp</span>
                </div>

                <h1 className="text-5xl lg:text-7xl font-extrabold text-neutral-900 dark:text-white mb-6 leading-tight">
                    No vuelvas a perder el <br />
                    <span className="premium-gradient bg-clip-text text-transparent">piso de tus sueños</span>
                </h1>

                <p className="max-w-2xl mx-auto text-xl text-neutral-600 dark:text-neutral-400 mb-10 leading-relaxed">
                    Alquiler Sniper monitoriza los portales inmobiliarios 24/7 y te avisa por WhatsApp al instante cuando aparece un piso que encaja con tus criterios. <b>Sé el primero en llamar.</b>
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href="/register"
                        className="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-primary-dark text-white rounded-xl font-bold text-lg transition-all shadow-xl shadow-primary/25 transform hover:-translate-y-1"
                    >
                        Configurar mis alertas gratis
                    </Link>
                    <Link
                        href="#how-it-works"
                        className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-white rounded-xl font-bold text-lg transition-all hover:bg-neutral-50 dark:hover:bg-neutral-700"
                    >
                        Ver cómo funciona
                    </Link>
                </div>

                <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-60 filter grayscale">
                    {/* Placeholders for portal logos can go here */}
                    <div className="flex items-center justify-center font-bold text-2xl">Idealista</div>
                    <div className="flex items-center justify-center font-bold text-2xl">Fotocasa</div>
                    <div className="flex items-center justify-center font-bold text-2xl">Habitaclia</div>
                    <div className="flex items-center justify-center font-bold text-2xl">Pisos.com</div>
                </div>
            </div>
        </div>
    );
}
