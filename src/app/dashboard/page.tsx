import DashboardLayout from '@/components/dashboard/DashboardLayout';
import PreferencesForm from '@/components/dashboard/PreferencesForm';
import AlertList from '@/components/dashboard/AlertList';

export default function DashboardPage() {
    return (
        <DashboardLayout>
            <div className="mb-10">
                <h1 className="text-3xl font-bold mb-2">Mi Radar</h1>
                <p className="text-neutral-500">Gestiona tu búsqueda y revisa los últimos pisos detectados.</p>
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
