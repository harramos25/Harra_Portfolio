"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";
import { Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ALL_PROJECTS = [
    { id: 1, title: "NCIP Job Portal", year: "2024", stack: "PHP", type: "System", image: "bg-zinc-800" },
    { id: 2, title: "D'Marsians System", year: "2025", stack: "UI/UX", type: "System", image: "bg-zinc-800" },
    { id: 3, title: "PawPointment", year: "2026", stack: "Mobile", type: "Mobile App", image: "bg-zinc-800" },
    { id: 4, title: "FoodTrack", year: "2025", stack: "UI/UX", type: "Web App", image: "bg-zinc-800" },
    { id: 5, title: "Portfolio V1", year: "2024", stack: "React", type: "Web App", image: "bg-zinc-800" },
    { id: 6, title: "E-Commerce", year: "2026", stack: "Next.js", type: "Web App", image: "bg-zinc-800" },
];

export default function WorkPage() {
    const [filter, setFilter] = useState("All");
    const [search, setSearch] = useState("");
    const [selectedProject, setSelectedProject] = useState<any>(null);

    const filteredProjects = ALL_PROJECTS.filter(p => {
        const matchesFilter = filter === "All" || p.stack.includes(filter) || p.year === filter || p.type === filter;
        const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    return (
        <main className="bg-[#0a0a0a] min-h-screen text-[#e5e5e5]">
            <Navbar />

            <div className="container mx-auto px-6 pt-32 pb-12">
                <div className="border-b border-white/20 pb-8 mb-12 flex justify-between items-end">
                    <h1 className="text-6xl md:text-8xl font-serif-display font-medium tracking-tighter mix-blend-difference">
                        ARCHIVE
                    </h1>
                    <p className="font-mono-tech hidden md:block text-xs uppercase tracking-widest text-[#FF331F]">
                        ( {filteredProjects.length} ) Projects Found
                    </p>
                </div>

                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center mb-12">
                    <div className="relative w-full md:w-auto font-mono-tech">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                        <input
                            type="text"
                            placeholder="Search archives..."
                            className="pl-10 pr-4 py-3 bg-transparent border-b border-white/20 focus:border-[#FF331F] w-full md:w-64 focus:outline-none transition-colors"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <div className="flex gap-2 flex-wrap font-mono-tech text-xs uppercase tracking-wider">
                        {["All", "2026", "2025", "React", "PHP", "UI/UX", "Mobile", "System"].map((f) => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-4 py-2 border transition-colors ${filter === f ? "border-[#FF331F] text-[#FF331F]" : "border-white/20 text-zinc-500 hover:border-white"}`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid */}
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                    <AnimatePresence>
                        {filteredProjects.map((project) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                key={project.id}
                                className="group cursor-pointer"
                                onClick={() => setSelectedProject(project)}
                            >
                                <div className={`aspect-[4/5] mb-4 overflow-hidden relative  ${project.image} border border-white/10`}>
                                    <div className="absolute inset-0 bg-[#FF331F]/0 group-hover:bg-[#FF331F]/10 transition-colors duration-500" />
                                    {/* Placeholder for image */}
                                    <div className="w-full h-full flex items-center justify-center font-serif-display text-4xl text-white/5 group-hover:text-white/20 transition-colors">
                                        {project.title[0]}
                                    </div>
                                </div>
                                <div className="border-t border-white/20 pt-4 flex justify-between items-start font-mono-tech text-xs uppercase tracking-wider">
                                    <div>
                                        <h3 className="text-sm font-bold text-[#e5e5e5] mb-1 group-hover:text-[#FF331F] transition-colors">{project.title}</h3>
                                        <p className="text-zinc-500">{project.type}</p>
                                    </div>
                                    <span className="text-zinc-500">{project.year}</span>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>

            {/* Project Detail Overlay */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-0 md:p-12"
                        onClick={() => setSelectedProject(null)}
                    >
                        <div onClick={(e) => e.stopPropagation()} className="bg-[#0a0a0a] w-full h-full max-w-6xl md:border md:border-white/10 md:p-12 p-6 overflow-y-auto relative">
                            <button onClick={() => setSelectedProject(null)} className="absolute top-6 right-6 font-mono-tech text-xs uppercase tracking-widest hover:text-[#FF331F]">
                                [ Close ]
                            </button>

                            <div className="grid md:grid-cols-2 gap-12 mt-12">
                                <div>
                                    <h2 className="text-5xl md:text-7xl font-serif-display mb-6 leading-[0.9]">{selectedProject.title}</h2>

                                    <div className="space-y-6 font-mono-tech text-xs uppercase tracking-widest text-zinc-500 border-t border-white/10 pt-6">
                                        <div className="flex justify-between">
                                            <span>Type</span>
                                            <span className="text-[#e5e5e5]">{selectedProject.type}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Year</span>
                                            <span className="text-[#e5e5e5]">{selectedProject.year}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Stack</span>
                                            <span className="text-[#e5e5e5]">{selectedProject.stack}</span>
                                        </div>
                                    </div>

                                    <div className="mt-12 text-zinc-400 leading-relaxed max-w-md">
                                        <p>Detailed project description goes here. Explain the challenge, the solution, and the impact.</p>
                                    </div>

                                    <div className="mt-12">
                                        <Button variant="secondary">View Live Project</Button>
                                    </div>
                                </div>

                                <div className="h-[40vh] md:h-full bg-zinc-900 border border-white/5">
                                    {/* Image placeholder */}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}
