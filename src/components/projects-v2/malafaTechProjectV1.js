import officeOverview from "../../assets/projects/malafatech/app/01-overview.webp";
import caseWorkspace from "../../assets/projects/malafatech/app/11-case-workspace.webp";
import caseFolders from "../../assets/projects/malafatech/app/13-case-folders.webp";
import officeCalendar from "../../assets/projects/malafatech/app/23-calendar-month.webp";
import darkCaseWorkspace from "../../assets/projects/malafatech/app/29-dark-case.webp";
import englishOverview from "../../assets/projects/malafatech/app/30-english-overview.webp";
import landingHero from "../../assets/projects/malafatech/landing/landing-hero-desktop.jpg";
import landingProduct from "../../assets/projects/malafatech/landing/landing-product-desktop.jpg";
import landingHosting from "../../assets/projects/malafatech/landing/landing-hosting-desktop.jpg";
import landingContact from "../../assets/projects/malafatech/landing/landing-contact-desktop.jpg";
import landingPhoneHero from "../../assets/projects/malafatech/landing/landing-hero-phone.jpg";

// Keep the private product source separate from this public portfolio record.
// All app images come from the public fictional-data product tour.
const malafaTechProjectV1 = {
  name: "MalafaTech / ملفاتك",
  description:
    "A platform for small Saudi law offices to organize clients, cases, files, appointments, and team workflows. I am its main developer, working with a lawyer cofounder on both the management app and its public website.",
  apps: [
    {
      name: "Law office management app",
      status_label: "Product tour",
      summary:
        "Clients lead into cases, nested folders, and files with PDF, image, audio, and video previews. Shared notes, attributable activity, stages, checklists, and appointments support daily work; office accounts and storage allowances are managed alongside them.",
      live_preview_link: "https://malafatech.com/marketing/explore.html",
      images: [
        {
          image: officeOverview,
          alt: "Arabic MalafaTech office overview with cases, appointments, recent activity, and storage",
          caption: "Office overview · Arabic",
        },
        {
          image: caseWorkspace,
          alt: "MalafaTech case workspace showing stages, appointments, and case details",
          caption: "Case workspace and stages",
        },
        {
          image: caseFolders,
          alt: "Nested case folders and a document preview in MalafaTech",
          caption: "Case folders and files",
        },
        {
          image: officeCalendar,
          alt: "MalafaTech office calendar with case-linked appointments",
          caption: "Office calendar",
        },
        {
          image: darkCaseWorkspace,
          alt: "MalafaTech case workspace in dark mode",
          caption: "Case workspace · dark mode",
        },
        {
          image: englishOverview,
          alt: "MalafaTech office overview in English",
          caption: "Office overview · English",
        },
      ],
      technologies: [
        { techName: "React" },
        { techName: "Spring Boot" },
        { techName: "PostgreSQL" },
        { techName: "OCI Object Storage" },
      ],
    },
    {
      name: "Public landing page",
      status_label: "Public website",
      summary:
        "A bilingual, RTL-aware site with responsive light and teal sections, a public screenshot tour, contact and hosting information, and Dune Tide motion that respects reduced-motion preferences.",
      live_preview_link: "https://malafatech.com/",
      images: [
        {
          image: landingHero,
          alt: "Live MalafaTech Arabic landing page with the teal hero panel over a warm architectural background",
          caption: "Public landing · Arabic desktop",
        },
        {
          image: landingProduct,
          alt: "Live MalafaTech landing section explaining case management beside a fictional-data app preview",
          caption: "Product section · Arabic desktop",
        },
        {
          image: landingHosting,
          alt: "Live MalafaTech hosting section showing Jeddah location and Oracle Cloud presentation",
          caption: "Hosting section · Arabic desktop",
        },
        {
          image: landingContact,
          alt: "Live MalafaTech contact section and footer with the architectural brand treatment",
          caption: "Contact section · Arabic desktop",
        },
        {
          image: landingPhoneHero,
          alt: "Responsive MalafaTech landing page hero on a 390-pixel phone screen",
          caption: "Public landing · Arabic phone",
        },
      ],
      technologies: [
        { techName: "React" },
        { techName: "Vite" },
        { techName: "Tailwind CSS" },
        { techName: "GSAP" },
      ],
    },
  ],
  achievement_label: "My role",
  achievements:
    "Main developer of the app and public site, working with a lawyer cofounder to shape practical workflows for Saudi law offices.",
};

export default malafaTechProjectV1;
