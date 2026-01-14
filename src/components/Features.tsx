'use client';

import { BsStars } from "react-icons/bs";

export default function Features() {
  return (
    <section className="relative py-20">
      <div className="relative z-10 mb-16 text-center">

        {/* SUBTITLE BADGE */}
        <span className="relative mb-4 inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium glass-card">
          <BsStars className="text-blue-400" />
          <span className="text-fill-color">Main Features</span>
        </span>

        {/* TITLE */}
        <h2 className="mb-4 text-2xl font-extrabold text-fill-color sm:text-4xl xl:text-5xl">
          Key Features of Nww Airdrop
        </h2>

        {/* DESCRIPTION */}
        <p className="mx-auto max-w-[714px] font-medium text-fill-color/70">
          All airdrop data you need, projects, funding, tokenomics, and claims
        </p>

      </div>
    </section>
  );
}