import HeroSection from "@/components/HeroSection";
import Features from "@/components/Features";
import FAQSection from "@/components/FAQSection";
import AirdropHeatmap from "@/components/AirdropHeatmap";
import { AlphaSection } from "@/components/AlphaSection";
import FindAirdrop from "@/components/FindAirdrop";
import Godhand from "@/components/Godhand";
import Footer from "@/components/Footer";

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
      <AirdropHeatmap />
      <AlphaSection />
      <FindAirdrop />
      <Godhand />
      <FAQSection />
      <Footer />
    </>
  );
}