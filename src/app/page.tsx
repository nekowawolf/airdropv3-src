export default function HomePage() {
  return (
    <main className="max-w-4xl mx-auto px-6 sm:px-8 py-12 sm:py-16">
      <section className="text-center">
        <h1 className="text-fill-color text-3xl sm:text-5xl font-bold mb-3 sm:mb-4">
        Nww Airdrop
        </h1>
        <p className="text-fill-color/80 text-sm sm:text-lg mb-6 sm:mb-8">
          Discover ongoing and ended airdrops. Explore funding details, project descriptions, and statuses quickly.
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
