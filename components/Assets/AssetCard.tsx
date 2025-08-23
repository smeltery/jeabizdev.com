"use client"

import React from "react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import type { Asset } from "@/data/assets"
import { getIconByFocus, getStageColor, getStageText } from "@/components/Assets/utils"

interface AssetCardProps {
	asset: Asset
	onClick: () => void
}

export function AssetCard({ asset, onClick }: AssetCardProps) {
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
					<Badge className={getStageColor(asset.stage)}>{getStageText(asset.stage)}</Badge>
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
