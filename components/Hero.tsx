'use client';

import React from "react";
import {motion} from "framer-motion";
import {ArrowRight, FileText, Network} from "lucide-react";
import {
	CurrencyDollarIcon,
	GlobeAltIcon,
	LightBulbIcon,
	PuzzlePieceIcon,
	UserGroupIcon
} from "@heroicons/react/24/outline";
import {Card, CardContent} from "@/components/ui/card";
import Image from "next/image";

import avatar from '../public/avatar.png';
import deal from '../public/deal.jpg';

import {ScrollSuggestion} from "@/components/ui/ScrollSuggestion";
import {Link} from "react-scroll";
import {LinkedInLogoIcon} from "@radix-ui/react-icons";

export function Hero() {
	return (
		<section className="relative bg-gradient-to-br from-gray-50 to-blue-50 pt-36 pb-24 sm:pb-32">
			<div className="absolute inset-0 overflow-hidden">
				<svg className="absolute left-0 top-0 h-full w-full" xmlns="http://www.w3.org/2000/svg"
					 viewBox="0 0 1440 320" preserveAspectRatio="none">
					<path fill="#3B82F6" fillOpacity="0.05"
						  d="M0,96L48,106.7C96,117,192,139,288,138.7C384,139,480,117,576,117.3C672,117,768,139,864,138.7C960,139,1056,117,1152,106.7C1248,96,1344,96,1392,96L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
				</svg>
			</div>
			<div className="container mx-auto px-6 relative">
				<div className="flex flex-col lg:flex-row items-center mb-16">
					<motion.div
						className="lg:w-1/2 lg:pr-12"
						initial={{opacity: 0, y: 20}}
						animate={{opacity: 1, y: 0}}
						transition={{duration: 0.8}}
					>
						<h1 className="text-5xl font-extrabold text-gray-900 leading-tight mb-6">
							We optimize business development success for{' '}
							<span className="text-blue-600">
								Biotech & Biopharma Companies
                  			</span>
						</h1>
						<p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-2xl">
							Strategic advisory services for groundbreaking partnerships across North America, Europe,
							and Asia with focus on cross-border transactions.
						</p>
						<div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
							<Link
								to="contact"
								smooth={true}
								duration={500}
								className="cursor-pointer bg-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-700 transition duration-300 inline-flex items-center justify-center text-lg"
							>
								Get in Touch
								<motion.div
									className="ml-2 h-5 w-5"
									animate={{x: [0, 5, 0]}}  // Animation moves right 5px and back
									transition={{
										repeat: Infinity,
										repeatType: "mirror",
										duration: 0.8,  // Adjust speed
										ease: "easeInOut",
									}}
								>
									<ArrowRight/>
								</motion.div>
							</Link>
							<Link
								to="services"
								smooth={true}
								duration={500}
								className="cursor-pointer bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition duration-300 inline-flex items-center justify-center text-lg border-2 border-blue-600"
							>
								Our Services
							</Link>
						</div>
					</motion.div>
					<motion.div
						className="lg:w-1/2 mt-12 lg:mt-0 relative"
						initial={{opacity: 0, scale: 0.8}}
						animate={{opacity: 1, scale: 1}}
						transition={{duration: 0.8, delay: 0.2}}
					>
						<Image
							src={deal}
							alt="Handshake when closing a deal"
							className="rounded-lg shadow-2xl"
							width={650}
							height={400}
						/>
						<motion.div
							className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg"
							initial={{opacity: 0, x: -20}}
							animate={{opacity: 1, x: 0}}
							transition={{duration: 0.5, delay: 0.5}}
						>
							<div className="flex items-center space-x-2">
								<Network className="h-8 w-8 text-blue-600"/>
								<div>
									<p className="text-sm font-semibold text-gray-800">Industry Connections &
										Outreach</p>
									<p className="text-xs text-gray-500">Leveraging our vast network for your
										success</p>
								</div>
							</div>
						</motion.div>
						<motion.div
							className="absolute -top-6 -right-6 bg-white p-4 rounded-lg shadow-lg"
							initial={{opacity: 0, x: 20}}
							animate={{opacity: 1, x: 0}}
							transition={{duration: 0.5, delay: 0.7}}
						>
							<div className="flex items-center space-x-2">
								<FileText className="h-8 w-8 text-blue-600"/>
								<div>
									<p className="text-sm font-semibold text-gray-800">Deal Structuring Advice</p>
									<p className="text-xs text-gray-500">Crafting optimal terms</p>
								</div>
							</div>
						</motion.div>
					</motion.div>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
					<motion.div
						initial={{opacity: 0, y: 50}}
						animate={{opacity: 1, y: 0}}
						transition={{duration: 0.8, delay: 0.4}}
					>
						<h2 className="text-3xl font-bold text-gray-800 mb-6">Our Team</h2>
						<Card className="bg-white rounded-lg shadow-lg">
							<CardContent className="p-6">
								<div className="flex items-center mb-4">
									<Image
										src={avatar}
										alt="John Adamou"
										className="w-24 h-24 rounded-full object-cover mr-6"
										width={96}
										height={96}
									/>
									<div>
										<h3 className="text-xl font-semibold text-gray-800">John Adamou, MS, MBA</h3>
										<p className="text-gray-600">President and Managing Director</p>
										<a href="https://www.linkedin.com/in/john-adamou-ms-mba-6182668" target="_blank"
										   rel="noopener noreferrer" className="hover:text-blue-600 hover:underline">
											<p className="flex items-center flex-row gap-1">
												<LinkedInLogoIcon className="block"/>
												LinkedIn
											</p>
										</a>
									</div>
								</div>
								<p className="text-gray-700 mb-4">
									John is a seasoned executive with <strong>25+ years of experience</strong> in the
									biotech and pharma
									industries, specializing in strategy and business development. He has
									successfully{' '}
									<strong>executed 80+ partnerships</strong> across multiple continents, resulting
									in <strong>over $20 billion</strong>{' '}
									in transaction value. He has expertise across the entire BD value chain, including
									strategy, search and evaluation, deal structuring, transaction negotiation, and
									alliance management.
								</p>
								<ul className="space-y-2 text-sm">
									<li className="flex items-center">
										<LightBulbIcon className="h-5 w-5 text-blue-600 mr-2"/>
										<span>Expertise in diverse deal structures</span>
									</li>
									<li className="flex items-center">
										<GlobeAltIcon className="h-5 w-5 text-blue-600 mr-2"/>
										<span>Cross-border transaction specialist</span>
									</li>
									<li className="flex items-center">
										<PuzzlePieceIcon className="h-5 w-5 text-blue-600 mr-2"/>
										<span>Proven track record of high-value partnerships</span>
									</li>
									<li className="flex items-center">
										<CurrencyDollarIcon className="h-5 w-5 text-blue-600 mr-2"/>
										<span>Strategic advisor to biotech & biopharma companies</span>
									</li>
								</ul>
							</CardContent>
						</Card>
					</motion.div>

					<motion.div
						initial={{opacity: 0, y: 50}}
						animate={{opacity: 1, y: 0}}
						transition={{duration: 0.8, delay: 0.6}}
					>
						<h2 className="text-3xl font-bold text-gray-800 mb-6">What We Offer</h2>
						<Card className="bg-white rounded-lg shadow-lg">
							<CardContent className="p-6">
								<p className="text-gray-700 mb-6">
									JEA BizDev Consulting offers strategic advisory services
									specializing in identifying, structuring, negotiating, and executing partnerships
									across North America, Europe, and Asia.
								</p>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
									<div className="bg-blue-50 p-4 rounded-lg">
										<div className="flex items-center mb-3">
											<UserGroupIcon className="h-6 w-6 text-blue-600 mr-2"/>
											<h3 className="font-semibold text-gray-800">Comprehensive Services</h3>
										</div>
										<p className="text-sm text-gray-600">Business development and partnering
											activities tailored to your needs with a strong focus on in- and
											out-licensing.</p>
									</div>
									<div className="bg-blue-50 p-4 rounded-lg">
										<div className="flex items-center mb-3">
											<GlobeAltIcon className="h-6 w-6 text-blue-600 mr-2"/>
											<h3 className="font-semibold text-gray-800">Global Reach</h3>
										</div>
										<p className="text-sm text-gray-600">
											Expertise in cross-border transactions (examples
											include:{' '}
											<a href="/deal-summaries/Radiance and CSPC Feb 18 2025.pdf"
											   className="text-blue-500 underline">5</a>,
											{' '}
											<a href="/deal-summaries/Corbus and CSPC Feb 14 2023.pdf"
											   className="text-blue-500 underline">4</a>,
											{' '}
											<a href="/deal-summaries/Elevation and CSPC June 2022.pdf"
											   className="text-blue-500 underline">3</a>,
											{' '}
											<a href="/deal-summaries/Assembly and BeiGene Jul 20 2020.pdf"
											   className="text-blue-500 underline">2</a>,
											{' and '}
											<a href="/deal-summaries/Leap TX and BeiGene Jan 2020.pdf"
											   className="text-blue-500 underline">1</a>).
										</p>
									</div>
									<div className="bg-blue-50 p-4 rounded-lg">
										<div className="flex items-center mb-3">
											<PuzzlePieceIcon className="h-6 w-6 text-blue-600 mr-2"/>
											<h3 className="font-semibold text-gray-800">Diverse Deal Structures</h3>
										</div>
										<p className="text-sm text-gray-600">Platform technology agreements,
											collaborations, co-development alliances, asset acquisitions, and more.</p>
									</div>
									<div className="bg-blue-50 p-4 rounded-lg">
										<div className="flex items-center mb-3">
											<CurrencyDollarIcon className="h-6 w-6 text-blue-600 mr-2"/>
											<h3 className="font-semibold text-gray-800">Value Creation</h3>
										</div>
										<p className="text-sm text-gray-600">Proven track record of high-value
											partnerships and strategic initiatives.</p>
									</div>
								</div>
							</CardContent>
						</Card>
					</motion.div>
				</div>
			</div>

			<ScrollSuggestion/>
		</section>
	);
}
