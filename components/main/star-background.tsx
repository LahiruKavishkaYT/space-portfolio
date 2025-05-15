"use client";

import { Points, PointMaterial } from "@react-three/drei";
import { Canvas, type PointsProps, useFrame } from "@react-three/fiber";
import * as random from "maath/random";
import { useState, useRef, Suspense } from "react";
import type { Points as PointsType } from "three";

const validateSphereData = (data: Float32Array): Float32Array => {
  // Create a new array to avoid modifying the original
  const validatedData = new Float32Array(data.length);
  
  for (let i = 0; i < data.length; i++) {
    // Check for NaN, Infinity, or invalid numbers
    if (!Number.isFinite(data[i]) || Number.isNaN(data[i])) {
      // Use a small random number instead of 0 to avoid clustering
      validatedData[i] = (Math.random() - 0.5) * 0.1;
    } else {
      validatedData[i] = data[i];
    }
  }
  return validatedData;
};

export const StarBackground = (props: PointsProps) => {
  const ref = useRef<PointsType | null>(null);
  const [sphere] = useState(() => {
    try {
      const sphereData = random.inSphere(new Float32Array(5000), { radius: 1.2 });
      return validateSphereData(sphereData);
    } catch (error) {
      console.error("Error generating sphere data:", error);
      // Return a fallback sphere if generation fails
      return new Float32Array(5000).map(() => (Math.random() - 0.5) * 2);
    }
  });

  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        stride={3}
        positions={sphere}
        frustumCulled
        {...props}
      >
        <PointMaterial
          transparent
          color="#fff"
          size={0.002}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

export const StarsCanvas = () => (
  <div className="w-full h-auto fixed inset-0 -z-10">
    <Canvas camera={{ position: [0, 0, 1] }}>
      <Suspense fallback={null}>
        <StarBackground />
      </Suspense>
    </Canvas>
  </div>
);