"use client"

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronRight, FlaskRoundIcon as Flask, Microscope, Pill } from "lucide-react"
import type { Asset } from "@/data/assets"

interface AssetCardProps {
	asset: Asset
	onClick: () => void
}

export const getStageColor = (description: string) => {
	if (description.includes("Phase 3")) return "bg-sky-100 text-sky-800"
	if (description.includes("Phase 1")) return "bg-blue-100 text-blue-800"
	if (description.includes("IND")) return "bg-indigo-100 text-indigo-800"
	return "bg-slate-100 text-slate-800"
}

export const getStageText = (description: string) => {
	if (description.includes("Phase 3")) return "Phase 3"
	if (description.includes("Phase 1")) return "Phase 1"
	if (description.includes("IND Filing submitted")) return "IND Filing"
	if (description.includes("IND approved")) return "IND Approved"
	return "Preclinical"
}

export function AssetCard({ asset, onClick }: AssetCardProps) {
	const getIconByFocus = (focus: string) => {
		switch (focus.toLowerCase()) {
			case "oncology":
				return <Microscope className="h-5 w-5" />
			case "immunology":
				return <Flask className="h-5 w-5" />
			default:
				return <Pill className="h-5 w-5" />
		}
	}

	return (
		<Card className="overflow-hidden hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
			<CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4">
				<div className="flex justify-between items-start">
					<div>
						<h3 className="font-bold text-lg">{asset.name}</h3>
						<div className="flex items-center mt-1 text-blue-100">
							{getIconByFocus(asset.focus)}
							<span className="ml-1 text-sm">{asset.focus}</span>
						</div>
					</div>
					<Badge className={`${getStageColor(asset.description)}`}>{getStageText(asset.description)}</Badge>
				</div>
			</CardHeader>
			<CardContent className="p-4 flex-grow flex flex-col justify-start items-start">
				<p className="text-sm text-slate-600 line-clamp-4">{asset.description.split("\n")[0].replace(":", "")}</p>
			</CardContent>
			<CardFooter className="p-4 pt-0">
				<Button variant="outline" className="w-full flex items-center justify-between font-bold" onClick={onClick}>
					<span>View Details</span>
					<ChevronRight className="h-4 w-4" />
				</Button>
			</CardFooter>
		</Card>
	)
}
