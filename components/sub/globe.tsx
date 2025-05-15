"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random";

const validateSphereData = (data: Float32Array): Float32Array => {
  const validatedData = new Float32Array(data.length);
  
  for (let i = 0; i < data.length; i++) {
    if (!Number.isFinite(data[i]) || Number.isNaN(data[i])) {
      validatedData[i] = 0;
    } else {
      validatedData[i] = data[i];
    }
  }
  return validatedData;
};

export const Globe = () => {
  const points = useRef<Mesh>(null);
  
  const sphere = useMemo(() => {
    try {
      const sphereData = random.inSphere(new Float32Array(5000), { radius: 1.2 });
      return validateSphereData(sphereData);
    } catch (error) {
      console.error("Error generating sphere data:", error);
      const fallbackData = new Float32Array(5000).map(() => (Math.random() - 0.5) * 2);
      return validateSphereData(fallbackData);
    }
  }, []);

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