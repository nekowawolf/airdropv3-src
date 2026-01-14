import HeroSection from "@/components/HeroSection";
import Features from "@/components/Features";

export const metadata = {
  title: "Nww",
  description:
    "Discover ongoing and completed airdrops with clear project insights, tokenomics, vesting, and claim status.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <Features />
    </>
  );
}