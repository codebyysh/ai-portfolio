"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function mulberry32(seed: number) {
  return () => {
    // Deterministic PRNG (pure + stable across renders)
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function NeuralField() {
  const groupRef = useRef<THREE.Group>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  const { nodeGeometry, edgeGeometry } = useMemo(() => {
    const rand = mulberry32(1337);
    const nodeCount = 120;
    const nodePositions = new Float32Array(nodeCount * 3);
    for (let i = 0; i < nodeCount; i += 1) {
      const x = (rand() - 0.5) * 8;
      const y = (rand() - 0.5) * 5;
      const z = (rand() - 0.5) * 8;
      nodePositions[i * 3 + 0] = x;
      nodePositions[i * 3 + 1] = y;
      nodePositions[i * 3 + 2] = z;
    }

    const edgeCount = 200;
    const edgePositions = new Float32Array(edgeCount * 2 * 3);
    for (let i = 0; i < edgeCount; i += 1) {
      const a = Math.floor(rand() * nodeCount);
      const b = Math.floor(rand() * nodeCount);
      for (let k = 0; k < 3; k += 1) {
        edgePositions[i * 6 + k] = nodePositions[a * 3 + k];
        edgePositions[i * 6 + 3 + k] = nodePositions[b * 3 + k];
      }
    }

    const nodeGeometry = new THREE.BufferGeometry();
    nodeGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(nodePositions, 3)
    );

    const edgeGeometry = new THREE.BufferGeometry();
    edgeGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(edgePositions, 3)
    );

    return { nodeGeometry, edgeGeometry };
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05;
      groupRef.current.rotation.x = state.pointer.y * 0.12;
      groupRef.current.rotation.z = -state.pointer.x * 0.12;
    }
    if (lightRef.current) {
      lightRef.current.position.x = state.pointer.x * 3;
      lightRef.current.position.y = 2 + state.pointer.y * 2;
    }
  });

  return (
    <group ref={groupRef}>
      <pointLight ref={lightRef} position={[0, 2, 2]} intensity={3} />
      <lineSegments geometry={edgeGeometry}>
        <lineBasicMaterial transparent opacity={0.07} depthWrite={false} />
      </lineSegments>
      <points geometry={nodeGeometry}>
        <pointsMaterial
          size={0.035}
          transparent
          opacity={0.9}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
      <Sparkles count={80} size={1.2} scale={[10, 6, 10]} speed={0.2} opacity={0.3} />
    </group>
  );
}

export default function NeuralCanvas() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 6], fov: 55 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ width: "100%", height: "100%", pointerEvents: "none" }}
    >
      <ambientLight intensity={0.55} />
      <NeuralField />
    </Canvas>
  );
}
