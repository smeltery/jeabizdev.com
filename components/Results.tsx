import {BarChart2, Globe, Handshake} from "lucide-react";
import {motion} from "framer-motion";
import {Element} from "react-scroll";

export function Results() {
	const fadeInUp = {
		initial: { opacity: 0, y: 60 },
		animate: { opacity: 1, y: 0 },
		transition: { duration: 0.6, ease: [0.6, -0.05, 0.01, 0.99] }
	}

	const stats = [
		{ icon: BarChart2, value: '25+', label: 'Years in Healthcare Leadership' },
		{ icon: Handshake, value: '85', label: 'Partnerships Executed' },
		{ icon: Globe, value: '$25B+', label: 'Total Partnership Value' }
	]

	return (
		<Element name="results" className="bg-white py-16 md:py-24">
			<div className="container mx-auto px-4">
				<motion.h2
					className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-blue-600 mb-4 text-center"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2, duration: 0.8 }}
				>
					Proven Results
				</motion.h2>
				<motion.p
					className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto mb-16 text-center"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.4, duration: 0.8 }}
				>
					We have a track record of establishing successful partnerships in the healthcare industry.
				</motion.p>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{stats.map((stat, index) => (
						<motion.div
							key={index}
							className="bg-gray-50 rounded-lg shadow-xl p-6 text-center"
							{...fadeInUp}
							transition={{delay: index * 0.2, ...fadeInUp.transition}}
						>
							<div className="flex justify-center items-center mx-auto text-center w-12 h-12 bg-blue-100 rounded-full mb-4">
								<stat.icon className="w-8 h-8 text-blue-600"/>
							</div>
							<motion.h3
								className="text-4xl font-bold text-gray-800 mb-2"
									initial={{scale: 0}}
									animate={{scale: 1}}
									transition={{delay: index * 0.2 + 0.4, type: 'spring', stiffness: 100}}
								>
									{stat.value}
								</motion.h3>
								<p className="text-gray-600">{stat.label}</p>
						</motion.div>
						))}
				</div>
			</div>
		</Element>
)
}
