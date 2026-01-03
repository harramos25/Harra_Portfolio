"use client";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export const projects = [
    {
        title: "NCIP Job Portal",
        year: "2024",
        category: "System",
        img: "/images/ncip.png",
        description: "Government recruitment system with automated filtering."
    },
    {
        title: "D'Marsians System",
        year: "2025",
        category: "Analytics",
        img: "/images/dmars.png",
        description: "Real-time student progress tracking dashboard."
    },
    {
        title: "FoodTrack Sales",
        year: "2025",
        category: "Mobile",
        img: "/images/foodtrack.png",
        description: "Inventory and sales management for mobile devices."
    },
    {
        title: "PawPointment",
        year: "2026",
        category: "App",
        img: "/images/paw.png",
        description: "Veterinary appointment scheduler with flutter."
    },
];

const Projects = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const trigger = triggerRef.current;

        if (!section || !trigger) return;

        // Calculate exact width to scroll
        // (Total Width of Horizontal Strip) - (Window Width)
        const getScrollAmount = () => {
            let races = section;
            return -(races.scrollWidth - window.innerWidth);
        };

        let ctx = gsap.context(() => {

            const tween = gsap.to(section, {
                x: getScrollAmount, // Automatically calculates distance
                ease: "none",
                scrollTrigger: {
                    trigger: trigger,
                    start: "top top",
                    end: () => `+=${Math.abs(getScrollAmount())}`, // Match scroll length to width
                    pin: true,
                    scrub: 1,
                    invalidateOnRefresh: true, // Recalculate if window resizes
                },
            });

        }, trigger);

        return () => ctx.revert();
    }, []);

    const scrollToContact = () => {
        const contactSection = document.getElementById("contact");
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section id="selected-works" ref={triggerRef} className="relative overflow-hidden bg-[#0a0a0a]">

            {/* THE HORIZONTAL STRIP */}
            {/* We use w-fit so it stretches exactly as long as the content inside */}
            <div
                ref={sectionRef}
                className="flex h-screen w-fit will-change-transform"
            >

                {/* --- SLIDE 1: INTRO TITLE (The Cover Page) --- */}
                <div className="w-screen h-screen flex flex-col justify-center px-12 md:px-24 shrink-0 border-r border-white/5 bg-[#0a0a0a] relative">
                    <span className="text-[#FF331F] font-mono-tech text-xs tracking-widest mb-4 uppercase">
                        (2024 — 2026)
                    </span>
                    <h2 className="text-[12vw] font-serif-display leading-[0.8] text-[#e5e5e5] mb-8">
                        SELECTED <br /> <span className="text-[#FF331F]">WORKS</span>
                    </h2>
                    <p className="text-gray-500 font-mono-tech text-sm max-w-md">
                        A curated selection of systems, interfaces, and mobile experiences crafted with code and obsession.
                    </p>
                    <div className="mt-12 text-sm font-mono-tech text-gray-600">
                        SCROLL TO EXPLORE &rarr;
                    </div>
                </div>

                {/* --- SLIDES 2-5: THE PROJECTS --- */}
                {projects.map((project, index) => (
                    <div
                        key={index}
                        className="w-screen h-screen flex flex-col justify-center px-6 md:px-24 shrink-0 border-r border-white/5 bg-[#0a0a0a] relative"
                    >
                        {/* Background Number */}
                        <span className="absolute top-4 left-6 md:top-10 md:left-10 text-[15vw] font-serif-display text-white/5 z-0 leading-none select-none">
                            0{index + 1}
                        </span>

                        <div className="relative z-10 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                            {/* Text Info */}
                            <div className="order-2 md:order-1">
                                <div className="flex items-center gap-4 mb-6">
                                    <span className="px-3 py-1 border border-[#FF331F] text-[#FF331F] text-xs font-mono-tech uppercase rounded-full">
                                        {project.category}
                                    </span>
                                    <span className="text-gray-500 font-mono-tech text-xs">{project.year}</span>
                                </div>

                                <h3 className="text-5xl md:text-7xl font-serif-display text-[#e5e5e5] mb-6 leading-[0.9]">
                                    {project.title}
                                </h3>

                                <p className="text-gray-400 font-mono-tech text-sm max-w-md mb-8">
                                    {project.description}
                                </p>

                                <button className="group flex items-center gap-2 text-white border-b border-transparent hover:border-white transition-all">
                                    <span className="uppercase tracking-widest text-xs font-mono-tech">View Case Study</span>
                                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                                </button>
                            </div>

                            {/* Image Card */}
                            <div className="order-1 md:order-2 h-[40vh] md:h-[60vh] w-full overflow-hidden bg-gray-900 rounded-lg relative group">
                                <img
                                    src={project.img}
                                    alt={project.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out will-change-transform"
                                />
                                {/* Subtle red tint on hover */}
                                <div className="absolute inset-0 bg-[#FF331F] mix-blend-multiply opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                            </div>

                        </div>
                    </div>
                ))}

                {/* --- FINAL SLIDE: THE "NEXT STEP" (Dark Editorial Version) --- */}
                <div className="w-screen h-screen flex flex-col items-center justify-center shrink-0 bg-[#0a0a0a] relative border-l border-white/10">

                    <div className="relative z-10 text-center">
                        <p className="text-gray-500 font-mono-tech text-sm uppercase tracking-widest mb-6">
                            What's Next?
                        </p>

                        <h2 className="text-[10vw] font-serif-display leading-none text-white mb-8">
                            YOUR <br /> PROJECT
                        </h2>

                        <button
                            onClick={scrollToContact}
                            className="group relative px-12 py-6 bg-transparent border border-[#FF331F] overflow-hidden cursor-pointer"
                        >
                            {/* Button Hover Fill Effect */}
                            <div className="absolute inset-0 w-full h-full bg-[#FF331F] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>

                            <span className="relative z-10 font-mono-tech text-white uppercase tracking-widest group-hover:text-black transition-colors duration-300">
                                Start Collaboration
                            </span>
                        </button>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Projects;
