'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Save, ExternalLink } from 'lucide-react';

export default function PreferencesForm() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [searchUrl, setSearchUrl] = useState('');
    const [whatsappNumber, setWhatsappNumber] = useState('');
    const supabase = createClient();

    useEffect(() => {
        async function loadProfile() {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const { data, error } = await supabase
                .from('profiles')
                .select('search_url, whatsapp_number')
                .eq('id', user.id)
                .single();

            if (data) {
                setSearchUrl(data.search_url || '');
                setWhatsappNumber(data.whatsapp_number || '');
            }
            setLoading(false);
        }

        loadProfile();
    }, [supabase]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { error } = await supabase
            .from('profiles')
            .upsert({
                id: user.id,
                search_url: searchUrl,
                whatsapp_number: whatsappNumber,
                updated_at: new Date().toISOString(),
            });

        if (error) {
            alert('Error guardando configuración: ' + error.message);
        } else {
            alert('Configuración guardada. Tu radar se actualizará en 2 minutos.');
        }
        setSaving(false);
    };

    if (loading) return <div className="animate-pulse h-48 bg-neutral-100 dark:bg-neutral-800 rounded-3xl" />;

    return (
        <div className="bg-white dark:bg-neutral-800 rounded-3xl p-8 border border-neutral-100 dark:border-neutral-700 shadow-sm">
            <div className="mb-8">
                <h2 className="text-xl font-bold">Configuración de tu Sniper</h2>
                <p className="text-sm text-neutral-500">Pega aquí tu búsqueda de Idealista y tu número de móvil.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium mb-2 flex justify-between">
                        URL de búsqueda Idealista
                        <a href="https://www.idealista.com" target="_blank" className="text-primary text-xs flex items-center">
                            Ir a Idealista <ExternalLink className="w-3 h-3 ml-1" />
                        </a>
                    </label>
                    <input
                        type="url"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-600 bg-transparent focus:ring-2 focus:ring-primary outline-none"
                        placeholder="https://www.idealista.com/alquiler-viviendas/madrid-madrid/..."
                        value={searchUrl}
                        onChange={(e) => setSearchUrl(e.target.value)}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">WhatsApp (con prefijo, ej: +34...)</label>
                    <input
                        type="tel"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-600 bg-transparent focus:ring-2 focus:ring-primary outline-none"
                        placeholder="+34600000000"
                        value={whatsappNumber}
                        onChange={(e) => setWhatsappNumber(e.target.value)}
                    />
                </div>

                <button
                    type="submit"
                    disabled={saving}
                    className="w-full py-4 bg-primary hover:bg-primary-dark text-white rounded-xl font-bold transition-all disabled:opacity-50 shadow-lg shadow-primary/20 flex items-center justify-center"
                >
                    <Save className="w-5 h-5 mr-2" />
                    {saving ? 'Guardando...' : 'Guardar y Activar Sniper'}
                </button>
            </form>
        </div>
    );
}
