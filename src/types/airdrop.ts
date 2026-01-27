export interface Airdrop {
    id: string;
    name: string;
    task: string;
    link: string;
    level: string;
    status: string;
    backed: string;
    funds: string;
    supply: string;
    fdv: string;
    market_cap: string;
    vesting: string;
    link_claim: string;
    link_discord: string;
    link_twitter: string;
    image_url: string;
    description: string;
    link_guide: string;
    price: number;
    usd_income: number;
    created_at: string;
    ended_at?: string;
    type?: 'Free' | 'Paid' | 'Ended';
}

export type AirdropFree = Airdrop;
export type AirdropPaid = Airdrop;

export interface FilterOptions {
    levels?: string[];
    tasks?: string[];
    vesting?: string[];
}