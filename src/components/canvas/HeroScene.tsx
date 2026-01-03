"use client";

import { Canvas } from "@react-three/fiber";
import { MeshDistortMaterial, Float, Environment, Plane } from "@react-three/drei";

export default function HeroScene() {
    return (
        <div className="absolute inset-0 z-0 h-full w-full pointer-events-none">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 75 }}
                gl={{ preserveDrawingBuffer: true, alpha: true }}
                resize={{ scroll: false, debounce: 0 }}
            >
                <ambientLight intensity={1} />
                <directionalLight position={[10, 10, 5]} intensity={2} />
                {/* Liquid Plane Background */}
                <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
                    <Plane args={[10, 10, 64, 64]} scale={1.5}>
                        <MeshDistortMaterial
                            color="#555555"
                            speed={3}
                            distort={0.6}
                            radius={1}
                            roughness={0.2}
                            metalness={1}
                            envMapIntensity={2}
                        />
                    </Plane>
                </Float>
                <Environment preset="warehouse" />
            </Canvas>
        </div>
    );
}
