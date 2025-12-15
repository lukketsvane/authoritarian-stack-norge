"use client"

import { useEffect, useState } from "react"
import type { View } from "@/components/maktkartet"

interface LandingViewProps {
  onNavigate: (view: View) => void
}

export default function LandingView({ onNavigate }: LandingViewProps) {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4">
        {/* Background network visualization */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full">
            {[...Array(50)].map((_, i) => (
              <circle
                key={i}
                cx={`${10 + ((i * 17) % 80)}%`}
                cy={`${10 + ((i * 23) % 80)}%`}
                r={3 + (i % 3) * 2}
                fill="#8b7355"
                opacity={0.3 + (i % 5) * 0.1}
              />
            ))}
            {[...Array(30)].map((_, i) => (
              <line
                key={`line-${i}`}
                x1={`${10 + ((i * 17) % 80)}%`}
                y1={`${10 + ((i * 23) % 80)}%`}
                x2={`${10 + (((i + 1) * 17) % 80)}%`}
                y2={`${10 + (((i + 2) * 23) % 80)}%`}
                stroke="#8b7355"
                strokeWidth="0.5"
                opacity="0.2"
              />
            ))}
          </svg>
        </div>

        {/* Category labels */}
        <div className="absolute bottom-8 left-8 text-sm tracking-widest" style={{ color: "#c4a35a" }}>
          Kapital
        </div>
        <div className="absolute bottom-8 right-8 text-sm tracking-widest" style={{ color: "#8b0000" }}>
          Ideologi
        </div>
        <div className="absolute top-24 left-1/2 -translate-x-1/2 text-sm tracking-widest" style={{ color: "#2f4f4f" }}>
          Stat
        </div>

        {/* Main Title */}
        <div className="relative z-10 text-center max-w-4xl">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight" style={{ color: "#1a1a1a" }}>
            Maktkartet
          </h1>
          <p
            className="text-xl md:text-2xl mb-12 leading-relaxed"
            style={{
              color: "#4a4a4a",
              fontFamily: "'Source Serif Pro', Georgia, serif",
              fontWeight: 400,
            }}
          >
            Korleis kapital, media og stat heng saman i Noreg — <br />
            og kvifor det angår deg
          </p>

          <button
            onClick={() => onNavigate("kingmakers")}
            className="group flex items-center gap-2 mx-auto text-lg tracking-wide hover:opacity-70 transition-opacity"
            style={{ color: "#1a1a1a" }}
          >
            <span>Scroll for å utforske</span>
            <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </div>
      </div>

      {/* Narrative Section */}
      <div className="min-h-screen flex items-center justify-center px-4 py-24" style={{ background: "#ede4d8" }}>
        <div className="max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center" style={{ color: "#1a1a1a" }}>
            Kven styrer eigentleg Noreg?
          </h2>
          <div className="h-px w-24 mx-auto mb-8" style={{ background: "#1a1a1a" }} />

          <div
            className="space-y-6 text-lg leading-relaxed"
            style={{
              fontFamily: "'Source Serif Pro', Georgia, serif",
              color: "#2a2a2a",
            }}
          >
            <p>
              <span className="text-5xl float-left mr-2 leading-none font-bold">N</span>
              oreg framstår som eit av verdas mest demokratiske land. Men bak fasaden av likskap og open debatt skjuler
              det seg eit tett nettverk av makt.
            </p>
            <p>
              <strong>Tre mediestiftelsar</strong> kontrollerer over 70% av avisopplaget. <strong>Syv familiar</strong>{" "}
              sit på mesteparten av privat kapital. <strong>68 statlege selskap</strong> styrast av politisk utnemnde
              styre. Og ein liten "indre sirkel" på omlag 50 personar sit på tvers av alt.
            </p>

            <blockquote
              className="p-6 my-8 border-l-4"
              style={{
                background: "rgba(196, 163, 90, 0.1)",
                borderColor: "#c4a35a",
                fontStyle: "italic",
              }}
            >
              "I motsetning til autoritære system der makt skjulast gjennom hemmeleghald, er norsk makt ofte offentleg
              registrert — men gøymt i kompleksitet."
            </blockquote>

            <p>
              Svingdøra mellom politikk og næringsliv snurrar stadig: statsrådar blir lobbyistar, konsulentar blir
              ministrar. Og midt i det heile står dei profesjonelle mellommennene — PR-byråa og advokatfirmaa som smører
              systemet.
            </p>
          </div>

          <button
            onClick={() => onNavigate("kingmakers")}
            className="mt-12 mx-auto block px-8 py-4 text-lg font-medium tracking-wide transition-all duration-300 hover:scale-105"
            style={{
              background: "#1a1a1a",
              color: "#faf6f1",
              fontFamily: "'Source Serif Pro', Georgia, serif",
            }}
          >
            Utforsk maktkartet →
          </button>
        </div>
      </div>
    </div>
  )
}
