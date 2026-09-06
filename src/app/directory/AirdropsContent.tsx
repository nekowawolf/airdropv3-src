'use client';

import NwwOneeAIChat from "@/components/NwwOneeAIChat";
import { useState, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import { FallbackImage } from '@/components/FallbackImage';
import { useRouter, useSearchParams } from 'next/navigation';
import PaginationTabs from '@/components/Pagination';
import { Spinner } from "@/components/ui/spinner";
import { useAirdrops } from '@/hooks/useAirdrops';
import { Airdrop, FilterOptions } from '@/types/airdrop';
import FilterDropdown from '@/components/FilterDropdown';
import { CgClose } from "react-icons/cg";

export default function AirdropsContent() {
    return (
        <Suspense fallback={
            <div className="flex justify-center items-center min-h-[50vh]">
                <Spinner className="text-blue-500 size-10" />
            </div>
        }>
            <AirdropsContentInner />
        </Suspense>
    );
}

function AirdropsContentInner() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const rawTab = searchParams.get('tab');
    const activeTab = rawTab ? rawTab.charAt(0).toUpperCase() + rawTab.slice(1).toLowerCase() : 'Free';

    const rawPage = searchParams.get('page');
    const initialPage = rawPage && !isNaN(parseInt(rawPage, 10)) ? parseInt(rawPage, 10) : 1;

    const {
        currentData,
        loading,
        error,
        searchQuery,
        setSearchQuery,
        suggestion,
        handleSuggestionClick
    } = useAirdrops(activeTab);

    const [filters, setFilters] = useState<FilterOptions>({});
    const [currentPage, setCurrentPage] = useState(initialPage);
    const ITEMS_PER_PAGE = 8;

    useEffect(() => {
        setFilters({});
    }, [activeTab]);

    useEffect(() => {
        const page = searchParams.get('page');
        if (page && !isNaN(parseInt(page, 10))) {
            setCurrentPage(parseInt(page, 10));
        } else {
            setCurrentPage(1);
        }
    }, [searchParams]);

    let isLoading = loading;

    const filteredProjects = currentData.filter((project) => {
        const matchesSearch = (project.name || '')
            .toLowerCase()
            .includes(searchQuery.toLowerCase());

        const normalize = (s: string) => s?.toLowerCase().trim() || '';

        if (filters.levels && filters.levels.length > 0) {
            const pLevel = normalize(project.level);
            if (!filters.levels.includes(pLevel)) return false;
        }

        if (filters.tasks && filters.tasks.length > 0) {
            const pTask = normalize(project.task);
            const hasMatch = filters.tasks.some(filterTask => pTask.includes(filterTask));
            if (!hasMatch) return false;
        }

        if (filters.vesting && filters.vesting.length > 0) {
            const pVesting = project.is_vesting ? 'yes' : 'no';
            if (!filters.vesting.includes(pVesting)) return false;
        }

        return matchesSearch;
    });

    const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
    const displayedProjects = filteredProjects.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        handlePageChange(1);
    }, [searchQuery, JSON.stringify(filters)]);

    const handleTabChange = (tab: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('tab', tab.toLowerCase());
        params.delete('page');
        router.push(`?${params.toString()}`, { scroll: false });
    };

    const handlePageChange = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', page.toString());
        router.push(`?${params.toString()}`, { scroll: false });
    };

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
                        className="w-full py-3 pl-12 pr-12 rounded-full card-color border border-color focus:outline-none focus:border-blue-500 text-fill-color placeholder:text-fill-color/50"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery('')}
                            className="absolute right-4 top-1/2 -translate-y-1/2 opacity-70 hover:opacity-100 transition-opacity text-fill-color cursor-pointer"
                            aria-label="Clear search"
                        >
                            <CgClose className="w-5 h-5" />
                        </button>
                    )}
                    
                    <div className="absolute left-0 top-full pt-1 pl-5 w-full text-left z-10 pointer-events-none">
                        <div className={`text-xs text-fill-color/70 transition-opacity duration-300 pointer-events-auto ${suggestion ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
                            Did you mean:{' '}
                            <button 
                                onClick={() => {
                                    if (suggestion) {
                                        handleSuggestionClick(suggestion);
                                        setCurrentPage(1);
                                    }
                                }} 
                                className="font-semibold text-blue-500 hover:underline cursor-pointer"
                            >
                                {suggestion}
                            </button>
                            ?
                        </div>
                    </div>
                </div>

                {/* Filter Tabs & Dropdown */}
                <div className="mb-12 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto px-4 sm:px-0">
                    <div className="p-1 card-color rounded-full flex sm:inline-flex border border-color w-full sm:w-auto relative">
                        {['Free', 'Paid', 'Ended'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => handleTabChange(tab)}
                                className={`flex-1 sm:flex-none px-4 sm:px-6 py-2 border rounded-full text-sm font-medium transition-all cursor-pointer ${activeTab === tab
                                    ? 'bg-blue-600 text-white shadow-lg border-blue-600'
                                    : 'border-transparent text-fill-color/60 hover:text-fill-color hover:!border-blue-600'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="w-full sm:w-auto flex justify-center">
                        <FilterDropdown
                            type={activeTab as 'Free' | 'Paid' | 'Ended'}
                            filters={filters}
                            setFilters={setFilters}
                            resetFilters={() => setFilters({})}
                        />
                    </div>
                </div>

                {/* Content Area */}
                {isLoading ? (
                    <div className="flex justify-center py-10">
                        <Spinner className="text-blue-500 size-10" />
                    </div>
                ) : error ? (
                    <div className="text-red-500 text-center">{error}</div>
                ) : (
                    <>
                        <div className="w-full flex-col flex gap-4">
                            {displayedProjects.length === 0 ? (
                                <div className="text-center py-1">
                                    <FallbackImage
                                        src="https://cdn.nekowawolf.xyz/image/2026/1787422427_nwwonee_search.webp"
                                        alt="No data found"
                                        width={160}
                                        height={160}
                                        className="mx-auto"
                                    />
                                    <p className="text-fill-color/50 -mt-4">No data available.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                                    {displayedProjects.map((project, index) => (
                                        <Link
                                            key={project.id || index}
                                            href={`/directory/${project.id || ''}?tab=${activeTab.toLowerCase()}&page=${currentPage}`}
                                            className="glass-card rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:bg-opacity-80 cursor-pointer group block"
                                        >
                                            <div className="mb-6 group-hover:scale-110 transition-transform">
                                                {project.image_url ? (
                                                    <FallbackImage
                                                        src={project.image_url}
                                                        alt={project.name}
                                                        width={64}
                                                        height={64}
                                                        className="w-16 h-16 object-contain mx-auto rounded-md"
                                                    />
                                                ) : (
                                                    <div className="w-16 h-16 card-color rounded-md mx-auto flex items-center justify-center text-2xl">
                                                        ?
                                                    </div>
                                                )}
                                            </div>
                                            <h3 className="text-xl font-bold mb-1">{project.name}</h3>
                                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">{project.task}</span>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <PaginationTabs
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        )}
                    </>
                )}
            </div>
            <NwwOneeAIChat />
        </div>
    );
}