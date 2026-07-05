import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Html } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";
import type { Group } from "three";

const TOKENS = [
  "grid",
  "flex",
  "token",
  "hue",
  "type",
  "axiom",
  "scale",
  "ratio",
  "{ }",
  "</>",
  "λ",
  "∅",
];

// Fibonacci lattice — deterministic, roughly-even points on a sphere.
function fibonacciSphere(n: number, radius: number) {
  const pts: [number, number, number][] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    pts.push([Math.cos(theta) * r * radius, y * radius, Math.sin(theta) * r * radius]);
  }
  return pts;
}

function WireSphere() {
  const inner = useRef<Group>(null);
  const outer = useRef<Group>(null);
  const reduce = useReducedMotion();
  const points = useMemo(() => fibonacciSphere(TOKENS.length, 1.9), []);

  useFrame((_, delta) => {
    if (reduce) return;
    if (inner.current) {
      inner.current.rotation.y += delta * 0.08;
      inner.current.rotation.x += delta * 0.02;
    }
    if (outer.current) {
      outer.current.rotation.y -= delta * 0.04;
      outer.current.rotation.z += delta * 0.015;
    }
  });

  return (
    <>
      <group ref={outer}>
        <mesh>
          <icosahedronGeometry args={[2.0, 1]} />
          <meshBasicMaterial
            color="#3a2a1f"
            wireframe
            transparent
            opacity={0.04}
          />
        </mesh>
      </group>

      {/* inner more detailed sphere */}
      <group ref={inner}>
        <mesh>
          <icosahedronGeometry args={[1.65, 3]} />
          <meshBasicMaterial
            color="#3a2a1f"
            wireframe
            transparent
            opacity={0.05}
          />
        </mesh>
        {/* equatorial rings */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.85, 0.002, 8, 128]} />
          <meshBasicMaterial color="#3a2a1f" transparent opacity={0.08} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 3]}>
          <torusGeometry args={[1.78, 0.002, 8, 128]} />
          <meshBasicMaterial color="#3a2a1f" transparent opacity={0.06} />
        </mesh>
        {/* semantic token constellation — design + code vocabulary
            pinned to sphere vertices. Rotates with inner group. */}
        {points.map((p, i) => (
          <Html
            key={TOKENS[i]}
            position={p}
            center
            distanceFactor={7}
            zIndexRange={[10, 0]}
            style={{ pointerEvents: "none" }}
          >
            <span className="font-mono whitespace-nowrap tracking-wide text-[0.6rem] text-sepia/70 mix-blend-multiply dark:mix-blend-screen">
              {TOKENS[i]}
            </span>
          </Html>
        ))}
      </group>
    </>
  );
}

export default function VitruvianScene({ paused = false }: { paused?: boolean }) {
  const reduce = useReducedMotion();
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 4.5], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
      frameloop={paused || reduce ? "demand" : "always"}
    >
      <WireSphere />
    </Canvas>
  );
}