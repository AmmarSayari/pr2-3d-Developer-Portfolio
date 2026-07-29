/* eslint-disable react/no-unknown-property, react/prop-types */
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PointMaterial, Points } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";

const RESTING_FOV = 69;
const TRAVEL_FOV = 79;
const CAMERA_Z = 2.42;
const MAX_STAR_Z = 0.65;
const CRUISE_SPEED = 0.11;
const TRAVEL_SPEED = 10.8;
const FRUSTUM_OVERSCAN = 1.7;
const FOV_RADIANS = (RESTING_FOV * Math.PI) / 180;

const placeInFrustum = (values, offset, z, aspect) => {
  const cameraDistance = Math.max(0.1, CAMERA_Z - z);
  const halfHeight =
    Math.tan(FOV_RADIANS / 2) * cameraDistance * FRUSTUM_OVERSCAN;
  const radius = Math.pow(Math.random(), 0.62) * halfHeight;
  const angle = Math.random() * Math.PI * 2;

  values[offset] = Math.cos(angle) * radius * aspect;
  values[offset + 1] = Math.sin(angle) * radius;
};

const createDeepLoopPositions = (count, depth, aspect) => {
  const positions = new Float32Array(count * 3);

  for (let index = 0; index < count; index += 1) {
    const offset = index * 3;
    const z = MAX_STAR_Z - Math.random() * depth;

    placeInFrustum(positions, offset, z, aspect);
    positions[offset + 2] = z;
  }

  return positions;
};

const createDeepLoopTrails = (
  count,
  depth,
  trailLength,
  aspect,
) => {
  const positions = new Float32Array(count * 6);

  for (let index = 0; index < count; index += 1) {
    const offset = index * 6;
    const z = MAX_STAR_Z - Math.random() * depth;

    placeInFrustum(positions, offset, z, aspect);
    positions[offset + 2] = z;
    positions[offset + 3] = positions[offset];
    positions[offset + 4] = positions[offset + 1];
    positions[offset + 5] = z - trailLength;
  }

  return positions;
};

const FixedFlightCamera = ({ isTraveling, reducedMotion }) => {
  const { camera } = useThree();

  useFrame((_, delta) => {
    const targetFov =
      isTraveling && !reducedMotion ? TRAVEL_FOV : RESTING_FOV;
    const blend = 1 - Math.exp(-delta * (isTraveling ? 10 : 7));
    const nextFov = camera.fov + (targetFov - camera.fov) * blend;

    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = CAMERA_Z;

    if (Math.abs(nextFov - camera.fov) > 0.01) {
      camera.fov = nextFov;
      camera.updateProjectionMatrix();
    }
  });

  return null;
};

const DeepLoopStarLayer = ({
  color,
  count,
  depth,
  direction,
  isTraveling,
  opacity,
  reducedMotion,
  size,
  speedMultiplier,
  travelBoost,
}) => {
  const pointsRef = useRef();
  const { size: canvasSize } = useThree();
  const aspect = canvasSize.width / Math.max(canvasSize.height, 1);
  const positions = useMemo(
    () => createDeepLoopPositions(count, depth, aspect),
    [aspect, count, depth],
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
    const swirl = delta * (isTraveling ? 0.004 : 0.012);
    const cosine = Math.cos(swirl);
    const sine = Math.sin(swirl);

    for (let index = 0; index < values.length; index += 3) {
      const normalizedX = values[index] / aspect;
      const y = values[index + 1];

      values[index] = (normalizedX * cosine - y * sine) * aspect;
      values[index + 1] = normalizedX * sine + y * cosine;
      values[index + 2] += movement;

      if (values[index + 2] > MAX_STAR_Z) {
        values[index + 2] = minimumZ;
        placeInFrustum(values, index, minimumZ, aspect);
      } else if (values[index + 2] < minimumZ) {
        values[index + 2] = MAX_STAR_Z;
        placeInFrustum(values, index, MAX_STAR_Z, aspect);
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
        size={isTraveling ? size * 1.14 : size}
        sizeAttenuation={false}
      />
    </Points>
  );
};

const DeepLoopTrailLayer = ({
  color,
  count,
  depth,
  direction,
  isTraveling,
  opacity,
  reducedMotion,
  trailLength,
}) => {
  const linesRef = useRef();
  const materialRef = useRef();
  const { size: canvasSize } = useThree();
  const aspect = canvasSize.width / Math.max(canvasSize.height, 1);
  const positions = useMemo(
    () => createDeepLoopTrails(count, depth, trailLength, aspect),
    [aspect, count, depth, trailLength],
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
        headZ = signedDirection > 0 ? minimumZ : MAX_STAR_Z;
        placeInFrustum(values, index, headZ, aspect);
        values[index + 3] = values[index];
        values[index + 4] = values[index + 1];
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

const SpaceJourneyCanvasDeepLoopV2 = ({
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
          far: 32,
          position: [0, 0, CAMERA_Z],
        }}
        dpr={isCompact ? [1, 1.2] : [1, 1.55]}
        frameloop={reducedMotion ? "demand" : "always"}
        gl={{
          alpha: true,
          antialias: false,
          powerPreference: "high-performance",
        }}
      >
        <FixedFlightCamera
          isTraveling={isTraveling}
          reducedMotion={reducedMotion}
        />

        <DeepLoopStarLayer
          color="#F4F1DE"
          count={isCompact ? 315 : 540}
          depth={17}
          direction={direction}
          isTraveling={isTraveling}
          opacity={0.88}
          reducedMotion={reducedMotion}
          size={1.78}
          speedMultiplier={1}
          travelBoost={0.1}
        />
        <DeepLoopStarLayer
          color="#1EBBD7"
          count={isCompact ? 110 : 185}
          depth={18}
          direction={direction}
          isTraveling={isTraveling}
          opacity={0.48}
          reducedMotion={reducedMotion}
          size={1.34}
          speedMultiplier={0.9}
          travelBoost={0.28}
        />
        <DeepLoopStarLayer
          color="#9AE7FF"
          count={isCompact ? 74 : 125}
          depth={19}
          direction={direction}
          isTraveling={isTraveling}
          opacity={0.34}
          reducedMotion={reducedMotion}
          size={1.16}
          speedMultiplier={0.82}
          travelBoost={0.36}
        />
        <DeepLoopStarLayer
          color="#FF7A59"
          count={isCompact ? 44 : 74}
          depth={20}
          direction={direction}
          isTraveling={isTraveling}
          opacity={0.22}
          reducedMotion={reducedMotion}
          size={1.08}
          speedMultiplier={0.76}
          travelBoost={0.46}
        />

        <DeepLoopTrailLayer
          color="#F4F1DE"
          count={isCompact ? 30 : 52}
          depth={18}
          direction={direction}
          isTraveling={isTraveling}
          opacity={0.34}
          reducedMotion={reducedMotion}
          trailLength={1.28}
        />
        <DeepLoopTrailLayer
          color="#1EBBD7"
          count={isCompact ? 18 : 32}
          depth={18}
          direction={direction}
          isTraveling={isTraveling}
          opacity={0.44}
          reducedMotion={reducedMotion}
          trailLength={1.46}
        />
        <DeepLoopTrailLayer
          color="#9AE7FF"
          count={isCompact ? 13 : 24}
          depth={18}
          direction={direction}
          isTraveling={isTraveling}
          opacity={0.42}
          reducedMotion={reducedMotion}
          trailLength={1.58}
        />
        <DeepLoopTrailLayer
          color="#FF7A59"
          count={isCompact ? 9 : 16}
          depth={18}
          direction={direction}
          isTraveling={isTraveling}
          opacity={0.4}
          reducedMotion={reducedMotion}
          trailLength={1.7}
        />
      </Canvas>
    </div>
  );
};

export default SpaceJourneyCanvasDeepLoopV2;
