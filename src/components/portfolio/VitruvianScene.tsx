import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { EdgesGeometry, IcosahedronGeometry, type Group } from "three";

function useResponsiveOpacity() {
  const [opacity, setOpacity] = useState(0.09);
  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      setOpacity(w >= 1024 ? 0.09 : w >= 640 ? 0.06 : 0.04);
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);
  return opacity;
}

function WireSphere({ opacity }: { opacity: number }) {
  const outer = useRef<Group>(null);
  const reduce = useReducedMotion();
  const edges = useMemo(() => new EdgesGeometry(new IcosahedronGeometry(1.55, 1)), []);

  useFrame((_, delta) => {
    if (reduce) return;
    if (outer.current) {
      outer.current.rotation.y -= delta * 0.05;
      outer.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <group ref={outer}>
      <lineSegments geometry={edges}>
        <lineBasicMaterial color="#3a2a1f" transparent opacity={opacity} />
      </lineSegments>
    </group>
  );
}

export default function VitruvianScene({ paused = false }: { paused?: boolean }) {
  const reduce = useReducedMotion();
  const opacity = useResponsiveOpacity();
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 5.5], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
      frameloop={paused || reduce ? "demand" : "always"}
    >
      <WireSphere opacity={opacity} />
    </Canvas>
  );
}