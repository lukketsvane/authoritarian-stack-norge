"use client"

import type { View } from "@/components/maktkartet"
import { powerData, clusterColors } from "./data"

interface RevolvingDoorViewProps {
  onNavigate: (view: View) => void
}

export default function RevolvingDoorView({ onNavigate }: RevolvingDoorViewProps) {
  return (
    <div className="min-h-screen px-4 py-12">
      {/* Header */}
      <div className="text-center mb-16">
        <button
          onClick={() => onNavigate("map")}
          className="text-sm tracking-widest mb-8 opacity-60 hover:opacity-100 transition-opacity"
        >
          ← Tilbake til kartet
        </button>
        <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: "#1a1a1a" }}>
          Svingdøra
        </h1>
        <p className="text-lg opacity-70 max-w-xl mx-auto" style={{ fontFamily: "'Source Serif Pro', Georgia, serif" }}>
          Karrierevegar mellom politikk, næringsliv og lobbyverksemd
        </p>
      </div>

      {/* Timeline */}
      <div className="max-w-3xl mx-auto space-y-8">
        {powerData.revolvingDoor.map((person, i) => (
          <div key={person.id} className="relative flex items-center gap-8">
            {/* From */}
            <div className="w-32 text-right">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white text-xs font-bold ml-auto mb-2"
                style={{ background: person.fromType === "stat" ? clusterColors.stat : clusterColors.interesseorg }}
              >
                {person.fromType === "stat" ? "🏛" : "🏢"}
              </div>
              <div className="text-sm font-medium">{person.from}</div>
            </div>

            {/* Arrow */}
            <div className="flex-1 relative">
              <div className="border-t-2 border-dashed" style={{ borderColor: "#c4a35a" }} />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div
                  className="w-16 h-16 rounded-full overflow-hidden border-4 flex items-center justify-center text-white font-bold"
                  style={{ borderColor: "#c4a35a", background: "#1a1a1a" }}
                >
                  {person.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
              </div>
              <svg
                className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4"
                style={{ color: "#c4a35a" }}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M13.025 1l-2.847 2.828 6.176 6.176h-16.354v3.992h16.354l-6.176 6.176 2.847 2.828 10.975-11z" />
              </svg>
            </div>

            {/* To */}
            <div className="w-32">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white text-xs font-bold mb-2"
                style={{
                  background:
                    person.toType === "stat"
                      ? clusterColors.stat
                      : person.toType === "pr"
                        ? clusterColors.profesjonell
                        : clusterColors.tankesmie,
                }}
              >
                {person.toType === "stat" ? "🏛" : person.toType === "pr" ? "📢" : "💡"}
              </div>
              <div className="text-sm font-medium">{person.to}</div>
            </div>
          </div>
        ))}

        {/* Description cards */}
        <div className="mt-16 space-y-4">
          {powerData.revolvingDoor.map((person) => (
            <div key={`desc-${person.id}`} className="p-4 rounded-lg" style={{ background: "white" }}>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold"
                  style={{ background: "#1a1a1a" }}
                >
                  {person.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <h3 className="font-bold">{person.name}</h3>
                  <p className="text-sm opacity-70">{person.year}</p>
                </div>
              </div>
              <p className="mt-2 text-sm" style={{ fontFamily: "'Source Serif Pro', Georgia, serif" }}>
                {person.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-center mt-16">
        <button
          onClick={() => onNavigate("map")}
          className="px-6 py-3 font-medium tracking-wide transition-all duration-300 hover:scale-105"
          style={{ background: "#1a1a1a", color: "#faf6f1" }}
        >
          ← Tilbake til kartet
        </button>
      </div>
    </div>
  )
}
