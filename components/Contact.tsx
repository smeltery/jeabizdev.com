'use client'

import React from 'react'
import { useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { motion } from 'framer-motion';
import { Element } from 'react-scroll';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast, Toaster } from "react-hot-toast";
import Confetti from 'react-confetti';
import {Linkedin} from "lucide-react"
import Link from "next/link"

// Zod schema for form validation
const schema = z.object({
	name: z.string().min(1, "Name is required"),
	email: z.string().email("Invalid email address"),
	subject: z.string().optional(),
	company: z.string().min(1, "Company is required"),
	message: z.string().min(1, "Message is required"),
});

type FormData = z.infer<typeof schema>;

export function Contact() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<FormData>({
		resolver: zodResolver(schema),
	});

	const [loading, setLoading] = useState(false);
	const [windowDimension, setWindowDimension] = useState({ width: 0, height: 0 });
	const [showConfetti, setShowConfetti] = useState(false);
	const [runConfetti, setRunConfetti] = useState(false); // Control confetti

	const detectSize = useCallback(() => {
		setWindowDimension({ width: window.innerWidth, height: window.innerHeight });
	}, []);

	useEffect(() => {
		detectSize(); // Call it once to set initial size
		window.addEventListener('resize', detectSize); // Add event listener for resize
		return () => {
			window.removeEventListener('resize', detectSize); // Clean up on unmount
		};
	}, [detectSize]); // detectSize is a stable dependency now due to useCallback

	const triggerConfetti = () => {
		setShowConfetti(true);
		setRunConfetti(true); // Start running confetti
	};

	const stopConfetti = () => {
		setRunConfetti(false); // Stop confetti
	};

	const onSubmit = async (data: FormData) => {
		setLoading(true);
		try {
			const response = await fetch('/api/send-email', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});

			if (response.ok) {
				toast.success("Message sent successfully!", {
					position: "bottom-center",
				});

				// Trigger confetti effect on success
				triggerConfetti();

				reset();
			} else {
				toast.error("Failed to send message.");
			}
		} catch (error) {
			toast.error("An error occurred. Please try again later.", {
				position: "bottom-center",
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<Element name="contact"
				 className="w-full py-12 bg-gradient-to-br from-blue-50 via-white to-blue-100"
		>
			<Toaster />
			<motion.div
				className="container mx-auto px-4 md:px-6"
				initial={{ opacity: 0, y: 50 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
			>
				<div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-start">
					<div className="space-y-4">
						<div className="inline-block rounded-lg bg-blue-600 p-2 text-white">
							<svg
								className=" h-6 w-6"
								fill="none"
								height="24"
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								viewBox="0 0 24 24"
								width="24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" />
								<path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
							</svg>
						</div>
						<h2 className="text-4xl font-bold tracking-tighter text-blue-600">
							Let&apos;s Partner Together
						</h2>
						<p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
							We are here to help you as you navigate the complexities of the partnering process,
							providing the guidance you need to turn challenges into opportunities.
						</p>
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Want to connect?</h3>
                            <Link
                                href="https://www.linkedin.com/company/jea-bizdev-consulting-llc"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button
                                className="bg-[#0A66C2] hover:bg-[#004182] text-white transition-colors duration-200"
                                >
                                <Linkedin className="mr-2 h-5 w-5" />
                                LinkedIn
                                </Button>
                            </Link>
                        </div>
					</div>
					<div className="flex flex-col gap-4 sm:flex-row lg:flex-col lg:gap-6 text-black">
						<form onSubmit={handleSubmit(onSubmit)} className="space-y-4 flex-1">
							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label htmlFor="name" className="text-sm font-bold">
										Name <span className="text-red-500">*</span>
									</Label>
									<Input
										id="name"
										required
										{...register("name")}
										placeholder="John Doe"
										className="transition-all duration-300 focus:ring-2 focus:ring-blue-500 bg-white"
									/>
									{errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
								</div>
								<div className="space-y-2">
									<Label htmlFor="email" className="text-sm font-bold">
										Email <span className="text-red-500">*</span>
									</Label>
									<Input
										id="email"
										required
										{...register("email")}
										type="email"
										placeholder="john@example.com"
										className="transition-all duration-300 focus:ring-2 focus:ring-blue-500 bg-white"
									/>
									{errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
								</div>
							</div>
							<div className="space-y-2">
								<Label htmlFor="subject" className="text-sm font-bold">
									Subject
								</Label>
								<Input
									id="subject"
									{...register("subject")}
									placeholder="Subject"
									className="transition-all duration-300 focus:ring-2 focus:ring-blue-500 bg-white"
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="company" className="text-sm font-bold">
									Company <span className="text-red-500">*</span>
								</Label>
								<Input
									id="company"
									required
									{...register("company")}
									placeholder="Your Company"
									className="transition-all duration-300 focus:ring-2 focus:ring-blue-500 bg-white"
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="message" className="text-sm font-bold">
									Message <span className="text-red-500">*</span>
								</Label>
								<Textarea
									id="message"
									required
									{...register("message")}
									placeholder="How can we help you?"
									className="min-h-[100px] transition-all duration-300 focus:ring-2 focus:ring-blue-500 bg-white"
								/>
								{errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
							</div>
							<Button
								type="submit"
								disabled={loading}
								className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-300"
							>
								{loading ? "Sending..." : "Send Message"}
							</Button>
						</form>
					</div>
				</div>
			</motion.div>

			{/* Confetti effect */}
			{showConfetti && (
				ReactDOM.createPortal(
					<Confetti
						width={windowDimension.width}
						height={windowDimension.height}
						recycle={false}
						numberOfPieces={300}
						run={runConfetti} // Control confetti run
						onConfettiComplete={stopConfetti} // Stop confetti when done
						initialVelocityY={10}
						style={{ zIndex: 9999, position: 'fixed', top: 0 }}
					/>,
					document.body
				)
			)}
		</Element>
	);
}
