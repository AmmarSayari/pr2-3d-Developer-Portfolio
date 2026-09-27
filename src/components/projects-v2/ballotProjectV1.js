import handEditorPreview from "../../assets/projects/ballot/phone-demos/hand-editor-desktop.jpg";
import roundEditorPreview from "../../assets/projects/ballot/phone-demos/round-editor-desktop.jpg";
import controllerWorkflowPreview from "../../assets/projects/ballot/match-controller/workflow-preview.svg";

const ballotProjectV1 = {
  name: "Ballot Card Game",
  description:
    "A camera-based object detection project aimed at analyzing a complete real-life Ballot game, not just individual cards. I use it as a hands-on domain to grow my skills across different areas of technology.",
  apps: [
    {
      name: "Phone demos",
      status_label: "Live preview",
      summary:
        "Browser-based camera, video, and card-editor demos designed to run on a phone or computer.",
      live_preview_link: "https://ballot-project-yt1.vercel.app/",
      images: [
        {
          image: roundEditorPreview,
          alt: "Ballot round card editor running locally with sample playing cards",
          caption: "Round card editor · local preview",
        },
        {
          image: handEditorPreview,
          alt: "Ballot player hands editor running locally with sample playing cards",
          caption: "Player hands editor · local preview",
        },
      ],
      technologies: [
        { techName: "Next.js" },
        { techName: "React" },
        { techName: "ONNX Runtime Web" },
      ],
    },
    {
      name: "Match controller",
      status_label: "Local prototype",
      summary:
        "A Python workflow for setting up a match, reviewing detected hands and rounds, calculating scores, and exporting the result.",
      images: [
        {
          image: controllerWorkflowPreview,
          alt: "Illustration of the Ballot match controller flow from setup through score export",
          caption: "Workflow illustration · local prototype",
        },
      ],
      technologies: [
        { techName: "Python" },
        { techName: "Streamlit" },
        { techName: "OpenCV" },
        { techName: "Ultralytics" },
      ],
    },
  ],
  achievement_label: "Current stage",
  achievements:
    "Still in development, I am working toward a full game-analysis flow while improving detection and review. In the future, I plan to collect structured game data that could support data mining or training models for Ballot games.",
};

export default ballotProjectV1;
