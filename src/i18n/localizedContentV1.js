import { projects2 } from "../constants";
import malafaTechProjectV2 from "../components/projects-v2/malafaTechProjectV2";
import sawlahProjectV3 from "../components/projects-v2/sawlahProjectV3";
import ballotProjectV1 from "../components/projects-v2/ballotProjectV1";
import legacyPortfolioProjectV3 from "../components/projects-v2/legacyPortfolioProjectV3";
import { ieiExperienceCompanyV2, ieiExperienceStoriesV2 } from "../components/experience-v2/experienceContentV2";
import { experienceCompanyArabicV1, experienceStoriesArabicV1, projectsArabicV1 } from "./contentArabicV1";
import { localizeProjectRecord } from "./localeUtilsV1";

const projectEntries = [
  ["malafa", malafaTechProjectV2],
  ["sawlah", sawlahProjectV3],
  ["ballot", ballotProjectV1],
  ["legacy", legacyPortfolioProjectV3],
  ["ecommerce", projects2[0]],
  ["spare", projects2[1]],
];

export const getLocalizedProjectsV1 = (locale) => projectEntries.map(([key, project]) =>
  localizeProjectRecord(project, locale === "ar" ? projectsArabicV1[key] : undefined, key),
);

export const getLocalizedExperienceV1 = (locale) => {
  if (locale !== "ar") return { company: ieiExperienceCompanyV2, stories: ieiExperienceStoriesV2 };
  return {
    company: { ...ieiExperienceCompanyV2, ...experienceCompanyArabicV1 },
    stories: ieiExperienceStoriesV2.map((story) => {
      const { mainVideoLabel, extraMedia, ...text } = experienceStoriesArabicV1[story.id];
      return {
        ...story,
        ...text,
        mainVideo: { ...story.mainVideo, label: mainVideoLabel },
        extraMedia: story.extraMedia.map((item, index) => ({ ...item, ...extraMedia[index] })),
      };
    }),
  };
};
