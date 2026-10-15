export const site = {
  name: "Yunke Li",
  title: "Frontend / Product Engineering",
  description:
    "Portfolio of Yunke Li, focused on frontend engineering, product-minded interfaces, and full-stack project work.",
  email: "yunkeli.work@gmail.com",
  phone: "+1 (778) 875-1206",
  location: "Vancouver, BC, Canada",
  address: "2730 Acadia Rd., Vancouver, BC, Canada, V6T 1R9",
  workAuthorization: "Eligible to work full-time in Canada with PGWP.",
  github: "https://github.com/yunke-l",
  linkedin: "https://www.linkedin.com/in/yunke-l-70084a160",
  instagram: "https://www.instagram.com/yk__april/",
  resume: "/assets/pdf/CV_YunkeLi.pdf"
};

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Work" },
  { href: "/resume", label: "Resume" },
  { href: "/github", label: "GitHub" }
];

export const githubRepos = [
  "yunke-l/movie-reviewer-web-node-server",
  "yunke-l/movie-reviewer-web-react-app",
  "yunke-l/Soccer-Team",
  "yunke-l/Park-Fountain-Explorer",
  "yunke-l/Droplet-image-analysis",
  "yunke-l/Mini-mobile-robot"
];

export const education = [
  {
    school: "Northeastern University",
    degree: "MSc in Computer Science",
    meta: "3.96/4.0",
    period: "Sep 2022 - Dec 2024",
    location: "Vancouver, Canada"
  },
  {
    school: "The University of Hong Kong",
    degree: "MSc(Eng) in Industrial Engineering and Logistics Management",
    meta: "",
    period: "Sep 2019 - Sep 2020",
    location: "Hong Kong"
  },
  {
    school: "Shanghai Jiao Tong University",
    degree: "B.E. in Mechanical Engineering",
    meta: "School of Mechanical Engineering",
    period: "Sep 2015 - Jun 2019",
    location: "Shanghai, China"
  }
];

export const homeTechnologies = [
  "React", "React Native", "TypeScript", "Taro", "HTML", "CSS",
  "Node.js", "MongoDB", "Firebase", "Python", "PyTorch"
];

export const skillGroups = [
  {
    title: "Web Technologies",
    items: "JavaScript, TypeScript, HTML, CSS"
  },
  {
    title: "Frameworks",
    items: "React, React Native, Taro (WeChat Mini Programs)"
  },
  {
    title: "Tools",
    items: "Git, Vite, Webpack"
  },
  {
    title: "Backend & Data",
    items: "Node.js, Firebase, MongoDB, SQL"
  },
  {
    title: "Languages",
    items: "English, Mandarin, Cantonese"
  }
];

export const currentExperience = {
  title: "Frontend Engineer",
  company: "Shenzhen Neostar Intelligent Technology Co., Ltd.",
  period: "Jan 2025 - Jul 2026",
  location: "Shenzhen, China",
  highlights: [
    "Independently built reusable React/TypeScript components for eight question types in an existing library, with answer-state restoration and review and preserved mappings during option shuffling.",
    "Built a responsive React/TypeScript teacher dashboard for course schedules and class rankings, integrating APIs and persisting class selection while keeping it valid as available classes changed.",
    "Built React/TypeScript homework workflows for classes, groups, and individuals, with form validation, student-ID duplicate checks across recipient groups, and draft restoration after reloads.",
    "Built staged React Native quizzes for semifinals and finals, coordinating sequential Expo Audio playback with quiz transitions and timeout submission, and releasing audio resources on screen exit.",
    "Integrated native classroom events with React WebView for countdowns, early termination, and submission, adding submission guards and event cleanup for repeated events and screen exits.",
    "Built daily and weekly reports in Taro/TypeScript for parent and teacher WeChat Mini Programs, transforming API responses for ECharts visualizations, aligning weekly records, and handling missing daily entries."
  ],
  technologies: ["React + TypeScript", "React Native + Expo Audio", "React WebView", "Taro + ECharts"],
  workAreas: [
    {
      title: "Student tablet experience",
      stack: "React · TypeScript · WebView",
      description: "Developed and maintained student learning modules for homework, curriculum-aligned practice, and playful learning. Supported watching instructional videos and answering eight common question types on tablets."
    },
    {
      title: "Teacher dashboard",
      stack: "React · TypeScript · REST APIs",
      description: "Implemented the teacher home page, course timetable, homework assignment, student homework completion tracking, and daily learning rankings in the teaching dashboard."
    },
    {
      title: "English Competition App",
      stack: "React Native · Expo · TypeScript",
      description: "Contributed to an annual city-level English competition app, primarily responsible for the quiz module. Supported four question types with answer restoration, plus preview, listening, and answering stages with countdowns and timeout submission."
    },
    {
      title: "WeChat Mini Programs",
      stack: "Taro · TypeScript · ECharts",
      description: "Developed learning report modules for parent and teacher WeChat Mini Programs. Built daily and weekly reports with ECharts visualizations, integrating API data and handling record alignment and missing entries."
    }
  ]
};

export const researchHighlight = {
  title: "Language Models for Customer Review Analysis",
  subtitle: "Master's capstone · Artificial Intelligence Review (Aug 2025)",
  period: "Jan 2024 - May 2024",
  links: {
    code: "https://github.com/yunke-l/CS7980-Capstone",
    poster: "/assets/pdf/slms-vs-llms-poster.pdf",
    paper: "https://link.springer.com/article/10.1007/s10462-025-11308-5"
  },
  highlights: [
    "Benchmarked distilBERT, ELECTRA, Flan-T5, and Flan-UL2 in PyTorch for sentiment classification and correlation tasks on customer reviews, comparing predictive performance and computational cost.",
    "Proposed a tiered SLM/LLM framework balancing accuracy and computational cost; co-authored “Do You Actually Need an LLM? Rethinking Language Models for Customer Reviews Analysis”."
  ]
};
