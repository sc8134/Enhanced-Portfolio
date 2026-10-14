// Signal Canvas — Three.js R3F scene that visualises Sagar's 8 projects as
// orbiting satellites around a central armillary-sphere core.
// Clicking a satellite opens the corresponding project modal.
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Group, Mesh, MeshStandardMaterial, Points } from "three";
import * as THREE from "three";

const INK = "#07090d";
const BRASS = "#d4a054";
const BRASS_BRIGHT = "#f5c378";
const PAPER = "#f4efe6";

export const PROJECT_ORBITS = [
  { id: "signal-job-portal", name: "Signal Job Portal", radius: 1.4, speed: 0.35, size: 0.075, color: "#d97706", lift: 0.2 },
  { id: "namo-patro", name: "Namo Patro", radius: 1.7, speed: -0.28, size: 0.07, color: "#059669", lift: -0.18 },
  { id: "nova-dvr", name: "Nova DVR", radius: 1.95, speed: 0.22, size: 0.065, color: "#2563eb", lift: 0.25 },
  { id: "bolts-army", name: "Bolts Army", radius: 2.2, speed: -0.19, size: 0.065, color: "#b91c1c", lift: -0.12 },
  { id: "jobhunt-agent", name: "JobHunt Agent", radius: 2.45, speed: 0.16, size: 0.06, color: "#6366f1", lift: 0.15 },
  { id: "ai-reel-generator", name: "AI Reel Gen", radius: 2.7, speed: -0.14, size: 0.058, color: "#0891b2", lift: -0.22 },
  { id: "velora", name: "Velora", radius: 1.55, speed: 0.31, size: 0.055, color: "#8b5cf6", lift: -0.25 },
  { id: "phishing-tool", name: "Phishing Tool", radius: 2.9, speed: 0.12, size: 0.052, color: "#ec4899", lift: 0.18 },
];

function StarsField({ count = 450 }: { count?: number }) {
  const points = useRef<Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const baseColor = new THREE.Color(PAPER);
    const brassColor = new THREE.Color(BRASS);

    for (let i = 0; i < count; i++) {
      const r = 3.5 + Math.random() * 6.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      const mixed = Math.random() > 0.65 ? brassColor : baseColor;
      col[i * 3] = mixed.r;
      col[i * 3 + 1] = mixed.g;
      col[i * 3 + 2] = mixed.b;
    }
    return [pos, col];
  }, [count]);

  useFrame(({ clock }) => {
    if (points.current) {
      points.current.rotation.y = clock.elapsedTime * 0.015;
      points.current.rotation.x = Math.sin(clock.elapsedTime * 0.008) * 0.05;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        vertexColors
        transparent
        opacity={0.65}
        sizeAttenuation
      />
    </points>
  );
}

function Controls() {
  const { camera, gl } = useThree();
  const controls = useMemo(() => {
    const next = new OrbitControls(camera, gl.domElement);
    next.enablePan = false;
    next.enableZoom = false;
    next.autoRotate = true;
    next.autoRotateSpeed = 0.45;
    next.enableDamping = true;
    next.dampingFactor = 0.08;
    return next;
  }, [camera, gl]);

  useEffect(() => () => controls.dispose(), [controls]);
  useFrame(() => {
    controls.update();
  });
  return null;
}

function CoreEngine({
  activeProjectId,
  onHoverProject,
  onClickProject,
}: {
  activeProjectId?: string;
  onHoverProject?: (id: string | null) => void;
  onClickProject?: (id: string) => void;
}) {
  const rings = useRef<Group>(null);
  const nodes = useRef<Group>(null);
  const coreMaterial = useRef<MeshStandardMaterial>(null);
  const crystalCage = useRef<Mesh>(null);

  const ringTilt = useMemo(
    () =>
      [
        [Math.PI / 2.15, 0.2, 0.1],
        [Math.PI / 2.7, 0.65, 0.25],
        [Math.PI / 1.85, -0.4, 0.5],
      ] as [number, number, number][],
    [],
  );

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (rings.current) {
      rings.current.rotation.y = t * 0.12;
      rings.current.rotation.x = Math.sin(t * 0.2) * 0.08;
    }
    if (crystalCage.current) {
      crystalCage.current.rotation.y = -t * 0.18;
      crystalCage.current.rotation.z = t * 0.09;
    }
    if (coreMaterial.current) {
      coreMaterial.current.emissiveIntensity = 0.28 + Math.sin(t * 2) * 0.12;
    }

    if (!nodes.current) return;
    nodes.current.children.forEach((child, i) => {
      const n = PROJECT_ORBITS[i];
      if (!n) return;
      const angle = t * n.speed + i * (Math.PI / 4);
      child.position.set(
        Math.cos(angle) * n.radius,
        Math.sin(t * 0.5 + i) * n.lift,
        Math.sin(angle) * n.radius,
      );
    });
  });

  return (
    <group>
      {/* Central Pulsing Heart */}
      <mesh>
        <icosahedronGeometry args={[0.42, 2]} />
        <meshStandardMaterial
          ref={coreMaterial}
          color={BRASS}
          emissive={BRASS}
          emissiveIntensity={0.3}
          metalness={0.85}
          roughness={0.22}
        />
      </mesh>

      {/* Wireframe Crystal Cage */}
      <mesh ref={crystalCage}>
        <octahedronGeometry args={[0.58, 0]} />
        <meshStandardMaterial
          color={BRASS_BRIGHT}
          wireframe
          transparent
          opacity={0.35}
          emissive={BRASS}
          emissiveIntensity={0.15}
        />
      </mesh>

      {/* Translucent Protective Shell */}
      <mesh>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial
          color={INK}
          transparent
          opacity={0.25}
          metalness={0.3}
          roughness={0.35}
        />
      </mesh>

      {/* Armillary Rings */}
      <group ref={rings}>
        {ringTilt.map((rot, i) => (
          <mesh key={i} rotation={rot}>
            <torusGeometry args={[1.15 + i * 0.42, 0.014, 16, 120]} />
            <meshStandardMaterial
              color={i === 1 ? PAPER : BRASS}
              metalness={0.75}
              roughness={0.25}
              emissive={i === 0 ? BRASS : INK}
              emissiveIntensity={i === 0 ? 0.2 : 0}
            />
          </mesh>
        ))}
      </group>

      {/* Orbiting Project Satellites */}
      <group ref={nodes}>
        {PROJECT_ORBITS.map((n) => {
          const isSelected = activeProjectId === n.id;
          return (
            <mesh
              key={n.id}
              onClick={(e) => {
                e.stopPropagation();
                onClickProject?.(n.id);
              }}
              onPointerOver={(e) => {
                e.stopPropagation();
                document.body.style.cursor = "pointer";
                onHoverProject?.(n.id);
              }}
              onPointerOut={() => {
                document.body.style.cursor = "default";
                onHoverProject?.(null);
              }}
            >
              <sphereGeometry args={[isSelected ? n.size * 1.5 : n.size, 24, 24]} />
              <meshStandardMaterial
                color={n.color}
                emissive={n.color}
                emissiveIntensity={isSelected ? 0.9 : 0.45}
                metalness={0.4}
                roughness={0.2}
              />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

export function SignalCanvas({
  activeProjectId,
  onSelectProject,
}: {
  activeProjectId?: string;
  onSelectProject?: (id: string) => void;
}) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const hoveredProject = useMemo(
    () => PROJECT_ORBITS.find((p) => p.id === hoveredId),
    [hoveredId],
  );

  return (
    <div className="relative h-full w-full">
      {/* 3D HUD Badge on Hover */}
      {hoveredProject && (
        <div className="pointer-events-none absolute top-4 left-4 z-20 flex items-center gap-2 rounded-full border border-brass/40 bg-surface/90 px-3 py-1.5 text-xs backdrop-blur-md shadow-lg">
          <span
            className="size-2 rounded-full"
            style={{ backgroundColor: hoveredProject.color }}
          />
          <span className="font-medium text-fg">{hoveredProject.name}</span>
          <span className="text-[10px] uppercase text-muted tracking-widest">Click to inspect</span>
        </div>
      )}

      <Canvas
        camera={{ position: [0, 0.9, 4.3], fov: 40 }}
        dpr={[1, 1.8]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
        }}
        onCreated={({ gl }) => gl.setClearColor(INK)}
        style={{ width: "100%", height: "100%" }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[3.5, 4.5, 2.8]} intensity={2.6} color={PAPER} />
        <pointLight position={[-2.5, -1.2, 1.8]} intensity={7} color={BRASS} distance={9} />
        <pointLight position={[2, -2, -2]} intensity={4} color="#3b82f6" distance={7} />

        <StarsField count={400} />
        <CoreEngine
          activeProjectId={activeProjectId}
          onHoverProject={setHoveredId}
          onClickProject={onSelectProject}
        />
        <Controls />
      </Canvas>
    </div>
  );
}
