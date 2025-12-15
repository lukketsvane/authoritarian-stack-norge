import { type NextRequest, NextResponse } from "next/server"
import { fetchEnhet, fetchRoller, searchEnheter, knownOrganizations } from "@/lib/brreg"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const action = searchParams.get("action")
  const orgnr = searchParams.get("orgnr")
  const query = searchParams.get("query")
  const id = searchParams.get("id")

  try {
    // Get organization number from ID if provided
    let targetOrgnr = orgnr
    if (id && knownOrganizations[id]) {
      targetOrgnr = knownOrganizations[id]
    }

    switch (action) {
      case "enhet":
        if (!targetOrgnr) {
          return NextResponse.json({ error: "Missing orgnr or id" }, { status: 400 })
        }
        const enhet = await fetchEnhet(targetOrgnr)
        return NextResponse.json(enhet || { error: "Not found" })

      case "roller":
        if (!targetOrgnr) {
          return NextResponse.json({ error: "Missing orgnr or id" }, { status: 400 })
        }
        const roller = await fetchRoller(targetOrgnr)
        return NextResponse.json(roller || { error: "Not found" })

      case "search":
        if (!query) {
          return NextResponse.json({ error: "Missing query" }, { status: 400 })
        }
        const results = await searchEnheter(query)
        return NextResponse.json({ enheter: results })

      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }
  } catch (error) {
    console.error("BRREG API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
