import type { School } from '../data/schools'

const numberFormatter = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 0,
})

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

const formatValue = (value: number | null, formatter?: Intl.NumberFormat) => {
  if (value === null) {
    return 'N/A'
  }
  return (formatter ?? numberFormatter).format(value)
}

const colors = [
  '#ff6b9d', // pink
  '#ffe14d', // yellow
  '#b8ff57', // lime
  '#5ce1e6', // blue
  '#ff914d', // orange
  '#cb6ce6', // purple
]

const getColorForSchool = (id: string | number) => {
  const hash = String(id).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return colors[hash % colors.length]
}

type SchoolCardProps = {
  school: School
}

const SchoolCard = ({ school }: SchoolCardProps) => {
  const accentColor = getColorForSchool(school.id)
  
  return (
    <article className="neo-card flex h-full flex-col overflow-hidden">
      {/* Header accent bar */}
      <div 
        className="h-3 w-full"
        style={{ background: accentColor }}
      />
      
      <div className="flex flex-1 flex-col p-5">
        {/* School Name & Location */}
        <div className="mb-4">
          <h3 
            className="text-lg uppercase leading-tight tracking-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {school.name}
          </h3>
          <p className="mt-1 text-sm font-semibold opacity-60">
            {school.city}
            {school.city && school.state ? ', ' : ''}
            {school.state}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div 
            className="neo-box p-3 text-center"
            style={{ background: '#ffe14d' }}
          >
            <p className="text-[10px] font-bold uppercase tracking-wider opacity-70">
              MCAT
            </p>
            <p className="text-xl font-bold">
              {formatValue(school.mcat)}
            </p>
          </div>
          <div 
            className="neo-box p-3 text-center"
            style={{ background: '#b8ff57' }}
          >
            <p className="text-[10px] font-bold uppercase tracking-wider opacity-70">
              GPA
            </p>
            <p className="text-xl font-bold">
              {school.gpa === null ? 'N/A' : school.gpa.toFixed(2)}
            </p>
          </div>
          <div 
            className="neo-box p-3 text-center"
            style={{ background: '#5ce1e6' }}
          >
            <p className="text-[10px] font-bold uppercase tracking-wider opacity-70">
              Class Size
            </p>
            <p className="text-xl font-bold">
              {formatValue(school.classSize)}
            </p>
          </div>
          <div 
            className="neo-box p-3 text-center"
            style={{ background: '#ff6b9d' }}
          >
            <p className="text-[10px] font-bold uppercase tracking-wider opacity-70">
              In-State
            </p>
            <p className="text-lg font-bold">
              {formatValue(school.tuitionInState, currencyFormatter)}
            </p>
          </div>
        </div>

        {/* Out of State Tuition */}
        <div 
          className="neo-box mt-3 p-3 text-center"
          style={{ background: '#ff914d' }}
        >
          <p className="text-[10px] font-bold uppercase tracking-wider opacity-70">
            Out-of-State Tuition
          </p>
          <p className="text-xl font-bold">
            {formatValue(school.tuitionOutState, currencyFormatter)}
          </p>
        </div>

        {/* Degree Tag */}
        <div className="mt-4 flex">
          <span 
            className="neo-tag"
            style={{ background: '#cb6ce6' }}
          >
            {school.degree || 'MD Program'}
          </span>
        </div>
      </div>
    </article>
  )
}

export default SchoolCard
