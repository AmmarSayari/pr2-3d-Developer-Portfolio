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
    webdev1,
    backendm8gt,
    frontweb,
    andro,
    storeadmin,
    storefront,
  } from "../assets";
  
  export const navLinks = [
    {
      id: "about",
      title: "About",
    },
    {
      id: "Projects",
      title: "Projects",
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

  const internAreas = [
    {
      title: "Database Management",
    },
    {
      title: "Networking",
    },
    {
      title: "Technical Support",
    },
    {
      title: "configuring and managing network devices",
    },
    {
      title: "resolving connectivity issues",
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


  const projects2 = [
      {
        name: "E-Commerce platform",
        apps: [
          {
            name: "Admin Dashboard (back-end)",
            source_code_link: "https://github.com/AmmarSayari/ecommerce-admin",
            live_preview_link: "https://ecommerce-admin-m9.vercel.app/",
            images: [
              {
                image: storeadmin,
              },
            ],
            technologies: [
              {
                techName: "TypeScript",
              },
              {
                techName: "Next.js",
              },
              {
                techName: "Prisma",
              },
              {
                techName: "PlanetScale",
              },
              {
                techName: "Stripe",
              },
              {
                techName: "ShadcnUI",
              },
            ],
          },
          {
            name: "Storefront (front-end)",
            source_code_link: "https://github.com/AmmarSayari/pr-1ecommerce-store",
            live_preview_link: "https://store-mr9.vercel.app/",
            images: [{
              image: storefront,
            }],
            technologies: [
              {
                techName: "TypeScript",
              },
              {
                techName: "React.js",
              },
              {
                techName: "Tailwind CSS",
              },
            ],
          }
        ],
        description:
        "An all-in-one platform lets you create and manage multiple stores from a central admin dashboard, complete with API management for CRUD operations and comprehensive sales tracking.",

        achievements: 
        " Mastering the use of multiple technologies and frameworks in a single project while training with TypeScript and Next.js 13 by creating a real-world application."
        
      },
      {
        name: "Spare parts services platform (Senior Project)",
        apps: [
          {
            name: "Front-End (Web)",
            source_code_link: "https://github.com/AmmarSayari/499-spare-parts-frontend",
            live_preview_link: null,
            images: [
              {
                image: frontweb,
              },
            ],
            technologies: [
              {
                techName: "React.js",
              },
              {
                techName: "Firebase",
              }
            ],
          },
          {
            name: "Android App",
            source_code_link: "https://github.com/AbdulazizAlghamdi24/499_AutoSparaPartsService",
            live_preview_link: null,
            images: [
              {
                image: andro,
              }
            ],
            technologies: [
              
              {
                techName: "Java",
              },
              {
                techName: "Firebase",
              },
            ],
          },
          {
            name: "Back-End",
            source_code_link: "https://github.com/AmmarSayari/cpit499a/",
            live_preview_link: null,
            images: [
              {
                image: backendm8gt,
              }
            ],
            technologies: [
              
              {
                techName: "PHP",
              },
              {
                techName: "Node.js",
              },
              {
                techName: "MySQL",
              }
            ],
          }
        ],
          description:
            " Platform for spare parts services, with ordering system and chat AI focusing on vehicles and mechanics.",
          
          achievements: "Coordinated multiple front-end interfaces (Web, Android phone), Back-end API communicate with the front using JSON"
        },
      
  ];
  
  export { 
    services, 
    technologies, 
    projects, 
    relaventCourses,
    projects2 ,
    internAreas,
  };