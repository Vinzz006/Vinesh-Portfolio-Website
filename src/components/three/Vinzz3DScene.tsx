import { Suspense, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Points, PointMaterial, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import vineshCinematic from '../../assets/vinesh_cinematic_intro.jpg';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface Vinzz3DSceneProps {
  mouseX: number;
  mouseY: number;
  isEntering: boolean;
}

// 2.5D Cinematic Mesh with mouse parallax, soft glass backing, and specular studio lighting
function Portrait3DPlane({
  mouseX,
  mouseY,
  isEntering,
}: {
  mouseX: number;
  mouseY: number;
  isEntering: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const texture = useTexture(vineshCinematic);
  const { viewport } = useThree();

  // Aspect ratio of the photo: 1024 / 892 ≈ 1.148
  const aspect = 1024 / 892;
  const isMobile = viewport.width < 7.5;
  const isTablet = viewport.width >= 7.5 && viewport.width < 11;

  const width = isMobile ? Math.min(3.2, viewport.width * 0.8) : isTablet ? 3.8 : 4.4;
  const height = width / aspect;
  const posX = isMobile ? 0 : isTablet ? 1.8 : 2.5;
  const posY = isMobile ? -0.8 : 0.05;

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    // Parallax response with smooth damping
    const targetRotY = mouseX * 0.22;
    const targetRotX = -mouseY * 0.14;
    groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.08;
    groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.08;

    if (isEntering) {
      groupRef.current.position.z += delta * 5;
      groupRef.current.scale.x += delta * 0.4;
      groupRef.current.scale.y += delta * 0.4;
    }
  });

  return (
    <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.35}>
      <group ref={groupRef} position={[posX, posY, -0.1]}>
        {/* Dark cybernetic glass backing panel */}
        <mesh position={[0, 0, -0.04]}>
          <planeGeometry args={[width + 0.14, height + 0.14]} />
          <meshStandardMaterial
            color="#050A0F"
            metalness={0.9}
            roughness={0.2}
            transparent
            opacity={0.88}
          />
        </mesh>

        {/* Subtle glowing frame edge */}
        <mesh position={[0, 0, -0.02]}>
          <planeGeometry args={[width + 0.04, height + 0.04]} />
          <meshStandardMaterial
            color="#00D4FF"
            emissive="#00D4FF"
            emissiveIntensity={0.25}
            transparent
            opacity={0.6}
            wireframe
          />
        </mesh>

        {/* Main High-Res Photographic Mesh */}
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[width, height, 32, 32]} />
          <meshStandardMaterial
            map={texture}
            roughness={0.35}
            metalness={0.15}
          />
        </mesh>
      </group>
    </Float>
  );
}

// Floating Metallic Triangle Structure
function FloatingTriangle() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.z += delta * 0.1;
      groupRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1.2}>
      <group ref={groupRef} position={[-2.4, 1.8, -1.8]} scale={[1.8, 1.8, 1.8]}>
        <mesh>
          <torusGeometry args={[1.6, 0.06, 16, 3]} />
          <meshStandardMaterial
            color="#00D4FF"
            metalness={0.9}
            roughness={0.1}
            emissive="#00D4FF"
            emissiveIntensity={0.2}
          />
        </mesh>
      </group>
    </Float>
  );
}

// Floating Metallic Orbs
function FloatingOrbs() {
  const orb1Ref = useRef<THREE.Mesh>(null);
  const orb2Ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (orb1Ref.current) orb1Ref.current.rotation.y += delta * 0.2;
    if (orb2Ref.current) orb2Ref.current.rotation.x += delta * 0.3;
  });

  return (
    <>
      <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
        <mesh ref={orb1Ref} position={[0.4, 2.3, -2]} scale={[0.5, 0.5, 0.5]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color="#1E293B" metalness={0.95} roughness={0.1} />
        </mesh>
      </Float>
      <Float speed={1.8} rotationIntensity={0.8} floatIntensity={1}>
        <mesh ref={orb2Ref} position={[-4.2, -0.8, -1.5]} scale={[0.35, 0.35, 0.35]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.15} />
        </mesh>
      </Float>
    </>
  );
}

// Atmospheric Dust Particle Field
function DustParticles({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 1000;

  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 16;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
  }

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.03;
    pointsRef.current.rotation.x += (mouseY * 0.1 - pointsRef.current.rotation.x) * 0.05;
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#00D4FF"
        size={0.04}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
}

// Dark Reflective Pedestal / Floor
function ReflectivePedestal() {
  return (
    <group position={[-2, -1.8, 0]}>
      {/* Cylindrical Pedestal Base */}
      <mesh position={[0, 0, -0.5]}>
        <cylinderGeometry args={[3.2, 3.5, 0.4, 64]} />
        <meshStandardMaterial color="#0B132B" metalness={0.85} roughness={0.2} />
      </mesh>
      {/* Reflective Dark Floor */}
      <mesh position={[2, -0.3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#050A0F" metalness={0.9} roughness={0.3} />
      </mesh>
    </group>
  );
}

// Main R3F Canvas Container
export default function Vinzz3DScene({ mouseX, mouseY, isEntering }: Vinzz3DSceneProps) {
  const reduced = useReducedMotion();

  if (reduced) return null;

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-[#050A0F]">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 55 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        {/* Ambient & Dual-Tone Studio Lighting */}
        <ambientLight intensity={0.7} />
        {/* Cool Blue Rim Light from Top Left */}
        <spotLight
          position={[-6, 8, 5]}
          angle={0.6}
          penumbra={0.8}
          intensity={3}
          color="#00D4FF"
        />
        {/* Dedicated Soft Key Light focused on the Portrait */}
        <pointLight position={[2.5, 0.5, 4.5]} intensity={3.5} color="#FFF8F0" />
        {/* Warm Amber Under Glow from Bottom Right (matching lamp in photo) */}
        <pointLight position={[5, -4, 3]} intensity={2.5} color="#F59E0B" />
        <directionalLight position={[0, 5, 2]} intensity={1.2} color="#FFFFFF" />

        {/* 3D Scene Nodes with Suspense boundary */}
        <FloatingTriangle />
        <FloatingOrbs />
        <Suspense fallback={null}>
          <Portrait3DPlane mouseX={mouseX} mouseY={mouseY} isEntering={isEntering} />
        </Suspense>
        <ReflectivePedestal />
        <DustParticles mouseX={mouseX} mouseY={mouseY} />
      </Canvas>
    </div>
  );
}
