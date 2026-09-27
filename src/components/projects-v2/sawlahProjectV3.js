import sawlahProjectV2 from "./sawlahProjectV2";

// Keep the four full-card V2 presentation available while the grouped layout is tried.
const summaries = {
  "Games hub & profile":
    "Find a game, choose a guest identity, and get the group ready to play.",
  "Wrong Question":
    "One player gets a different question; the group discusses the answers and votes.",
  "Mind Match":
    "Two teams answer, reveal, and score their way through shared rounds.",
  "Honey Board":
    "A one-device Arabic letter board where teams claim cells to complete a path.",
};

const sawlahProjectV3 = {
  ...sawlahProjectV2,
  layout: "sawlah-showcase-v1",
  description:
    "Sawlah is a platform for party games and helpful tools that bring friends and groups together. Some multiplayer screenshots show local development previews.",
  apps: sawlahProjectV2.apps.map((app) => ({
    ...app,
    summary: summaries[app.name],
  })),
  technologies: ["Next.js", "React", "Colyseus", "Supabase"],
  live_preview_link: "https://fit-with-the-group-game.vercel.app/",
  achievement_label: "What's next",
  achievements:
    "I plan to keep expanding Sawlah with more party games and practical tools for hosts and players. The goal is to make it easier for friends and groups to get together and enjoy playing.",
};

export default sawlahProjectV3;
