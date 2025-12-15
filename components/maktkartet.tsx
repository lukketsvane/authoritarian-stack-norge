"use client"

import { useState, useRef, useEffect } from "react"
import { powerData, clusterColors, clusterPositions } from "./maktkartet/data"

export default function Maktkartet() {
  const [selectedNode, setSelectedNode] = useState<any>(null)
  const [hoveredNode, setHoveredNode] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeSection, setActiveSection] = useState("hero")
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = Math.min(scrollY / docHeight, 1)
      setScrollProgress(progress)

      const sections = ["hero", "narrative", "kingmakers", "pipeline", "map", "credits"]
      const sectionElements = sections.map((id) => document.getElementById(id))

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const el = sectionElements[i]
        if (el && el.getBoundingClientRect().top <= window.innerHeight / 2) {
          setActiveSection(sections[i])
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const allNodes = [
    ...powerData.kingmakers,
    ...powerData.companies,
    ...powerData.state,
    ...powerData.orgs,
    ...powerData.professionals,
    ...powerData.foreign,
  ]

  const filteredNodes = searchQuery
    ? allNodes.filter((n) => n.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : allNodes

  return (
    <div ref={containerRef} className="relative">
      <NetworkBackground scrollProgress={scrollProgress} />

      {/* Progress indicator */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-stone-200/30">
        <div
          className="h-full transition-all duration-100"
          style={{
            width: `${scrollProgress * 100}%`,
            background: "linear-gradient(90deg, #c4a35a, #8b4513)",
          }}
        />
      </div>

      {/* Navigation dots */}
      <nav className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-3">
        {["hero", "narrative", "kingmakers", "pipeline", "map"].map((section) => (
          <button
            key={section}
            onClick={() => document.getElementById(section)?.scrollIntoView({ behavior: "smooth" })}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              activeSection === section ? "bg-amber-700 scale-125" : "bg-stone-400/50 hover:bg-stone-500"
            }`}
            aria-label={`Gå til ${section}`}
          />
        ))}
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex flex-col items-center justify-center relative px-4">
        <div className="relative z-10 text-center max-w-4xl">
          <div
            className="absolute -left-20 bottom-20 text-sm tracking-widest hidden lg:block"
            style={{ color: "#c4a35a" }}
          >
            Kapital
          </div>
          <div
            className="absolute -right-20 bottom-20 text-sm tracking-widest hidden lg:block"
            style={{ color: "#2f4f4f" }}
          >
            Stat
          </div>
          <div
            className="absolute left-1/2 -translate-x-1/2 -top-16 text-sm tracking-widest hidden lg:block"
            style={{ color: "#8b4513" }}
          >
            Media
          </div>

          <h1 className="font-serif text-5xl sm:text-6xl md:text-8xl font-bold mb-6 tracking-tight text-stone-900">
            Maktkartet
          </h1>
          <p className="font-serif text-lg sm:text-xl md:text-2xl mb-12 leading-relaxed text-stone-600 max-w-2xl mx-auto">
            Korleis kapital, media og stat heng saman i Noreg — og kvifor det angår deg
          </p>

          <button
            onClick={() => document.getElementById("narrative")?.scrollIntoView({ behavior: "smooth" })}
            className="group flex items-center gap-2 mx-auto text-base sm:text-lg tracking-wide text-stone-700 hover:text-stone-900 transition-colors"
          >
            <span>Scroll for å utforske</span>
            <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </div>
      </section>

      {/* Narrative Section */}
      <section id="narrative" className="min-h-screen flex items-center justify-center px-4 py-24 bg-stone-200/80">
        <div className="max-w-2xl">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-center text-stone-900">
            Kven styrer eigentleg Noreg?
          </h2>
          <div className="h-px w-24 mx-auto mb-8 bg-stone-900" />

          <div className="space-y-6 text-base sm:text-lg leading-relaxed font-serif text-stone-800">
            <p>
              <span className="text-4xl sm:text-5xl float-left mr-2 leading-none font-bold">N</span>
              oreg framstår som eit av verdas mest demokratiske land. Men bak fasaden av likskap og open debatt skjuler
              det seg eit tett nettverk av makt.
            </p>
            <p>
              <strong>Tre mediestiftelsar</strong> kontrollerer over 70% av avisopplaget. <strong>Syv familiar</strong>{" "}
              sit på mesteparten av privat kapital. <strong>68 statlege selskap</strong> styrast av politisk utnemnde
              styre. Og ein liten «indre sirkel» på omlag 50 personar sit på tvers av alt.
            </p>

            <blockquote className="p-6 my-8 border-l-4 bg-amber-700/10 border-amber-700 italic">
              «I motsetning til autoritære system der makt skjulast gjennom hemmeleghald, er norsk makt ofte offentleg
              registrert — men gøymt i kompleksitet.»
            </blockquote>

            <p>
              Svingdøra mellom politikk og næringsliv snurrar stadig: statsrådar blir lobbyistar, konsulentar blir
              ministrar. Og midt i det heile står dei profesjonelle mellommennene — PR-byråa og advokatfirmaa som smører
              systemet.
            </p>
          </div>
        </div>
      </section>

      {/* Kingmakers Section */}
      <section id="kingmakers" className="min-h-screen px-4 py-24 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-stone-900">Maktmeklarane</h2>
            <p className="text-base sm:text-lg text-stone-600 font-serif">Klikk på personar for meir info</p>
          </div>

          <div className="relative mx-auto" style={{ height: "500px", maxWidth: "800px" }}>
            <svg className="w-full h-full absolute inset-0">
              {powerData.kingmakers.map((person, i) => {
                const angle = (i / powerData.kingmakers.length) * 2 * Math.PI - Math.PI / 2
                const x1 = 50 + Math.cos(angle) * 35
                const y1 = 50 + Math.sin(angle) * 35

                return person.connections?.slice(0, 2).map((conn) => {
                  const targetIdx = powerData.kingmakers.findIndex((k) => k.id === conn)
                  if (targetIdx === -1) return null
                  const targetAngle = (targetIdx / powerData.kingmakers.length) * 2 * Math.PI - Math.PI / 2
                  const x2 = 50 + Math.cos(targetAngle) * 35
                  const y2 = 50 + Math.sin(targetAngle) * 35

                  return (
                    <line
                      key={`${person.id}-${conn}`}
                      x1={`${x1}%`}
                      y1={`${y1}%`}
                      x2={`${x2}%`}
                      y2={`${y2}%`}
                      stroke="#8b7355"
                      strokeWidth="1"
                      opacity="0.3"
                    />
                  )
                })
              })}
            </svg>

            {powerData.kingmakers.map((person, i) => {
              const angle = (i / powerData.kingmakers.length) * 2 * Math.PI - Math.PI / 2
              const x = 50 + Math.cos(angle) * 35
              const y = 50 + Math.sin(angle) * 35

              return (
                <button
                  key={person.id}
                  onClick={() => setSelectedNode(selectedNode?.id === person.id ? null : person)}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 hover:scale-110 group"
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  <div
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg transition-all ${
                      selectedNode?.id === person.id ? "ring-4 ring-offset-2 ring-amber-700" : ""
                    }`}
                    style={{ background: clusterColors[person.cluster] }}
                  >
                    {person.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="mt-2 text-center opacity-0 group-hover:opacity-100 transition-opacity sm:opacity-100">
                    <div className="text-xs sm:text-sm font-semibold whitespace-nowrap text-stone-900">
                      {person.name.split(" ").slice(-1)[0]}
                    </div>
                    <div className="text-xs opacity-60 whitespace-nowrap hidden sm:block">{person.role}</div>
                  </div>
                </button>
              )
            })}

            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
              <div className="text-sm tracking-widest opacity-40">MAKT</div>
            </div>
          </div>

          {selectedNode && powerData.kingmakers.find((k) => k.id === selectedNode.id) && (
            <div className="max-w-2xl mx-auto mt-8 p-6 rounded-lg shadow-lg bg-white animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
                  style={{ background: clusterColors[selectedNode.cluster] }}
                >
                  {selectedNode.name
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold text-stone-900">{selectedNode.name}</h3>
                  <p className="text-sm text-stone-500 mb-3">{selectedNode.role}</p>
                  {(selectedNode.networth || selectedNode.controlsValue) && (
                    <div className="mb-3 p-2 rounded bg-amber-50 border border-amber-200">
                      <div>
                        {selectedNode.networth ? (
                          <span className="font-semibold text-amber-900">
                            Formue: {selectedNode.networth}
                            {selectedNode.networthYear && (
                              <span className="text-xs text-amber-700 ml-1">({selectedNode.networthYear})</span>
                            )}
                          </span>
                        ) : selectedNode.controlsValue ? (
                          <span className="font-semibold text-amber-900">
                            Kontrollerer verdiar for: {selectedNode.controlsValue}
                          </span>
                        ) : null}
                      </div>
                    </div>
                  )}
                  <p className="font-serif text-stone-700">{selectedNode.desc}</p>
                </div>
                <button
                  onClick={() => setSelectedNode(null)}
                  className="text-2xl text-stone-400 hover:text-stone-700 transition-colors"
                >
                  ×
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Pipeline / Revolving Door Section - Redesigned to match Authoritarian Stack */}
      <section id="pipeline" className="min-h-screen px-4 py-24 bg-stone-200/80">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-stone-900">
              Svingdøra: Personalrøyrleidningen
            </h2>
            <p className="text-base sm:text-lg text-stone-600 font-serif max-w-2xl mx-auto">
              For å forstå kvifor denne maktovertakinga skjer så raskt, følg personane. Svingdøra snurrar ikkje lenger
              mellom regjering og næringsliv — ho låser dei saman i ein ny maktarkitektur.
            </p>
          </div>

          {/* Revolving Door - Vertical cards like Authoritarian Stack */}
          <div className="space-y-8 mt-12">
            {powerData.revolvingDoor.map((person) => (
              <div key={person.id} className="flex flex-col items-center">
                {/* Horizontal flow: FROM -> PERSON -> TO */}
                <div className="flex items-center gap-2 sm:gap-4 w-full justify-center">
                  {/* FROM organization */}
                  <div
                    className="p-3 sm:p-4 rounded-lg flex items-center gap-2 sm:gap-3 min-w-0 flex-1 max-w-[180px] sm:max-w-[200px]"
                    style={{
                      background:
                        person.fromType === "stat"
                          ? "#2f4f4f"
                          : person.fromType === "pr"
                            ? "#4a4a4a"
                            : person.fromType === "org"
                              ? "#704214"
                              : "#8b0000",
                    }}
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded bg-white/20 flex items-center justify-center text-white text-xs sm:text-sm shrink-0">
                      {person.fromType === "stat"
                        ? "🏛️"
                        : person.fromType === "pr"
                          ? "📣"
                          : person.fromType === "org"
                            ? "🏢"
                            : "💡"}
                    </div>
                    <span className="text-white text-xs sm:text-sm font-medium truncate">{person.from}</span>
                  </div>

                  {/* Arrow */}
                  <svg width="32" height="20" viewBox="0 0 32 20" fill="none" className="text-amber-700 shrink-0">
                    <path
                      d="M0 10H28M28 10L20 2M28 10L20 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  {/* PERSON in center */}
                  <div className="flex flex-col items-center shrink-0">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-stone-900 flex items-center justify-center text-white font-bold text-sm border-3 border-amber-700">
                      {person.name
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </div>
                  </div>

                  {/* Arrow */}
                  <svg width="32" height="20" viewBox="0 0 32 20" fill="none" className="text-amber-700 shrink-0">
                    <path
                      d="M0 10H28M28 10L20 2M28 10L20 18"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  {/* TO organization */}
                  <div
                    className="p-3 sm:p-4 rounded-lg flex items-center gap-2 sm:gap-3 min-w-0 flex-1 max-w-[180px] sm:max-w-[200px]"
                    style={{
                      background:
                        person.toType === "stat"
                          ? "#2f4f4f"
                          : person.toType === "pr"
                            ? "#4a4a4a"
                            : person.toType === "org"
                              ? "#704214"
                              : "#8b0000",
                    }}
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded bg-white/20 flex items-center justify-center text-white text-xs sm:text-sm shrink-0">
                      {person.toType === "stat"
                        ? "🏛️"
                        : person.toType === "pr"
                          ? "📣"
                          : person.toType === "org"
                            ? "🏢"
                            : "💡"}
                    </div>
                    <span className="text-white text-xs sm:text-sm font-medium truncate">{person.to}</span>
                  </div>
                </div>

                {/* Person name and description below */}
                <div className="mt-3 text-center max-w-lg">
                  <div className="font-bold text-stone-900">{person.name}</div>
                  <div className="text-xs text-stone-500 mb-1">{person.year}</div>
                  <p className="text-sm text-stone-600 font-serif">{person.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Summary quote */}
          <blockquote className="mt-16 p-6 border-l-4 bg-amber-700/10 border-amber-700 italic font-serif text-stone-700 max-w-2xl mx-auto">
            «Det er eit sjølvforsterkande kretsløp: Ideologi finansierer risikokapital → kapital kaprar staten → staten
            matar dei same private systema som bygde han. Ein ny modell for makt — privatisert suverenitet.»
          </blockquote>
        </div>
      </section>

      {/* Full Map Section */}
      <section id="map" className="min-h-screen px-4 py-24 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-stone-900">
              Det fulle nettverket
            </h2>
            <p className="text-base sm:text-lg text-stone-600 font-serif mb-6">
              Utforsk sambanda mellom kapital, media, stat og interesseorganisasjonar
            </p>

            <div className="relative max-w-md mx-auto">
              <input
                type="text"
                placeholder="Søk etter aktørar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-10 border border-stone-300 rounded-lg bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-amber-700/50 text-base"
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          <InteractiveMap
            nodes={filteredNodes}
            allNodes={allNodes}
            selectedNode={selectedNode}
            setSelectedNode={setSelectedNode}
            hoveredNode={hoveredNode}
            setHoveredNode={setHoveredNode}
          />
        </div>
      </section>

      {/* Credits Section */}
      <section id="credits" className="py-24 px-4 bg-stone-900 text-stone-300">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold mb-6 text-white">Maktkartet</h2>
          <p className="font-serif mb-8 text-stone-400">
            Eit prosjekt for å kartlegge maktstrukturar i Noreg. Inspirert av{" "}
            <a
              href="https://authoritarian-stack.info"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-500 hover:underline"
            >
              The Authoritarian Stack
            </a>
            .
          </p>
          <div className="text-sm text-stone-500 space-y-2">
            <p>Data frå Brønnøysundregistrene, offentlege kjelder og akademisk forsking.</p>
            <p>Maktutredningen (1998-2003) | Kapital | DN | E24</p>
          </div>
        </div>
      </section>

      {/* Floating info panel for map */}
      {selectedNode && !powerData.kingmakers.find((k) => k.id === selectedNode.id) && (
        <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:bottom-4 sm:w-96 p-4 sm:p-6 rounded-lg shadow-2xl bg-white z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3 min-w-0">
              <div
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold shrink-0"
                style={{ background: clusterColors[selectedNode.cluster] }}
              >
                {selectedNode.name
                  .split(" ")
                  .slice(0, 2)
                  .map((n: string) => n[0])
                  .join("")}
              </div>
              <div className="min-w-0">
                <h3 className="text-lg sm:text-xl font-bold text-stone-900 truncate">{selectedNode.name}</h3>
                {selectedNode.role && <p className="text-sm text-stone-500">{selectedNode.role}</p>}
                {selectedNode.desc && (
                  <p className="mt-2 text-sm font-serif text-stone-700 line-clamp-3">{selectedNode.desc}</p>
                )}
              </div>
            </div>
            <button
              onClick={() => setSelectedNode(null)}
              className="text-2xl text-stone-400 hover:text-stone-700 shrink-0"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function NetworkBackground({ scrollProgress }: { scrollProgress: number }) {
  const opacity = Math.max(0, 0.15 - scrollProgress * 0.3)

  return (
    <div className="fixed inset-0 pointer-events-none transition-opacity duration-500" style={{ opacity }}>
      <svg className="w-full h-full">
        {[...Array(80)].map((_, i) => {
          const x = 5 + ((i * 17 + 7) % 90)
          const y = 5 + ((i * 23 + 11) % 90)
          return (
            <circle key={i} cx={`${x}%`} cy={`${y}%`} r={2 + (i % 4)} fill="#8b7355" opacity={0.2 + (i % 5) * 0.1} />
          )
        })}
        {[...Array(50)].map((_, i) => {
          const x1 = 5 + ((i * 17 + 7) % 90)
          const y1 = 5 + ((i * 23 + 11) % 90)
          const x2 = 5 + (((i + 3) * 17 + 7) % 90)
          const y2 = 5 + (((i + 5) * 23 + 11) % 90)
          return (
            <line
              key={`line-${i}`}
              x1={`${x1}%`}
              y1={`${y1}%`}
              x2={`${x2}%`}
              y2={`${y2}%`}
              stroke="#8b7355"
              strokeWidth="0.5"
              opacity="0.1"
            />
          )
        })}
      </svg>
    </div>
  )
}

function InteractiveMap({
  nodes,
  allNodes,
  selectedNode,
  setSelectedNode,
  hoveredNode,
  setHoveredNode,
}: {
  nodes: any[]
  allNodes: any[]
  selectedNode: any
  setSelectedNode: (node: any) => void
  hoveredNode: any
  setHoveredNode: (node: any) => void
}) {
  const nodesByCluster: Record<string, any[]> = {}
  nodes.forEach((node) => {
    if (!nodesByCluster[node.cluster]) nodesByCluster[node.cluster] = []
    nodesByCluster[node.cluster].push(node)
  })

  const getNodePosition = (node: any) => {
    const cluster = clusterPositions[node.cluster] || { x: 50, y: 50 }
    const clusterNodes = nodesByCluster[node.cluster] || []
    const clusterIndex = clusterNodes.indexOf(node)
    const totalInCluster = clusterNodes.length

    const angle = (clusterIndex / totalInCluster) * 2 * Math.PI
    const radius = 6 + (clusterIndex % 3) * 3

    return {
      x: cluster.x + Math.cos(angle) * radius,
      y: cluster.y + Math.sin(angle) * radius,
    }
  }

  return (
    <div className="relative w-full" style={{ height: "600px" }}>
      {Object.entries(clusterPositions).map(([key, pos]) => (
        <div
          key={key}
          className="absolute text-xs sm:text-sm font-medium tracking-widest opacity-40 pointer-events-none"
          style={{ left: `${pos.x}%`, top: `${pos.y - 10}%`, transform: "translateX(-50%)", color: clusterColors[key] }}
        >
          {pos.label}
        </div>
      ))}

      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {nodes.map((node) => {
          const pos = getNodePosition(node)
          return node.connections?.map((connId: string) => {
            const target = allNodes.find((n) => n.id === connId)
            if (!target || !nodes.includes(target)) return null
            const targetPos = getNodePosition(target)
            const isHighlighted = hoveredNode?.id === node.id || hoveredNode?.id === connId

            return (
              <line
                key={`${node.id}-${connId}`}
                x1={`${pos.x}%`}
                y1={`${pos.y}%`}
                x2={`${targetPos.x}%`}
                y2={`${targetPos.y}%`}
                stroke={isHighlighted ? "#c4a35a" : "#8b7355"}
                strokeWidth={isHighlighted ? 2 : 0.5}
                opacity={isHighlighted ? 0.8 : 0.15}
                strokeDasharray={target.cluster !== node.cluster ? "4 2" : "0"}
                className="transition-all duration-200"
              />
            )
          })
        })}
      </svg>

      {nodes.map((node) => {
        const pos = getNodePosition(node)
        const isKingmaker = powerData.kingmakers.some((k) => k.id === node.id)
        const isSelected = selectedNode?.id === node.id
        const isHovered = hoveredNode?.id === node.id

        return (
          <button
            key={node.id}
            onClick={() => setSelectedNode(isSelected ? null : node)}
            onMouseEnter={() => setHoveredNode(node)}
            onMouseLeave={() => setHoveredNode(null)}
            className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ${
              isSelected || isHovered ? "z-20 scale-125" : "z-10"
            }`}
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
          >
            <div
              className={`rounded-full flex items-center justify-center text-white shadow transition-all ${
                isKingmaker
                  ? "w-8 h-8 sm:w-10 sm:h-10 text-[10px] sm:text-xs font-bold"
                  : "w-5 h-5 sm:w-6 sm:h-6 text-[8px]"
              } ${isSelected ? "ring-2 ring-offset-1 ring-amber-700" : ""}`}
              style={{ background: clusterColors[node.cluster] }}
            >
              {isKingmaker
                ? node.name
                    .split(" ")
                    .map((n: string) => n[0])
                    .join("")
                : ""}
            </div>
            {(isSelected || isHovered) && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-1 rounded text-xs whitespace-nowrap shadow-lg bg-white text-stone-900">
                {node.name}
              </div>
            )}
          </button>
        )
      })}
    </div>
  )
}
