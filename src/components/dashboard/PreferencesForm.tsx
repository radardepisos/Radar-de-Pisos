'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

export default function PreferencesForm() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [city, setCity] = useState('');
    const [maxPrice, setMaxPrice] = useState(1000);
    const [minRooms, setMinRooms] = useState(1);
    const supabase = createClient();

    useEffect(() => {
        async function loadPreferences() {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const { data, error } = await supabase
                .from('search_preferences')
                .select('*')
                .eq('user_id', user.id)
                .single();

            if (data) {
                setCity(data.city);
                setMaxPrice(data.max_price);
                setMinRooms(data.min_rooms);
                setIsActive(data.is_active);
            }
            setLoading(false);
        }

        loadPreferences();
    }, [supabase]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { error } = await supabase
            .from('search_preferences')
            .upsert({
                user_id: user.id,
                city,
                max_price: maxPrice,
                min_rooms: minRooms,
                is_active: isActive,
                updated_at: new Date().toISOString(),
            }, { onConflict: 'user_id' }); // Note: Need a unique constraint on user_id for single-preference logic

        if (error) {
            alert('Error guardando preferencias: ' + error.message);
        } else {
            alert('Preferencias guardadas correctamente');
        }
        setSaving(false);
    };

    if (loading) return <div>Cargando...</div>;

    return (
        <div className="bg-white dark:bg-neutral-800 rounded-3xl p-8 border border-neutral-100 dark:border-neutral-700 shadow-sm">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-xl font-bold">Configuración del Radar</h2>
                    <p className="text-sm text-neutral-500">Define qué tipo de pisos quieres encontrar.</p>
                </div>

                <div className="flex items-center space-x-3">
                    <span className={`text-sm font-bold ${isActive ? 'text-green-500' : 'text-neutral-400'}`}>
                        {isActive ? 'RADAR ACTIVO' : 'PAUSADO'}
                    </span>
                    <button
                        type="button"
                        onClick={() => setIsActive(!isActive)}
                        className={`w-14 h-8 rounded-full transition-all relative ${isActive ? 'bg-green-500' : 'bg-neutral-300 dark:bg-neutral-600'}`}
                    >
                        <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${isActive ? 'left-7' : 'left-1'}`} />
                    </button>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">Ciudad o Zona</label>
                        <input
                            type="text"
                            required
                            className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-600 bg-transparent focus:ring-2 focus:ring-primary outline-none"
                            placeholder="Ej: Madrid, Chamberí..."
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Precio Máximo (€/mes)</label>
                        <input
                            type="number"
                            className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-600 bg-transparent focus:ring-2 focus:ring-primary outline-none"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                        />
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">Mínimo Habitaciones</label>
                        <select
                            className="w-full px-4 py-3 rounded-xl border border-neutral-200 dark:border-neutral-600 bg-transparent focus:ring-2 focus:ring-primary outline-none appearance-none"
                            value={minRooms}
                            onChange={(e) => setMinRooms(parseInt(e.target.value))}
                        >
                            <option value={0}>Estudio / Loft</option>
                            <option value={1}>1 Habitación</option>
                            <option value={2}>2 Habitaciones</option>
                            <option value={3}>3+ Habitaciones</option>
                        </select>
                    </div>
                    <div className="flex items-end">
                        <button
                            type="submit"
                            disabled={saving}
                            className="w-full py-3 bg-primary hover:bg-primary-dark text-white rounded-xl font-bold transition-all disabled:opacity-50 shadow-lg shadow-primary/20"
                        >
                            {saving ? 'Guardando...' : 'Guardar Configuración'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
