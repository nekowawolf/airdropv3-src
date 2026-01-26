import { useState, useCallback } from 'react';
import { Airdrop } from '@/types/airdrop';
import {
    fetchFreeAirdrops,
    fetchPaidAirdrops,
    fetchEndedAirdrops,
} from '@/services/airdropService';

export const useAirdrops = () => {
    const [freeAirdrops, setFreeAirdrops] = useState<Airdrop[]>([]);
    const [paidAirdrops, setPaidAirdrops] = useState<Airdrop[]>([]);
    const [endedAirdrops, setEndedAirdrops] = useState<Airdrop[]>([]);
    
    const [loadingFree, setLoadingFree] = useState(false);
    const [loadingPaid, setLoadingPaid] = useState(false);
    const [loadingEnded, setLoadingEnded] = useState(false);

    const [error, setError] = useState<string | null>(null);

    const getFree = useCallback(async () => {
        if (freeAirdrops.length > 0) return; 
        setLoadingFree(true);
        try {
            const data = await fetchFreeAirdrops();
            setFreeAirdrops(data);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch free airdrops');
        } finally {
            setLoadingFree(false);
        }
    }, [freeAirdrops.length]);

    const getPaid = useCallback(async () => {
        if (paidAirdrops.length > 0) return;
        setLoadingPaid(true);
        try {
            const data = await fetchPaidAirdrops();
            setPaidAirdrops(data);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch paid airdrops');
        } finally {
            setLoadingPaid(false);
        }
    }, [paidAirdrops.length]);

    const getEnded = useCallback(async () => {
        if (endedAirdrops.length > 0) return;
        setLoadingEnded(true);
        try {
            const data = await fetchEndedAirdrops();
            setEndedAirdrops(data);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch ended airdrops');
        } finally {
            setLoadingEnded(false);
        }
    }, [endedAirdrops.length]);

    return {
        freeAirdrops,
        paidAirdrops,
        endedAirdrops,
        loadingFree,
        loadingPaid,
        loadingEnded,
        error,
        getFree,
        getPaid,
        getEnded
    };
};