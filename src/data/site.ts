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
  { href: "/github", label: "Course Projects" }
];

export const courseworkProjects = [
  {
    title: "Budget Defender Mobile App",
    // GitHub commit history: 2023-11-15 through 2023-12-14 (UTC).
    period: { label: "Nov – Dec 2023", year: "2023" },
    description: "Mobile app for tracking expenses, managing budgets, converting currencies, and organizing receipts.",
    technologies: ["React Native", "Expo", "Firebase"],
    preview: {
      label: "Home",
      thumbnail: "/assets/img/coursework/budget-defender-thumb.webp",
      image: "/assets/img/coursework/budget-defender.webp",
      alt: "Budget Defender home screen with monthly spending, remaining budget, and expense chart.",
      source: "https://raw.githubusercontent.com/yunke-l/Budget-Defender-Mobile-App/HEAD/images/final-ui/home-underbudget.png"
    },
    additionalPreviews: [
      {
        label: "All Expenses",
        thumbnail: "/assets/img/coursework/budget-defender-all-expenses-thumb.webp",
        image: "/assets/img/coursework/budget-defender-all-expenses.webp",
        alt: "Budget Defender All Expenses screen with a spending category pie chart and monthly expense list.",
        source: "https://raw.githubusercontent.com/yunke-l/Budget-Defender-Mobile-App/HEAD/images/final-ui/all-expenses.png"
      },
      {
        label: "Visited Places",
        thumbnail: "/assets/img/coursework/budget-defender-visited-places-thumb.webp",
        image: "/assets/img/coursework/budget-defender-visited-places.webp",
        alt: "Budget Defender Visited Places screen showing visited locations as markers on a map.",
        source: "https://raw.githubusercontent.com/yunke-l/Budget-Defender-Mobile-App/HEAD/images/final-ui/visited-places.png"
      }
    ],
    repositories: [{ name: "Budget-Defender-Mobile-App", label: "Budget-Defender-Mobile-App" }]
  },
  {
    title: "Movie Reviewer",
    // Frontend and API commit histories: 2023-08-16 through 2023-09-19 (UTC).
    period: { label: "Aug – Sep 2023", year: "2023" },
    description: "Full-stack movie review platform for discovering films, reading reviews, and sharing opinions, with a React frontend and Node.js API.",
    technologies: ["React", "Node.js", "Express", "MongoDB", "Mongoose", "IMDb API"],
    preview: {
      thumbnail: "/assets/img/coursework/movie-reviewer-thumb.webp",
      image: "/assets/img/coursework/movie-reviewer.webp",
      alt: "Movie Reviewer home page displaying movie posters and community review cards.",
      source: "https://github.com/yunke-l/movie-reviewer-web-react-app/assets/66773247/fd3655ec-c61a-4264-aa8d-298c2371d9b4"
    },
    repositories: [
      { name: "movie-reviewer-web-react-app", label: "Frontend" },
      { name: "movie-reviewer-web-node-server", label: "Backend API" }
    ]
  },
  {
    title: "Soccer Team",
    period: { label: "Spring 2023", year: "2023" },
    description: "Java desktop app for managing a U10 soccer roster and selecting a starting lineup based on player skills and positions.",
    technologies: ["Java", "Swing", "MVC", "JUnit"],
    preview: {
      thumbnail: "/assets/img/coursework/soccer-team-thumb.webp",
      image: "/assets/img/coursework/soccer-team.webp",
      alt: "Soccer Team desktop interface with player roster, generated team, and starting lineup.",
      source: "https://github.com/yunke-l/Soccer-Team/assets/66773247/c3e2657c-b849-4ea5-a95e-b19e14cbcce0"
    },
    repositories: [{ name: "Soccer-Team", label: "Soccer-Team" }]
  },
  {
    title: "Park Fountain Explorer",
    period: { label: "Fall 2022", year: "2022" },
    description: "Python desktop dashboard for exploring Vancouver parks and free drinking fountains by neighbourhood, with charts and location details.",
    technologies: ["Python", "Tkinter", "Matplotlib"],
    preview: {
      thumbnail: "/assets/img/coursework/park-fountain-explorer-thumb.webp",
      image: "/assets/img/coursework/park-fountain-explorer.webp",
      alt: "Park Fountain Explorer neighbourhood selector and a list of Vancouver parks and drinking fountain addresses.",
      source: "https://github.com/yunke-l/Park-Fountain-Explorer/assets/66773247/66d09ee0-cede-4e46-95a6-620f5b35598b"
    },
    repositories: [{ name: "Park-Fountain-Explorer", label: "Park-Fountain-Explorer" }]
  },
  {
    title: "Droplet Image Analysis",
    period: { label: "Spring 2019", year: "2019" },
    description: "Water droplet image analysis using U-Net and SegNet networks for semantic segmentation, implemented in MATLAB R2019a.",
    technologies: ["MATLAB", "U-Net", "SegNet", "Semantic segmentation"],
    preview: {
      thumbnail: "/assets/img/coursework/droplet-analysis-thumb.webp",
      image: "/assets/img/coursework/droplet-analysis.gif",
      alt: "Water droplet segmentation result with the detected droplet highlighted in cyan.",
      source: "https://raw.githubusercontent.com/yunke-l/Droplet-image-analysis/HEAD/sample_gif.gif"
    },
    repositories: [{ name: "Droplet-image-analysis", label: "Droplet-image-analysis" }]
  },
  {
    title: "Mini Mobile Robot",
    period: { label: "Fall 2017", year: "2017" },
    description: "Autonomous following robot programmed in C for a 51 MCU, using ultrasonic localization and infrared obstacle avoidance.",
    technologies: ["C", "51 MCU", "Ultrasonic sensors", "Infrared sensors"],
    preview: {
      thumbnail: "/assets/img/coursework/mini-mobile-robot-thumb.webp",
      image: "/assets/img/coursework/mini-mobile-robot.webp",
      alt: "Assembled mini mobile robot with a wheeled chassis, control boards, and tracking sensors.",
      source: "https://raw.githubusercontent.com/yunke-l/Mini-mobile-robot/HEAD/img1.png"
    },
    repositories: [{ name: "Mini-mobile-robot", label: "Mini-mobile-robot" }]
  }
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
    meta: "",
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
  scope: "English-learning products serving approximately 30,000 student tablets, with around 8,000 daily active devices at peak.",
  highlights: [
    "Maintained and extended a shared React/TypeScript quiz-rendering library for eight question types, shipping versioned npm updates to student tablets, the question editor, and the teaching dashboard. Implemented answer restoration and review, preserving answer mappings when options were shuffled.",
    "Developed student tablet modules for homework, curriculum-aligned practice, and video-based learning. Integrated native classroom events through WebView for countdowns, early termination, and submission, with duplicate-submission guards and event-listener cleanup.",
    "Built teacher dashboard features for course schedules, daily rankings, homework assignment, and completion tracking, integrating REST APIs. Implemented assignments to classes, groups, and individuals with form validation, recipient deduplication, and draft restoration; persisted class selection while keeping it valid as available classes changed.",
    "Developed the React Native/Expo quiz module for an annual city-level English competition, supporting four question types and preview, listening, and answering stages. Coordinated sequential audio playback, countdowns, answer restoration, and timeout submission, releasing audio resources on screen exit.",
    "Built daily and weekly learning reports with Taro for parent and teacher WeChat Mini Programs. Transformed API data into ECharts visualizations, aligned weekly records, and handled missing daily entries."
  ],
  technologies: ["React + TypeScript", "React Native + Expo", "React WebView", "Taro + ECharts"],
  workAreas: [
    {
      title: "Student Tablet Experience",
      stack: "React · TypeScript · WebView",
      description: "Developed and maintained student learning modules for homework, curriculum-aligned practice, and playful learning. Supported watching instructional videos and answering eight common question types on tablets."
    },
    {
      title: "Teacher Dashboard",
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

export const quizLibrary = {
  title: "Shared npm quiz renderer.",
  description: "Maintained and extended a React component library, shipping versioned npm updates across the learning platform.",
  consumers: [
    { title: "Student tablets", description: "Practice & homework" },
    { title: "Question editor", description: "Interactive previews" },
    { title: "Teaching dashboard", description: "Student answer review" }
  ],
  contributions: [
    {
      title: "Package releases",
      description: "UI updates & bug fixes"
    },
    {
      title: "Question extensions",
      description: "New types & interactions"
    },
    {
      title: "Answer consistency",
      description: "Restore, shuffle & review"
    }
  ]
};

export const researchHighlight = {
  title: "Do You Actually Need an LLM? Rethinking Language Models for Customer Reviews Analysis",
  subtitle: "Master's capstone · Artificial Intelligence Review (Aug 2025)",
  period: "Jan 2024 - May 2024",
  links: {
    code: "https://github.com/yunke-l/CS7980-Capstone",
    poster: "/assets/pdf/slms-vs-llms-poster.pdf",
    paper: "https://link.springer.com/article/10.1007/s10462-025-11308-5"
  },
  highlights: [
    "Benchmarked distilBERT, ELECTRA, Flan-T5, and Flan-UL2 in PyTorch for sentiment classification and correlation tasks on customer reviews, comparing predictive performance and computational cost.",
    "Proposed a tiered SLM/LLM framework balancing accuracy and computational cost; co-authored the published study."
  ]
};
