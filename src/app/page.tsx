'use client';

import { Button } from "@/components/ui/moving-border";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="relative w-full">
      <div className="relative max-w-4xl mx-auto px-6 sm:px-8 pt-24 sm:pt-32 pb-12 sm:pb-16 z-20">
      <section className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6 mx-auto">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          <span className="text-[9px] sm:text-sm font-medium text-fill-color">67+ Live Airdrops</span>
        </div>
        <h1 className="text-transparent bg-clip-text bg-blue-400 text-4xl sm:text-6xl font-bold mb-3 sm:mb-4">
          Nww Airdrop
        </h1>
        <p className="text-fill-color/60 text-sm sm:text-lg mb-5 sm:mb-7 max-w-md sm:max-w-2xl mx-auto">
          Discover ongoing and completed airdrops with clear project insights, funding details, tokenomics, vesting, and claim status — all in one dashboard.
        </p>
        <div className="flex items-center gap-3 justify-center">
        <Button
          as={Link}
          href="/airdrops"
          className="h-9 px-4 text-sm sm:h-11 sm:px-6 sm:text-base"
          containerClassName="w-auto h-auto"
        >
          Explore Airdrops
        </Button>
        </div>
      </section>
      </div>
    </main>
  );
}