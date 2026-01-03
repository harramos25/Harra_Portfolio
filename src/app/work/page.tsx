"use client";
import React, { useState, useMemo } from "react";
import Navbar from "@/components/layout/Navbar";
import { motion, AnimatePresence } from "framer-motion";

const allProjects = [
    {
        id: 1,
        title: "NCIP Job Portal",
        year: "2024",
        role: "Full Stack",
        stack: ["PHP", "MySQL", "System"],
        image: "/images/ncip.png",
        description: "Government recruitment automated filtering system.",
    },
    {
        id: 2,
        title: "D'Marsians System",
        year: "2025",
        role: "UI/UX & QA",
        stack: ["Figma", "UI/UX", "System"],
        image: "/images/dmars.png",
        description: "Real-time student progress tracking dashboard.",
    },
    {
        id: 3,
        title: "FoodTrack Sales",
        year: "2025",
        role: "UI/UX",
        stack: ["Figma", "UI/UX", "Mobile"],
        image: "/images/foodtrack.png",
        description: "Inventory sales management system.",
    },
    {
        id: 4,
        title: "PawPointment",
        year: "2026",
        role: "Mobile Dev",
        stack: ["Flutter", "Mobile", "UI/UX"],
        image: "/images/paw.png",
        description: "Veterinary appointment scheduling application.",
    },
];

const WorkPage = () => {
    const [activeYear, setActiveYear] = useState("All");
    const [activeStack, setActiveStack] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const yearFilters = ["All", "2026", "2025", "2024"];
    const stackFilters = ["All", "System", "Mobile", "React", "PHP", "UI/UX"];

    const filteredProjects = useMemo(() => {
        return allProjects.filter((project) => {
            const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesYear = activeYear === "All" || project.year === activeYear;
            const matchesStack = activeStack === "All" ||
                project.stack.some(s => s.includes(activeStack)) ||
                project.stack.includes(activeStack);

            return matchesSearch && matchesYear && matchesStack;
        });
    }, [activeYear, activeStack, searchQuery]);

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-[#e5e5e5] selection:bg-[#FF331F] selection:text-black">
            <Navbar />

            {/* 1. MASTHEAD (Responsive Padding) */}
            <div className="pt-28 md:pt-32 pb-8 px-6 md:px-12 border-b border-white/20">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">

                    {/* Massive Title */}
                    <div>
                        <div className="flex items-center gap-4 mb-2">
                            <span className="w-2 h-2 md:w-3 md:h-3 bg-[#FF331F] rounded-full"></span>
                            <span className="font-mono-tech text-[10px] md:text-xs uppercase tracking-widest text-gray-500">
                                Vol. 26 — Database
                            </span>
                        </div>
                        {/* Responsive Text Size: 18vw on mobile, 10vw on desktop */}
                        <h1 className="text-[18vw] md:text-[10vw] font-serif-display leading-[0.8] tracking-tighter mix-blend-difference uppercase">
                            PROJECTS
                        </h1>
                    </div>

                    {/* Description */}
                    <div className="max-w-xs mb-1 md:mb-2 w-full md:w-auto">
                        <p className="font-mono-tech text-[10px] md:text-xs text-gray-400 leading-relaxed uppercase text-left md:text-right">
                            A collection of deployed systems, <br className="hidden md:block" />
                            interfaces, and experiments. <br />
                            <span className="text-[#FF331F]">
                                {filteredProjects.length} Records Found
                            </span>
                        </p>
                    </div>
                </div>
            </div>

            {/* 2. STICKY CONTROL BAR (Mobile Optimized - Two Rows) */}
            <div className="sticky top-0 z-40 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/20 shadow-xl shadow-black/20">

                {/* ROW 1: Search + Year */}
                <div className="flex flex-col md:flex-row border-b border-white/10">
                    <div className="w-full md:w-1/3 border-b border-white/10 md:border-b-0 md:border-r border-white/20 p-4">
                        <input
                            type="text"
                            placeholder="SEARCH PROJECTS..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-transparent font-mono-tech text-xs uppercase tracking-widest focus:outline-none placeholder:text-gray-600 appearance-none rounded-none"
                        />
                    </div>
                    <div className="w-full md:w-2/3 p-4 overflow-x-auto no-scrollbar flex items-center gap-6">
                        <span className="font-mono-tech text-xs text-gray-600 uppercase shrink-0">Year:</span>
                        {yearFilters.map((year) => (
                            <button
                                key={year}
                                onClick={() => setActiveYear(year)}
                                className={`
                                    font-mono-tech text-[10px] md:text-xs uppercase tracking-widest transition-colors whitespace-nowrap shrink-0
                                    ${activeYear === year ? "text-[#FF331F] underline decoration-[#FF331F] underline-offset-4" : "text-gray-500 hover:text-white"}
                                `}
                            >
                                {year}
                            </button>
                        ))}
                    </div>
                </div>

                {/* ROW 2: Stack */}
                <div className="p-4 overflow-x-auto no-scrollbar flex items-center gap-6">
                    <span className="font-mono-tech text-xs text-gray-600 uppercase shrink-0">Stack:</span>
                    {stackFilters.map((stack) => (
                        <button
                            key={stack}
                            onClick={() => setActiveStack(stack)}
                            className={`
                                font-mono-tech text-[10px] md:text-xs uppercase tracking-widest transition-colors whitespace-nowrap shrink-0
                                ${activeStack === stack ? "text-[#FF331F] underline decoration-[#FF331F] underline-offset-4" : "text-gray-500 hover:text-white"}
                            `}
                        >
                            {stack}
                        </button>
                    ))}
                </div>
            </div>

            {/* 3. THE GRID (1 Column Mobile / 3 Columns Desktop) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-b border-white/20">
                <AnimatePresence mode="popLayout">
                    {filteredProjects.map((project, index) => (
                        <motion.div
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            key={project.id}
                            className="group relative border-b md:border-b-0 border-white/20 md:border-r h-[45vh] md:h-[60vh] flex flex-col justify-between overflow-hidden cursor-pointer"
                        >

                            {/* Header inside the box */}
                            <div className="p-4 md:p-6 relative z-20 flex justify-between items-start mix-blend-difference">
                                <span className="font-mono-tech text-xs text-gray-400">0{index + 1}</span>
                                <span className="font-mono-tech text-[10px] md:text-xs text-[#FF331F] border border-[#FF331F] px-2 py-0.5 rounded-full">
                                    {project.year}
                                </span>
                            </div>

                            {/* The Image (Background) */}
                            <div className="absolute inset-0 z-0 bg-gray-900">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                                />
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all duration-500"></div>
                            </div>

                            {/* Footer Info */}
                            <div className="relative z-20 p-4 md:p-6 bg-gradient-to-t from-black via-black/80 to-transparent md:translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <h2 className="font-serif-display text-3xl md:text-4xl text-white mb-2 leading-none">
                                    {project.title}
                                </h2>
                                <div className="flex flex-wrap gap-x-3 md:gap-x-4 gap-y-2 font-mono-tech text-[10px] text-gray-400 uppercase tracking-widest">
                                    <span>{project.role}</span>
                                    <span className="text-[#FF331F]">//</span>
                                    {project.stack.slice(0, 3).join(" + ")}
                                </div>
                            </div>

                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* 4. FOOTER MARKER */}
            <div className="py-12 md:py-24 text-center">
                <p className="font-mono-tech text-[10px] uppercase tracking-[0.5em] text-gray-600">
                    End of Index
                </p>
            </div>

        </div>
    );
};

export default WorkPage;
