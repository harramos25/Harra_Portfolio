"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { projects } from "../sections/Projects";

const Navbar = () => {
    const [time, setTime] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Live Clock Logic
    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                timeZone: "Asia/Manila",
                hour12: false
            }));
        };
        updateTime();
        const timer = setInterval(updateTime, 1000);
        return () => clearInterval(timer);
    }, []);

    const navLinks = [
        { name: "Work", href: "#selected-works" },
        { name: "Identity", href: "#intro" },
        { name: "Toolkit", href: "#tech-stack" },
        { name: "Contact", href: "#contact" },
    ];

    // Lock body scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [isMenuOpen]);

    return (
        <>
            <header className="fixed top-0 w-full z-50 mix-blend-difference text-[#e5e5e5]">

                {/* GLASS BACKGROUND */}
                <div className="absolute inset-0 bg-[#0a0a0a]/70 backdrop-blur-sm border-b border-white/5"></div>
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

                <nav className="relative z-10 w-full px-6 md:px-12 h-20 flex items-center justify-between">

                    {/* LEFT: LOGO */}
                    <Link href="/" className="group flex flex-col justify-center leading-none z-50">
                        <span className="font-serif-display text-2xl tracking-tighter group-hover:italic transition-all duration-300">
                            Harra
                        </span>
                        <span className="font-mono-tech text-[9px] text-[#FF331F] tracking-widest uppercase">
                            Portfolio ©26
                        </span>
                    </Link>

                    {/* CENTER: DESKTOP NAV (Hidden on Mobile) */}
                    <div className="hidden md:flex items-center gap-10">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="group relative font-mono-tech text-[11px] uppercase tracking-[0.2em] text-gray-400 hover:text-white transition-colors"
                            >
                                {link.name}
                                <span className="absolute -bottom-2 left-1/2 w-0 h-[1px] bg-[#FF331F] group-hover:w-full group-hover:left-0 transition-all duration-300"></span>
                            </a>
                        ))}
                    </div>

                    {/* RIGHT: DESKTOP SYSTEM INFO + MOBILE HAMBURGER */}
                    <div className="flex items-center gap-6">

                        {/* PROJECTS BUTTON (Renamed from Archive) */}
                        <Link
                            href="/work"
                            className="hidden md:flex group relative px-6 py-2 border border-white/20 rounded-full overflow-hidden hover:border-[#FF331F]/50 transition-colors"
                        >
                            <div className="absolute inset-0 bg-[#FF331F] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                            <div className="relative z-10 flex items-center gap-2 font-mono-tech text-[10px] uppercase tracking-widest">
                                <span className="group-hover:text-black transition-colors">Projects</span>
                                <span className="bg-white/10 px-1 rounded text-gray-400 group-hover:text-black group-hover:bg-black/10 transition-colors">
                                    {projects.length}
                                </span>
                            </div>
                        </Link>

                        {/* Desktop Only: System Status */}
                        <div className="hidden md:flex items-center gap-3 font-mono-tech text-[10px] text-gray-500 uppercase tracking-widest border-l border-white/20 pl-6 h-6">
                            <span className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                Online
                            </span>
                            <span>PH — {time}</span>
                        </div>

                        {/* MOBILE ONLY: HAMBURGER BUTTON */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden z-50 relative w-10 h-10 flex flex-col items-end justify-center gap-1.5 group"
                        >
                            {/* Top Line */}
                            <span className={`h-[1px] bg-white transition-all duration-300 ${isMenuOpen ? "w-6 -rotate-45 translate-y-1.5" : "w-8"}`}></span>
                            {/* Bottom Line */}
                            <span className={`h-[1px] bg-white transition-all duration-300 ${isMenuOpen ? "w-6 rotate-45 -translate-y-0.5" : "w-6 group-hover:w-8"}`}></span>
                        </button>

                    </div>

                </nav>
            </header>

            {/* --- MOBILE FULL SCREEN MENU OVERLAY --- */}
            <div
                className={`fixed inset-0 bg-[#0a0a0a] z-[100] flex flex-col px-8 pt-32 transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${isMenuOpen ? "translate-y-0" : "-translate-y-full"}`}
            >
                {/* Background Noise */}
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

                {/* Menu Links */}
                <div className="flex flex-col gap-8 relative z-10">
                    {navLinks.map((link, i) => (
                        <a
                            key={i}
                            href={link.href}
                            onClick={() => setIsMenuOpen(false)} // Close menu on click
                            className="group flex items-center gap-4"
                        >
                            <span className="font-mono-tech text-xs text-[#FF331F]">0{i + 1}</span>
                            <span className="font-serif-display text-5xl text-[#e5e5e5] group-hover:italic group-hover:translate-x-4 transition-all duration-500">
                                {link.name}
                            </span>
                        </a>
                    ))}
                </div>

                {/* 2. MOBILE PROJECTS BUTTON */}
                <div className="mt-12 relative z-10">
                    <Link
                        href="/work"
                        onClick={() => setIsMenuOpen(false)}
                        className="block w-full border border-white/20 py-4 rounded-full text-center group active:scale-95 transition-transform"
                    >
                        <span className="font-mono-tech text-xs uppercase tracking-widest text-[#e5e5e5] group-hover:text-[#FF331F]">
                            View All Projects ({projects.length})
                        </span>
                    </Link>
                </div>

                {/* Mobile Footer Info (Since it's hidden in header) */}
                <div className="absolute bottom-12 left-8 right-8 border-t border-white/10 pt-6 flex justify-between items-end">
                    <div className="flex flex-col gap-2 font-mono-tech text-[10px] text-gray-500 uppercase tracking-widest">
                        <span className="text-[#FF331F]">System Status</span>
                        <span className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                            Online
                        </span>
                        <span>PH — {time}</span>
                    </div>

                    <div className="text-right">
                        <p className="font-signature text-3xl text-gray-600">Harra Ramos</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
