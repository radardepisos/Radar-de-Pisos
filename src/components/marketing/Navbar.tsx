import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
    return (
        <nav className="fixed top-0 w-full z-50 glass border-b border-black/5 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-3 group">
                            <div className="relative w-12 h-12 rounded-xl overflow-hidden shadow-sm group-hover:scale-105 transition-transform border border-black/5">
                                <Image
                                    src="/logo.jpg"
                                    alt="InmoAlert"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <span className="text-2xl font-black tracking-tighter text-neutral-900 uppercase">
                                INMO<span className="text-primary">ALERT</span>
                            </span>
                        </Link>
                    </div>
                    <div className="hidden md:flex items-center space-x-10">
                        <Link href="#features" className="text-xs font-black tracking-widest text-neutral-500 hover:text-primary transition-colors">
                            CÓMO FUNCIONA
                        </Link>
                        <Link href="#pricing" className="text-xs font-black tracking-widest text-neutral-500 hover:text-primary transition-colors">
                            PRECIOS
                        </Link>
                        <Link href="/login" className="text-xs font-black tracking-widest text-neutral-900 border-b-2 border-primary/20 hover:border-primary pb-1 transition-all">
                            INICIAR SESIÓN
                        </Link>
                        <Link
                            href="/register"
                            className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-2xl font-black transition-all transform hover:scale-105 shadow-xl shadow-primary/20 text-sm"
                        >
                            EMPEZAR AHORA
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
