"use client"

import type { View } from "@/components/maktkartet"
import { powerData, clusterColors, clusterPositions } from "./data"

interface MapViewProps {
  onNavigate: (view: View) => void
  selectedNode: any
  setSelectedNode: (node: any) => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  hoveredNode: any
  setHoveredNode: (node: any) => void
}

export default function MapView({
  onNavigate,
  selectedNode,
  setSelectedNode,
  searchQuery,
  setSearchQuery,
  hoveredNode,
  setHoveredNode,
}: MapViewProps) {
  // Combine all nodes
  const allNodes = [
    ...powerData.kingmakers,
    ...powerData.companies,
    ...powerData.state,
    ...powerData.orgs,
    ...powerData.professionals,
    ...powerData.foreign,
  ]

  // Filter based on search
  const filteredNodes = searchQuery
    ? allNodes.filter((n) => n.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : allNodes

  // Group nodes by cluster
  const nodesByCluster: Record<string, any[]> = {}
  filteredNodes.forEach((node) => {
    if (!nodesByCluster[node.cluster]) nodesByCluster[node.cluster] = []
    nodesByCluster[node.cluster].push(node)
  })

  // Position nodes in clusters
  const getNodePosition = (node: any, index: number, clusterNodes: any[]) => {
    const cluster = clusterPositions[node.cluster] || { x: 50, y: 50 }
    const clusterIndex = clusterNodes.indexOf(node)
    const totalInCluster = clusterNodes.length

    // Spread nodes within cluster
    const angle = (clusterIndex / totalInCluster) * 2 * Math.PI
    const radius = 8 + (clusterIndex % 3) * 3

    return {
      x: cluster.x + Math.cos(angle) * radius,
      y: cluster.y + Math.sin(angle) * radius,
    }
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div
        className="sticky top-0 z-50 px-4 py-4"
        style={{ background: "rgba(250, 246, 241, 0.95)", backdropFilter: "blur(10px)" }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold" style={{ color: "#1a1a1a" }}>
              Maktkartet
            </h1>
            <p className="text-sm opacity-60">Klikk på nodar for meir info</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Søk..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-4 py-2 pl-10 border rounded-lg w-48"
                style={{ borderColor: "#ddd", background: "white" }}
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40"
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
            <button onClick={() => onNavigate("landing")} className="text-sm opacity-60 hover:opacity-100">
              ← Heim
            </button>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="relative mx-auto" style={{ height: "calc(100vh - 100px)", maxWidth: "1400px" }}>
        {/* Cluster labels */}
        {Object.entries(clusterPositions).map(([key, pos]) => (
          <div
            key={key}
            className="absolute text-sm font-medium tracking-widest opacity-30 pointer-events-none"
            style={{
              left: `${pos.x}%`,
              top: `${pos.y - 12}%`,
              transform: "translateX(-50%)",
              color: clusterColors[key],
            }}
          >
            {pos.label}
          </div>
        ))}

        {/* Connection lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {filteredNodes.map((node) => {
            const clusterNodes = nodesByCluster[node.cluster] || []
            const pos = getNodePosition(node, 0, clusterNodes)

            return node.connections?.map((connId: string) => {
              const target = allNodes.find((n) => n.id === connId)
              if (!target || !filteredNodes.includes(target)) return null

              const targetClusterNodes = nodesByCluster[target.cluster] || []
              const targetPos = getNodePosition(target, 0, targetClusterNodes)

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
                />
              )
            })
          })}
        </svg>

        {/* Nodes */}
        {filteredNodes.map((node, i) => {
          const clusterNodes = nodesByCluster[node.cluster] || []
          const pos = getNodePosition(node, i, clusterNodes)
          const isKingmaker = powerData.kingmakers.includes(node)
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
                  isKingmaker ? "w-10 h-10 text-xs font-bold" : "w-6 h-6 text-[8px]"
                } ${isSelected ? "ring-2 ring-offset-1" : ""}`}
                style={{
                  background: clusterColors[node.cluster],
                  opacity: searchQuery && !filteredNodes.includes(node) ? 0.2 : 1,
                }}
              >
                {isKingmaker
                  ? node.name
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")
                  : ""}
              </div>
              {(isSelected || isHovered) && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-1 rounded text-xs whitespace-nowrap shadow-lg"
                  style={{ background: "white" }}
                >
                  {node.name}
                </div>
              )}
            </button>
          )
        })}
      </div>

      {/* Info Panel */}
      {selectedNode && (
        <div className="fixed bottom-0 left-0 right-0 p-6 shadow-2xl z-50" style={{ background: "white" }}>
          <div className="max-w-2xl mx-auto">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white text-sm font-bold"
                  style={{ background: clusterColors[selectedNode.cluster] }}
                >
                  {selectedNode.name
                    .split(" ")
                    .slice(0, 2)
                    .map((n: string) => n[0])
                    .join("")}
                </div>
                <div>
                  <h3 className="text-xl font-bold" style={{ color: "#1a1a1a" }}>
                    {selectedNode.name}
                  </h3>
                  {selectedNode.role && <p className="text-sm opacity-60">{selectedNode.role}</p>}
                  {selectedNode.desc && (
                    <p className="mt-2" style={{ fontFamily: "'Source Serif Pro', Georgia, serif" }}>
                      {selectedNode.desc}
                    </p>
                  )}
                </div>
              </div>
              <button onClick={() => setSelectedNode(null)} className="text-2xl opacity-40 hover:opacity-100">
                ×
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
