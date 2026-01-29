import DashboardLayout from '@/components/dashboard/DashboardLayout';
import PreferencesForm from '@/components/dashboard/PreferencesForm';
import AlertList from '@/components/dashboard/AlertList';

export default function DashboardPage() {
    return (
        <DashboardLayout>
            <div className="mb-10">
                <div className="flex items-center space-x-2 text-primary font-bold text-[10px] tracking-[0.2em] uppercase mb-3">
                    <span className="relative flex h-2 w-2">
                        <span className="radar-pulse absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    <span>Radar Activo • Escaneando Portales</span>
                </div>
                <h1 className="text-4xl font-black tracking-tighter mb-2">Mi Radar de Inversión</h1>
                <p className="text-neutral-500 font-medium">Gestiona tu búsqueda y revisa los últimos pisos detectados.</p>
            </div>

            <div className="grid gap-8">
                <PreferencesForm />

                <div className="bg-white dark:bg-neutral-800 rounded-3xl p-8 border border-neutral-100 dark:border-neutral-700 shadow-sm">
                    <h2 className="text-xl font-bold mb-6">Últimas Alertas</h2>
                    <AlertList />
                </div>
            </div>
        </DashboardLayout>
    );
}
