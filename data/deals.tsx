import type { ReactNode } from "react";
import Image from "next/image";

export interface Deal {
  company: string;
  subtitle: string;
  description: ReactNode;
  year: number;
  pdfUrl: string;
}

// Centralized data to separate presentation from data for SRP
export const deals: Deal[] = [
  {
    company: "JEA BizDev Consulting, LLC",
    subtitle: "Served as Lead Business Development and Transaction Advisor",
    description: (
      <div className="flex flex-col items-center gap-4">
        <Image
          src="/logos/novarock-biotherapeutics.png"
          alt="NovaRock Biotherapeutics"
          width={200}
          height={200}
        />
        <p className="text-center px-4">
          on an exclusive license agreement for NBL-023, a novel anti&ndash;IL-25
          monoclonal antibody, granting worldwide rights outside Greater China to
        </p>
        <Image
          src="/logos/bionyra.png"
          alt="Bionyra Pharma"
          width={150}
          height={150}
        />
      </div>
    ),
    year: 2026,
    pdfUrl:
      "/client-showcase/jea-bizdev-consulting-advices-novarock-on-partnership-with-bionyra.pdf",
  },
  {
    company: "JEA BizDev Consulting, LLC",
    subtitle: "Served as Lead Business Development and Transaction Advisor",
    description: (
      <div className="flex flex-col items-center gap-4">
        <Image
          src="/logos/novarock-biotherapeutics.png"
          alt="NovaRock Biotherapeutics"
          width={200}
          height={200}
        />
        <p className="text-center px-4">
          on a global out-licensing agreement for an ADC candidate targeting a
          novel oncology antigen with
        </p>
        <Image
          src="/logos/ligachembio.png"
          alt="LigaChemBio"
          width={150}
          height={150}
        />
      </div>
    ),
    year: 2026,
    pdfUrl:
      "/client-showcase/jea-bizdev-consulting-advices-novarock-on-partnership-with-ligachem-biosciences-2026.pdf",
  },
  {
    company: "JEA BizDev Consulting, LLC",
    subtitle: "Served as Lead Business Development and Transaction Advisor",
    description: (
      <div className="flex flex-col items-center gap-4">
        <Image
          src="/logos/cspc-pharma.png"
          alt="CSPC Pharma"
          width={200}
          height={200}
        />
        <p className="text-center px-4">
          Concerning <strong>$1,240 million</strong> strategic partnership for
          ROR1-ADC (SYS6005) with
        </p>
        <Image
          src="/logos/radance-biopharma.png"
          alt="Radance Biopharma"
          width={150}
          height={150}
        />
      </div>
    ),
    year: 2025,
    pdfUrl:
      "/client-showcase/jea-bizdev-consulting-advices-cspc-on-partnership-with-radiance-biopharma.pdf",
  },
  {
    company: "JEA BizDev Consulting, LLC",
    subtitle: "Served as Lead Business Development and Transaction Advisor",
    description: (
      <div className="flex flex-col items-center gap-4">
        <Image
          src="/logos/cspc-pharma.png"
          alt="CSPC Pharma"
          width={200}
          height={200}
        />
        <p className="text-center px-4">
          on its <strong>$1,065 million</strong> strategic partnership for its
          Irinotecan Liposomal Injection product with
        </p>
        <Image src="/logos/cipla.png" alt="Cipla" width={150} height={150} />
      </div>
    ),
    year: 2025,
    pdfUrl:
      "/client-showcase/jea-bizdev-consulting-advices-cspc-on-partnership-with-cipla.pdf",
  },
  {
    company: "JEA BizDev Consulting, LLC",
    subtitle: "Served as Lead Business Development and Transaction Advisor",
    description: (
      <div className="flex flex-col items-center gap-4">
        <Image
          src="/logos/novarock-biotherapeutics.png"
          alt="NovaRock Biotherapeutics"
          width={200}
          height={200}
        />
        <p className="text-center px-4">
          on two global out-licensing agreements for novel antibodies with
        </p>
        <Image
          src="/logos/ligachembio.png"
          alt="LigaChemBio"
          width={150}
          height={150}
        />
      </div>
    ),
    year: 2025,
    pdfUrl:
      "/client-showcase/jea-bizdev-consulting-advices-novarock-on-partnership-with-ligachem-biosciences.pdf",
  },
];
