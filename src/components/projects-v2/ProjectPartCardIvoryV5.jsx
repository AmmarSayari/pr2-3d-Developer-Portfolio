/* eslint-disable react/prop-types */
import ProjectPartCardIvoryV4 from "./ProjectPartCardIvoryV4";

// Preserve V4 and the project records, but hide the paragraph above the slider.
// Reusing V4 keeps the carousel, progress, styling, and links unchanged.
const ProjectPartCardIvoryV5 = ({ app, projectName }) => (
  <ProjectPartCardIvoryV4
    app={{ ...app, summary: null }}
    projectName={projectName}
  />
);

export default ProjectPartCardIvoryV5;
