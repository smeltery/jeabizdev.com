"use client"

import React from "react"
import { useState } from "react"
import { AssetCard } from "@/components/Assets/AssetCard"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { AssetDetailDialog } from "@/components/Assets/AssetDetailDialog"
import { assets as defaultAssets } from "@/data/assets"
import type { Asset } from "@/data/assets"
import { filterAssets, sortAssets } from "@/components/Assets/utils"

interface AssetListProps {
  assets?: Asset[]
}

export function AssetList({ assets = defaultAssets }: AssetListProps) {
	const [searchQuery, setSearchQuery] = useState("")
	const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null)

	// Sort assets dynamically: Oncology first, then by stage (Phase 3 first)
	const sortedAssets = sortAssets(assets)
	const filteredAssets = filterAssets(sortedAssets, searchQuery)

	return (
		<div>
			<div className="mb-6 flex flex-col sm:flex-row gap-4">
				<div className="relative flex-1">
					<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
					<Input
						placeholder="Search assets..."
						className="pl-10 text-black"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
				</div>
			</div>

			{filteredAssets.length === 0 ? (
				<div className="text-center py-12">
					<p className="text-slate-500 dark:text-slate-400">No assets found matching your search criteria.</p>
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{filteredAssets.map((asset) => (
						<AssetCard key={asset.id} asset={asset} onClick={() => setSelectedAsset(asset)} />
					))}
				</div>
			)}

			<AssetDetailDialog
				asset={selectedAsset}
				open={!!selectedAsset}
				onOpenChange={(open) => !open && setSelectedAsset(null)}
			/>
		</div>
	)
}

