'use client';

import { Menu, X, Dna, ExternalLink, ChevronDown } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-scroll';
import NextLink from 'next/link';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mainNavigation = [
  { name: 'Services', href: 'services' },
  { name: 'Core Values', href: 'core-values' },
  { name: 'Results', href: 'results' },
  { name: 'Engagement Options', href: 'engagement-options' },
  { name: 'Available Assets', href: 'available-assets' },
  { name: 'Client Showcase', href: 'client-showcase' },
  { name: "Let's Partner", href: 'contact' },
];

const resourcesNavigation = [
  { name: 'My Cross-Border Deals', href: 'https://drive.google.com/drive/folders/1YYCHF8NhnArF9wspYlkFO7pCKVO9MZ2n?usp=drive_link', external: true },
  { name: 'Cross-Border Deals', href: 'https://drive.google.com/drive/folders/1n7YOErEy11-qqUBqUxIMlVOWmJBH7w6f?usp=drive_link', external: true }
];

export default function Navigation() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);

	// Track scroll position to add shadow/background change
	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 20);
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const closeMenu = () => {
		setIsMenuOpen(false);
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				setIsMenuOpen(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<header
			className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
				scrolled ? "bg-white shadow-md py-2" : "bg-white/95 py-4 lg:py-6"
			}`}
		>
			<nav className="container mx-auto px-4" ref={menuRef}>
				<div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
					<div className="flex items-center justify-between">
						<div className="flex items-center">
							<Dna className={`${scrolled ? "h-7 w-7" : "h-8 w-8"} text-blue-600 mr-3 transition-all duration-300`} />
							<NextLink href="/" className={`text-xl font-bold text-gray-800 transition-all duration-300 whitespace-nowrap`}>
								JEA BizDev Consulting
							</NextLink>
						</div>
						<div className="flex lg:hidden">
							<button
								type="button"
								className="text-gray-500 hover:text-gray-600 focus:outline-none focus:text-gray-600"
								aria-label="toggle menu"
								onClick={toggleMenu}
							>
								{isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
							</button>
						</div>
					</div>
					<div className={`lg:flex items-center ${isMenuOpen ? 'block' : 'hidden'} mt-4 lg:mt-0`}>
						<div className="flex flex-col lg:flex-row lg:items-center space-y-2 lg:space-y-0 lg:space-x-4 xl:space-x-6">
							{/* Main navigation items */}
							{mainNavigation.map((item) => (
								<Link
									key={item.name}
									to={item.href}
									smooth={true}
									duration={500}
									className="text-md text-gray-700 hover:text-blue-600 hover:underline cursor-pointer py-2 lg:py-0 transition-colors whitespace-nowrap text-center lg:text-left"
									onClick={closeMenu}
								>
									{item.name}
								</Link>
							))}

							{/* Resources dropdown for desktop */}
							<div className="hidden lg:block">
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button variant="outline" size="sm" className="text-black hover:bg-blue-50 hover:text-blue-600 transition-colors">
											Resources <ChevronDown className="ml-1 h-4 w-4" />
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent align="end" className="w-56">
										{resourcesNavigation.map((item) => (
											<DropdownMenuItem key={item.name} asChild className="cursor-pointer">
												<a
													href={item.href}
													target="_blank"
													rel="noopener noreferrer"
													className="flex items-center w-full"
													onClick={closeMenu}
												>
													<span className="mr-1">{item.name}</span>
													<ExternalLink className="h-3 w-3 ml-1" />
												</a>
											</DropdownMenuItem>
										))}
									</DropdownMenuContent>
								</DropdownMenu>
							</div>

							{/* Resources as buttons for mobile */}
							<div className="lg:hidden space-y-2">
								{resourcesNavigation.map((item) => (
									<Button
										key={item.name}
										variant="outline"
										size="sm"
										asChild
										className="w-full lg:w-auto text-black"
									>
										<a
											href={item.href}
											target="_blank"
											rel="noopener noreferrer"
											className="flex items-center justify-center"
											onClick={closeMenu}
										>
											<span className="mr-1">{item.name}</span>
											<ExternalLink className="h-4 w-4" />
										</a>
									</Button>
								))}
							</div>
						</div>
					</div>
				</div>
			</nav>
		</header>
	);
}
