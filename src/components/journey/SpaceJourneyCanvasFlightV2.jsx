/* eslint-disable react/no-unknown-property, react/prop-types */
import { Canvas, useFrame } from "@react-three/fiber";
import { PointMaterial, Points } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";

const createFlightPositions = (count, spread, depth) => {
  const positions = new Float32Array(count * 3);

  for (let index = 0; index < count; index += 1) {
    const offset = index * 3;
    positions[offset] = (Math.random() - 0.5) * spread;
    positions[offset + 1] = (Math.random() - 0.5) * spread;
    positions[offset + 2] = 1 - Math.random() * depth;
  }

  return positions;
};

const FlightStarLayer = ({
  color,
  count,
  depth,
  direction,
  isTraveling,
  opacity,
  reducedMotion,
  size,
  speedMultiplier,
  spread,
}) => {
  const pointsRef = useRef();
  const positions = useMemo(
    () => createFlightPositions(count, spread, depth),
    [count, depth, spread],
  );

  useFrame((_, delta) => {
    if (!pointsRef.current || reducedMotion) {
      return;
    }

    const positionAttribute =
      pointsRef.current.geometry.attributes.position;
    const values = positionAttribute.array;
    const signedDirection = direction || 1;
    const speed = (isTraveling ? 7.2 : 0.045) * speedMultiplier;
    const movement = delta * speed * signedDirection;

    for (let index = 2; index < values.length; index += 3) {
      values[index] += movement;

      if (values[index] > 1.1) {
        values[index] = 1 - depth;
        values[index - 2] = (Math.random() - 0.5) * spread;
        values[index - 1] = (Math.random() - 0.5) * spread;
      } else if (values[index] < 1 - depth) {
        values[index] = 1;
        values[index - 2] = (Math.random() - 0.5) * spread;
        values[index - 1] = (Math.random() - 0.5) * spread;
      }
    }

    positionAttribute.needsUpdate = true;
    pointsRef.current.rotation.z +=
      delta *
      (isTraveling ? 0.018 : 0.003) *
      speedMultiplier *
      signedDirection;
  });

  return (
    <Points
      ref={pointsRef}
      positions={positions}
      stride={3}
      frustumCulled={false}
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

const SpaceJourneyCanvasFlightV2 = ({
  direction,
  isTraveling,
  reducedMotion,
}) => {
  const isCompact = useCompactCanvas();

  return (
    <div className="journey-space-canvas-v2" aria-hidden="true">
      <Canvas
        camera={{ fov: 72, near: 0.1, far: 30, position: [0, 0, 2.7] }}
        dpr={isCompact ? [1, 1.2] : [1, 1.55]}
        frameloop={reducedMotion ? "demand" : "always"}
        gl={{
          alpha: true,
          antialias: false,
          powerPreference: "high-performance",
        }}
      >
        <FlightStarLayer
          color="#F4F1DE"
          count={isCompact ? 390 : 650}
          depth={14}
          direction={direction}
          isTraveling={isTraveling}
          opacity={0.88}
          reducedMotion={reducedMotion}
          size={1.45}
          speedMultiplier={1}
          spread={10.5}
        />
        <FlightStarLayer
          color="#EEF1F2"
          count={isCompact ? 105 : 185}
          depth={17}
          direction={direction}
          isTraveling={isTraveling}
          opacity={0.64}
          reducedMotion={reducedMotion}
          size={0.96}
          speedMultiplier={0.72}
          spread={12}
        />
      </Canvas>
    </div>
  );
};

export default SpaceJourneyCanvasFlightV2;
