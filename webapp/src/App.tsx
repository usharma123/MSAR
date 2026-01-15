import { useMemo, useState } from 'react'
import Header from './components/Header'
import StatInput from './components/StatInput'
import SearchBar from './components/SearchBar'
import Filters, { type FiltersState } from './components/Filters'
import SchoolList from './components/SchoolList'
import { schools as allSchools } from './data/schools'

const MATCH_TOLERANCE = {
  mcat: 3,
  gpa: 0.15,
}

const initialFilters: FiltersState = {
  state: 'All',
  classSizeMin: '',
  classSizeMax: '',
  tuitionInMax: '',
  tuitionOutMax: '',
}

const parseNumberInput = (value: string) => {
  if (!value.trim()) {
    return null
  }
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : null
}

const App = () => {
  const [mode, setMode] = useState<'match' | 'browse'>('match')
  const [mcat, setMcat] = useState('')
  const [gpa, setGpa] = useState('')
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState<FiltersState>(initialFilters)

  const states = useMemo(() => {
    const uniqueStates = new Set(
      allSchools.map((school) => school.state).filter((state) => state)
    )
    return ['All', ...Array.from(uniqueStates).sort()]
  }, [])

  const mcatValue = parseNumberInput(mcat)
  const gpaValue = parseNumberInput(gpa)
  const hasStats = mcatValue !== null && gpaValue !== null

  const baseSchools = useMemo(() => {
    if (mode === 'browse') {
      return allSchools
    }

    const parsedMcat = parseNumberInput(mcat)
    const parsedGpa = parseNumberInput(gpa)

    if (parsedMcat === null || parsedGpa === null) {
      return []
    }

    return allSchools.filter((school) => {
      if (school.mcat === null || school.gpa === null) {
        return false
      }

      return (
        Math.abs(school.mcat - parsedMcat) <= MATCH_TOLERANCE.mcat &&
        Math.abs(school.gpa - parsedGpa) <= MATCH_TOLERANCE.gpa
      )
    })
  }, [mode, mcat, gpa])

  const filteredSchools = useMemo(() => {
    const searchQuery = search.trim().toLowerCase()
    const classMin = parseNumberInput(filters.classSizeMin)
    const classMax = parseNumberInput(filters.classSizeMax)
    const tuitionInMax = parseNumberInput(filters.tuitionInMax)
    const tuitionOutMax = parseNumberInput(filters.tuitionOutMax)

    return baseSchools.filter((school) => {
      if (filters.state !== 'All' && school.state !== filters.state) {
        return false
      }

      if (searchQuery) {
        const haystack = [
          school.name,
          school.city,
          school.state,
          school.degree,
        ]
          .join(' ')
          .toLowerCase()
        if (!haystack.includes(searchQuery)) {
          return false
        }
      }

      if (classMin !== null) {
        if (school.classSize === null || school.classSize < classMin) {
          return false
        }
      }

      if (classMax !== null) {
        if (school.classSize === null || school.classSize > classMax) {
          return false
        }
      }

      if (tuitionInMax !== null) {
        if (school.tuitionInState === null || school.tuitionInState > tuitionInMax) {
          return false
        }
      }

      if (tuitionOutMax !== null) {
        if (
          school.tuitionOutState === null ||
          school.tuitionOutState > tuitionOutMax
        ) {
          return false
        }
      }

      return true
    })
  }, [baseSchools, filters, search])

  const emptyTitle =
    mode === 'match' && !hasStats
      ? 'Enter Your Stats'
      : 'No Matches Found'

  const emptyNote =
    mode === 'match' && !hasStats
      ? 'Add your MCAT and GPA to find matching programs.'
      : 'Try adjusting your filters or search terms.'

  return (
    <div className="min-h-screen pb-10">
      <Header 
        totalSchools={allSchools.length} 
        matchCount={filteredSchools.length}
        mode={mode}
      />
      
      <main className="px-4 md:px-8">
        <div className="mx-auto mt-6 max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
            {/* Sidebar */}
            <aside className="space-y-5">
              {/* Mode Toggle - now in sidebar */}
              <div 
                className="neo-card p-4"
                style={{ background: '#ffffff' }}
              >
                <h3 
                  className="mb-3 text-lg uppercase tracking-tight"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  Mode
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {(['match', 'browse'] as const).map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setMode(value)}
                      className={`neo-btn ${
                        mode === value 
                          ? value === 'match' ? 'neo-btn-pink' : 'neo-btn-lime'
                          : ''
                      }`}
                      style={{
                        boxShadow: mode === value ? '4px 4px 0px #000' : 'none',
                        transform: mode === value ? 'translate(-2px, -2px)' : 'none',
                      }}
                    >
                      {value === 'match' ? 'Match' : 'Browse'}
                    </button>
                  ))}
                </div>
              </div>

              {mode === 'match' && (
                <StatInput
                  mcat={mcat}
                  gpa={gpa}
                  onMcatChange={setMcat}
                  onGpaChange={setGpa}
                />
              )}

              <SearchBar value={search} onChange={setSearch} />

              <Filters
                filters={filters}
                onChange={setFilters}
                onReset={() => setFilters(initialFilters)}
                states={states}
              />
            </aside>

            {/* Results */}
            <section>
              <SchoolList
                schools={filteredSchools}
                emptyTitle={emptyTitle}
                emptyNote={emptyNote}
              />
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
