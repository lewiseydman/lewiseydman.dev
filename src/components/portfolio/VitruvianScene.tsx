import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { useReducedMotion } from "framer-motion";
import type { Group } from "three";

function WireSphere() {
  const inner = useRef<Group>(null);
  const outer = useRef<Group>(null);
  const reduce = useReducedMotion();

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
          <icosahedronGeometry args={[1.35, 1]} />
          <meshBasicMaterial
            color="#3a2a1f"
            wireframe
            transparent
            opacity={0.06}
          />
        </mesh>
      </group>

      {/* single faint equatorial ring for orbit feel */}
      <group ref={inner}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.38, 0.002, 8, 128]} />
          <meshBasicMaterial color="#3a2a1f" transparent opacity={0.09} />
        </mesh>
      </group>
    </>
  );
}

export default function VitruvianScene({ paused = false }: { paused?: boolean }) {
  const reduce = useReducedMotion();
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 5.5], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
      frameloop={paused || reduce ? "demand" : "always"}
    >
      <WireSphere />
    </Canvas>
  );
}