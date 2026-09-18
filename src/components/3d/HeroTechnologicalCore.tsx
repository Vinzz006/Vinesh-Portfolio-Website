import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useReducedMotion } from '../../hooks/useReducedMotion';

// Verified tech nodes from Vinesh's authentic skillset
const ORBIT_TECH_BADGES = [
  'AI / ML',
  'ESP32',
  'TINYML',
  'FASTAPI',
  'REACT 19',
  'PYTORCH',
  'FREERTOS',
  'PYTHON',
  'THREE.JS',
  'MQTT',
];

interface HeroTechnologicalCoreProps {
  mouseX?: number;
  mouseY?: number;
}

// ─── 1. Futuristic Cybernetic Neural Core ─────────────────────────────────────
function CyberneticCore({ mouseX = 0, mouseY = 0 }: { mouseX: number; mouseY: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  const coreIcosaRef = useRef<THREE.Mesh>(null);

  // Smooth lerp target rotations
  const currentRot = useRef({ x: 0, y: 0 });

  useFrame((_, delta) => {
    // Damping mouse parallax (gentle 5-8% lerp)
    currentRot.current.x += (-mouseY * 0.4 - currentRot.current.x) * 0.06;
    currentRot.current.y += (mouseX * 0.5 - currentRot.current.y) * 0.06;

    if (groupRef.current) {
      groupRef.current.rotation.x = currentRot.current.x;
      groupRef.current.rotation.y = currentRot.current.y;
    }

    // Continuous smooth multi-axis planetary rotation for cybernetic rings
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.25;
      ring1Ref.current.rotation.x += delta * 0.15;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y -= delta * 0.3;
      ring2Ref.current.rotation.z += delta * 0.1;
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.x -= delta * 0.2;
      ring3Ref.current.rotation.y += delta * 0.25;
    }
    if (coreIcosaRef.current) {
      coreIcosaRef.current.rotation.y += delta * 0.4;
      coreIcosaRef.current.rotation.x += delta * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Luminescent Neural Core */}
      <Float speed={2.5} rotationIntensity={0.6} floatIntensity={0.8}>
        {/* Inner Glowing Emissive Sphere */}
        <mesh>
          <sphereGeometry args={[0.72, 32, 32]} />
          <meshStandardMaterial
            color="#050505"
            emissive="#00D4FF"
            emissiveIntensity={0.9}
            roughness={0.15}
            metalness={0.95}
          />
        </mesh>

        {/* Crystalline Icosahedron Lattice */}
        <mesh ref={coreIcosaRef}>
          <icosahedronGeometry args={[1.05, 1]} />
          <meshStandardMaterial
            wireframe
            color="#00D4FF"
            emissive="#7C3AED"
            emissiveIntensity={0.6}
            transparent
            opacity={0.5}
            wireframeLinewidth={2}
          />
        </mesh>
      </Float>

      {/* Cybernetic Multi-Axis Rings (Electronics & Signal Representation) */}
      {/* Outer Cyan Ring */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.65, 0.022, 16, 100]} />
        <meshStandardMaterial
          color="#00D4FF"
          emissive="#00D4FF"
          emissiveIntensity={0.8}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Mid Violet Data Ring */}
      <mesh ref={ring2Ref} rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <torusGeometry args={[1.9, 0.018, 16, 100]} />
        <meshStandardMaterial
          color="#7C3AED"
          emissive="#7C3AED"
          emissiveIntensity={0.9}
          metalness={0.85}
          roughness={0.2}
        />
      </mesh>

      {/* Outer Thin Telemetry Orbit */}
      <mesh ref={ring3Ref} rotation={[-Math.PI / 4, Math.PI / 3, 0]}>
        <torusGeometry args={[2.2, 0.014, 16, 120]} />
        <meshStandardMaterial
          color="#10B981"
          emissive="#10B981"
          emissiveIntensity={0.7}
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={0.65}
        />
      </mesh>
    </group>
  );
}

// ─── 2. Floating Geometric Tech Satellites ─────────────────────────────────────
function OrbitingTechNodes() {
  const nodesGroupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (nodesGroupRef.current) {
      nodesGroupRef.current.rotation.y += delta * 0.08;
    }
  });

  // Calculate 6 orbiting satellite positions
  const satellites = useMemo(() => {
    return [
      { pos: [2.5, 0.8, -0.6] as [number, number, number], color: '#00D4FF', size: 0.14 },
      { pos: [-2.4, -0.7, 0.8] as [number, number, number], color: '#7C3AED', size: 0.12 },
      { pos: [1.2, 2.3, 0.5] as [number, number, number], color: '#10B981', size: 0.13 },
      { pos: [-1.4, 2.1, -1.2] as [number, number, number], color: '#F59E0B', size: 0.11 },
      { pos: [2.0, -1.8, 0.9] as [number, number, number], color: '#00D4FF', size: 0.12 },
      { pos: [-2.2, 1.2, 1.4] as [number, number, number], color: '#EC4899', size: 0.10 },
    ];
  }, []);

  return (
    <group ref={nodesGroupRef}>
      {satellites.map((sat, i) => (
        <Float key={i} speed={2 + i * 0.3} rotationIntensity={1.5} floatIntensity={1.2}>
          <mesh position={sat.pos}>
            <octahedronGeometry args={[sat.size, 0]} />
            <meshStandardMaterial
              color={sat.color}
              emissive={sat.color}
              emissiveIntensity={0.9}
              metalness={0.9}
              roughness={0.2}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

// ─── 3. Adaptive Particle Nebula ──────────────────────────────────────────────
function ParticleNebula({ count }: { count: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Cylindrical/spherical spatial distribution
      const radius = 1.8 + Math.random() * 3.8;
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 4.5;

      arr[i * 3] = radius * Math.cos(theta);
      arr[i * 3 + 1] = y;
      arr[i * 3 + 2] = radius * Math.sin(theta);
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.04;
      pointsRef.current.rotation.x += delta * 0.015;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00D4FF"
        size={0.038}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.65}
      />
    </Points>
  );
}

// ─── 4. Main Exported Technological Core ──────────────────────────────────────
export default function HeroTechnologicalCore({
  mouseX = 0,
  mouseY = 0,
}: HeroTechnologicalCoreProps) {
  const reduced = useReducedMotion();
  const [hasWebGL, setHasWebGL] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    // Detect mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Detect WebGL capability safely
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setHasWebGL(false);
    } catch {
      setHasWebGL(false);
    }

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Graceful 2D Fallback if WebGL or reduced motion is active
  if (reduced || !hasWebGL) {
    return (
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center opacity-40">
        <div className="w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-primary/20 via-secondary/15 to-transparent blur-3xl animate-pulse-slow" />
      </div>
    );
  }

  // Particle count adapted dynamically to client device capacity
  const particleCount = isMobile ? 300 : 850;

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-85">
      <Canvas
        camera={{ position: [0, 0, 5.8], fov: 50 }}
        gl={{
          antialias: !isMobile,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
      >
        {/* Cinematic Studio Lighting */}
        <ambientLight intensity={0.4} />
        {/* Electric Blue Key Rim */}
        <pointLight position={[5, 6, 4]} intensity={2.8} color="#00D4FF" />
        {/* Deep Violet Fill */}
        <pointLight position={[-5, -4, -2]} intensity={2.2} color="#7C3AED" />
        {/* Emerald Edge Light */}
        <directionalLight position={[0, -5, 3]} intensity={0.9} color="#10B981" />

        {/* Technological Core Assembly */}
        <CyberneticCore mouseX={mouseX} mouseY={mouseY} />
        <OrbitingTechNodes />
        <ParticleNebula count={particleCount} />
      </Canvas>
    </div>
  );
}
