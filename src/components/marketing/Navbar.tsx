import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="fixed top-0 w-full z-50 glass border-b border-neutral-100 dark:border-neutral-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center">
                        <Link href="/" className="text-2xl font-bold premium-gradient bg-clip-text text-transparent">
                            Alquiler Sniper
                        </Link>
                    </div>
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="#features" className="text-neutral-600 dark:text-neutral-300 hover:text-primary transition-colors">
                            Cómo funciona
                        </Link>
                        <Link href="#pricing" className="text-neutral-600 dark:text-neutral-300 hover:text-primary transition-colors">
                            Precios
                        </Link>
                        <Link href="/login" className="text-neutral-600 dark:text-neutral-300 hover:text-primary transition-colors font-medium">
                            Iniciar Sesión
                        </Link>
                        <Link
                            href="/register"
                            className="bg-primary hover:bg-primary-dark text-white px-5 py-2 rounded-full font-medium transition-all transform hover:scale-105 shadow-md shadow-primary/20"
                        >
                            Empezar ahora
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
