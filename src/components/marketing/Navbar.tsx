import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
    return (
        <nav className="fixed top-0 w-full z-50 glass border-b border-neutral-100 dark:border-neutral-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-3 group">
                            <div className="relative w-12 h-12 rounded-xl overflow-hidden shadow-lg group-hover:scale-105 transition-transform">
                                <Image
                                    src="/logo.jpg"
                                    alt="Radar de Pisos"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <span className="text-2xl font-black tracking-tighter premium-gradient bg-clip-text text-transparent">
                                INMOALERT
                            </span>
                        </Link>
                    </div>
                    <div className="hidden md:flex items-center space-x-10">
                        <Link href="#features" className="text-sm font-semibold text-neutral-600 dark:text-neutral-300 hover:text-primary transition-colors">
                            CÓMO FUNCIONA
                        </Link>
                        <Link href="#pricing" className="text-sm font-semibold text-neutral-600 dark:text-neutral-300 hover:text-primary transition-colors">
                            PRECIOS
                        </Link>
                        <Link href="/login" className="text-sm font-semibold text-neutral-600 dark:text-neutral-300 hover:text-primary transition-colors">
                            INICIAR SESIÓN
                        </Link>
                        <Link
                            href="/register"
                            className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-2xl font-bold transition-all transform hover:scale-105 shadow-xl shadow-primary/30"
                        >
                            EMPEZAR AHORA
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
