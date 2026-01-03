"use client";

export default function About() {
    return (
        <section id="intro" className="relative w-full min-h-screen flex flex-col md:flex-row bg-[#0a0a0a] text-[#e5e5e5]">

            {/* LEFT COLUMN - THE STICKY IMAGE */}
            <div className="md:w-1/2 h-[50vh] md:h-screen md:sticky md:top-0 flex items-center justify-center p-0 border-r border-white/10 bg-black">
                <div className="relative w-full h-full overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 group">
                    {/* AI Vertical Image */}
                    <img
                        src="/images/about_vertical.png"
                        alt="Digital Artisan"
                        className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-700"
                    />

                    {/* The Red Overlay Tint */}
                    <div className="absolute inset-0 bg-red-900/20 mix-blend-overlay opacity-50 group-hover:opacity-0 transition-opacity duration-500"></div>
                </div>
            </div>

            {/* RIGHT COLUMN - THE SCROLLING TEXT */}
            <div className="md:w-1/2 flex flex-col justify-center p-8 md:p-16 space-y-6 bg-[#0a0a0a]">

                {/* Decorative Label */}
                <span className="text-[#FF331F] font-mono-tech text-sm tracking-widest border-b border-[#FF331F] w-fit pb-2 block mb-2">
                    001 — IDENTITY
                </span>

                {/* Headline - Big & Bold */}
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif-display leading-tight mix-blend-difference mt-0 break-words">
                    Detail-oriented <br />
                    <span className="stroke-text">
                        Digital Artisan.
                    </span>
                </h2>

                {/* Body Text */}
                <p className="text-xl text-zinc-400 font-mono-tech leading-relaxed max-w-md">
                    I am a <strong className="text-white">Full Stack Web Developer</strong> and <strong className="text-white">UI/UX Designer</strong>. I build high-performance systems from wireframe to deployment.
                </p>

                {/* SIGNATURE BLOCK */}
                <div className="pt-8 mt-12 border-t border-white/10 flex items-center justify-between">

                    {/* Label */}
                    <span className="font-mono-tech text-xs text-gray-500 tracking-widest uppercase">
                        Digital Artisan
                    </span>

                    {/* The Signature */}
                    <div className="relative pt-2">
                        <h3 className="font-signature text-6xl md:text-8xl text-[#e5e5e5] -rotate-2 mr-4 opacity-90 tracking-wide">
                            Harra Ramos
                        </h3>

                        {/* Optional: Add the "Digital Artisan" label next to it for contrast */}
                        <span className="absolute -bottom-4 right-2 font-mono-tech text-[9px] text-[#FF331F] uppercase tracking-widest opacity-80">
                            Signed ©26
                        </span>

                        {/* Optional: Add a subtle 'ink' glow behind it for depth */}
                        <div className="absolute inset-0 blur-xl bg-white/10 -z-10 rounded-full"></div>
                    </div>

                </div>
            </div>
        </section>
    );
}
