import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { useReducedMotion } from '../../hooks/useReducedMotion';

function FloatingGeometries() {
  const torusRef = useRef<THREE.Mesh>(null);
  const octaRef = useRef<THREE.Mesh>(null);
  const icosaRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (torusRef.current) {
      torusRef.current.rotation.x += delta * 0.15;
      torusRef.current.rotation.y += delta * 0.2;
    }
    if (octaRef.current) {
      octaRef.current.rotation.y -= delta * 0.25;
      octaRef.current.rotation.z += delta * 0.1;
    }
    if (icosaRef.current) {
      icosaRef.current.rotation.x += delta * 0.18;
      icosaRef.current.rotation.z -= delta * 0.15;
    }
  });

  return (
    <>
      {/* Upper Right Floating Torus */}
      <Float speed={1.8} rotationIntensity={0.8} floatIntensity={1.2}>
        <mesh ref={torusRef} position={[4.2, 1.5, -2]} scale={[1.2, 1.2, 1.2]}>
          <torusGeometry args={[1.2, 0.25, 16, 48]} />
          <meshStandardMaterial
            wireframe
            color="#00D4FF"
            transparent
            opacity={0.22}
            emissive="#00D4FF"
            emissiveIntensity={0.3}
          />
        </mesh>
      </Float>

      {/* Lower Left Floating Octahedron */}
      <Float speed={2.2} rotationIntensity={1} floatIntensity={1.5}>
        <mesh ref={octaRef} position={[-4.5, -1.8, -1.5]} scale={[1.1, 1.1, 1.1]}>
          <octahedronGeometry args={[1.2, 0]} />
          <meshStandardMaterial
            wireframe
            color="#7C3AED"
            transparent
            opacity={0.25}
            emissive="#7C3AED"
            emissiveIntensity={0.4}
          />
        </mesh>
      </Float>

      {/* Center Background Ambient Icosahedron */}
      <Float speed={1.2} rotationIntensity={0.5} floatIntensity={0.8}>
        <mesh ref={icosaRef} position={[1.5, -2.4, -3]} scale={[1.4, 1.4, 1.4]}>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial
            wireframe
            color="#10B981"
            transparent
            opacity={0.15}
            emissive="#10B981"
            emissiveIntensity={0.2}
          />
        </mesh>
      </Float>
    </>
  );
}

export default function About3DDecorations() {
  const reduced = useReducedMotion();

  if (reduced) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-50">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        gl={{ alpha: true, antialias: false }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[6, 6, 4]} intensity={1.5} color="#00D4FF" />
        <pointLight position={[-6, -6, 2]} intensity={1.2} color="#7C3AED" />
        <FloatingGeometries />
      </Canvas>
    </div>
  );
}
