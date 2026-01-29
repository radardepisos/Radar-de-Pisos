'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Save, Plus, Trash2, Globe } from 'lucide-react';

interface SearchUrl {
    url: string;
    portal: 'idealista' | 'fotocasa' | 'otros';
}

export default function PreferencesForm() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [searchUrls, setSearchUrls] = useState<SearchUrl[]>([]);
    const [whatsappNumber, setWhatsappNumber] = useState('');
    const supabase = createClient();

    useEffect(() => {
        async function loadProfile() {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const { data } = await supabase
                .from('profiles')
                .select('search_urls, whatsapp_number')
                .eq('id', user.id)
                .single();

            if (data) {
                setSearchUrls(data.search_urls || []);
                setWhatsappNumber(data.whatsapp_number || '');
            }
            setLoading(false);
        }
        loadProfile();
    }, [supabase]);

    const addUrl = () => {
        setSearchUrls([...searchUrls, { url: '', portal: 'idealista' }]);
    };

    const removeUrl = (index: number) => {
        setSearchUrls(searchUrls.filter((_, i) => i !== index));
    };

    const updateUrl = (index: number, field: keyof SearchUrl, value: string) => {
        const newUrls = [...searchUrls];
        newUrls[index] = { ...newUrls[index], [field]: value };
        setSearchUrls(newUrls);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { error } = await supabase.from('profiles').upsert({
            id: user.id,
            search_urls: searchUrls,
            whatsapp_number: whatsappNumber,
            updated_at: new Date().toISOString(),
        });

        if (error) alert('Error: ' + error.message);
        else alert('Radar Multi-Portal actualizado.');
        setSaving(false);
    };

    if (loading) return <div className="animate-pulse h-64 bg-neutral-100 dark:bg-neutral-800 rounded-3xl" />;

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="bg-white dark:bg-neutral-800 rounded-3xl p-8 border border-neutral-100 dark:border-neutral-700 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-xl font-bold">Mis Radares de Búsqueda</h2>
                        <p className="text-sm text-neutral-500">Añade URLs de Idealista o Fotocasa.</p>
                    </div>
                    <button type="button" onClick={addUrl} className="p-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-all">
                        <Plus className="w-5 h-5" />
                    </button>
                </div>

                <div className="space-y-4">
                    {searchUrls.map((item, index) => (
                        <div key={index} className="flex gap-3">
                            <select
                                value={item.portal}
                                onChange={(e) => updateUrl(index, 'portal', e.target.value as any)}
                                className="px-3 rounded-xl border border-neutral-200 dark:border-neutral-600 bg-neutral-50 dark:bg-neutral-900 text-sm outline-none"
                            >
                                <option value="idealista">Idealista</option>
                                <option value="fotocasa">Fotocasa</option>
                            </select>
                            <input
                                type="url"
                                required
                                value={item.url}
                                onChange={(e) => updateUrl(index, 'url', e.target.value)}
                                className="flex-1 px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-600 bg-transparent outline-none focus:ring-2 focus:ring-primary"
                                placeholder="Pesta URL de búsqueda..."
                            />
                            <button type="button" onClick={() => removeUrl(index)} className="p-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all">
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    ))}
                    {searchUrls.length === 0 && (
                        <div className="text-center py-8 text-neutral-400 border-2 border-dashed border-neutral-100 dark:border-neutral-800 rounded-2xl">
                            No hay URLs configuradas. Pulsa "+" para añadir la primera.
                        </div>
                    )}
                </div>
            </div>

            <div className="bg-white dark:bg-neutral-800 rounded-3xl p-8 border border-neutral-100 dark:border-neutral-700 shadow-sm">
                <h3 className="text-lg font-bold mb-4">Contacto WhatsApp</h3>
                <input
                    type="tel"
                    required
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-600 bg-transparent outline-none focus:ring-2 focus:ring-primary mb-6"
                    placeholder="+34..."
                />
                <button
                    type="submit"
                    disabled={saving}
                    className="w-full py-4 bg-primary hover:bg-primary-dark text-white rounded-xl font-bold transition-all disabled:opacity-50 shadow-lg shadow-primary/20 flex items-center justify-center"
                >
                    <Save className="w-5 h-5 mr-2" />
                    {saving ? 'Guardando...' : 'Guardar y Activar Multi-Radar'}
                </button>
            </div>
        </form>
    );
}
