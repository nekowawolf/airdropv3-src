import { useState, useEffect } from 'react';
import { Airdrop } from '@/types/airdrop';
import {
    fetchFreeAirdrops,
    fetchPaidAirdrops,
    fetchEndedAirdrops,
} from '@/services/airdropService';
import Fuse from 'fuse.js';

export const useAirdrops = (activeTab: string) => {
    const [freeAirdrops, setFreeAirdrops] = useState<Airdrop[]>([]);
    const [paidAirdrops, setPaidAirdrops] = useState<Airdrop[]>([]);
    const [endedAirdrops, setEndedAirdrops] = useState<Airdrop[]>([]);
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [searchQuery, setSearchQuery] = useState('');
    const [suggestion, setSuggestion] = useState<string | null>(null);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const [free, paid, ended] = await Promise.all([
                    fetchFreeAirdrops(),
                    fetchPaidAirdrops(),
                    fetchEndedAirdrops()
                ]);
                setFreeAirdrops(free);
                setPaidAirdrops(paid);
                setEndedAirdrops(ended);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch airdrops');
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    let currentData: Airdrop[] = [];
    if (activeTab === 'Free') {
        currentData = freeAirdrops;
    } else if (activeTab === 'Paid') {
        currentData = paidAirdrops;
    } else if (activeTab === 'Ended') {
        currentData = endedAirdrops;
    }

    useEffect(() => {
        if (!searchQuery || currentData.length === 0) {
            setSuggestion(null);
            return;
        }

        const exactMatchExists = currentData.some(c => 
            c.name && c.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (exactMatchExists) {
            setSuggestion(null);
            return;
        }

        const fuse = new Fuse(currentData, {
            keys: ['name'],
            threshold: 0.4,
        });

        const results = fuse.search(searchQuery);
        if (results.length > 0) {
            const bestMatch = results[0].item.name;
            if (bestMatch && bestMatch.toLowerCase() !== searchQuery.toLowerCase()) {
                setSuggestion(bestMatch);
            } else {
                setSuggestion(null);
            }
        } else {
            setSuggestion(null);
        }
    }, [searchQuery, currentData]);

    const handleSuggestionClick = (newQuery: string) => {
        setSearchQuery(newQuery);
    };

    return {
        currentData,
        loading,
        error,
        searchQuery,
        setSearchQuery,
        suggestion,
        handleSuggestionClick
    };
};