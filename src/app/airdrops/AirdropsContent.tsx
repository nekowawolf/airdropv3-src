'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import PaginationTabs from '@/components/Pagination';
import { Spinner } from "@/components/ui/spinner";
import { useAirdrops } from '@/hooks/useAirdrops';

export default function AirdropsContent() {
    const { airdrops, loading, error } = useAirdrops();
    const [activeTab, setActiveTab] = useState('Free');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 8;

    const filteredProjects = airdrops.filter((project) => {
        const matchesTab = activeTab === project.type;
        const matchesSearch = (project.name || '')
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        return matchesTab && matchesSearch;
    });

    const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
    const displayedProjects = filteredProjects.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    useEffect(() => {
        setCurrentPage(1);
    }, [activeTab, searchQuery]);

    return (
        <div className="min-h-screen body-color text-fill-color p-8 pt-36 font-sans">
            <div className="max-w-6xl mx-auto flex flex-col items-center">
                <div className="w-full max-w-2xl mb-8 text-center">
                    <h1 className="text-3xl font-bold mb-2">
                        Nww Airdrop List
                    </h1>
                    <p className="text-fill-color/70 max-w-md mx-auto">
                        Explore ongoing and completed airdrops with clear project details,
                        tokenomics, vesting, and claim status in one place.
                    </p>
                </div>

                {/* Search Bar */}
                <div className="w-full max-w-xl mb-6 relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-fill-color/50">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        placeholder="Search Project"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full py-3 pl-12 pr-6 rounded-full card-color border border-color focus:outline-none focus:border-blue-500 text-fill-color placeholder:text-fill-color/50"
                    />
                </div>

                {/* Filter Tabs */}
                <div className="mb-12 p-1 card-color rounded-full inline-flex border border-color/30">
                    {['Free', 'Paid', 'Ended'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-2 rounded-full text-sm font-medium ${activeTab === tab
                                ? 'bg-blue-400 text-white shadow-lg'
                                : 'text-fill-color/60 hover:text-fill-color'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                {loading ? (
                    <div className="flex justify-center py-10">
                        <Spinner className="text-blue-500 size-10" />
                    </div>
                ) : error ? (
                    <div className="text-red-500 text-center">{error}</div>
                ) : (
                    <>
                        {/* Project Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                            {displayedProjects.length > 0 ? (
                                displayedProjects.map((project, index) => (
                                    <Link
                                        key={project.id || index}
                                        href={`/airdrops/${project.id || ''}`}
                                        className="glass-card rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:bg-opacity-80 cursor-pointer group block"
                                    >
                                        <div className="mb-6 group-hover:scale-110 transition-transform">
                                            {project.image_url ? (
                                                <img
                                                    src={project.image_url}
                                                    alt={project.name}
                                                    className="w-16 h-16 object-contain mx-auto rounded-md"
                                                />
                                            ) : (
                                                <div className="w-16 h-16 card-color rounded-md mx-auto flex items-center justify-center text-2xl">
                                                    ?
                                                </div>
                                            )}
                                        </div>
                                        <h3 className="text-xl font-bold mb-1">{project.name}</h3>
                                        <p className="text-sm text-fill-color/60">{project.task}</p>
                                    </Link>
                                ))
                            ) : (
                                <div className="col-span-full text-center text-fill-color/50 py-12">
                                    No airdrops found.
                                </div>
                            )}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <PaginationTabs
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={setCurrentPage}
                            />
                        )}
                    </>
                )}
            </div>
        </div>
    );
}