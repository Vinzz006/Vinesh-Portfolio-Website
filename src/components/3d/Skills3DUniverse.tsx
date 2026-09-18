import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Html } from '@react-three/drei';
import * as THREE from 'three';
import { skillCategories, SkillCategory } from '../../data/skills';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface Skills3DUniverseProps {
  activeCategory: string;
  onSelectCategory: (id: string) => void;
}

function CategoryOrbitNode({
  category,
  index,
  total,
  isSelected,
  onSelect,
}: {
  category: SkillCategory;
  index: number;
  total: number;
  isSelected: boolean;
  onSelect: (id: string) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Distribute along an elliptical orbit
  const angle = (index / total) * Math.PI * 2;
  const radiusX = 3.2;
  const radiusY = 1.8;
  const x = Math.cos(angle) * radiusX;
  const y = Math.sin(angle) * radiusY;
  const z = Math.sin(angle * 2) * 0.8;

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.4;
      meshRef.current.rotation.x += delta * 0.2;
    }
  });

  return (
    <group position={[x, y, z]}>
      <Float speed={2} rotationIntensity={0.8} floatIntensity={0.6}>
        <mesh
          ref={meshRef}
          onClick={() => onSelect(category.id)}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          scale={isSelected || hovered ? 1.35 : 1}
        >
          <octahedronGeometry args={[0.3, 0]} />
          <meshStandardMaterial
            color={category.accent}
            emissive={category.accent}
            emissiveIntensity={isSelected ? 1.5 : hovered ? 1.2 : 0.6}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      </Float>

      {/* HTML 3D Floating Badge */}
      <Html position={[0, -0.45, 0]} center distanceFactor={8} pointerEvents="auto">
        <button
          onClick={() => onSelect(category.id)}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className={`px-2.5 py-1 rounded-full text-[10px] font-mono whitespace-nowrap transition-all duration-300 backdrop-blur-md cursor-pointer border ${
            isSelected
              ? 'bg-primary/20 text-white border-primary shadow-[0_0_15px_#00D4FF]'
              : hovered
              ? 'bg-[#0C0C0C]/90 text-white border-white/30 scale-105'
              : 'bg-[#0C0C0C]/75 text-text-secondary border-white/10'
          }`}
          style={{
            borderColor: isSelected ? category.accent : undefined,
            color: isSelected ? category.accent : undefined,
          }}
        >
          {category.label}
        </button>
      </Html>
    </group>
  );
}

function TechStackCore() {
  const coreRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (coreRef.current) coreRef.current.rotation.y += delta * 0.25;
    if (ringRef.current) ringRef.current.rotation.z -= delta * 0.3;
  });

  return (
    <group ref={coreRef}>
      {/* Central Tech Stack Core */}
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh>
          <icosahedronGeometry args={[0.85, 1]} />
          <meshStandardMaterial
            wireframe
            color="#00D4FF"
            emissive="#7C3AED"
            emissiveIntensity={0.7}
            transparent
            opacity={0.65}
          />
        </mesh>
      </Float>

      <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.4, 0.015, 16, 64]} />
        <meshStandardMaterial color="#00D4FF" emissive="#00D4FF" emissiveIntensity={0.8} />
      </mesh>

      <Html position={[0, 0, 0]} center pointerEvents="none">
        <div className="px-3 py-1 rounded-lg bg-[#050505]/90 border border-primary/40 text-primary font-mono text-[9px] font-bold tracking-[0.2em] uppercase backdrop-blur-md shadow-[0_0_20px_rgba(0,212,255,0.2)]">
          TECH STACK
        </div>
      </Html>
    </group>
  );
}

export default function Skills3DUniverse({
  activeCategory,
  onSelectCategory,
}: Skills3DUniverseProps) {
  const reduced = useReducedMotion();

  if (reduced) return null;

  return (
    <div className="w-full h-[380px] sm:h-[440px] relative rounded-2xl overflow-hidden border border-border-subtle bg-[#080808]/70 backdrop-blur-md shadow-2xl">
      <div className="absolute top-3 left-4 z-10 font-mono text-[10px] text-text-muted tracking-widest uppercase flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
        3D SKILL UNIVERSE // CLICK A NODE TO EXPLORE
      </div>

      <Canvas
        camera={{ position: [0, 0, 6.2], fov: 48 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[6, 6, 4]} intensity={2.5} color="#00D4FF" />
        <pointLight position={[-6, -6, 2]} intensity={2.0} color="#7C3AED" />

        <TechStackCore />

        {skillCategories.map((cat, i) => (
          <CategoryOrbitNode
            key={cat.id}
            category={cat}
            index={i}
            total={skillCategories.length}
            isSelected={activeCategory === cat.id}
            onSelect={onSelectCategory}
          />
        ))}
      </Canvas>
    </div>
  );
}
