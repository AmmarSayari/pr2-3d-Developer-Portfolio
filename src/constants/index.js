import {
    mobile,
    backend,
    web,
    javascript,
    typescript,
    html,
    css,
    reactjs,
    tailwind,
    nodejs,
    git,
    php,
    nextjs,
    prisma,
    mysql,
    meta,
    starbucks,
    tesla,
    shopify,
    carrent,
    jobit,
    tripguide,
    threejs,
    javadev,
    infotech,
    webdev1
  } from "../assets";
  
  export const navLinks = [
    {
      id: "about",
      title: "About",
    },
    {
      id: "work",
      title: "Work",
    },
    {
      id: "contact",
      title: "Contact",
    },
  ];
  
  const services = [
    {
      title: "Web Developer",
      icon: webdev1,
    },
    {
      title: "Backend Developer",
      icon: backend,
    },
    {
      title: "Java Developer",
      icon: javadev, 
    },
    {
      title: "Information Technology",
      icon: infotech,
    }
  ];
  

  const relaventCourses = [
    {
      title: "Software Engineering",
    },
    {
      title: "Web Development",
    },
    {
      title: "Discrete Structure",
    },
    {
      title: "Database Management Systems",
    },
    {
      title: "Network Administration",
    },
    {
      title: "Information security",
    },
    {
      title: "Operating Systems",
    },
    {
      title: "Data Mining",
    },
  ];

  const technologies = [
    {
      name: "HTML 5",
      icon: html,
    },
    {
      name: "CSS 3",
      icon: css,
    },
    {
      name: "JavaScript",
      icon: javascript,
    },
    {
      name: "TypeScript",
      icon: typescript,
    },
    {
      name: "React JS",
      icon: reactjs,
    },
    {
      name: "Tailwind CSS",
      icon: tailwind,
    },
    {
      name: "Node JS",
      icon: nodejs,
    },
    {
      name: "Three JS",
      icon: threejs,
    },
    {
      name: "git",
      icon: git,
    },
    {
      name: "Java",
      icon: javadev,
    },
    {
      name: "PHP",
      icon: php,
    },
    {
      name: "Next JS",
      icon: nextjs,
    },
    {
      name: "Prisma DB",
      icon: prisma,
    },
    {
      name: "MySQL",
      icon: mysql,
    },
  ];
  
  
  const projects = [
    {
      name: "Spare parts services platform",
      description:
        "Description: Platform for spare parts services, with ordering system and chat AI focusing on vehicles and mechanics.Technologies: Back-End: PHP, Node.js (API integration), Front-End: React.js (Web), Java (Android phone)Achievements: Coordinated multiple front-end interfaces (Web, Android phone), Back-end API communicate with the front using JSON",
      tags: [
        {
          name: "react",
          color: "blue-text-gradient",
        },
        {
          name: "Java",
          color: "green-text-gradient",
        },
        {
          name: "PHP",
          color: "pink-text-gradient",
        },
      ],
      image: carrent,
      source_code_link: "https://github.com/",
    },
    {
      name: "E-Commerce platform",
      description:
        "Description: An all-in-one platform lets you create and manage multiple stores from a central admin dashboard, complete with API management for CRUD operations and comprehensive sales tracking. Technologies: Back-End: TypeScript, Next.js13, Prisma, PlanetScale, Stripe, ShadcnUI, Front-End: TypeScript, React.js, Tailwind CSS Achievements: Mastering the use of multiple technologies and frameworks in a single project while training with TypeScript and Next.js 13 by creating a real-world application.",
      tags: [
        {
          name: "react",
          color: "blue-text-gradient",
        },
        {
          name: "Next.js",
          color: "green-text-gradient",
        },
        {
          name: "Tailwind CSS",
          color: "pink-text-gradient",
        },
      ],
      image: jobit,
      source_code_link: "https://github.com/",
    },
  ];
  
  export { 
    services, 
    technologies, 
    projects, 
    relaventCourses 
  };