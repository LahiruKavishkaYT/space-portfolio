"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random";

export const Globe = () => {
  const points = useRef<Mesh>(null);
  const sphere = random.inSphere(new Float32Array(5000), { radius: 1.2 });

  useFrame((state, delta) => {
    if (points.current) {
      points.current.rotation.x += delta / 10;
      points.current.rotation.y += delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={points}
        positions={sphere}
        stride={3}
        frustumCulled
      >
        <PointMaterial
          transparent
          color="#fff"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};