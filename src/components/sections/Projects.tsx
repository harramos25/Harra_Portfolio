"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

// Project Data (Exported for Navbar usage)
export const projects = [
    {
        id: 1,
        title: "NCIP Job Portal",
        category: "System",
        image: "/images/ncip.png",
        year: "2024",
        link: "https://ncip-portal.gov.ph"
    },
    {
        id: 2,
        title: "D'Marsians System",
        category: "Dashboard",
        image: "/images/dmars.png",
        year: "2025",
        link: "#"
    },
    {
        id: 3,
        title: "FoodTrack Sales",
        category: "Mobile",
        image: "/images/foodtrack.png",
        year: "2025",
        link: "#"
    },
    {
        id: 4,
        title: "PawPointment",
        category: "App",
        image: "/images/paw.png",
        year: "2026",
        link: "#"
    },
];

const Projects = () => {
    const targetRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    // Lite / Performance Optimization:
    // 1. Percentage (-75%) is relative to TOTAL container width (~300vw). 
    //    -75% of 300vw ≈ -225vw shift. This leaves the last ~75vw visible.
    // 2. scrub: 0 (Instant interactions, no laggy cleanups)
    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-75%"]);

    return (
        <section id="selected-works" ref={targetRef} className="relative h-[300vh] bg-[#0a0a0a]">

            {/* Horizontal Scroll Container (Sticky) */}
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">

                <motion.div
                    style={{ x }}
                    className="flex gap-10 pl-10 md:pl-20 will-change-transform" // GPU Acceleration
                >
                    {/* Header Card */}
                    <div className="relative h-[60vh] w-[80vw] md:w-[40vw] flex flex-col justify-center shrink-0">
                        <h2 className="font-serif-display text-6xl md:text-8xl text-white mb-6">
                            Selected <br /> Works
                        </h2>
                        <p className="font-mono-tech text-xs text-gray-400 uppercase tracking-widest max-w-sm">
                            A curated selection of systems, mobile apps, and digital interfaces.
                        </p>
                        <div className="mt-8 flex items-center gap-4">
                            <div className="w-12 h-[1px] bg-[#FF331F]"></div>
                            <span className="font-mono-tech text-[10px] text-[#FF331F]">
                                DRAG TO EXPLORE
                            </span>
                        </div>
                    </div>

                    {/* Project Cards */}
                    {projects.map((project) => (
                        <div
                            key={project.id}
                            className="group relative h-[60vh] w-[85vw] md:w-[50vw] shrink-0 bg-[#111] overflow-hidden border border-white/10"
                        >
                            {/* Image with Hover Zoom */}
                            <div className="absolute inset-0 grayscale group-hover:grayscale-0 transition-all duration-700">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                                />
                            </div>

                            {/* Content Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>

                            <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <div className="flex justify-between items-end mb-2">
                                    <h3 className="font-serif-display text-4xl text-white">
                                        {project.title}
                                    </h3>
                                    <span className="font-mono-tech text-xs text-[#FF331F] border border-[#FF331F] px-2 py-1 rounded-full">
                                        {project.year}
                                    </span>
                                </div>
                                <p className="font-mono-tech text-xs text-gray-400 uppercase tracking-widest">
                                    {project.category}
                                </p>
                            </div>
                        </div>
                    ))}

                    {/* End Card (Your Project) */}
                    <div className="relative h-[60vh] w-[60vw] md:w-[40vw] flex flex-col justify-center shrink-0 ml-10 border-l border-white/10 pl-10">
                        <p className="font-mono-tech text-xs text-gray-500 uppercase tracking-widest mb-4">
                            What's Next?
                        </p>
                        <h2 className="font-serif-display text-5xl md:text-7xl text-white mb-6 leading-tight">
                            YOUR <br /> PROJECT
                        </h2>

                        <a href="#contact" className="group flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-[#FF331F] group-hover:border-[#FF331F] transition-all duration-500">
                                <span className="font-serif-display text-2xl text-white italic group-hover:scale-110 transition-transform">
                                    →
                                </span>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-mono-tech text-xs text-white uppercase tracking-widest group-hover:text-[#FF331F] transition-colors">
                                    Start a conversation
                                </span>
                                <span className="font-mono-tech text-[10px] text-gray-500">
                                    harra.ramos26@gmail.com
                                </span>
                            </div>
                        </a>
                    </div>

                </motion.div>
            </div>
        </section>
    );
};

export default Projects;
