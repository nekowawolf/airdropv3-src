'use client';

import ScrollVelocity from "./ui/ReactScrollVelocity";

export default function FindAirdrop() {
  const texts = [
    "Find your alpha airdrop",
    "Find your alpha airdrop",
  ];

  return (
    <section id="alpha" className="relative py-20 overflow-hidden">
      <ScrollVelocity
        texts={texts}
        velocity={100}
        damping={50}
        stiffness={400}
        numCopies={6}
        className="text-fill-color"
        parallaxClassName="relative"
        scrollerClassName="flex justify-center text-3xl sm:text-6xl font-semibold tracking-tight"
      />
    </section>
  );
}