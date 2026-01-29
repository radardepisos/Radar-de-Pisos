'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { ExternalLink, MapPin, BedDouble } from 'lucide-react';

interface Listing {
    id: string;
    url: string;
    title: string;
    price: number;
    city: string;
    thumbnail_url: string;
    detected_at: string;
}

export default function AlertList() {
    const [listings, setListings] = useState<Listing[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        async function fetchListings() {
            setLoading(true);
            const { data, error } = await supabase
                .from('detected_listings')
                .select('*')
                .order('detected_at', { ascending: false })
                .limit(10);

            if (!error && data) {
                setListings(data);
            }
            setLoading(false);
        }

        fetchListings();

        // Subscribe to real-time changes
        const channel = supabase
            .channel('public:detected_listings')
            .on('postgres_changes', {
                event: 'INSERT',
                schema: 'public',
                table: 'detected_listings'
            }, (payload) => {
                const newListing = payload.new as Listing;
                setListings((current) => [newListing, ...current].slice(0, 10));
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [supabase]);

    if (loading) {
        return <div className="animate-pulse space-y-4">
            {[1, 2, 3].map(i => (
                <div key={i} className="h-24 bg-neutral-100 dark:bg-neutral-800 rounded-2xl" />
            ))}
        </div>;
    }

    if (listings.length === 0) {
        return (
            <div className="text-center py-12 border-2 border-dashed border-neutral-100 dark:border-neutral-700 rounded-2xl">
                <div className="text-4xl mb-4">🔔</div>
                <p className="text-neutral-500">No hay alertas recientes. El radar sigue buscando...</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {listings.map((listing) => (
                <div
                    key={listing.id}
                    className="flex flex-col sm:flex-row gap-4 p-4 rounded-2xl border border-neutral-100 dark:border-neutral-700 hover:border-primary/50 transition-all bg-white dark:bg-neutral-800/50 group"
                >
                    {listing.thumbnail_url && (
                        <div className="w-full sm:w-32 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-neutral-100 dark:bg-neutral-800">
                            <img
                                src={listing.thumbnail_url}
                                alt={listing.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=300&q=80';
                                }}
                            />
                        </div>
                    )}

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
                                Detectado {new Date(listing.detected_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
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
            ))}
        </div>
    );
}
