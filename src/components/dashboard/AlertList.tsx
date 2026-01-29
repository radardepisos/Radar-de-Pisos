'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { ExternalLink, MapPin, Bell, Sparkles } from 'lucide-react';

interface Listing {
    id: string;
    url: string;
    title: string;
    price: number;
    city: string;
    thumbnail_url: string;
    detected_at: string;
}

interface Preferences {
    city: string;
    max_price: number;
    min_rooms: number;
}

export default function AlertList() {
    const [listings, setListings] = useState<Listing[]>([]);
    const [loading, setLoading] = useState(true);
    const [newAlert, setNewAlert] = useState(false);
    const [userPrefs, setUserPrefs] = useState<Preferences | null>(null);
    const supabase = createClient();

    useEffect(() => {
        async function initData() {
            setLoading(true);

            // 1. Get user preferences
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const { data: prefs } = await supabase
                    .from('search_preferences')
                    .select('city, max_price, min_rooms')
                    .eq('user_id', user.id)
                    .single();

                if (prefs) setUserPrefs(prefs);
            }

            // 2. Initial fetch
            await fetchListings();
            setLoading(false);
        }

        async function fetchListings() {
            const query = supabase
                .from('detected_listings')
                .select('*')
                .order('detected_at', { ascending: false })
                .limit(20);

            const { data, error } = await query;

            if (!error && data) {
                setListings(data);
            }
        }

        initData();

        // Subscribe to real-time changes
        const channel = supabase
            .channel('public:detected_listings')
            .on('postgres_changes', {
                event: 'INSERT',
                schema: 'public',
                table: 'detected_listings'
            }, (payload) => {
                const newListing = payload.new as Listing;
                setListings((current) => [newListing, ...current].slice(0, 20));

                // Show brief notification
                setNewAlert(true);
                setTimeout(() => setNewAlert(false), 5000);
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [supabase]);

    // Simple matching logic for the UI
    const filteredListings = listings.filter(l => {
        if (!userPrefs) return true; // Show all if no prefs set

        const matchesCity = !userPrefs.city || l.city.toLowerCase().includes(userPrefs.city.toLowerCase());
        const matchesPrice = !userPrefs.max_price || l.price <= userPrefs.max_price;
        // min_rooms is not currently in detected_listings schema in SQL, 
        // will skip for now or assume scraper adds it later.

        return matchesCity && matchesPrice;
    });

    if (loading) {
        return <div className="animate-pulse space-y-4">
            {[1, 2, 3].map(i => (
                <div key={i} className="h-24 bg-neutral-100 dark:bg-neutral-800 rounded-2xl" />
            ))}
        </div>;
    }

    return (
        <div className="space-y-4 relative">
            {newAlert && (
                <div className="fixed top-24 left-1/2 -translate-x-1/2 bg-primary text-white px-6 py-3 rounded-full text-xs font-black shadow-[0_0_40px_rgba(34,197,94,0.4)] flex items-center animate-bounce z-50 tracking-widest">
                    <Sparkles className="w-4 h-4 mr-2" />
                    NUEVA SEÑAL DETECTADA
                </div>
            )}

            {filteredListings.length === 0 ? (
                <div className="text-center py-20 border-2 border-dashed border-neutral-800 rounded-[2.5rem] bg-neutral-900/30">
                    <div className="text-5xl mb-6 opacity-30">📡</div>
                    <p className="text-neutral-500 font-bold uppercase tracking-widest text-xs">
                        Sincronizando con satélites...
                    </p>
                </div>
            ) : (
                filteredListings.map((listing) => (
                    <div
                        key={listing.id}
                        className="flex flex-col sm:flex-row gap-6 p-2 monitoring-card rounded-[2rem] overflow-hidden group"
                    >
                        <div className="w-full sm:w-48 h-32 rounded-[1.5rem] overflow-hidden flex-shrink-0 bg-neutral-800 relative">
                            <img
                                src={listing.thumbnail_url}
                                alt={listing.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=300&q=80';
                                }}
                            />
                            <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md text-white text-[9px] px-3 py-1 rounded-full font-black tracking-widest border border-white/10 uppercase">
                                {listing.id.includes('fotocasa') ? 'Fotocasa' : 'Idealista'}
                            </div>
                        </div>

                        <div className="flex-1 flex flex-col justify-between py-4 pr-6">
                            <div>
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-black text-xl text-white tracking-tight group-hover:text-primary transition-colors">{listing.title}</h3>
                                    <div className="text-right">
                                        <span className="text-primary font-black text-3xl tracking-tighter leading-none">{listing.price}€</span>
                                        <p className="text-[9px] text-neutral-600 font-black uppercase tracking-widest mt-1">Mensual</p>
                                    </div>
                                </div>
                                <div className="flex items-center text-sm text-neutral-400 font-bold">
                                    <MapPin className="w-3.5 h-3.5 mr-1.5 text-primary" />
                                    {listing.city}
                                </div>
                            </div>

                            <div className="flex justify-between items-center mt-4">
                                <div className="flex items-center space-x-2">
                                    <span className="flex h-1.5 w-1.5 rounded-full bg-primary/50 animate-pulse"></span>
                                    <span className="text-[10px] text-neutral-600 font-black uppercase tracking-widest">
                                        HACE {Math.max(1, Math.floor((new Date().getTime() - new Date(listing.detected_at).getTime()) / 60000))} MINUTOS
                                    </span>
                                </div>
                                <a
                                    href={listing.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center px-6 py-2 bg-white text-black text-[11px] font-black rounded-xl hover:bg-primary hover:text-white transition-all transform active:scale-95 shadow-xl"
                                >
                                    ABRIR FICHA
                                    <ExternalLink className="w-3.5 h-3.5 ml-2" />
                                </a>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}
