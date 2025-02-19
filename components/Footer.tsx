import {Linkedin} from "lucide-react"
import Link from "next/link"

export default function Footer() {
	const currentYear = new Date().getFullYear()

	return (
		<footer className="bg-white text-black py-4">
			<div className="container mx-auto px-5 flex flex-row justify-between items-center">
				<div className="text-xs">
					&copy; {currentYear} JEA BizDev Consulting, LLC.
				</div>
				<div className="flex space-x-4">
					<a href="/Privacy Policy.pdf" target="_blank" className="hover:text-blue-500 transition-colors text-xs">
						Privacy Policy
					</a>
					<a href="/Disclaimer.pdf" target="_blank" className="hover:text-blue-500 transition-colors text-xs">
						Disclaimer
					</a>
					<Link href="https://www.linkedin.com/company/jea-bizdev-consulting-llc"
						  className="hover:text-blue-500 transition-colors text-xs" target="_blank">
						<Linkedin size={16}/>
						<span className="sr-only">LinkedIn</span>
					</Link>
				</div>
			</div>
		</footer>
	)
}
