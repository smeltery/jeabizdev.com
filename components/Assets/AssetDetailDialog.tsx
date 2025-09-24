import React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import type { Asset } from "@/data/assets"
import { Target, Beaker } from "lucide-react"
import { getIconByFocus, getStageColor, getStageText, formatDescription } from "@/components/Assets/utils"

interface AssetDetailDialogProps {
	asset: Asset | null
	open: boolean
	onOpenChange: (open: boolean) => void
}

export function AssetDetailDialog({ asset, open, onOpenChange }: AssetDetailDialogProps) {
	if (!asset) return null

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white">
				<DialogHeader>
					<div className="flex items-center justify-between">
						<DialogTitle className="text-xl text-black">{asset.name}</DialogTitle>
						<Badge className={`${getStageColor(asset.stage)}`}>{getStageText(asset.stage)}</Badge>
					</div>
					<DialogDescription className="flex items-center mt-1">
						{getIconByFocus(asset.focus)}
						<span className="ml-1">{asset.focus}</span>
					</DialogDescription>
				</DialogHeader>

				<div className="mt-4 space-y-4">
					<div className="grid grid-cols-2 gap-4 mb-6">
						<div className="bg-slate-100 p-3 rounded-lg flex items-center">
							<Target className="h-5 w-5 text-blue-600 mr-2" />
							<div>
								<p className="text-xs text-slate-700">Target</p>
								<p className="font-bold text-black">{asset.name.split(/[ -]/)[0]}</p>
							</div>
						</div>
						<div className="bg-slate-100 p-3 rounded-lg flex items-center">
							<Beaker className="h-5 w-5 text-blue-600 mr-2" />
							<div>
								<p className="text-xs text-slate-700">Modality</p>
								<p className="font-bold text-black">{asset.type}</p>
							</div>
						</div>
					</div>

					<div className="prose text-black max-w-none">{formatDescription(asset.description)}</div>
				</div>
			</DialogContent>
		</Dialog>
	)
}

