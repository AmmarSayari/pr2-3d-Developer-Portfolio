/* eslint-disable react-refresh/only-export-components */
import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

import { SectionWrapper } from "../../hoc";
import { styles } from "../../styles";
import { textVariant } from "../../utils/motion";
import SharpGlassPanelV2 from "../ui/SharpGlassPanelV2";
import ExperienceStoryModalV2 from "./ExperienceStoryModalV2";
import {
  ieiExperienceCompanyV2,
  ieiExperienceStoriesV2,
} from "./experienceContentV2";

import "./ExperienceOrbitalV2.css";

const experienceOrbitPathsV2 = {
  expo: {
    duration: 96,
    phase: 0.58,
    radiusX: 0.44,
    radiusY: 0.24,
    rotation: -12,
  },
  "stack-junior": {
    duration: 80,
    phase: 0.84,
    radiusX: 0.315,
    radiusY: 0.36,
    rotation: 25,
  },
  website: {
    duration: 66,
    phase: 0.12,
    radiusX: 0.37,
    radiusY: 0.155,
    rotation: 8,
  },
};

const ExperienceOrbitalV2 = () => {
  const [activeStory, setActiveStory] = useState(null);
  const activeTriggerRef = useRef(null);
  const stageRef = useRef(null);

  useEffect(() => {
    const stage = stageRef.current;

    if (!stage) {
      return undefined;
    }

    const reduceMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const nodeStates = ieiExperienceStoriesV2.map((story) => {
      const orbit = experienceOrbitPathsV2[story.id];

      return {
        angle: orbit.phase * Math.PI * 2,
        boostUntil: 0,
        collisionCooldownUntil: 0,
        node: stage.querySelector(`[data-orbit-node="${story.id}"]`),
        orbit,
      };
    });

    let animationFrame;
    let lastTime = performance.now();
    let compactLayout = null;

    const positionNodes = (currentTime) => {
      const isCompact = window.innerWidth <= 767;
      const reducedMotion = reduceMotionQuery.matches;

      if (isCompact) {
        if (compactLayout !== true) {
          nodeStates.forEach(({ node }) => {
            node?.style.removeProperty("left");
            node?.style.removeProperty("top");
            node?.style.removeProperty("transform");
          });
        }

        compactLayout = true;
        lastTime = currentTime;
        animationFrame = window.requestAnimationFrame(positionNodes);
        return;
      }

      compactLayout = false;

      const elapsedSeconds = Math.min((currentTime - lastTime) / 1000, 0.1);
      const stageWidth = stage.clientWidth;
      const stageHeight = stage.clientHeight;
      const centerX = stageWidth / 2;
      const centerY = stageHeight / 2;
      const positionedNodes = [];

      nodeStates.forEach(({ node, orbit }, index) => {
        if (!node) {
          return;
        }

        const paused =
          reducedMotion || node.matches(":hover") || node.matches(":focus-visible");

        if (!paused) {
          const speedMultiplier =
            currentTime < nodeStates[index].boostUntil ? 1.65 : 1;

          nodeStates[index].angle +=
            ((elapsedSeconds * Math.PI * 2) / orbit.duration) * speedMultiplier;
        }

        const rotation = (orbit.rotation * Math.PI) / 180;
        const ellipseX = Math.cos(nodeStates[index].angle) * stageWidth * orbit.radiusX;
        const ellipseY =
          Math.sin(nodeStates[index].angle) * stageHeight * orbit.radiusY;
        const x =
          centerX +
          ellipseX * Math.cos(rotation) -
          ellipseY * Math.sin(rotation);
        const y =
          centerY +
          ellipseX * Math.sin(rotation) +
          ellipseY * Math.cos(rotation);

        node.style.left = `${x}px`;
        node.style.top = `${y}px`;
        node.style.transform = "translate(-50%, -50%)";

        positionedNodes.push({
          node,
          state: nodeStates[index],
          x,
          y,
        });
      });

      if (!reducedMotion) {
        positionedNodes.forEach((currentNode, currentIndex) => {
          positionedNodes.slice(currentIndex + 1).forEach((otherNode) => {
            const distance = Math.hypot(
              currentNode.x - otherNode.x,
              currentNode.y - otherNode.y,
            );
            const overlapDistance =
              (currentNode.node.offsetWidth + otherNode.node.offsetWidth) * 0.42;
            const canBoost =
              currentTime >= currentNode.state.collisionCooldownUntil &&
              currentTime >= otherNode.state.collisionCooldownUntil;

            if (distance < overlapDistance && canBoost) {
              const boostUntil = currentTime + 1200;
              const cooldownUntil = currentTime + 4800;

              currentNode.state.boostUntil = boostUntil;
              otherNode.state.boostUntil = boostUntil;
              currentNode.state.collisionCooldownUntil = cooldownUntil;
              otherNode.state.collisionCooldownUntil = cooldownUntil;
            }
          });
        });
      }

      lastTime = currentTime;
      animationFrame = window.requestAnimationFrame(positionNodes);
    };

    animationFrame = window.requestAnimationFrame(positionNodes);

    return () => {
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  const openStory = (story, event) => {
    activeTriggerRef.current = event.currentTarget;
    setActiveStory(story);
  };

  const closeStory = useCallback(() => {
    setActiveStory(null);
    window.requestAnimationFrame(() => activeTriggerRef.current?.focus());
  }, []);

  return (
    <div className="experience-orbital-v2">
      <motion.header
        className="experience-orbital-v2__heading"
        variants={textVariant()}
      >
        <h2 className={styles.sectionHeadText}>Experience.</h2>

        <SharpGlassPanelV2 className="experience-orbital-v2__profile-card">
          <div className="experience-orbital-v2__profile-heading">
            <div>
              <h3>{ieiExperienceCompanyV2.role}</h3>
              <p className="experience-orbital-v2__company">
                {ieiExperienceCompanyV2.name} (
                {ieiExperienceCompanyV2.shortName})
              </p>
            </div>

            <p className="experience-orbital-v2__meta">
              {ieiExperienceCompanyV2.location} ·{" "}
              {ieiExperienceCompanyV2.period}
            </p>
          </div>

          <p className="experience-orbital-v2__summary">
            {ieiExperienceCompanyV2.summary}
          </p>
        </SharpGlassPanelV2>
      </motion.header>

      <div className="experience-orbital-v2__stage" ref={stageRef}>
        <span
          className="experience-orbital-v2__ring experience-orbital-v2__ring--cyan"
          aria-hidden="true"
        />
        <span
          className="experience-orbital-v2__ring experience-orbital-v2__ring--ivory"
          aria-hidden="true"
        />
        <span
          className="experience-orbital-v2__ring experience-orbital-v2__ring--warm"
          aria-hidden="true"
        />

        <div className="experience-orbital-v2__core">
          {ieiExperienceCompanyV2.logoSrc ? (
            <img
              src={ieiExperienceCompanyV2.logoSrc}
              alt={`${ieiExperienceCompanyV2.name} logo`}
            />
          ) : (
            <strong>{ieiExperienceCompanyV2.shortName}</strong>
          )}
          <span>Work orbit</span>
        </div>

        {ieiExperienceStoriesV2.map((story) => (
          <button
            type="button"
            className={`experience-orbital-v2__node experience-orbital-v2__node--${story.id}`}
            data-orbit-node={story.id}
            onClick={(event) => openStory(story, event)}
            aria-haspopup="dialog"
            aria-label={`${story.orbitLabel}: ${story.orbitContext}`}
            key={story.id}
          >
            <span
              className="experience-orbital-v2__node-surface"
              aria-hidden="true"
            />
            <span
              className="experience-orbital-v2__node-eclipse"
              aria-hidden="true"
            />
            <span className="experience-orbital-v2__node-copy">
              <strong>{story.orbitLabel}</strong>
              <small>{story.orbitContext}</small>
            </span>
          </button>
        ))}

        <span className="experience-orbital-v2__signal is-one" aria-hidden="true" />
        <span className="experience-orbital-v2__signal is-two" aria-hidden="true" />
        <span
          className="experience-orbital-v2__signal is-three"
          aria-hidden="true"
        />
      </div>

      <p className="experience-orbital-v2__hint">
        Select an orbit to explore the work.
      </p>

      {activeStory && (
        <ExperienceStoryModalV2
          story={activeStory}
          onClose={closeStory}
        />
      )}
    </div>
  );
};

export default SectionWrapper(ExperienceOrbitalV2, "experience");
