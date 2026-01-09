export default function HomePage() {
  return (
    <main className="max-w-4xl mx-auto px-6 sm:px-8 pt-24 sm:pt-32 pb-12 sm:pb-16">
      <section className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6 mx-auto">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          <span className="text-sm font-medium text-fill-color">67+ Live Airdrops</span>
        </div>
        <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-300 to-white text-4xl sm:text-6xl font-bold mb-3 sm:mb-4">
          Nww Airdrop
        </h1>
        <p className="text-fill-color/60 text-sm sm:text-lg mb-5 sm:mb-7 max-w-md sm:max-w-2xl mx-auto">
          Discover ongoing and completed airdrops with clear project insights, funding details, tokenomics, vesting, and claim status — all in one dashboard.
        </p>
        <div className="flex items-center gap-3 justify-center">
          <input
            type="text"
            placeholder="Search airdrops..."
            className="card-color w-full max-w-lg h-10 sm:h-12 rounded-md border border-color px-4 text-fill-color placeholder:text-fill-color/70 outline-none"
          />
          <button className="card-color h-10 sm:h-12 px-5 rounded-md border border-color text-fill-color">
            Search
          </button>
        </div>
      </section>
    </main>
  );
}