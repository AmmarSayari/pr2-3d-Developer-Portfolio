/* eslint-disable react/no-unknown-property, react/prop-types */
import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PointMaterial, Points, Preload } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";

import CanvasLoader from "../Loader";

const StarsJourneyCopyV2 = (props) => {
  const ref = useRef();
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(2001), { radius: 1.2 }),
  );

  useFrame((_, delta) => {
    ref.current.rotation.x -= delta / 90;
    ref.current.rotation.y -= delta / 135;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        positions={sphere}
        stride={3}
        frustumCulled
        {...props}
      >
        <PointMaterial
          transparent
          color="#f272c8"
          size={0.004}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const StarsCanvasLegacyCopyV2 = () => (
  <div className="w-full h-auto absolute inset-0 z-[-1]">
    <Canvas camera={{ position: [1.5, 0, 1] }}>
      <Suspense fallback={<CanvasLoader />}>
        <StarsJourneyCopyV2 />
      </Suspense>

      <Preload all />
    </Canvas>
  </div>
);

export default StarsCanvasLegacyCopyV2;
