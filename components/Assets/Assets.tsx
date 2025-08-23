"use client"

import React from "react"
import type { FC } from "react"
import { motion, Variants } from "framer-motion"
import { Element } from "react-scroll"
import {AssetList} from "@/components/Assets/AssetList";

const containerVariants: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
		},
	},
}

const itemVariants: Variants = {
	hidden: { y: 20, opacity: 0 },
	visible: { y: 0, opacity: 1 },
}

const AvailableAssetsHeader: FC = () => (
	<motion.div className="space-y-4 max-w-3xl" variants={itemVariants}>
		<h2 className="text-4xl font-bold tracking-tight md:text-5xl text-blue-600 mb-4">Available Assets for Partnering</h2>
		<p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-zinc-400">
			Strategic partnering opportunities for best-in-class or first-in-class potential assets.
		</p>
	</motion.div>
)

export function Assets() {
	return (
		<Element name="available-assets" className="w-full py-20 pb-4 bg-white relative overflow-hidden">
			<motion.div
				className="container px-4 md:px-6 mx-auto relative z-10"
				initial="hidden"
				animate="visible"
				variants={containerVariants}
			>
				<div className="flex flex-col gap-12 justify-center items-center text-center">
					<AvailableAssetsHeader />
					<motion.div className="h-full w-full overflow-x-auto pb-4 -mx-4 px-4" variants={containerVariants}>
						<AssetList />
					</motion.div>
				</div>
				<motion.div className="mt-8 text-center" variants={itemVariants}>
					<em className="text-gray-500 text-md font-bold dark:text-zinc-400">
						Overview Deck Available for Review Upon Request. Please email us at{" "}
						<a href="mailto:jeabizdev@gmail.com" className="text-blue-500 underline">
							jeabizdev@gmail.com
						</a>.
					</em>
				</motion.div>
			</motion.div>
		</Element>
	)
}

export default Assets
