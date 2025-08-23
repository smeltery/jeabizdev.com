import type { ReactNode } from "react"
import Image from "next/image"

export interface Deal {
  company: string
  subtitle: string
  description: ReactNode
  year: number
  pdfUrl: string
}

// Centralized data to separate presentation from data for SRP
export const deals: Deal[] = [
  {
    company: "JEA BizDev Consulting, LLC",
    subtitle: "Served as Lead Business Development and Transaction Advisor",
    description: (
      <div className="flex flex-col items-center space-y-5">
        <Image src="/logos/cspc-pharma.png" alt="CSPC Pharma" width={200} height={200} />
        <p>Concerning <strong>$1,240 million</strong> strategic partnership for ROR1-ADC (SYS6005) with</p>
        <Image src="/logos/radance-biopharma.png" alt="Radance Biopharma" width={150} height={150} />
      </div>
    ),
    year: 2025,
    pdfUrl: "/client-showcase/jea-bizdev-consulting-advices-cspc-on-partnership-with-radiance-biopharma.pdf",
  },
  {
    company: "JEA BizDev Consulting, LLC",
    subtitle: "Served as Lead Business Development and Transaction Advisor",
    description: (
      <div className="flex flex-col items-center space-y-5">
        <Image src="/logos/cspc-pharma.png" alt="CSPC Pharma" width={200} height={200} />
        <p>on its <strong>$1,065 million</strong> strategic partnership for its Irinotecan Liposomal Injection product with</p>
        <Image src="/logos/cipla.png" alt="Cipla" width={150} height={150} />
      </div>
    ),
    year: 2025,
    pdfUrl: "/client-showcase/jea-bizdev-consulting-advices-cspc-on-partnership-with-cipla.pdf",
  },
]
