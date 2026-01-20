import rawMdSchools from './schools.json'
import rawDoSchools from './do_schools.json'

export type DegreeType = 'MD' | 'DO'

export type School = {
  id: string
  name: string
  city: string
  state: string
  mcat: number | null
  gpa: number | null
  degree: string
  degreeType: DegreeType
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

const parseSchools = (rawList: RawSchool[], degreeType: DegreeType): School[] => {
  return rawList.map((school, index) => {
    const name = school.Name?.trim() || 'Unknown School'
    const state = school.State?.trim() || ''

    return {
      id: `${degreeType}-${name}-${state}-${index}`,
      name,
      city: school.City?.trim() || '',
      state,
      mcat: toNumber(school.MCAT),
      gpa: toNumber(school.GPA),
      degree: school.Degree?.trim() || degreeType,
      degreeType,
      classSize: toNumber(school['Class Size']),
      tuitionInState: toNumber(school['In-state']),
      tuitionOutState: toNumber(school['Out-State']),
    }
  })
}

const mdSchools = parseSchools(rawMdSchools as RawSchool[], 'MD')
const doSchools = parseSchools(rawDoSchools as RawSchool[], 'DO')

// Combined list of all schools
export const schools: School[] = [...mdSchools, ...doSchools]

// Separate exports if needed
export const mdSchoolsList = mdSchools
export const doSchoolsList = doSchools
