'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { fetchAirdropById } from '@/services/airdropService';
import { Airdrop } from '@/types/airdrop';
import { Spinner } from "@/components/ui/spinner";
import { ArrowLeft, ExternalLink, Globe, Award } from 'lucide-react';

export default function AirdropDetail() {
    const { id } = useParams();
    const router = useRouter();
    const [airdrop, setAirdrop] = useState<Airdrop | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        const fetchDetail = async () => {
            setLoading(true);
            try {
                const data = await fetchAirdropById(id as string);
                setAirdrop(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchDetail();
    }, [id]);

    if (loading) {
        return (
            <>
                <div className="min-h-screen body-color flex items-center justify-center">
                    <Spinner className="text-blue-500 size-10" />
                </div>
            </>
        );
    }

    if (!airdrop) {
        return (
            <>
                <div className="min-h-screen body-color flex flex-col items-center justify-center text-fill-color">
                    <p className="mb-4">Airdrop not found.</p>
                    <button
                        onClick={() => router.back()}
                        className="px-4 py-2 rounded-full border border-color/30 hover:bg-white/5 transition-colors"
                    >
                        Go Back
                    </button>
                </div>
            </>
        );
    }

    return (
        <>
            <div className="min-h-screen body-color text-fill-color p-8 pt-28 font-sans flex flex-col items-center">
                <div className="max-w-4xl w-full">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-fill-color/60 hover:text-fill-color mb-8 transition-colors cursor-pointer"
                    >
                        <ArrowLeft size={20} />
                        Back to List
                    </button>

                    {/* Header Section */}
                    <div className="glass-card rounded-3xl p-8 mb-8 border border-white/10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                            <img src={airdrop.image_url} alt="" className="w-64 h-64 object-contain" />
                        </div>

                        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
                            <img
                                src={airdrop.image_url}
                                alt={airdrop.name}
                                className="w-24 h-24 md:w-32 md:h-32 rounded-2xl object-contain bg-black/20 p-2"
                            />
                            <div className="flex-1">
                                <h1 className="text-3xl md:text-4xl font-bold mb-2">{airdrop.name}</h1>
                                <div className="flex flex-wrap gap-3 mb-4">
                                    <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm border border-blue-500/20">
                                        {airdrop.task}
                                    </span>
                                    {airdrop.status && (
                                        <span className={`px-3 py-1 rounded-full text-sm border ${airdrop.status === 'active'
                                            ? 'bg-green-500/20 text-green-400 border-green-500/20'
                                            : 'bg-red-500/20 text-red-400 border-red-500/20'
                                            }`}>
                                            {airdrop.status}
                                        </span>
                                    )}
                                </div>
                                <p className="text-fill-color/80 leading-relaxed max-w-2xl">
                                    {airdrop.description}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div className="glass-card rounded-2xl p-6 border border-white/10">
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                <Award size={20} className="text-blue-400" />
                                Project Details
                            </h3>
                            <div className="space-y-4">
                                <div className="flex justify-between border-divider-b pb-3">
                                    <span className="text-fill-color/60">Backed By</span>
                                    <span className="font-medium text-right">{airdrop.backed || '-'}</span>
                                </div>
                                <div className="flex justify-between border-divider-b pb-3">
                                    <span className="text-fill-color/60">Funds Raised</span>
                                    <span className="font-medium text-right">{airdrop.funds || '-'}</span>
                                </div>
                                <div className="flex justify-between pt-1">
                                    <span className="text-fill-color/60">Added On</span>
                                    <span className="font-medium text-right">
                                        {new Date(airdrop.created_at).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Links & Actions */}
                        <div className="glass-card rounded-2xl p-6 border border-white/10">
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                <ExternalLink size={20} className="text-blue-400" />
                                Official Links
                            </h3>
                            <div className="space-y-3">
                                {airdrop.link && (
                                    <a
                                        href={airdrop.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-between p-3 rounded-xl card-color transition-colors group"
                                    >
                                        <span className="font-medium">Website</span>
                                        <Globe size={16} className="text-fill-color/40 group-hover:text-fill-color" />
                                    </a>
                                )}
                                {airdrop.link_guide && (
                                    <a
                                        href={airdrop.link_guide}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-between p-3 rounded-xl card-color transition-colors group"
                                    >
                                        <span className="font-medium">Step-by-Step Guide</span>
                                        <ExternalLink size={16} className="text-fill-color/40 group-hover:text-fill-color" />
                                    </a>
                                )}
                                {airdrop.status === 'ended' && airdrop.link_claim && (
                                    <a
                                        href={airdrop.link_claim}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                       className="flex items-center justify-between p-3 rounded-xl card-color transition-colors group"
                                    >
                                        <span className="font-medium">
                                            Claim Airdrop
                                        </span>
                                       <ExternalLink size={16} className="text-fill-color/40 group-hover:text-fill-color" />
                                    </a>
                                )}
                                {airdrop.link_twitter && (
                                    <a
                                        href={airdrop.link_twitter}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-between p-3 rounded-xl card-color transition-colors group"
                                    >
                                        <span className="font-medium">Twitter</span>
                                        <ExternalLink size={16} className="text-fill-color/40 group-hover:text-fill-color" />
                                    </a>
                                )}
                                {airdrop.link_discord && (
                                    <a
                                        href={airdrop.link_discord}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-between p-3 rounded-xl card-color transition-colors group"
                                    >
                                        <span className="font-medium">Discord</span>
                                        <ExternalLink size={16} className="text-fill-color/40 group-hover:text-fill-color" />
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}