"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#0a0a0a]/80 backdrop-blur-md py-4 border-b border-white/10" : "bg-transparent py-8"}`}>
            <div className="container mx-auto px-6 flex justify-between items-center font-mono-tech uppercase tracking-widest text-xs">
                <a href="#" className="font-bold text-[#e5e5e5] hover:text-[#FF331F] transition-colors">
                    Harra.Dev
                </a>

                {/* Desktop Menu */}
                <div className="hidden md:flex gap-12 items-center text-zinc-500">
                    <a href="/" className="hover:text-[#FF331F] transition-colors">[ Home ]</a>
                    <a href="/#projects" className="hover:text-[#FF331F] transition-colors">Projects</a>
                    <a href="/#about" className="hover:text-[#FF331F] transition-colors">Intro</a>
                    <a href="/#contact" className="hover:text-[#FF331F] transition-colors">Contact</a>
                    <a href="/work" className="px-5 py-2 border border-zinc-700 rounded-full hover:bg-[#FF331F] hover:border-[#FF331F] hover:text-black transition-all">
                        Archive (26)
                    </a>
                </div>

                {/* Mobile Toggle */}
                <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X className="w-5 h-5" /> : "Menu"}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "100vh" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-[#0a0a0a] fixed inset-0 top-[60px] z-40 overflow-hidden flex flex-col justify-center items-center font-serif-display text-4xl gap-8"
                    >
                        <a href="/" onClick={() => setIsOpen(false)} className="text-[#e5e5e5] hover:text-[#FF331F] hover:italic transition-all">Home</a>
                        <a href="/#projects" onClick={() => setIsOpen(false)} className="text-[#e5e5e5] hover:text-[#FF331F] hover:italic transition-all">Selected Works</a>
                        <a href="/#about" onClick={() => setIsOpen(false)} className="text-[#e5e5e5] hover:text-[#FF331F] hover:italic transition-all">About</a>
                        <a href="/#contact" onClick={() => setIsOpen(false)} className="text-[#e5e5e5] hover:text-[#FF331F] hover:italic transition-all">Contact</a>
                        <a href="/work" onClick={() => setIsOpen(false)} className="text-[#e5e5e5] opacity-50 text-xl font-mono-tech mt-8">[ Archive ]</a>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
