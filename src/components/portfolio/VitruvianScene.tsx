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
      {/* outer subtle wireframe icosahedron */}
      <group ref={outer}>
        <mesh>
          <icosahedronGeometry args={[1.6, 1]} />
          <meshBasicMaterial
            color="#4a86c4"
            wireframe
            transparent
            opacity={0.18}
          />
        </mesh>
      </group>

      {/* inner more detailed sphere */}
      <group ref={inner}>
        <mesh>
          <icosahedronGeometry args={[1.05, 3]} />
          <meshBasicMaterial
            color="#3b6fa0"
            wireframe
            transparent
            opacity={0.22}
          />
        </mesh>
        {/* equatorial ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.25, 0.002, 8, 128]} />
          <meshBasicMaterial color="#3b6fa0" transparent opacity={0.5} />
        </mesh>
        <mesh rotation={[0, 0, Math.PI / 3]}>
          <torusGeometry args={[1.18, 0.002, 8, 128]} />
          <meshBasicMaterial color="#3b6fa0" transparent opacity={0.35} />
        </mesh>
      </group>
    </>
  );
}

export default function VitruvianScene() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 3.6], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <WireSphere />
    </Canvas>
  );
}