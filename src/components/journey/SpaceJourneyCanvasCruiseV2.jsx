/* eslint-disable react/no-unknown-property, react/prop-types */
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PointMaterial, Points } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";

const RESTING_FOV = 69;
const TRAVEL_FOV = 79;
const MAX_STAR_Z = 0.7;
const CRUISE_SPEED = 0.16;
const TRAVEL_SPEED = 10.8;

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

const ShipCamera = ({ isTraveling, reducedMotion }) => {
  const { camera } = useThree();

  useFrame((state, delta) => {
    const targetFov =
      isTraveling && !reducedMotion ? TRAVEL_FOV : RESTING_FOV;
    const blend = 1 - Math.exp(-delta * (isTraveling ? 10 : 7));
    const nextFov = camera.fov + (targetFov - camera.fov) * blend;
    const time = state.clock.elapsedTime;
    const cruiseAmount = reducedMotion ? 0 : isTraveling ? 0.012 : 0.035;

    camera.position.x = Math.sin(time * 0.2) * cruiseAmount;
    camera.position.y = Math.cos(time * 0.16) * cruiseAmount * 0.7;

    if (Math.abs(nextFov - camera.fov) > 0.01) {
      camera.fov = nextFov;
      camera.updateProjectionMatrix();
    }
  });

  return null;
};

const InfiniteCruiseRig = ({
  children,
  direction,
  isTraveling,
  reducedMotion,
}) => {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (!groupRef.current || reducedMotion) {
      return;
    }

    const time = state.clock.elapsedTime;
    const signedDirection = isTraveling ? direction || 1 : 1;

    groupRef.current.rotation.z +=
      delta * (isTraveling ? 0.018 : 0.012) * signedDirection;
    groupRef.current.rotation.x = Math.sin(time * 0.14) * 0.01;
    groupRef.current.rotation.y = Math.cos(time * 0.11) * 0.012;
  });

  return <group ref={groupRef}>{children}</group>;
};

const CruiseStarLayer = ({
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
  travelBoost,
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
    const signedDirection = isTraveling ? direction || 1 : 1;
    const speed =
      (isTraveling ? TRAVEL_SPEED : CRUISE_SPEED) * speedMultiplier;
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
        opacity={isTraveling ? Math.min(1, opacity + travelBoost) : opacity}
        size={isTraveling ? size * 1.16 : size}
        sizeAttenuation={false}
      />
    </Points>
  );
};

const CruiseTrailLayer = ({
  color,
  count,
  depth,
  direction,
  isTraveling,
  opacity,
  reducedMotion,
  spread,
  trailLength,
}) => {
  const linesRef = useRef();
  const materialRef = useRef();
  const positions = useMemo(
    () => createTrailPositions(count, spread, depth, trailLength),
    [count, depth, spread, trailLength],
  );

  useFrame((_, delta) => {
    if (!linesRef.current || !materialRef.current) {
      return;
    }

    const targetOpacity = isTraveling && !reducedMotion ? opacity : 0;
    const opacityBlend = 1 - Math.exp(-delta * (isTraveling ? 13 : 8));
    materialRef.current.opacity +=
      (targetOpacity - materialRef.current.opacity) * opacityBlend;

    if (!isTraveling || reducedMotion) {
      return;
    }

    const positionAttribute = linesRef.current.geometry.attributes.position;
    const values = positionAttribute.array;
    const signedDirection = direction || 1;
    const movement = delta * TRAVEL_SPEED * signedDirection;
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
        color={color}
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

const SpaceJourneyCanvasCruiseV2 = ({
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
        <ShipCamera
          isTraveling={isTraveling}
          reducedMotion={reducedMotion}
        />

        <InfiniteCruiseRig
          direction={direction}
          isTraveling={isTraveling}
          reducedMotion={reducedMotion}
        >
          <CruiseStarLayer
            color="#F4F1DE"
            count={isCompact ? 285 : 500}
            depth={13.5}
            direction={direction}
            isTraveling={isTraveling}
            opacity={0.88}
            reducedMotion={reducedMotion}
            size={1.82}
            speedMultiplier={1}
            spread={9.8}
            travelBoost={0.1}
          />
          <CruiseStarLayer
            color="#1EBBD7"
            count={isCompact ? 100 : 170}
            depth={14.5}
            direction={direction}
            isTraveling={isTraveling}
            opacity={0.48}
            reducedMotion={reducedMotion}
            size={1.36}
            speedMultiplier={0.9}
            spread={10.4}
            travelBoost={0.28}
          />
          <CruiseStarLayer
            color="#9AE7FF"
            count={isCompact ? 68 : 115}
            depth={15.5}
            direction={direction}
            isTraveling={isTraveling}
            opacity={0.34}
            reducedMotion={reducedMotion}
            size={1.18}
            speedMultiplier={0.82}
            spread={10.9}
            travelBoost={0.36}
          />
          <CruiseStarLayer
            color="#FF7A59"
            count={isCompact ? 40 : 68}
            depth={16}
            direction={direction}
            isTraveling={isTraveling}
            opacity={0.22}
            reducedMotion={reducedMotion}
            size={1.1}
            speedMultiplier={0.76}
            spread={11.2}
            travelBoost={0.46}
          />

          <CruiseTrailLayer
            color="#F4F1DE"
            count={isCompact ? 30 : 52}
            depth={14.5}
            direction={direction}
            isTraveling={isTraveling}
            opacity={0.34}
            reducedMotion={reducedMotion}
            spread={10.5}
            trailLength={1.28}
          />
          <CruiseTrailLayer
            color="#1EBBD7"
            count={isCompact ? 18 : 32}
            depth={14.5}
            direction={direction}
            isTraveling={isTraveling}
            opacity={0.44}
            reducedMotion={reducedMotion}
            spread={10.5}
            trailLength={1.46}
          />
          <CruiseTrailLayer
            color="#9AE7FF"
            count={isCompact ? 13 : 24}
            depth={14.5}
            direction={direction}
            isTraveling={isTraveling}
            opacity={0.42}
            reducedMotion={reducedMotion}
            spread={10.5}
            trailLength={1.58}
          />
          <CruiseTrailLayer
            color="#FF7A59"
            count={isCompact ? 9 : 16}
            depth={14.5}
            direction={direction}
            isTraveling={isTraveling}
            opacity={0.4}
            reducedMotion={reducedMotion}
            spread={10.5}
            trailLength={1.7}
          />
        </InfiniteCruiseRig>
      </Canvas>
    </div>
  );
};

export default SpaceJourneyCanvasCruiseV2;
