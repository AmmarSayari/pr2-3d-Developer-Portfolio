import homePreview from "../../assets/projects/legacy-portfolio/home-preview.jpg";
import overviewPreview from "../../assets/projects/legacy-portfolio/overview-preview.jpg";
import projectsPreview from "../../assets/projects/legacy-portfolio/projects-preview.jpg";
import educationMobile from "../../assets/projects/legacy-portfolio/education-mobile.jpg";

const legacyPortfolioProjectV2 = {
  name: "My Original Portfolio",
  description:
    "An earlier version of my personal portfolio, kept online to show how my design and development work has grown. It brings together interactive 3D scenes, my background, and projects in one responsive website.",
  apps: [
    {
      name: "Portfolio website",
      source_code_link:
        "https://github.com/AmmarSayari/amar9dev-legacy-portfolio",
      live_preview_link: "https://legacy.amar9dev.com/",
      images: [
        { image: homePreview },
        { image: overviewPreview },
        { image: projectsPreview },
        { image: educationMobile },
      ],
      technologies: [
        { techName: "React" },
        { techName: "Three.js" },
        { techName: "Vite" },
        { techName: "Tailwind CSS" },
        { techName: "Framer Motion" },
      ],
    },
  ],
  achievements:
    "Built and published a responsive 3D portfolio, then kept its original source and live version to show how my work has evolved.",
};

export default legacyPortfolioProjectV2;
