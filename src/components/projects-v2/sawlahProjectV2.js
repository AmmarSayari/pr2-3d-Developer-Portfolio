import gamesDesktop from "../../assets/projects/sawlah/games-desktop.jpg";
import homePhone from "../../assets/projects/sawlah/home-phone.jpg";
import profilePhone from "../../assets/projects/sawlah/profile-phone.jpg";
import wrongQuestionPhone from "../../assets/projects/sawlah/wrong-question-phone.jpg";
import wrongLobbyPhone from "../../assets/projects/sawlah/wrong-lobby-phone.jpg";
import wrongAnswerPhone from "../../assets/projects/sawlah/wrong-answer-phone.jpg";
import wrongRevealDesktop from "../../assets/projects/sawlah/wrong-reveal-desktop.jpg";
import mindMatchPhone from "../../assets/projects/sawlah/mind-match-phone.jpg";
import mindLobbyDesktop from "../../assets/projects/sawlah/mind-lobby-desktop.jpg";
import mindRevealPhone from "../../assets/projects/sawlah/mind-reveal-phone.jpg";
import mindRevealDesktop from "../../assets/projects/sawlah/mind-reveal-desktop.jpg";
import honeyBoardPhone from "../../assets/projects/sawlah/honey-board-phone.jpg";
import honeyIntroPhone from "../../assets/projects/sawlah/honey-intro-phone.jpg";
import honeySetupDesktop from "../../assets/projects/sawlah/honey-setup-desktop.jpg";
import honeyBoardDesktop from "../../assets/projects/sawlah/honey-board-desktop.jpg";

const sawlahProjectV2 = {
  name: "Sawlah (صَوْلة)",
  description:
    "A bilingual social games platform for phones and groups, combining live multiplayer rooms with local, one-device play. Still in development; the room-stage previews use local mock data.",
  apps: [
    {
      name: "Games hub & profile",
      status_label: "In development",
      images: [
        {
          image: gamesDesktop,
          alt: "Sawlah games collection on desktop",
          caption: "Desktop games hub",
        },
        {
          image: homePhone,
          alt: "Sawlah games hub on a phone",
          caption: "Phone games hub",
        },
        {
          image: profilePhone,
          alt: "Sawlah guest profile open on a phone",
          caption: "Guest profile",
        },
      ],
      technologies: [
        { techName: "Next.js" },
        { techName: "React" },
        { techName: "Supabase" },
      ],
    },
    {
      name: "Wrong Question",
      status_label: "In development",
      images: [
        {
          image: wrongRevealDesktop,
          alt: "Wrong Question answers revealed in a desktop development preview",
          caption: "Answers revealed · desktop",
        },
        {
          image: wrongLobbyPhone,
          alt: "Wrong Question room lobby on a phone development preview",
          caption: "Room lobby · phone",
        },
        {
          image: wrongAnswerPhone,
          alt: "Wrong Question private answer stage on a phone development preview",
          caption: "Private answer · phone",
        },
        {
          image: wrongQuestionPhone,
          alt: "Wrong Question game entry on a phone",
          caption: "Game entry · phone",
        },
      ],
      technologies: [
        { techName: "Next.js" },
        { techName: "React" },
        { techName: "Colyseus" },
      ],
    },
    {
      name: "Mind Match",
      status_label: "In development",
      images: [
        {
          image: mindRevealDesktop,
          alt: "Mind Match round reveal in a desktop development preview",
          caption: "Round reveal · desktop",
        },
        {
          image: mindLobbyDesktop,
          alt: "Mind Match team lobby in a desktop development preview",
          caption: "Team lobby · desktop",
        },
        {
          image: mindRevealPhone,
          alt: "Mind Match team reveal on a phone development preview",
          caption: "Team reveal · phone",
        },
        {
          image: mindMatchPhone,
          alt: "Mind Match game entry on a phone",
          caption: "Game entry · phone",
        },
      ],
      technologies: [
        { techName: "Next.js" },
        { techName: "React" },
        { techName: "Colyseus" },
      ],
    },
    {
      name: "Honey Board",
      status_label: "In development",
      images: [
        {
          image: honeyBoardDesktop,
          alt: "Honey Board letter grid on desktop",
          caption: "Letter board · desktop",
        },
        {
          image: honeyBoardPhone,
          alt: "Honey Board letter grid in progress on a phone",
          caption: "Letter board · phone",
        },
        {
          image: honeySetupDesktop,
          alt: "Honey Board team setup on desktop",
          caption: "Team setup · desktop",
        },
        {
          image: honeyIntroPhone,
          alt: "Honey Board game introduction on a phone",
          caption: "Game entry · phone",
        },
      ],
      technologies: [
        { techName: "Next.js" },
        { techName: "React" },
        { techName: "Local storage" },
      ],
    },
  ],
  achievement_label: "Current stage",
  achievements:
    "Three game experiences and the shared platform are taking shape, with multiplayer stages and local play visible in the current build.",
};

export default sawlahProjectV2;
