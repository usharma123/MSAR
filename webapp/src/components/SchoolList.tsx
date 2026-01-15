import SchoolCard from './SchoolCard'
import type { School } from '../data/schools'

type SchoolListProps = {
  schools: School[]
  emptyTitle: string
  emptyNote: string
}

const SchoolList = ({ schools, emptyTitle, emptyNote }: SchoolListProps) => {
  if (schools.length === 0) {
    return (
      <div 
        className="neo-card p-10 text-center"
        style={{ background: '#ffe14d', borderStyle: 'dashed' }}
      >
        <h3 
          className="text-2xl uppercase tracking-tight"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {emptyTitle}
        </h3>
        <p className="mt-2 text-sm font-semibold opacity-70">
          {emptyNote}
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {schools.map((school, index) => (
        <div
          key={school.id}
          className="animate-slide-up"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <SchoolCard school={school} />
        </div>
      ))}
    </div>
  )
}

export default SchoolList
