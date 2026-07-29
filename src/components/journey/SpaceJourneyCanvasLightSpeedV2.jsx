/* eslint-disable react/no-unknown-property, react/prop-types */
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PointMaterial, Points } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";

const RESTING_FOV = 69;
const TRAVEL_FOV = 79;
const MAX_STAR_Z = 0.7;

const createStarPositions = (count, spread, depth) => {
  const positions = new Float32Array(count * 3);

  for (let index = 0; index < count; index += 1) {
    const offset = index * 3;
    positions[offset] = (Math.random() - 0.5) * spread;
    positions[offset + 1] = (Math.random() - 0.5) * spread;
    positions[offset + 2] = MAX_STAR_Z - Math.random() * depth;
  }

  return positions;
};

const createTrailPositions = (count, spread, depth, trailLength) => {
  const positions = new Float32Array(count * 6);

  for (let index = 0; index < count; index += 1) {
    const offset = index * 6;
    const x = (Math.random() - 0.5) * spread;
    const y = (Math.random() - 0.5) * spread;
    const z = MAX_STAR_Z - Math.random() * depth;

    positions[offset] = x;
    positions[offset + 1] = y;
    positions[offset + 2] = z;
    positions[offset + 3] = x;
    positions[offset + 4] = y;
    positions[offset + 5] = z - trailLength;
  }

  return positions;
};

const CameraFlight = ({ isTraveling, reducedMotion }) => {
  const { camera } = useThree();

  useFrame((_, delta) => {
    const targetFov =
      isTraveling && !reducedMotion ? TRAVEL_FOV : RESTING_FOV;
    const blend = 1 - Math.exp(-delta * (isTraveling ? 10 : 7));
    const nextFov = camera.fov + (targetFov - camera.fov) * blend;

    if (Math.abs(nextFov - camera.fov) > 0.01) {
      camera.fov = nextFov;
      camera.updateProjectionMatrix();
    }
  });

  return null;
};

const LightSpeedStarLayer = ({
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
    () => createStarPositions(count, spread, depth),
    [count, depth, spread],
  );

  useFrame((_, delta) => {
    if (!pointsRef.current || reducedMotion) {
      return;
    }

    const positionAttribute = pointsRef.current.geometry.attributes.position;
    const values = positionAttribute.array;
    const signedDirection = direction || 1;
    const speed = (isTraveling ? 10.8 : 0.055) * speedMultiplier;
    const movement = delta * speed * signedDirection;
    const minimumZ = MAX_STAR_Z - depth;

    for (let index = 2; index < values.length; index += 3) {
      values[index] += movement;

      if (values[index] > MAX_STAR_Z) {
        values[index] = minimumZ;
        values[index - 2] = (Math.random() - 0.5) * spread;
        values[index - 1] = (Math.random() - 0.5) * spread;
      } else if (values[index] < minimumZ) {
        values[index] = MAX_STAR_Z;
        values[index - 2] = (Math.random() - 0.5) * spread;
        values[index - 1] = (Math.random() - 0.5) * spread;
      }
    }

    positionAttribute.needsUpdate = true;
    pointsRef.current.rotation.z +=
      delta *
      (isTraveling ? 0.024 : 0.0035) *
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
        opacity={isTraveling ? Math.min(1, opacity + 0.1) : opacity}
        size={size}
        sizeAttenuation={false}
      />
    </Points>
  );
};

const PerspectiveTrailLayer = ({
  count,
  depth,
  direction,
  isTraveling,
  reducedMotion,
  spread,
}) => {
  const linesRef = useRef();
  const materialRef = useRef();
  const trailLength = 0.9;
  const positions = useMemo(
    () => createTrailPositions(count, spread, depth, trailLength),
    [count, depth, spread],
  );

  useFrame((_, delta) => {
    if (!linesRef.current || !materialRef.current) {
      return;
    }

    const targetOpacity = isTraveling && !reducedMotion ? 0.34 : 0;
    const opacityBlend = 1 - Math.exp(-delta * (isTraveling ? 12 : 8));
    materialRef.current.opacity +=
      (targetOpacity - materialRef.current.opacity) * opacityBlend;

    if (!isTraveling || reducedMotion) {
      return;
    }

    const positionAttribute = linesRef.current.geometry.attributes.position;
    const values = positionAttribute.array;
    const signedDirection = direction || 1;
    const movement = delta * 10.8 * signedDirection;
    const minimumZ = MAX_STAR_Z - depth;

    for (let index = 0; index < values.length; index += 6) {
      let headZ = values[index + 2] + movement;

      if (headZ > MAX_STAR_Z || headZ < minimumZ) {
        const x = (Math.random() - 0.5) * spread;
        const y = (Math.random() - 0.5) * spread;
        headZ = signedDirection > 0 ? minimumZ : MAX_STAR_Z;
        values[index] = x;
        values[index + 1] = y;
        values[index + 3] = x;
        values[index + 4] = y;
      }

      values[index + 2] = headZ;
      values[index + 5] = headZ - signedDirection * trailLength;
    }

    positionAttribute.needsUpdate = true;
  });

  return (
    <lineSegments ref={linesRef} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial
        ref={materialRef}
        transparent
        color="#F4F1DE"
        depthWrite={false}
        opacity={0}
      />
    </lineSegments>
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

const SpaceJourneyCanvasLightSpeedV2 = ({
  direction,
  isTraveling,
  reducedMotion,
}) => {
  const isCompact = useCompactCanvas();

  return (
    <div className="journey-space-canvas-v2" aria-hidden="true">
      <Canvas
        camera={{
          fov: RESTING_FOV,
          near: 0.1,
          far: 30,
          position: [0, 0, 2.42],
        }}
        dpr={isCompact ? [1, 1.2] : [1, 1.55]}
        frameloop={reducedMotion ? "demand" : "always"}
        gl={{
          alpha: true,
          antialias: false,
          powerPreference: "high-performance",
        }}
      >
        <CameraFlight
          isTraveling={isTraveling}
          reducedMotion={reducedMotion}
        />
        <LightSpeedStarLayer
          color="#F4F1DE"
          count={isCompact ? 420 : 700}
          depth={13.5}
          direction={direction}
          isTraveling={isTraveling}
          opacity={0.9}
          reducedMotion={reducedMotion}
          size={1.68}
          speedMultiplier={1}
          spread={9.8}
        />
        <LightSpeedStarLayer
          color="#EEF1F2"
          count={isCompact ? 120 : 210}
          depth={16}
          direction={direction}
          isTraveling={isTraveling}
          opacity={0.66}
          reducedMotion={reducedMotion}
          size={1.08}
          speedMultiplier={0.76}
          spread={11.2}
        />
        <PerspectiveTrailLayer
          count={isCompact ? 55 : 105}
          depth={14.5}
          direction={direction}
          isTraveling={isTraveling}
          reducedMotion={reducedMotion}
          spread={10.5}
        />
      </Canvas>
    </div>
  );
};

export default SpaceJourneyCanvasLightSpeedV2;
