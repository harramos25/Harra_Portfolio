"use client";
import React, { useEffect, useState, useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Physics, RigidBody, CuboidCollider, useRapier, RapierRigidBody } from "@react-three/rapier";
import { useTexture, Environment } from "@react-three/drei";
import * as THREE from "three";

// 1. Interactive Sphere
const IconSphere = ({ texturePath, position, onReset }: { texturePath: string; position: [number, number, number], onReset: () => void }) => {
    const texture = useTexture(texturePath);
    const rigidBody = useRef<RapierRigidBody>(null);
    const [hovered, setHovered] = useState(false);

    // Reset logic if falls too far
    useFrame(() => {
        if (rigidBody.current) {
            const translation = rigidBody.current.translation();
            if (translation.y < -10) {
                rigidBody.current.setTranslation({ x: 0, y: 10, z: 0 }, true);
                rigidBody.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
                rigidBody.current.setAngvel({ x: 0, y: 0, z: 0 }, true);
            }
        }
    });

    const handlePointerDown = (e: any) => {
        e.stopPropagation();
        if (rigidBody.current) {
            // Apply a random upward impulse to "pop" it when clicked
            rigidBody.current.applyImpulse({ x: (Math.random() - 0.5) * 2, y: 5, z: (Math.random() - 0.5) * 2 }, true);
            rigidBody.current.applyTorqueImpulse({ x: Math.random(), y: Math.random(), z: Math.random() }, true);
        }
    };

    return (
        <RigidBody
            ref={rigidBody}
            position={position}
            restitution={0.4}
            friction={0.5}
            colliders="ball"
            onSleep={() => rigidBody.current?.wakeUp()} // Keep them active
        >
            <mesh
                castShadow
                receiveShadow
                onPointerOver={() => { document.body.style.cursor = 'grab'; setHovered(true); }}
                onPointerOut={() => { document.body.style.cursor = 'auto'; setHovered(false); }}
                onPointerDown={handlePointerDown}
                scale={hovered ? 1.1 : 1}
            >
                <sphereGeometry args={[0.6, 32, 32]} />
                <meshStandardMaterial
                    map={texture}
                    metalness={0.1}
                    roughness={0.2}
                />
            </mesh>
        </RigidBody>
    );
};

// 2. Mouse Controller (Invisible sphere that follows mouse for collisions)
const MouseController = () => {
    const { viewport } = useThree();
    const body = useRef<RapierRigidBody>(null);
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const vector = new THREE.Vector3();

    useFrame((state) => {
        if (!body.current) return;

        // Raycast to find mouse position on z=0 plane
        state.raycaster.ray.intersectPlane(plane, vector);

        // Move the kinematic body to mouse position
        body.current.setNextKinematicTranslation({ x: vector.x, y: vector.y, z: 0 });
    });

    return (
        <RigidBody ref={body} type="kinematicPosition" colliders={false}>
            <CuboidCollider args={[0.5, 0.5, 0.5]} />
        </RigidBody>
    );
};

// 3. Walls (No holes)
const Walls = () => {
    const { viewport } = useThree();
    const width = viewport.width;
    const height = viewport.height;

    return (
        <>
            <CuboidCollider position={[0, -height / 2 - 1, 0]} args={[width, 1, 10]} /> {/* Floor (Lowered slightly) */}
            <CuboidCollider position={[-width / 2 - 0.5, 0, 0]} args={[0.5, height, 10]} /> {/* Left */}
            <CuboidCollider position={[width / 2 + 0.5, 0, 0]} args={[0.5, height, 10]} /> {/* Right */}
            <CuboidCollider position={[0, height / 2 + 10, 0]} args={[width, 1, 10]} /> {/* Ceiling (High up) */}
            <CuboidCollider position={[0, 0, -2]} args={[width, height, 1]} /> {/* Back Wall */}
            <CuboidCollider position={[0, 0, 2]} args={[width, height, 1]} /> {/* Front Wall (Invisible glass) */}
        </>
    );
};

const TechStack = () => {
    const [startDrop, setStartDrop] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setStartDrop(true);
            },
            { threshold: 0.1 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    // Full Icon Map
    const toolMap = {
        react: "/icons/react.png",
        next: "/icons/next.png",
        ts: "/icons/ts.png",
        js: "/icons/html.png", // Fallback (Set)
        html: "/icons/html.png", // Set
        css: "/icons/html.png", // Set
        node: "/icons/node.png",
        figma: "/icons/figma.png",
        three: "/icons/threejs.png", // Use threejs
        blender: "/icons/blender.png",
        php: "/icons/php.png",
        laravel: "/icons/laravel.png",
        tailwind: "/icons/tailwind.png",
        mysql: "/icons/mysql.png",
        firebase: "/icons/firebase.png",
        vue: "/icons/vue.png",
        // Fallbacks for missing generated ones (Using generic colored ones or existing)
        python: "/icons/ts.png", // Fallback
        csharp: "/icons/php.png", // Fallback
        cpp: "/icons/react.png", // Fallback
        angular: "/icons/vue.png", // Fallback
        json: "/icons/node.png", // Fallback
    };

    // The User's Requested List
    const requestedTools = [
        "next", "php", "react", "tailwind", "node", "figma", "three", "blender", "ts", "laravel",
        "mysql", "firebase", "html", "html", "css", "css", "js", "json", "vue", "angular",
        "python", "csharp", "cpp"
    ];

    return (
        <section
            id="tech-stack"
            ref={sectionRef}
            className="relative w-full h-[80vh] bg-[#0a0a0a] overflow-hidden"
            style={{ touchAction: "none" }} // Allow canvas interaction dominance? No, "pan-y" is safer for scrolling, but user wants drag.
        >
            <div className="absolute top-10 w-full text-center z-10 pointer-events-none">
                <h2 className="text-4xl font-serif-display text-[#e5e5e5]">Creative Toolkit</h2>
                <p className="text-sm font-mono-tech text-gray-500 mt-2">Interact with the stack</p>
            </div>

            <Canvas
                shadows
                dpr={[1, 2]}
                camera={{ position: [0, 0, 14], fov: 35 }}
                style={{ pointerEvents: 'auto' }}
                gl={{ powerPreference: "high-performance", alpha: true, antialias: true }}
                onCreated={({ gl }) => {
                    gl.domElement.addEventListener('webglcontextlost', (e) => { e.preventDefault(); }, false);
                }}
            >
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
                <Environment preset="city" />

                <Physics gravity={[0, -5, 0]}> {/* Lower gravity for floatier feel */}
                    <Walls />
                    <MouseController /> {/* Adds collision to cursor */}

                    {startDrop && requestedTools.map((tool, i) => {
                        // @ts-ignore
                        const path = toolMap[tool] || "/icons/react.png";
                        return (
                            <IconSphere
                                key={i}
                                texturePath={path}
                                position={[(Math.random() * 6) - 3, 10 + (Math.random() * 10), (Math.random() * 2) - 1]}
                                onReset={() => { }}
                            />
                        )
                    })}
                </Physics>
            </Canvas>
        </section>
    );
};

export default TechStack;
