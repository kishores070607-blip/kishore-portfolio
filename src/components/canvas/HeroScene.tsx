"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { isCompactViewport } from "@/lib/motion";

function GoldForm({ compact, reduced }: { compact: boolean; reduced: boolean }) {
  const group = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((_, delta) => {
    if (!group.current) return;
    const dt = Math.min(delta, 0.05);
    if (!reduced) {
      group.current.rotation.y += dt * 0.18;
      group.current.rotation.x += dt * 0.05;
    }
    const follow = compact ? 0.12 : 0.22;
    target.current.x += (pointer.current.x * follow - target.current.x) * 0.05;
    target.current.y += (-pointer.current.y * follow - target.current.y) * 0.05;
    group.current.rotation.y += target.current.x * 0.01;
    group.current.rotation.x += target.current.y * 0.01;
  });

  const segments = compact ? 64 : 128;

  return (
    <group ref={group} scale={compact ? 0.78 : 1}>
      <mesh>
        <torusKnotGeometry args={[1.05, 0.32, segments, compact ? 10 : 16]} />
        <meshStandardMaterial
          color="#C9A86C"
          metalness={0.92}
          roughness={0.18}
          envMapIntensity={1.2}
        />
      </mesh>
      <mesh scale={1.08}>
        <torusKnotGeometry args={[1.05, 0.32, Math.max(32, segments / 2), 8]} />
        <meshBasicMaterial
          color="#C9A86C"
          wireframe
          transparent
          opacity={0.12}
        />
      </mesh>
    </group>
  );
}

function noise(n: number) {
  const x = Math.sin(n * 127.1) * 43758.5453;
  return x - Math.floor(x);
}

function Dust({ count }: { count: number }) {
  const points = useRef<THREE.Points>(null);
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      arr[i * 3] = (noise(i + 1) - 0.5) * 12;
      arr[i * 3 + 1] = (noise(i + 19) - 0.5) * 8;
      arr[i * 3 + 2] = (noise(i + 47) - 0.5) * 8;
    }
    geo.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    return geo;
  }, [count]);

  useFrame((_, delta) => {
    if (!points.current) return;
    points.current.rotation.y += Math.min(delta, 0.05) * 0.02;
  });

  useEffect(() => {
    return () => {
      geometry.dispose();
    };
  }, [geometry]);

  return (
    <points ref={points} geometry={geometry}>
      <pointsMaterial
        size={0.018}
        color="#C9A86C"
        transparent
        opacity={0.45}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

export default function HeroScene() {
  const [compact, setCompact] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const update = () => setCompact(isCompactViewport());
    update();
    window.addEventListener("resize", update);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotion = () => setReduced(mq.matches);
    onMotion();
    mq.addEventListener("change", onMotion);
    const onVis = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      window.removeEventListener("resize", update);
      mq.removeEventListener("change", onMotion);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  const dpr: [number, number] = compact ? [1, 1.25] : [1, 2];

  return (
    <Canvas
      dpr={dpr}
      gl={{ antialias: !compact, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, compact ? 5.2 : 4.4], fov: 45 }}
      style={{ width: "100%", height: "100%", background: "transparent" }}
      onCreated={({ gl }) => {
        gl.domElement.setAttribute("role", "img");
        gl.domElement.setAttribute(
          "aria-label",
          "Gold sculptural form rotating slowly in a dark field",
        );
        gl.setClearColor(0x000000, 0);
      }}
      frameloop={reduced || hidden ? "demand" : "always"}
    >
      <ambientLight intensity={0.28} color="#F4EFE6" />
      <directionalLight position={[4, 6, 5]} intensity={1.35} color="#FFE8B0" />
      <directionalLight position={[-5, -2, -3]} intensity={0.35} color="#7A6240" />
      <pointLight position={[0, 0, 3]} intensity={0.4} color="#C9A86C" />
      <GoldForm compact={compact} reduced={reduced} />
      {!reduced ? <Dust count={compact ? 400 : 1200} /> : null}
    </Canvas>
  );
}
