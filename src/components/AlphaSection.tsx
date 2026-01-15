"use client";

import { AlphaRadar } from "./ui/AlphaRadar";
import { FlipWords } from "./ui/FlipWords";

export const AlphaSection = () => {
    return (
        <section className="relative w-full py-20 overflow-hidden">
            <div className="container mx-auto px-4 text-center">

                {/* Title */}
                <h2 className="mb-4 text-2xl font-extrabold text-fill-color sm:text-4xl xl:text-5xl"> Early airdrop signals sourced from
                   <FlipWords
                    words={['X', 'Telegram', 'Discord', 'other platforms']}
                    duration={4000}    
                    wordDelay={0.5}    
                    letterDelay={0.08}
                    className="inline-block text-blue-500"
                    />
                </h2>

                {/* Radar Animation */}
                <div className="relative w-full flex justify-center">
                    <AlphaRadar />
                </div>

            </div>
        </section>
    );
};