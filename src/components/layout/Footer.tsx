export default function Footer() {
  return (
    <footer className="mt-auto border-t border-[#1E3350] bg-[#0D1B2A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[#6B7E94] text-xs tracking-wide">
            <span className="text-[#C9A84C] font-semibold">AuChain</span>
            {' · '}Trust intelligence for tokenized assets
            {' · '}v1 methodology
            {' · '}
            <span className="italic">Benchmark, not investment advice.</span>
          </p>
          <p className="text-[#6B7E94] text-xs">
            Market data via{' '}
            <a
              href="https://www.coingecko.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#C9A84C] hover:text-[#E8C97A] transition-colors"
            >
              CoinGecko
            </a>
            {' · '}Trust inputs as of Q1 2026
            {' · '}Coverage expanding
          </p>
        </div>
      </div>
    </footer>
  );
}
