type StatInputProps = {
  mcat: string
  gpa: string
  onMcatChange: (value: string) => void
  onGpaChange: (value: string) => void
}

const StatInput = ({ mcat, gpa, onMcatChange, onGpaChange }: StatInputProps) => {
  return (
    <div 
      className="neo-card p-5"
      style={{ background: '#ffe14d' }}
    >
      <div className="mb-4">
        <h3 
          className="text-lg uppercase tracking-tight"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Your Stats
        </h3>
        <p className="text-xs font-semibold uppercase tracking-wider opacity-60">
          +/- 3 MCAT • 0.15 GPA tolerance
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-xs font-bold uppercase tracking-wider">
            MCAT Score
          </span>
          <input
            type="number"
            min={472}
            max={528}
            step={1}
            inputMode="numeric"
            value={mcat}
            onChange={(event) => onMcatChange(event.target.value)}
            placeholder="e.g. 515"
            className="neo-input"
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-xs font-bold uppercase tracking-wider">
            GPA
          </span>
          <input
            type="number"
            min={0}
            max={4.0}
            step={0.01}
            inputMode="decimal"
            value={gpa}
            onChange={(event) => onGpaChange(event.target.value)}
            placeholder="e.g. 3.72"
            className="neo-input"
          />
        </label>
      </div>
    </div>
  )
}

export default StatInput
