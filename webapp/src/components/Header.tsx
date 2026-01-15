type HeaderProps = {
  totalSchools: number
  matchCount: number
  mode: 'match' | 'browse'
}

const Header = ({ totalSchools, matchCount, mode }: HeaderProps) => {
  return (
    <header className="px-4 pt-6 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Logo / Title */}
          <div className="flex items-center gap-4">
            <div 
              className="neo-card flex h-12 w-12 items-center justify-center text-xl font-bold"
              style={{ background: '#ffe14d', fontFamily: 'var(--font-display)' }}
            >
              M
            </div>
            <div>
              <h1 
                className="text-2xl uppercase tracking-tight md:text-3xl"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                MSAR Finder
              </h1>
              <p className="text-xs font-semibold uppercase tracking-wider opacity-60">
                Find your med school match
              </p>
            </div>
          </div>

          {/* Stats Pills */}
          <div className="flex flex-wrap gap-3">
            <div 
              className="neo-box flex items-center gap-3 px-4 py-2"
              style={{ background: '#b8ff57' }}
            >
              <div>
                <p className="text-lg font-bold leading-none">
                  {totalSchools}
                </p>
                <p className="text-[10px] font-bold uppercase tracking-wider opacity-60">
                  Total
                </p>
              </div>
            </div>
            <div 
              className="neo-box flex items-center gap-3 px-4 py-2"
              style={{ background: mode === 'match' ? '#ff6b9d' : '#5ce1e6' }}
            >
              <div>
                <p className="text-lg font-bold leading-none">
                  {matchCount}
                </p>
                <p className="text-[10px] font-bold uppercase tracking-wider opacity-60">
                  {mode === 'match' ? 'Matches' : 'Showing'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
