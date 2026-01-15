import rawSchools from './schools.json'

export type School = {
  id: string
  name: string
  city: string
  state: string
  mcat: number | null
  gpa: number | null
  degree: string
  classSize: number | null
  tuitionInState: number | null
  tuitionOutState: number | null
}

type RawSchool = {
  Name?: string
  City?: string
  State?: string
  MCAT?: number | string
  GPA?: number | string
  Degree?: string
  'Class Size'?: number | string
  'In-state'?: number | string
  'Out-State'?: number | string
}

const toNumber = (value: unknown): number | null => {
  if (value === null || value === undefined) {
    return null
  }

  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : null
  }

  if (typeof value === 'string') {
    const trimmed = value.trim()
    if (!trimmed) {
      return null
    }
    const normalized = trimmed.replace(/[$,]/g, '')
    const parsed = Number(normalized)
    return Number.isFinite(parsed) ? parsed : null
  }

  return null
}

const rawList = rawSchools as RawSchool[]

export const schools: School[] = rawList.map((school, index) => {
  const name = school.Name?.trim() || 'Unknown School'
  const state = school.State?.trim() || ''

  return {
    id: `${name}-${state}-${index}`,
    name,
    city: school.City?.trim() || '',
    state,
    mcat: toNumber(school.MCAT),
    gpa: toNumber(school.GPA),
    degree: school.Degree?.trim() || 'Not Provided',
    classSize: toNumber(school['Class Size']),
    tuitionInState: toNumber(school['In-state']),
    tuitionOutState: toNumber(school['Out-State']),
  }
})
