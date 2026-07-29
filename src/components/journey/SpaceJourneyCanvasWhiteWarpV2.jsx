/* eslint-disable react/no-unknown-property, react/prop-types */
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PointMaterial, Points } from "@react-three/drei";
import { AdditiveBlending } from "three";
import { useMemo, useRef } from "react";

const MAX_STAR_Z = 0.65;
const TRAVEL_SPEED = 14.5;
const CAMERA_Z = 2.35;

const createWarpPoints = (count, spread, depth) => {
  const positions = new Float32Array(count * 3);

  for (let index = 0; index < count; index += 1) {
    const offset = index * 3;
    positions[offset] = (Math.random() - 0.5) * spread;
    positions[offset + 1] = (Math.random() - 0.5) * spread;
    positions[offset + 2] = MAX_STAR_Z - Math.random() * depth;
  }

  return positions;
};

const createWarpTrails = (count, spread, depth, trailLength) => {
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

const WarpCamera = () => {
  const { camera } = useThree();

  useFrame((_, delta) => {
    const blend = 1 - Math.exp(-delta * 13);
    const nextFov = camera.fov + (86 - camera.fov) * blend;

    camera.position.z = CAMERA_Z;

    if (Math.abs(nextFov - camera.fov) > 0.01) {
      camera.fov = nextFov;
      camera.updateProjectionMatrix();
    }
  });

  return null;
};

const WarpPointLayer = ({
  color,
  count,
  depth,
  direction,
  opacity,
  size,
  speedMultiplier,
  spread,
}) => {
  const pointsRef = useRef();
  const positions = useMemo(
    () => createWarpPoints(count, spread, depth),
    [count, depth, spread],
  );

  useFrame((_, delta) => {
    if (!pointsRef.current) {
      return;
    }

    const positionAttribute = pointsRef.current.geometry.attributes.position;
    const values = positionAttribute.array;
    const signedDirection = direction || 1;
    const movement =
      delta * TRAVEL_SPEED * speedMultiplier * signedDirection;
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
        blending={AdditiveBlending}
        color={color}
        depthWrite={false}
        opacity={opacity}
        size={size}
        sizeAttenuation={false}
      />
    </Points>
  );
};

const WarpTrailLayer = ({
  color,
  count,
  depth,
  direction,
  opacity,
  spread,
  trailLength,
}) => {
  const linesRef = useRef();
  const materialRef = useRef();
  const positions = useMemo(
    () => createWarpTrails(count, spread, depth, trailLength),
    [count, depth, spread, trailLength],
  );

  useFrame((_, delta) => {
    if (!linesRef.current || !materialRef.current) {
      return;
    }

    const opacityBlend = 1 - Math.exp(-delta * 15);
    materialRef.current.opacity +=
      (opacity - materialRef.current.opacity) * opacityBlend;

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
        blending={AdditiveBlending}
        color={color}
        depthWrite={false}
        opacity={0}
      />
    </lineSegments>
  );
};

const SpaceJourneyCanvasWhiteWarpV2 = ({ direction, isCompact }) => (
  <div className="journey-space-canvas-v2" aria-hidden="true">
    <Canvas
      camera={{
        fov: 72,
        near: 0.1,
        far: 34,
        position: [0, 0, CAMERA_Z],
      }}
      dpr={isCompact ? [1, 1.2] : [1, 1.55]}
      gl={{
        alpha: true,
        antialias: false,
        powerPreference: "high-performance",
      }}
    >
      <WarpCamera />

      <WarpPointLayer
        color="#FFFFFF"
        count={isCompact ? 350 : 590}
        depth={18}
        direction={direction}
        opacity={0.96}
        size={2.05}
        speedMultiplier={1}
        spread={10.2}
      />
      <WarpPointLayer
        color="#F4F1DE"
        count={isCompact ? 125 : 215}
        depth={20}
        direction={direction}
        opacity={0.82}
        size={1.58}
        speedMultiplier={0.88}
        spread={11}
      />
      <WarpPointLayer
        color="#DDF7FF"
        count={isCompact ? 72 : 125}
        depth={21}
        direction={direction}
        opacity={0.68}
        size={1.34}
        speedMultiplier={0.8}
        spread={11.5}
      />
      <WarpPointLayer
        color="#1EBBD7"
        count={isCompact ? 40 : 70}
        depth={22}
        direction={direction}
        opacity={0.46}
        size={1.2}
        speedMultiplier={0.72}
        spread={12}
      />

      <WarpTrailLayer
        color="#FFFFFF"
        count={isCompact ? 50 : 86}
        depth={19}
        direction={direction}
        opacity={0.72}
        spread={10.6}
        trailLength={2.55}
      />
      <WarpTrailLayer
        color="#F4F1DE"
        count={isCompact ? 32 : 56}
        depth={20}
        direction={direction}
        opacity={0.6}
        spread={11}
        trailLength={2.25}
      />
      <WarpTrailLayer
        color="#DDF7FF"
        count={isCompact ? 19 : 32}
        depth={21}
        direction={direction}
        opacity={0.5}
        spread={11.5}
        trailLength={2.7}
      />
      <WarpTrailLayer
        color="#1EBBD7"
        count={isCompact ? 12 : 20}
        depth={22}
        direction={direction}
        opacity={0.34}
        spread={12}
        trailLength={2.15}
      />
    </Canvas>
  </div>
);

export default SpaceJourneyCanvasWhiteWarpV2;
