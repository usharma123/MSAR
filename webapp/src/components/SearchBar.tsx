type SearchBarProps = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

const SearchBar = ({ value, onChange, placeholder }: SearchBarProps) => {
  return (
    <div 
      className="neo-card p-5"
      style={{ background: '#ff6b9d' }}
    >
      <h3 
        className="mb-3 text-lg uppercase tracking-tight"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        Search
      </h3>
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder ?? 'Search schools, cities, or degrees...'}
        className="neo-input"
        style={{ fontSize: '16px' }}
      />
    </div>
  )
}

export default SearchBar
