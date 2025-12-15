"use client"

import type { View } from "@/components/maktkartet"
import { powerData, clusterColors } from "./data"

interface KingmakersViewProps {
  onNavigate: (view: View) => void
  onSelectNode: (node: any) => void
  selectedNode: any
}

export default function KingmakersView({ onNavigate, onSelectNode, selectedNode }: KingmakersViewProps) {
  const kingmakers = powerData.kingmakers

  return (
    <div className="min-h-screen px-4 py-12">
      {/* Header */}
      <div className="text-center mb-16">
        <button
          onClick={() => onNavigate("landing")}
          className="text-sm tracking-widest mb-8 opacity-60 hover:opacity-100 transition-opacity"
        >
          ← Tilbake
        </button>
        <h1 className="text-4xl md:text-6xl font-bold mb-4" style={{ color: "#1a1a1a" }}>
          Maktmeklarane
        </h1>
        <p className="text-lg opacity-70" style={{ fontFamily: "'Source Serif Pro', Georgia, serif" }}>
          Klikk på personar for meir info
        </p>
      </div>

      {/* Network Graph */}
      <div className="max-w-4xl mx-auto relative" style={{ height: "500px" }}>
        <svg className="w-full h-full">
          {/* Connection lines */}
          {kingmakers.map((person, i) => {
            const angle = (i / kingmakers.length) * 2 * Math.PI - Math.PI / 2
            const x1 = 50 + Math.cos(angle) * 35
            const y1 = 50 + Math.sin(angle) * 35

            return person.connections?.slice(0, 2).map((conn, j) => {
              const targetIdx = kingmakers.findIndex((k) => k.id === conn)
              if (targetIdx === -1) return null
              const targetAngle = (targetIdx / kingmakers.length) * 2 * Math.PI - Math.PI / 2
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

        {/* Person nodes */}
        {kingmakers.map((person, i) => {
          const angle = (i / kingmakers.length) * 2 * Math.PI - Math.PI / 2
          const x = 50 + Math.cos(angle) * 35
          const y = 50 + Math.sin(angle) * 35

          return (
            <button
              key={person.id}
              onClick={() => onSelectNode(selectedNode?.id === person.id ? null : person)}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 hover:scale-110"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg transition-all ${
                  selectedNode?.id === person.id ? "ring-4 ring-offset-2" : ""
                }`}
                style={{
                  background: clusterColors[person.cluster],
                  ringColor: clusterColors[person.cluster],
                }}
              >
                {person.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div className="mt-2 text-center">
                <div className="text-sm font-semibold whitespace-nowrap" style={{ color: "#1a1a1a" }}>
                  {person.name.split(" ").slice(-1)[0]}
                </div>
                <div className="text-xs opacity-60 whitespace-nowrap">{person.role}</div>
              </div>
            </button>
          )
        })}

        {/* Center label */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="text-sm tracking-widest opacity-40">MAKT</div>
        </div>
      </div>

      {/* Info Panel */}
      {selectedNode && (
        <div className="max-w-2xl mx-auto mt-12 p-6 rounded-lg shadow-lg" style={{ background: "white" }}>
          <div className="flex items-start gap-4">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-white text-sm font-bold"
              style={{ background: clusterColors[selectedNode.cluster] }}
            >
              {selectedNode.name
                .split(" ")
                .map((n: string) => n[0])
                .join("")}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold" style={{ color: "#1a1a1a" }}>
                {selectedNode.name}
              </h3>
              <p className="text-sm opacity-60 mb-3">{selectedNode.role}</p>
              <p style={{ fontFamily: "'Source Serif Pro', Georgia, serif" }}>{selectedNode.desc}</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-center gap-4 mt-16">
        <button
          onClick={() => onNavigate("map")}
          className="px-6 py-3 font-medium tracking-wide transition-all duration-300 hover:scale-105"
          style={{ background: "#1a1a1a", color: "#faf6f1" }}
        >
          Utforsk heile kartet →
        </button>
        <button
          onClick={() => onNavigate("revolvingdoor")}
          className="px-6 py-3 font-medium tracking-wide border-2 transition-all duration-300 hover:scale-105"
          style={{ borderColor: "#1a1a1a", color: "#1a1a1a" }}
        >
          Sjå svingdøra
        </button>
      </div>
    </div>
  )
}
