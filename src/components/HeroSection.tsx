'use client';

import Link from "next/link";
import { Button } from "@/components/ui/moving-border";
import HighlightText from "@/components/ui/highlight-text";
import Header from "@/components/Header";

export default function HeroSection() {
  return (
    <>
      <Header />
      <div className="relative min-h-[70svh] sm:min-h-screen overflow-hidden pt-14 sm:pt-10">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-40 md:pt-40 pb-16 z-20">
          {/* GLOW CIRCLES */}
          <div className="absolute -top-40 -left-40 sm:-top-20 sm:-left-20 w-80 h-80 sm:w-72 sm:h-72 bg-blue-500/30 rounded-full blur-3xl"></div>
          <div className="absolute -top-40 -right-40 sm:top-0 sm:-right-20 w-80 h-80 sm:w-72 sm:h-72 bg-blue-700/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-32 -right-16 sm:-bottom-36 sm:-right-20 w-40 h-40 sm:w-36 sm:h-36 bg-blue-700/50 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 sm:-bottom-36 sm:-left-36 w-60 h-60 sm:w-56 sm:h-56 bg-blue-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-r from-blue-500/50 to-blue-700/30 rounded-full blur-3xl"></div>
          <div className="hidden sm:block absolute -bottom-12 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-500/10 via-blue-800/10 to-pink-500/10 rounded-full blur-[100px]"></div>
          
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
            <h1 className="sm:text-6xl text-5xl font-extrabold mb-4">
              <span className="text-blue-400">Nww </span>

              <HighlightText
                text="Airdrop"
                className="text-white"
              />
            </h1>

            {/* DESC */}
            <p className="text-fill-color/70 text-base sm:text-lg mb-7 max-w-lg sm:max-w-2xl mx-auto leading-relaxed">
              Discover ongoing and completed airdrops with clear project insights,
              funding details, tokenomics, vesting, and claim status — all in one dashboard.
            </p>

            {/* CTA */}
            <div className="flex justify-center">
              <Button
                as={Link}
                href="/airdrops"
                className="
                  h-12 px-7 text-base sm:h-11 sm:px-6 sm:text-base
                  bg-gradient-to-r from-blue-500
                  text-white font-semibold
                  rounded-xl
                  hover:from-blue-600
                "
                containerClassName="w-auto h-auto"
              >
                Explore Airdrops
              </Button>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}