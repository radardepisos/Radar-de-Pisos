import DashboardLayout from '@/components/dashboard/DashboardLayout';

export default function BillingPage() {
    return (
        <DashboardLayout>
            <div className="mb-10">
                <h1 className="text-3xl font-bold mb-2">Suscripción y Facturación</h1>
                <p className="text-neutral-500">Gestiona tu plan y método de pago.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-8">
                    {/* Active Plan */}
                    <div className="bg-white dark:bg-neutral-800 rounded-3xl p-8 border border-neutral-100 dark:border-neutral-700 shadow-sm">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-wider">Plan Actual</span>
                                <h2 className="text-2xl font-bold mt-2">Plan Sniper</h2>
                            </div>
                            <div className="text-right">
                                <p className="text-3xl font-extrabold">19€</p>
                                <p className="text-sm text-neutral-500">al mes</p>
                            </div>
                        </div>

                        <div className="space-y-4 mb-8">
                            <p className="text-neutral-600 dark:text-neutral-400">Tu suscripción se renovará automáticamente el <b>28 de Febrero, 2026</b>.</p>
                            <div className="flex items-center text-sm">
                                <span className="text-green-500 mr-2">✓</span> Alertas ilimitadas activas
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button className="flex-1 py-3 bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 rounded-xl font-bold transition-all">
                                Cambiar Plan
                            </button>
                            <button className="flex-1 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl font-bold transition-all">
                                Cancelar Suscripción
                            </button>
                        </div>
                    </div>

                    {/* Payment Method */}
                    <div className="bg-white dark:bg-neutral-800 rounded-3xl p-8 border border-neutral-100 dark:border-neutral-700 shadow-sm">
                        <h2 className="text-xl font-bold mb-6">Método de Pago</h2>
                        <div className="flex items-center p-4 border border-neutral-100 dark:border-neutral-700 rounded-2xl bg-neutral-50 dark:bg-neutral-900/50">
                            <div className="text-3xl mr-4">💳</div>
                            <div className="flex-1">
                                <p className="font-bold">Visa terminada en 4242</p>
                                <p className="text-sm text-neutral-500">Expira el 12/28</p>
                            </div>
                            <button className="text-primary font-bold text-sm hover:underline">Editar</button>
                        </div>
                    </div>
                </div>

                {/* Sidebar / Info */}
                <div className="space-y-8">
                    <div className="bg-primary/5 rounded-3xl p-6 border border-primary/10">
                        <h3 className="font-bold mb-2">¿Por qué el Plan Sniper?</h3>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed">
                            El mercado inmobiliario en España vuela. El Plan Sniper te da acceso a monitorización en tiempo real para que seas el primero en llamar.
                        </p>
                        <ul className="text-xs space-y-2 text-neutral-500">
                            <li>• Monitorización cada 2 minutos</li>
                            <li>• Notificaciones WhatsApp instantáneas</li>
                            <li>• Sin límites de búsquedas</li>
                        </ul>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
