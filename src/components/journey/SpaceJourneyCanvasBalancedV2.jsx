/* eslint-disable react/no-unknown-property, react/prop-types */
import { Canvas, useFrame } from "@react-three/fiber";
import { PointMaterial, Points } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as random from "maath/random/dist/maath-random.esm";

const BalancedStarLayer = ({
  color,
  count,
  direction,
  isTraveling,
  opacity,
  radius,
  reducedMotion,
  rotation,
  size,
  speedMultiplier,
}) => {
  const pointsRef = useRef();
  const positions = useMemo(
    () =>
      random.inSphere(new Float32Array(count * 3), {
        radius,
      }),
    [count, radius],
  );

  useFrame((_, delta) => {
    if (!pointsRef.current || reducedMotion) {
      return;
    }

    const travelMultiplier = isTraveling ? 5.4 : 1;
    const signedDirection = direction || 1;

    pointsRef.current.rotation.x -=
      (delta / 10) *
      travelMultiplier *
      speedMultiplier *
      signedDirection;
    pointsRef.current.rotation.y -=
      (delta / 15) *
      travelMultiplier *
      speedMultiplier *
      signedDirection;
    pointsRef.current.rotation.z +=
      (delta / 24) *
      (isTraveling ? 2.4 : 0.18) *
      speedMultiplier *
      signedDirection;
  });

  return (
    <group rotation={rotation}>
      <Points
        ref={pointsRef}
        positions={positions}
        stride={3}
        frustumCulled
      >
        <PointMaterial
          transparent
          color={color}
          depthWrite={false}
          opacity={isTraveling ? Math.min(1, opacity + 0.08) : opacity}
          size={size}
          sizeAttenuation={false}
        />
      </Points>
    </group>
  );
};

const useCompactCanvas = () => {
  const [isCompact, setIsCompact] = useState(() =>
    window.matchMedia("(max-width: 639px)").matches,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 639px)");
    const handleChange = (event) => setIsCompact(event.matches);

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return isCompact;
};

const SpaceJourneyCanvasBalancedV2 = ({
  direction,
  isTraveling,
  reducedMotion,
}) => {
  const isCompact = useCompactCanvas();

  return (
    <div className="journey-space-canvas-v2" aria-hidden="true">
      <Canvas
        camera={{ position: [1.5, 0, 1] }}
        dpr={isCompact ? [1, 1.2] : [1, 1.55]}
        frameloop={reducedMotion ? "demand" : "always"}
        gl={{
          alpha: true,
          antialias: false,
          powerPreference: "high-performance",
        }}
      >
        <BalancedStarLayer
          color="#F4F1DE"
          count={isCompact ? 390 : 640}
          direction={direction}
          isTraveling={isTraveling}
          opacity={0.9}
          radius={1.18}
          reducedMotion={reducedMotion}
          rotation={[0, 0, Math.PI / 4]}
          size={1.62}
          speedMultiplier={1}
        />
        <BalancedStarLayer
          color="#EEF1F2"
          count={isCompact ? 105 : 185}
          direction={direction}
          isTraveling={isTraveling}
          opacity={0.67}
          radius={1.28}
          reducedMotion={reducedMotion}
          rotation={[0.15, -0.1, -Math.PI / 6]}
          size={1.08}
          speedMultiplier={0.68}
        />
      </Canvas>
    </div>
  );
};

export default SpaceJourneyCanvasBalancedV2;
