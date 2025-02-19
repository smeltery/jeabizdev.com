"use client";

import { Clock, Calendar, FileText, BarChart } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { Element } from "react-scroll";
import React from "react";

// Define the types for the EngagementCard props
interface EngagementCardProps {
	icon: React.ReactNode;
	title: string;
	description: string;
}

export function EngagementOptions() {
	const containerVariants: Variants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	const itemVariants: Variants = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
		},
	};

	return (
		<Element
			name="engagement-options"
			className="w-full py-12 bg-gradient-to-br from-blue-50 via-white to-blue-100"
		>
			<motion.div
				className="container px-4 md:px-6 mx-auto"
				initial="hidden"
				animate="visible"
				variants={containerVariants}
			>
				<div className="flex flex-col gap-12 justify-center items-center text-center">
					<motion.div className="space-y-4" variants={itemVariants}>
						<h2 className="text-3xl font-bold tracking-tighter md:text-5xl text-blue-600 mb-4">
							Flexible Engagement Options
						</h2>
						<p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-zinc-400">
							We offer flexible engagement options to meet your project requirements.
							<br />
							Choose the model that best suits your consulting needs.
						</p>
					</motion.div>
					<div>
						<motion.div
							className="grid lg:grid-cols-4 md:grid-cols-1 gap-8"
							variants={containerVariants}
						>
							<EngagementCard
								icon={<Clock className="h-10 w-10 text-blue-600" />}
								title="Hourly Rates"
								description="Pay only for the time we spend on your project, ideal for variable scope engagements."
							/>
							<EngagementCard
								icon={<Calendar className="h-10 w-10 text-blue-600" />}
								title="Retainer Model"
								description="Secure our expertise for a set number of hours each month, ensuring priority service."
							/>
							<EngagementCard
								icon={<FileText className="h-10 w-10 text-blue-600" />}
								title="Fixed Project Fees"
								description="Agree on a set price for well-defined projects, providing budget certainty and clear deliverables."
							/>
							<EngagementCard
								icon={<BarChart className="h-10 w-10 text-blue-600" />}
								title="Blended Approach"
								description="Combine fixed fees with performance-based incentives, aligning our success."
							/>
						</motion.div>
					</div>
				</div>
			</motion.div>
		</Element>
	);
}

// EngagementCard component with defined props types
const EngagementCard: React.FC<EngagementCardProps> = ({ icon, title, description }) => {
	return (
		<motion.div
			className="flex flex-col justify-center items-center space-y-4 p-6 bg-white border border-blue-100 rounded-lg shadow-sm hover:shadow-md"
			variants={{
				hidden: { scale: 0.8, opacity: 0 },
				visible: { scale: 1, opacity: 1 },
			}}
			transition={{ duration: 0.5 }}
			whileHover={{ scale: 1.05 }}
		>
			{icon}
			<h3 className="text-xl font-semibold text-black">{title}</h3>
			<p className="text-gray-600">{description}</p>
		</motion.div>
	);
};
