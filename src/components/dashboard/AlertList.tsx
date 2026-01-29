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
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-2 rounded-full text-sm font-bold shadow-xl flex items-center animate-bounce z-10">
                    <Sparkles className="w-4 h-4 mr-2" />
                    ¡Nuevo piso detectado!
                </div>
            )}

            {filteredListings.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-neutral-100 dark:border-neutral-700 rounded-2xl">
                    <div className="text-4xl mb-4">🔔</div>
                    <p className="text-neutral-500">
                        {userPrefs
                            ? "No hay alertas que coincidan con tus filtros. El radar sigue buscando..."
                            : "No hay alertas recientes. El radar sigue buscando..."}
                    </p>
                </div>
            ) : (
                filteredListings.map((listing) => (
                    <div
                        key={listing.id}
                        className="flex flex-col sm:flex-row gap-4 p-4 rounded-2xl border border-neutral-100 dark:border-neutral-700 hover:border-primary/50 transition-all bg-white dark:bg-neutral-800/50 group shadow-sm"
                    >
                        <div className="w-full sm:w-32 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-neutral-100 dark:bg-neutral-800 relative">
                            <img
                                src={listing.thumbnail_url}
                                alt={listing.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=300&q=80';
                                }}
                            />
                            <div className="absolute top-2 left-2 bg-black/50 backdrop-blur-sm text-white text-[10px] px-2 py-0.5 rounded-full">
                                {new Date(listing.detected_at).toLocaleDateString()}
                            </div>
                        </div>

                        <div className="flex-1 flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-start">
                                    <h3 className="font-bold text-neutral-900 dark:text-white line-clamp-1">{listing.title}</h3>
                                    <span className="text-primary font-extrabold text-lg">{listing.price}€</span>
                                </div>
                                <div className="flex items-center text-sm text-neutral-500 mt-1">
                                    <MapPin className="w-3 h-3 mr-1" />
                                    {listing.city}
                                </div>
                            </div>

                            <div className="flex justify-between items-center mt-3">
                                <span className="text-xs text-neutral-400">
                                    Hace {Math.max(1, Math.floor((new Date().getTime() - new Date(listing.detected_at).getTime()) / 60000))} min
                                </span>
                                <a
                                    href={listing.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center text-sm font-bold text-primary hover:underline"
                                >
                                    Ver Anuncio
                                    <ExternalLink className="w-3 h-3 ml-1" />
                                </a>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}
