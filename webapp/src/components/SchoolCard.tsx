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

const mdColors = [
  '#ff6b9d', // pink
  '#ffe14d', // yellow
  '#5ce1e6', // blue
  '#ff914d', // orange
  '#cb6ce6', // purple
]

const doColors = [
  '#b8ff57', // lime
  '#7dd3fc', // sky blue
  '#a3e635', // lime green
  '#34d399', // emerald
  '#22d3d3', // cyan
]

const getColorForSchool = (id: string | number, degreeType: 'MD' | 'DO') => {
  const hash = String(id).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  const colors = degreeType === 'DO' ? doColors : mdColors
  return colors[hash % colors.length]
}

type SchoolCardProps = {
  school: School
}

const SchoolCard = ({ school }: SchoolCardProps) => {
  const accentColor = getColorForSchool(school.id, school.degreeType)
  const degreeColor = school.degreeType === 'DO' ? '#b8ff57' : '#ff6b9d'
  
  return (
    <article className="neo-card flex h-full flex-col overflow-hidden">
      {/* Header accent bar with degree indicator */}
      <div 
        className="flex h-3 w-full items-center justify-between"
        style={{ background: accentColor }}
      >
        <span 
          className="h-full px-2 text-[9px] font-black leading-[12px] tracking-wider"
          style={{ background: degreeColor }}
        >
          {school.degreeType}
        </span>
      </div>
      
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

        {/* Degree Tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          <span 
            className="neo-tag"
            style={{ background: school.degreeType === 'DO' ? '#b8ff57' : '#ff6b9d' }}
          >
            {school.degreeType}
          </span>
          {school.degree && school.degree !== school.degreeType && (
            <span 
              className="neo-tag"
              style={{ background: '#cb6ce6' }}
            >
              {school.degree}
            </span>
          )}
        </div>
      </div>
    </article>
  )
}

export default SchoolCard
