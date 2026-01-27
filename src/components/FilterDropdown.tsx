'use client';

import { useRef, useEffect, useState } from 'react';
import { FilterOptions } from '@/types/airdrop';
import { FiFilter, FiChevronDown, FiX, FiCheck } from 'react-icons/fi';

interface FilterDropdownProps {
    type: 'Free' | 'Paid' | 'Ended';
    filters: FilterOptions;
    setFilters: (filters: FilterOptions) => void;
    resetFilters: () => void;
}

export default function FilterDropdown({
    type,
    filters,
    setFilters,
    resetFilters,
}: FilterDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [tempFilters, setTempFilters] = useState<FilterOptions>(filters);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            setTempFilters(filters);
        }
    }, [isOpen, filters]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleCheckbox = (key: 'levels' | 'tasks' | 'vesting', value: string, checked: boolean) => {
        setTempFilters((prev) => {
            const arr = prev[key] ? [...prev[key]!] : [];
            if (checked) {
                if (!arr.includes(value)) arr.push(value);
            } else {
                const idx = arr.indexOf(value);
                if (idx !== -1) arr.splice(idx, 1);
            }
            return { ...prev, [key]: arr };
        });
    };

    const isChanged = JSON.stringify(tempFilters) !== JSON.stringify(filters);

    const applyFilters = () => {
        setFilters(tempFilters);
        setIsOpen(false);
    };

    const clearAndClose = () => {
        resetFilters();
        setIsOpen(false);
    };

    const isChecked = (key: 'levels' | 'tasks' | 'vesting', value: string) => {
        return tempFilters[key]?.includes(value) || false;
    };

    const renderFilterContent = () => {
        if (type === 'Ended') {
            return (
                <div className="p-4 space-y-4">
                    <div>
                        <span className="text-sm font-semibold text-fill-color/80 block mb-2 uppercase tracking-wider">Vesting</span>
                        <div className="space-y-2">
                            <Checkbox label="Yes" checked={isChecked('vesting', 'yes')} onChange={(c) => handleCheckbox('vesting', 'yes', c)} />
                            <Checkbox label="No" checked={isChecked('vesting', 'no')} onChange={(c) => handleCheckbox('vesting', 'no', c)} />
                        </div>
                    </div>
                </div>
            );
        }

        if (type === 'Paid') {
            return (
                <div className="p-4 space-y-4">
                    <div>
                        <span className="text-sm font-semibold text-fill-color/80 block mb-2 uppercase tracking-wider">Funding</span>
                        <div className="space-y-2">
                            <Checkbox label="Low (N/A-5M>)" checked={isChecked('levels', 'easy')} onChange={(c) => handleCheckbox('levels', 'easy', c)} />
                            <Checkbox label="Mid (5M-20M>)" checked={isChecked('levels', 'medium')} onChange={(c) => handleCheckbox('levels', 'medium', c)} />
                            <Checkbox label="High (20M-50M>)" checked={isChecked('levels', 'hard')} onChange={(c) => handleCheckbox('levels', 'hard', c)} />
                        </div>
                    </div>
                    <div className="h-px bg-white/10 w-full" />
                    <div>
                        <span className="text-sm font-semibold text-fill-color/80 block mb-2 uppercase tracking-wider">Task</span>
                        <div className="space-y-2">
                            <Checkbox label="Retro" checked={isChecked('tasks', 'retro')} onChange={(c) => handleCheckbox('tasks', 'retro', c)} />
                            <Checkbox label="Stake" checked={isChecked('tasks', 'stake')} onChange={(c) => handleCheckbox('tasks', 'stake', c)} />
                            <Checkbox label="Hold" checked={isChecked('tasks', 'hold')} onChange={(c) => handleCheckbox('tasks', 'hold', c)} />
                            <Checkbox label="Node" checked={isChecked('tasks', 'node')} onChange={(c) => handleCheckbox('tasks', 'node', c)} />
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <div className="p-4 space-y-4">
                <div>
                    <span className="text-sm font-semibold text-fill-color/80 block mb-2 uppercase tracking-wider">Funding</span>
                    <div className="space-y-2">
                        <Checkbox label="Low (N/A-5M>)" checked={isChecked('levels', 'easy')} onChange={(c) => handleCheckbox('levels', 'easy', c)} />
                        <Checkbox label="Mid (5M-20M>)" checked={isChecked('levels', 'medium')} onChange={(c) => handleCheckbox('levels', 'medium', c)} />
                        <Checkbox label="High (20M-50M>)" checked={isChecked('levels', 'hard')} onChange={(c) => handleCheckbox('levels', 'hard', c)} />
                    </div>
                </div>
                <div className="h-px bg-white/10 w-full" />
                <div>
                    <span className="text-sm font-semibold text-fill-color/80 block mb-2 uppercase tracking-wider">Task</span>
                    <div className="space-y-2">
                        <Checkbox label="Daily" checked={isChecked('tasks', 'daily')} onChange={(c) => handleCheckbox('tasks', 'daily', c)} />
                        <Checkbox label="Testnet" checked={isChecked('tasks', 'testnet')} onChange={(c) => handleCheckbox('tasks', 'testnet', c)} />
                        <Checkbox label="Game" checked={isChecked('tasks', 'game')} onChange={(c) => handleCheckbox('tasks', 'game', c)} />
                        <Checkbox label="Social" checked={isChecked('tasks', 'social')} onChange={(c) => handleCheckbox('tasks', 'social', c)} />
                        <Checkbox label="DePin" checked={isChecked('tasks', 'depin')} onChange={(c) => handleCheckbox('tasks', 'depin', c)} />
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`
            flex items-center justify-center gap-2 px-4 py-2 rounded-full text-sm font-medium
            border border-color/30 backdrop-blur-md
            ${isOpen ? 'bg-blue-500/20 text-fill-color border-blue-500/50' : 'card-color text-fill-color/80 hover:text-fill-color hover:border-color/60'}
        `}
            >
                <FiFilter className={`w-4 h-4 ${isOpen ? 'text-blue-400' : ''}`} />
                <span>Filter</span>
                <FiChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <div className="absolute z-50 mt-2 w-64 rounded-xl glass-card border border-color/20 shadow-xl overflow-hidden ring-1 ring-black ring-opacity-5 focus:outline-none animate-in fade-in zoom-in-95 duration-200
                    left-1/2 -translate-x-1/2 origin-top
                    sm:left-auto sm:right-0 sm:translate-x-0 sm:origin-top-right
                ">
                    <div className="max-h-[60vh] overflow-y-auto custom-scrollbar p-1">
                        {renderFilterContent()}
                    </div>

                    <div className="p-3 border-t border-color/10 flex gap-2">
                        <button
                            onClick={clearAndClose}
                            className="flex-1 px-3 py-2 rounded-lg text-xs font-medium text-fill-color/70 hover:bg-white/5 hover:text-fill-color transition-colors"
                            disabled={Object.keys(filters).every(k => !filters[k as keyof FilterOptions] || filters[k as keyof FilterOptions]?.length === 0) && JSON.stringify(tempFilters) === JSON.stringify(filters)}
                        >
                            Clear
                        </button>
                        <button
                            onClick={applyFilters}
                            className="flex-1 px-3 py-2 rounded-lg text-xs font-medium bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20 transition-all"
                        >
                            Apply
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

function Checkbox({ label, checked, onChange }: { label: string | React.ReactNode, checked: boolean, onChange: (checked: boolean) => void }) {
    return (
        <label className="flex items-center gap-3 cursor-pointer group select-none">
            <div className={`
                w-5 h-5 rounded-md border flex items-center justify-center transition-all duration-200
                ${checked ? 'bg-blue-500 border-blue-500 text-white' : 'border-fill-color/30 group-hover:border-blue-400/50 bg-white/5'}
            `}>
                {checked && <FiCheck className="w-3.5 h-3.5" />}
            </div>
            <input
                type="checkbox"
                className="hidden"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
            />
            <span className={`text-sm transition-colors ${checked ? 'text-fill-color' : 'text-fill-color/70 group-hover:text-fill-color'}`}>
                {label}
            </span>
        </label>
    );
}