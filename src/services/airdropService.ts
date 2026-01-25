import { Airdrop } from '@/types/airdrop';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const API_ENDPOINTS = {
    free: `${API_BASE_URL}/airdrop/freeairdrop`,
    paid: `${API_BASE_URL}/airdrop/paidairdrop`,
    all: `${API_BASE_URL}/airdrop/allairdrop`,
};

const extractData = (data: any): any[] => {
    if (Array.isArray(data)) return data;
    if (data?.data && Array.isArray(data.data)) return data.data;
    if (data?.result && Array.isArray(data.result)) return data.result;
    if (data?.items && Array.isArray(data.items)) return data.items;
    return [];
};

const sortByCreatedAtDesc = (items: any[]) =>
    items.sort(
        (a, b) =>
            new Date(b.created_at).getTime() -
            new Date(a.created_at).getTime()
    );

const sortEndedByEndedAtDesc = (items: any[]) =>
    items.sort((a, b) => {
        const endA = a.ended_at ? new Date(a.ended_at).getTime() : 0;
        const endB = b.ended_at ? new Date(b.ended_at).getTime() : 0;

        if (endA !== endB) return endB - endA;

        return (
            new Date(b.created_at).getTime() -
            new Date(a.created_at).getTime()
        );
    });

export const fetchFreeAirdrops = async (): Promise<Airdrop[]> => {
    try {
        const res = await fetch(API_ENDPOINTS.free);
        if (!res.ok) throw new Error('Failed to fetch free airdrops');

        const items = extractData(await res.json());

        return sortByCreatedAtDesc(
            items
                .filter((item: any) => item.status === 'active')
                .map((item: any) => ({
                    ...item,
                    type: 'Free',
                }))
        );
    } catch (error) {
        console.error('fetchFreeAirdrops error:', error);
        return [];
    }
};

export const fetchPaidAirdrops = async (): Promise<Airdrop[]> => {
    try {
        const res = await fetch(API_ENDPOINTS.paid);
        if (!res.ok) throw new Error('Failed to fetch paid airdrops');

        const items = extractData(await res.json());

        return sortByCreatedAtDesc(
            items
                .filter((item: any) => item.status === 'active')
                .map((item: any) => ({
                    ...item,
                    type: 'Paid',
                }))
        );
    } catch (error) {
        console.error('fetchPaidAirdrops error:', error);
        return [];
    }
};

export const fetchEndedAirdrops = async (): Promise<Airdrop[]> => {
    try {
        const res = await fetch(API_ENDPOINTS.all);
        if (!res.ok) throw new Error('Failed to fetch ended airdrops');

        const items = extractData(await res.json());

        return sortEndedByEndedAtDesc(
            items
                .filter((item: any) => item.status === 'ended')
                .map((item: any) => ({
                    ...item,
                    type: 'Ended',
                }))
        );
    } catch (error) {
        console.error('fetchEndedAirdrops error:', error);
        return [];
    }
};