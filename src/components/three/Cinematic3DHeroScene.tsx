import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { useReducedMotion } from '../../hooks/useReducedMotion';

// 3D Particle Cloud Node Scene
function ParticleNodeCloud({ mouseX = 0, mouseY = 0 }: { mouseX?: number; mouseY?: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  // Generate 1200 random 3D particle coordinates in a sphere
  const count = 1200;
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const radius = 2.5 + Math.random() * 1.5;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);

    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = radius * Math.cos(phi);
  }

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.15;
      pointsRef.current.rotation.x += delta * 0.05;
      // Mouse interaction tilt
      pointsRef.current.rotation.y += (mouseX * 0.5 - pointsRef.current.rotation.y) * 0.05;
      pointsRef.current.rotation.x += (-mouseY * 0.5 - pointsRef.current.rotation.x) * 0.05;
    }
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group>
      {/* Outer 3D Particle Sphere */}
      <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#00D4FF"
          size={0.035}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.7}
        />
      </Points>

      {/* Inner Floating Wireframe Torus Knot */}
      <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
        <mesh ref={meshRef}>
          <torusKnotGeometry args={[1.1, 0.35, 128, 32]} />
          <meshBasicMaterial wireframe color="#7C3AED" transparent opacity={0.35} />
        </mesh>
      </Float>
    </group>
  );
}

export default function Cinematic3DHeroScene({
  mouseX = 0,
  mouseY = 0,
}: {
  mouseX?: number;
  mouseY?: number;
}) {
  const reduced = useReducedMotion();

  if (reduced) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-60">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#00D4FF" />
        <pointLight position={[-10, -10, -5]} intensity={0.8} color="#7C3AED" />
        <ParticleNodeCloud mouseX={mouseX} mouseY={mouseY} />
      </Canvas>
    </div>
  );
}
