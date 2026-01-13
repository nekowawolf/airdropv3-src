'use client';

import { Button } from "@/components/ui/moving-border";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="relative max-w-4xl mx-auto px-6 sm:px-8 pt-20 sm:pt-44 pb-16 z-20">
      <div className="relative max-w-4xl mx-auto px-6 sm:px-8 pt-20 sm:pt-0 pb-16 z-20">
        <section className="text-center">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-7 mx-auto">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
            </span>
            <span className="text-xs sm:text-sm font-medium text-fill-color">
              67+ Live Airdrops
            </span>
          </div>

          <h1 className="text-transparent bg-clip-text bg-blue-400 text-5xl sm:text-6xl font-extrabold mb-4">
            Nww Airdrop
          </h1>

          <p className="text-fill-color/70 text-base sm:text-lg mb-7 max-w-lg sm:max-w-2xl mx-auto leading-relaxed">
            Discover ongoing and completed airdrops with clear project insights,
            funding details, tokenomics, vesting, and claim status — all in one dashboard.
          </p>

          <div className="flex justify-center">
            <Button
              as={Link}
              href="/airdrops"
              className="h-12 px-7 text-base sm:h-11 sm:px-6 sm:text-base"
              containerClassName="w-auto h-auto"
            >
              Explore Airdrops
            </Button>
          </div>

        </section>
      </div>
    </div>
  );
}