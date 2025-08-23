import React from "react"
import { FlaskRoundIcon as Flask, Microscope, Pill } from "lucide-react"
import type { Asset } from "@/data/assets"

// Returns an icon element based on the asset focus area
export const getIconByFocus = (focus: string) => {
  switch (focus?.toLowerCase()) {
    case "oncology":
      return <Microscope className="h-5 w-5" />
    case "immunology":
      return <Flask className="h-5 w-5" />
    default:
      return <Pill className="h-5 w-5" />
  }
}

// Stable mapping of stage to Tailwind color classes
export const getStageColor = (stage: Asset["stage"]) => {
  switch (stage) {
    case "Phase 3":
      return "bg-sky-100 text-sky-800"
    case "Phase 1":
      return "bg-blue-100 text-blue-800"
    case "IND Approved":
      return "bg-green-100 text-green-800"
    case "IND Filing":
      return "bg-indigo-100 text-indigo-800"
    default:
      return "bg-slate-100 text-slate-800"
  }
}

export const getStageText = (stage: Asset["stage"]) => stage

// Pure function to filter assets by a search query (SRP + testable)
export const filterAssets = (items: Asset[], query: string) => {
  const q = query.trim().toLowerCase()
  if (!q) return items
  return items.filter((a) =>
    [a.name, a.focus, a.type, a.stage].some((field) => field.toLowerCase().includes(q))
  )
}

// Formats a long description string into title/content blocks or paragraphs
export const formatDescription = (description: string) => {
  const sections = description.split("\n").filter(Boolean)

  return sections.map((section, index) => {
    const [title, ...content] = section.split(":")

    if (content.length === 0)
      return (
        <p key={index} className="mb-3">
          {section}
        </p>
      )

    return (
      <div key={index} className="mb-4">
        <h4 className="font-semibold text-slate-900 mb-1">{title}:</h4>
        <p className="text-slate-700">{content.join(":")}</p>
      </div>
    )
  })
}
