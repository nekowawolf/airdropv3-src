'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import PaginationTabs from '@/components/Pagination';
import { Spinner } from "@/components/ui/spinner";
import { useAirdrops } from '@/hooks/useAirdrops';
import { Airdrop, FilterOptions } from '@/types/airdrop';
import FilterDropdown from '@/components/FilterDropdown';

export default function AirdropsContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const rawTab = searchParams.get('tab');
    const activeTab = rawTab ? rawTab.charAt(0).toUpperCase() + rawTab.slice(1).toLowerCase() : 'Free';

    const rawPage = searchParams.get('page');
    const initialPage = rawPage && !isNaN(parseInt(rawPage, 10)) ? parseInt(rawPage, 10) : 1;

    const {
        freeAirdrops, paidAirdrops, endedAirdrops,
        loadingFree, loadingPaid, loadingEnded,
        error,
        getFree, getPaid, getEnded
    } = useAirdrops();

    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState<FilterOptions>({});
    const [currentPage, setCurrentPage] = useState(initialPage);
    const ITEMS_PER_PAGE = 8;

    useEffect(() => {
        if (activeTab === 'Free') {
            getFree();
        } else if (activeTab === 'Paid') {
            getPaid();
        } else if (activeTab === 'Ended') {
            getEnded();
        }
        setFilters({});
    }, [activeTab, getFree, getPaid, getEnded]);

    useEffect(() => {
        const prefetchOthers = async () => {
            await new Promise(resolve => setTimeout(resolve, 2000));

            if (activeTab === 'Free') {
                getPaid();
                getEnded();
            } else if (activeTab === 'Paid') {
                getFree();
                getEnded();
            } else if (activeTab === 'Ended') {
                getFree();
                getPaid();
            }
        };

        prefetchOthers();
    }, [activeTab, getFree, getPaid, getEnded]);

    useEffect(() => {
        const page = searchParams.get('page');
        if (page && !isNaN(parseInt(page, 10))) {
            setCurrentPage(parseInt(page, 10));
        } else {
            setCurrentPage(1);
        }
    }, [searchParams]);

    let currentData: Airdrop[] = [];
    let isLoading = false;

    if (activeTab === 'Free') {
        currentData = freeAirdrops;
        isLoading = loadingFree;
    } else if (activeTab === 'Paid') {
        currentData = paidAirdrops;
        isLoading = loadingPaid;
    } else if (activeTab === 'Ended') {
        currentData = endedAirdrops;
        isLoading = loadingEnded;
    }

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
            const pVesting = normalize(project.vesting);
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
    }, [searchQuery, filters]);

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
                        className="w-full py-3 pl-12 pr-6 rounded-full card-color border border-color focus:outline-none focus:border-blue-500 text-fill-color placeholder:text-fill-color/50"
                    />
                </div>

                {/* Filter Tabs & Dropdown */}
                <div className="mb-12 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto px-4 sm:px-0">
                    <div className="p-1 card-color rounded-full flex sm:inline-flex border border-color/30 w-full sm:w-auto relative">
                        {['Free', 'Paid', 'Ended'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => handleTabChange(tab)}
                                className={`flex-1 sm:flex-none px-4 sm:px-6 py-2 rounded-full text-sm font-medium transition-all ${activeTab === tab
                                    ? 'bg-blue-400/80 text-fill-color shadow-lg'
                                    : 'text-fill-color/60 hover:text-fill-color'
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
                        {/* Project Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                            {displayedProjects.length > 0 ? (
                                displayedProjects.map((project, index) => (
                                    <Link
                                        key={project.id || index}
                                        href={`/airdrops/${project.id || ''}?tab=${activeTab.toLowerCase()}&page=${currentPage}`}
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
                                onPageChange={handlePageChange}
                            />
                        )}
                    </>
                )}
            </div>
        </div>
    );
}