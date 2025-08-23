"use client"

import type { ReactNode, FC } from "react"
import { motion, Variants } from "framer-motion"
import { Element } from "react-scroll"
import { ExternalLink } from "lucide-react"
import Image from "next/image"

import type { Deal } from "@/data/deals"
import { deals } from "@/data/deals"

const DealDescription: FC<{ children: ReactNode }> = ({ children }) => (
	<div className="flex flex-col items-center space-y-5">{children}</div>
)

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

const DealCard: FC<Deal> = ({ company, subtitle, description, year, pdfUrl }) => (
	<a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="no-underline">
		<motion.div
			className="w-[24em] md:w-[28em] bg-white rounded-lg overflow-hidden border border-blue-100 shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
			variants={itemVariants}
		>
			<div className="flex flex-col h-full">
				<div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-3">
					<h3 className="text-xl font-semibold text-white">{company}</h3>
					<p className="text-sm text-white">{subtitle}</p>
				</div>
				<div className="p-6 flex-grow text-black">{description}</div>
				<div className="flex justify-between items-center text-sm text-white bg-gradient-to-r from-blue-500 to-blue-600 p-3">
					<span>{year}</span>
					<ExternalLink className="w-4 h-4" />
				</div>
			</div>
		</motion.div>
	</a>
)

const ClientShowcaseHeader: FC = () => (
	<motion.div className="space-y-4 max-w-3xl" variants={itemVariants}>
		<h2 className="text-4xl font-bold tracking-tight md:text-5xl text-blue-600 mb-4">Client Showcase</h2>
		<p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-zinc-400">
			Highlighting our key strategic deals and partnerships that drive innovation and foster business growth.
		</p>
	</motion.div>
)

export function ClientShowcase() {
	const isSingleDeal = deals.length === 1

	return (
		<Element name="client-showcase" className="w-full py-12 bg-gradient-to-br from-blue-50 via-white to-blue-100">
			<motion.div
				className="container px-4 md:px-6 mx-auto relative z-10"
				initial="hidden"
				animate="visible"
				variants={containerVariants}
			>
				<div className="flex flex-col gap-12 justify-center items-center text-center">
					<ClientShowcaseHeader />
					<motion.div className={`h-full w-full ${isSingleDeal ? "flex justify-center" : "overflow-x-auto pb-4 -mx-4 px-4"}`} variants={containerVariants}>
						<div className={`flex ${isSingleDeal ? "" : "space-x-4 md:space-x-6 min-w-max"}`}>
							{deals.map((deal, index) => (
								<DealCard key={index} {...deal} />
							))}
						</div>
					</motion.div>
				</div>
			</motion.div>
		</Element>
	)
}

export default ClientShowcase
