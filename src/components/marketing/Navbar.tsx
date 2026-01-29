import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
    return (
        <nav className="fixed top-0 w-full z-50 glass border-b border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-3 group">
                            <div className="relative w-12 h-12 rounded-xl overflow-hidden shadow-[0_0_20px_rgba(59,130,246,0.2)] group-hover:scale-105 transition-transform border border-white/20">
                                <Image
                                    src="/logo.jpg"
                                    alt="InmoAlert"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <span className="text-2xl font-black tracking-tighter text-white">
                                INMOALERT
                            </span>
                        </Link>
                    </div>
                    <div className="hidden md:flex items-center space-x-10">
                        <Link href="#features" className="text-sm font-black tracking-widest text-neutral-200 hover:text-white transition-colors">
                            CÓMO FUNCIONA
                        </Link>
                        <Link href="#pricing" className="text-sm font-black tracking-widest text-neutral-200 hover:text-white transition-colors">
                            PRECIOS
                        </Link>
                        <Link href="/login" className="text-sm font-black tracking-widest text-white border-b-2 border-primary pb-1">
                            INICIAR SESIÓN
                        </Link>
                        <Link
                            href="/register"
                            className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-2xl font-black transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(59,130,246,0.4)] text-sm"
                        >
                            EMPEZAR AHORA
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
