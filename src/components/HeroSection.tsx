'use client';

import Link from "next/link";
import { Button } from "@/components/ui/MovingBorder";
import HighlightText from "@/components/ui/HighlightText";
import Header from "@/components/Header";

export default function HeroSection() {
  return (
    <>
      <Header />
      <div className="relative min-h-screen flex flex-col justify-center overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-b before:from-blue-600/30 before:via-blue-500/10 before:to-transparent before:pointer-events-none via-transparent">
        <div className="relative flex-1 flex items-center">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-0">
            <section className="text-center relative z-10">

              {/* BADGE */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-7 mx-auto">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
                </span>
                <span className="text-xs sm:text-sm font-medium text-fill-color">
                  67+ Live Airdrops
                </span>
              </div>

              {/* TITLE */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-4 sm:mb-6 leading-tight">
                <span className="text-blue-400">Nww </span>
                <HighlightText text="Airdrop" className="text-white" />
              </h1>

              {/* DESCRIPTION */}
              <p className="text-fill-color/70 text-base sm:text-lg md:text-xl mb-8 sm:mb-10 max-w-lg sm:max-w-2xl mx-auto leading-relaxed px-4">
                Discover ongoing and completed airdrops with clear project insights,
                funding details, tokenomics, vesting, and claim status — all in one dashboard.
              </p>

              {/* CTA */}
              <div className="flex justify-center">
                <Button
                  as={Link}
                  href="/airdrops"
                  className="h-12 px-7 text-base bg-gradient-to-r from-blue-500 text-white font-semibold rounded-xl hover:from-blue-600 transition-all transform hover:scale-105"
                  containerClassName="w-auto h-auto"
                >
                  Explore Airdrops
                </Button>
              </div>

            </section>
          </div>
        </div>
      </div>
    </>
  );
}