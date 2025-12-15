// Brønnøysund Registrene API integration
// API documentation: https://data.brreg.no/enhetsregisteret/api/docs/index.html

export interface BrregEnhet {
  organisasjonsnummer: string
  navn: string
  organisasjonsform?: {
    kode: string
    beskrivelse: string
  }
  hjemmeside?: string
  postadresse?: {
    adresse?: string[]
    postnummer?: string
    poststed?: string
  }
  forretningsadresse?: {
    adresse?: string[]
    postnummer?: string
    poststed?: string
  }
  naeringskode1?: {
    kode: string
    beskrivelse: string
  }
  antallAnsatte?: number
  stiftelsesdato?: string
}

export interface BrregRolle {
  type: {
    kode: string
    beskrivelse: string
  }
  person?: {
    navn: {
      fornavn?: string
      mellomnavn?: string
      etternavn?: string
    }
    fodselsdato?: string
  }
  enhet?: {
    organisasjonsnummer: string
    organisasjonsform: {
      kode: string
      beskrivelse: string
    }
    navn: string[]
  }
  fratradt?: boolean
}

export interface BrregRollerResponse {
  rollegrupper: {
    type: {
      kode: string
      beskrivelse: string
    }
    roller: BrregRolle[]
  }[]
}

const BRREG_BASE_URL = "https://data.brreg.no/enhetsregisteret/api"

// Fetch company details by organization number
export async function fetchEnhet(orgnr: string): Promise<BrregEnhet | null> {
  try {
    const response = await fetch(`${BRREG_BASE_URL}/enheter/${orgnr}`, {
      headers: { Accept: "application/json" },
    })

    if (!response.ok) {
      if (response.status === 404) return null
      throw new Error(`BRREG API error: ${response.status}`)
    }

    return response.json()
  } catch (error) {
    console.error(`Error fetching enhet ${orgnr}:`, error)
    return null
  }
}

// Fetch all roles for a company
export async function fetchRoller(orgnr: string): Promise<BrregRollerResponse | null> {
  try {
    const response = await fetch(`${BRREG_BASE_URL}/enheter/${orgnr}/roller`, {
      headers: { Accept: "application/json" },
    })

    if (!response.ok) {
      if (response.status === 404) return null
      throw new Error(`BRREG API error: ${response.status}`)
    }

    return response.json()
  } catch (error) {
    console.error(`Error fetching roller for ${orgnr}:`, error)
    return null
  }
}

// Search for companies by name
export async function searchEnheter(query: string, size = 20): Promise<BrregEnhet[]> {
  try {
    const params = new URLSearchParams({
      navn: query,
      size: String(size),
    })

    const response = await fetch(`${BRREG_BASE_URL}/enheter?${params}`, {
      headers: { Accept: "application/json" },
    })

    if (!response.ok) {
      throw new Error(`BRREG API error: ${response.status}`)
    }

    const data = await response.json()
    return data._embedded?.enheter || []
  } catch (error) {
    console.error(`Error searching enheter:`, error)
    return []
  }
}

// Helper to format person name from BRREG response
export function formatPersonName(person: BrregRolle["person"]): string {
  if (!person?.navn) return "Ukjent"
  const { fornavn, mellomnavn, etternavn } = person.navn
  return [fornavn, mellomnavn, etternavn].filter(Boolean).join(" ")
}

// Helper to extract board members from roles
export function extractBoardMembers(roller: BrregRollerResponse): Array<{
  name: string
  role: string
  birthDate?: string
}> {
  const boardRoles = ["STYR", "DAGL", "LEDE", "NEST", "MEDL"] // Styreleder, Daglig leder, etc.
  const members: Array<{ name: string; role: string; birthDate?: string }> = []

  for (const gruppe of roller.rollegrupper) {
    for (const rolle of gruppe.roller) {
      if (rolle.fratradt) continue // Skip resigned members

      if (rolle.person) {
        members.push({
          name: formatPersonName(rolle.person),
          role: rolle.type.beskrivelse,
          birthDate: rolle.person.fodselsdato,
        })
      }
    }
  }

  return members
}

// Known organization numbers for key Norwegian companies
export const knownOrganizations: Record<string, string> = {
  // Kapital
  aker: "886581432", // Aker ASA
  equinor: "923609016", // Equinor ASA
  telenor: "982463718", // Telenor ASA
  dnb: "981276957", // DNB ASA
  orkla: "910747711", // Orkla ASA
  salmar: "983760918", // SalMar ASA
  mowi: "964118191", // Mowi ASA
  ferd: "942094988", // Ferd AS

  // Media
  schibsted: "933739384", // Schibsted ASA
  amedia: "913330999", // Amedia AS
  tv2: "979484534", // TV 2 AS
  nrk: "976390512", // NRK AS

  // Profesjonelle tenester
  "first-house": "994544644", // First House AS
  bahr: "935595941", // BA-HR DA
  thommessen: "957444392", // Advokatfirmaet Thommessen AS

  // Interesseorganisasjonar
  nho: "955600436", // Næringslivets Hovedorganisasjon
  lo: "870448892", // Landsorganisasjonen i Norge

  // Tankesmier
  civita: "985668683", // Civita AS
}
