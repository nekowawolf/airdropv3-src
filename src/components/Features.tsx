'use client';

import { BsStars } from "react-icons/bs";

export default function Features() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 text-center">

        {/* Badge */}
        <span className="relative mb-4 inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-medium glass-card">
          <BsStars className="text-blue-400" />
          <span className="text-fill-color">Main Features</span>
        </span>

        {/* Title */}
        <h2 className="mb-4 text-2xl font-extrabold text-fill-color sm:text-4xl xl:text-5xl">
          Key Features of Nww Airdrop
        </h2>

        {/* Description */}
        <p className="mx-auto mb-16 max-w-[714px] font-medium text-fill-color/70">
          Everything you need to discover, track, and claim airdrops in one place.
        </p>

        {/* Card Grid */}
        <div className="grid grid-cols-12 gap-4 max-w-6xl mx-auto text-left">

          {/* Card 1 */}
          <div className="glass-1 hover:glass-2 group relative col-span-12 md:col-span-6 lg:col-span-5 rounded-xl p-5 shadow-lg transition-all">
            <div className="flex flex-col items-start gap-3">
              <h3 className="text-xl font-semibold tracking-tight text-fill-color">
                Airdrops Tracking
              </h3>
              <p className="text-sm leading-relaxed text-fill-color/70">
                Real-time tracking of upcoming and active airdrops with detailed eligibility criteria.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="glass-1 hover:glass-2 group relative col-span-12 md:col-span-6 lg:col-span-7 rounded-xl p-5 shadow-lg transition-all">
            <div className="flex flex-col items-start gap-3">
              <h3 className="text-xl font-semibold tracking-tight text-fill-color">
                Project + Funding Data
              </h3>
              <p className="text-sm leading-relaxed text-fill-color/70 max-w-[520px]">
                Deep dive into project fundamentals, backing, and funding rounds to make informed decisions.
              </p>
            </div>

            <div className="hidden lg:flex grow items-center justify-center min-h-[160px]" />
          </div>

          {/* Card 3 */}
          <div className="glass-1 hover:glass-2 group relative col-span-12 md:col-span-6 lg:col-span-7 rounded-xl p-5 shadow-lg transition-all">
            <div className="flex flex-col items-start gap-3">
              <h3 className="text-xl font-semibold tracking-tight text-fill-color">
                Tokenomics & Vesting
              </h3>
              <p className="text-sm leading-relaxed text-fill-color/70 max-w-[520px]">
                Visualize token unlocks, distribution schedules, and inflationary pressure.
              </p>
            </div>

            <div className="hidden lg:flex grow items-end justify-center min-h-[140px]" />
          </div>

          {/* Card 4 */}
          <div className="glass-1 hover:glass-2 group relative col-span-12 md:col-span-6 lg:col-span-5 rounded-xl p-5 shadow-lg transition-all">
            <div className="flex flex-col items-start gap-3">
              <h3 className="text-xl font-semibold tracking-tight text-fill-color">
                Claim Status
              </h3>
              <p className="text-sm leading-relaxed text-fill-color/70">
                Never miss a claim deadline. Track your claim status across multiple chains.
              </p>
            </div>

            <div className="hidden lg:flex grow items-end justify-center min-h-[180px]" />
          </div>

        </div>
      </div>
    </section>
  );
}
