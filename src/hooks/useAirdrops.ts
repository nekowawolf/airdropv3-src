import { useEffect, useState } from 'react';
import { Airdrop } from '@/types/airdrop';
import {
    fetchFreeAirdrops,
    fetchPaidAirdrops,
    fetchEndedAirdrops,
} from '@/services/airdropService';

export const useAirdrops = () => {
    const [airdrops, setAirdrops] = useState<Airdrop[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAll = async () => {
            setLoading(true);
            try {
                const [free, paid, ended] = await Promise.all([
                    fetchFreeAirdrops(),
                    fetchPaidAirdrops(),
                    fetchEndedAirdrops(),
                ]);

                setAirdrops([...free, ...paid, ...ended]);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch airdrops');
            } finally {
                setLoading(false);
            }
        };

        fetchAll();
    }, []);

    return { airdrops, loading, error };
};