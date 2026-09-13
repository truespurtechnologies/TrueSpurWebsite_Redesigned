"use client"

import { useEffect, useRef } from "react"

// Nodes placed on a circle around the core, with the core at center
const RING_NODES = [
  { id: "patients", label: "Patient & Care", angle: -90 },
  { id: "appointments", label: "Appointments", angle: -30 },
  { id: "workflows", label: "Clinical Workflows", angle: 30 },
  { id: "operations", label: "Branch Operations", angle: 90 },
  { id: "teams", label: "Teams", angle: 150 },
  { id: "insights", label: "Insights", angle: 210 },
]

const W = 500
const H = 460
const CX = W / 2
const CY = H / 2
const RING_R = 168 // radius of the ring
const NODE_R = 40 // radius of peripheral nodes
const CORE_R = 52 // radius of core

function polar(angleDeg: number, r: number) {
  const rad = (angleDeg * Math.PI) / 180
  return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) }
}

export default function ConnectedClinicVisual() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return

    const edges = svg.querySelectorAll<SVGLineElement | SVGPathElement>("[data-edge]")
    edges.forEach((el) => {
      const len =
        el instanceof SVGPathElement
          ? el.getTotalLength()
          : Math.hypot(
              parseFloat(el.getAttribute("x2") ?? "0") - parseFloat(el.getAttribute("x1") ?? "0"),
              parseFloat(el.getAttribute("y2") ?? "0") - parseFloat(el.getAttribute("y1") ?? "0")
            )
      el.style.strokeDasharray = String(len)
      el.style.strokeDashoffset = String(len)
      el.style.transition = "none"
    })

    // Stagger each edge in
    const delay = 300
    edges.forEach((el, i) => {
      setTimeout(() => {
        el.style.transition = `stroke-dashoffset 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)`
        el.style.strokeDashoffset = "0"
      }, delay + i * 120)
    })

    // Fade the peripheral nodes in as their connecting line reaches them, so
    // the whole system reads as forming a single connected core rather than
    // appearing all at once.
    const nodes = svg.querySelectorAll<SVGGElement>("[data-node]")
    nodes.forEach((el) => {
      el.style.opacity = "0"
      el.style.transition = "none"
    })
    nodes.forEach((el, i) => {
      setTimeout(() => {
        el.style.transition = "opacity 0.5s ease-out"
        el.style.opacity = "1"
      }, delay + i * 120 + 450)
    })
  }, [])

  return (
    <div className="relative w-full max-w-[500px] mx-auto select-none" aria-hidden="true">
      {/* Ambient teal glow at core */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-56 h-56 rounded-full"
          style={{ background: "radial-gradient(circle, rgba(13,157,170,0.12) 0%, transparent 70%)" }}
        />
      </div>

      <svg
        ref={svgRef}
        viewBox={`0 0 ${W} ${H}`}
        className="w-full h-auto"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="coreGradCCV" cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#1BB8C7" />
            <stop offset="100%" stopColor="#0A7A86" />
          </radialGradient>
          <radialGradient id="nodeGradCCV" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#F0F5FA" />
          </radialGradient>
          <filter id="nodeDropCCV" x="-25%" y="-25%" width="150%" height="150%">
            <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#0B1F3A" floodOpacity="0.07" />
          </filter>
          <filter id="coreGlowCCV" x="-35%" y="-35%" width="170%" height="170%">
            <feDropShadow dx="0" dy="0" stdDeviation="12" floodColor="#0D9DAA" floodOpacity="0.35" />
          </filter>
          <filter id="labelBlur" x="-5%" y="-5%" width="110%" height="110%">
            <feGaussianBlur stdDeviation="0" />
          </filter>
        </defs>

        {/* Faint ring track */}
        <circle cx={CX} cy={CY} r={RING_R} stroke="#D6E0EA" strokeWidth="1" strokeDasharray="4 8" opacity="0.5" />

        {/* Spoke lines: core -> peripheral nodes */}
        {RING_NODES.map((node) => {
          const outer = polar(node.angle, RING_R - NODE_R - 2)
          const inner = polar(node.angle, CORE_R + 4)
          return (
            <line
              key={node.id + "-edge"}
              data-edge="true"
              x1={inner.x}
              y1={inner.y}
              x2={outer.x}
              y2={outer.y}
              stroke="#0D9DAA"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.45"
            />
          )
        })}

        {/* Peripheral nodes */}
        {RING_NODES.map((node) => {
          const pos = polar(node.angle, RING_R)
          const words = node.label.split(" ")
          const line1 = words[0]
          const line2 = words.slice(1).join(" ")

          return (
            <g key={node.id} data-node="true" filter="url(#nodeDropCCV)">
              {/* Node circle */}
              <circle cx={pos.x} cy={pos.y} r={NODE_R} fill="url(#nodeGradCCV)" stroke="#D6E0EA" strokeWidth="1" />
              {/* Teal dot accent */}
              <circle cx={pos.x} cy={pos.y - NODE_R + 11} r="3" fill="#0D9DAA" opacity="0.7" />
              {/* Label text - single or two lines */}
              {line2 ? (
                <>
                  <text
                    x={pos.x}
                    y={pos.y - 3}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="10.5"
                    style={{ fontFamily: "var(--font-clinax-sans)" }}
                    fontWeight="600"
                    fill="#0B1F3A"
                    opacity="0.92"
                  >
                    {line1}
                  </text>
                  <text
                    x={pos.x}
                    y={pos.y + 11}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="10.5"
                    style={{ fontFamily: "var(--font-clinax-sans)" }}
                    fontWeight="600"
                    fill="#0B1F3A"
                    opacity="0.92"
                  >
                    {line2}
                  </text>
                </>
              ) : (
                <text
                  x={pos.x}
                  y={pos.y + 4}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="10.5"
                  style={{ fontFamily: "var(--font-clinax-sans)" }}
                  fontWeight="600"
                  fill="#0B1F3A"
                  opacity="0.92"
                >
                  {line1}
                </text>
              )}
            </g>
          )
        })}

        {/* Core node - rendered on top */}
        <g filter="url(#coreGlowCCV)">
          {/* Outer pulse ring */}
          <circle cx={CX} cy={CY} r={CORE_R + 10} fill="#0D9DAA" opacity="0.08" />
          {/* Core circle */}
          <circle cx={CX} cy={CY} r={CORE_R} fill="url(#coreGradCCV)" />
          {/* Core label */}
          <text
            x={CX}
            y={CY - 9}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="12"
            style={{ fontFamily: "var(--font-clinax-sans)" }}
            fontWeight="600"
            fill="white"
            letterSpacing="0.09em"
          >
            CLINAX
          </text>
          <text
            x={CX}
            y={CY + 8}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="7.5"
            style={{ fontFamily: "var(--font-clinax-sans)" }}
            fontWeight="400"
            fill="white"
            opacity="0.7"
            letterSpacing="0.04em"
          >
            Connected Core
          </text>
          {/* Small connecting dots on the core circumference */}
          {RING_NODES.map((node) => {
            const dot = polar(node.angle, CORE_R - 1)
            return <circle key={node.id + "-dot"} cx={dot.x} cy={dot.y} r="3" fill="white" opacity="0.5" />
          })}
        </g>
      </svg>
    </div>
  )
}
