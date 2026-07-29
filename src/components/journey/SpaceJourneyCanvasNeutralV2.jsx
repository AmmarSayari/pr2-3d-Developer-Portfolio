/* eslint-disable react/no-unknown-property, react/prop-types */
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const createStarPositions = (count, spread, depth) => {
  const positions = new Float32Array(count * 3);

  for (let index = 0; index < count; index += 1) {
    const offset = index * 3;
    positions[offset] = (Math.random() - 0.5) * spread;
    positions[offset + 1] = (Math.random() - 0.5) * spread;
    positions[offset + 2] = -Math.random() * depth;
  }

  return positions;
};

const createCircularStarTexture = () => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  const size = 64;

  canvas.width = size;
  canvas.height = size;

  const gradient = context.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2,
  );

  gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
  gradient.addColorStop(0.68, "rgba(255, 255, 255, 0.92)");
  gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, size, size);

  return new THREE.CanvasTexture(canvas);
};

const JourneyStarLayer = ({
  color,
  count,
  depth,
  direction,
  isTraveling,
  reducedMotion,
  size,
  spread,
  speedMultiplier = 1,
}) => {
  const pointsRef = useRef();
  const positions = useMemo(
    () => createStarPositions(count, spread, depth),
    [count, depth, spread],
  );
  const starTexture = useMemo(createCircularStarTexture, []);

  useEffect(
    () => () => {
      starTexture.dispose();
    },
    [starTexture],
  );

  useFrame((_, delta) => {
    if (!pointsRef.current || reducedMotion) {
      return;
    }

    const positionAttribute =
      pointsRef.current.geometry.attributes.position;
    const values = positionAttribute.array;
    const travelSpeed = isTraveling ? 5.6 : 0.07;
    const signedSpeed =
      travelSpeed * speedMultiplier * delta * (direction || 1);

    for (let index = 2; index < values.length; index += 3) {
      values[index] += signedSpeed;

      if (values[index] > 1.25) {
        values[index] = -depth;
        values[index - 2] = (Math.random() - 0.5) * spread;
        values[index - 1] = (Math.random() - 0.5) * spread;
      } else if (values[index] < -depth) {
        values[index] = 1.2;
        values[index - 2] = (Math.random() - 0.5) * spread;
        values[index - 1] = (Math.random() - 0.5) * spread;
      }
    }

    positionAttribute.needsUpdate = true;
    pointsRef.current.rotation.z +=
      delta * (isTraveling ? 0.035 : 0.006) * (direction || 1);
  });

  return (
    <points ref={pointsRef} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        alphaMap={starTexture}
        alphaTest={0.04}
        blending={THREE.AdditiveBlending}
        color={color}
        depthWrite={false}
        opacity={isTraveling ? 0.94 : 0.7}
        size={isTraveling ? size * 1.65 : size}
        sizeAttenuation
        transparent
      />
    </points>
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

const SpaceJourneyCanvasNeutralV2 = ({
  direction,
  isTraveling,
  reducedMotion,
}) => {
  const isCompact = useCompactCanvas();

  return (
    <div className="journey-space-canvas-v2" aria-hidden="true">
      <Canvas
        camera={{ fov: 72, near: 0.1, far: 30, position: [0, 0, 1.6] }}
        dpr={isCompact ? [1, 1.2] : [1, 1.55]}
        frameloop={reducedMotion ? "demand" : "always"}
        gl={{
          alpha: true,
          antialias: false,
          powerPreference: "high-performance",
        }}
      >
        <JourneyStarLayer
          color="#F4F1DE"
          count={isCompact ? 330 : 620}
          depth={15}
          direction={direction}
          isTraveling={isTraveling}
          reducedMotion={reducedMotion}
          size={0.022}
          speedMultiplier={1}
          spread={12}
        />
        <JourneyStarLayer
          color="#EEF1F2"
          count={isCompact ? 90 : 180}
          depth={18}
          direction={direction}
          isTraveling={isTraveling}
          reducedMotion={reducedMotion}
          size={0.016}
          speedMultiplier={0.72}
          spread={14}
        />
      </Canvas>
    </div>
  );
};

export default SpaceJourneyCanvasNeutralV2;
