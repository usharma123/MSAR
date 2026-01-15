import type { ChangeEvent } from 'react'

export type FiltersState = {
  state: string
  classSizeMin: string
  classSizeMax: string
  tuitionInMax: string
  tuitionOutMax: string
}

type FiltersProps = {
  filters: FiltersState
  onChange: (next: FiltersState) => void
  onReset: () => void
  states: string[]
}

const Filters = ({ filters, onChange, onReset, states }: FiltersProps) => {
  const updateField = (field: keyof FiltersState) =>
    (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      onChange({
        ...filters,
        [field]: event.target.value,
      })
    }

  return (
    <div 
      className="neo-card p-5"
      style={{ background: '#5ce1e6' }}
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 
          className="text-lg uppercase tracking-tight"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Filters
        </h3>
        <button
          type="button"
          onClick={onReset}
          className="neo-btn neo-btn-yellow text-xs"
        >
          Reset
        </button>
      </div>
      
      <div className="space-y-4">
        <label className="block">
          <span className="mb-2 block text-xs font-bold uppercase tracking-wider">
            State / Province
          </span>
          <select
            value={filters.state}
            onChange={updateField('state')}
            className="neo-select"
          >
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </label>

        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-xs font-bold uppercase tracking-wider">
              Min Class Size
            </span>
            <input
              type="number"
              inputMode="numeric"
              min={0}
              value={filters.classSizeMin}
              onChange={updateField('classSizeMin')}
              placeholder="Any"
              className="neo-input"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-xs font-bold uppercase tracking-wider">
              Max Class Size
            </span>
            <input
              type="number"
              inputMode="numeric"
              min={0}
              value={filters.classSizeMax}
              onChange={updateField('classSizeMax')}
              placeholder="Any"
              className="neo-input"
            />
          </label>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-xs font-bold uppercase tracking-wider">
              Max In-State $
            </span>
            <input
              type="number"
              inputMode="numeric"
              min={0}
              value={filters.tuitionInMax}
              onChange={updateField('tuitionInMax')}
              placeholder="Any"
              className="neo-input"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-xs font-bold uppercase tracking-wider">
              Max Out-State $
            </span>
            <input
              type="number"
              inputMode="numeric"
              min={0}
              value={filters.tuitionOutMax}
              onChange={updateField('tuitionOutMax')}
              placeholder="Any"
              className="neo-input"
            />
          </label>
        </div>
      </div>
    </div>
  )
}

export default Filters
