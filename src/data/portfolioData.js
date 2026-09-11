export const personalInfo = {
  name: "Raghav Tiwari",
  title: "Software Engineer",
  roles: [
    "Software Engineer",
    "Full-Stack Developer",
    "Backend Developer",
    "Java Developer",
  ],
  tagline: "Software Engineer building web applications, backend services and developer-focused products.",
  email: "raghavtiwari0077@gmail.com",
  phone: "+91-8529846231",
  location: "India",
  education: {
    degree: "B.Tech in Electronics and Communication Engineering",
    institution: "",
    year: "",
  },
  about: `I am a Software Engineer with internship experience in web applications and backend services. I specialize in building robust backend systems, REST APIs, and full-stack web applications. My core strengths include Core Java, Object-Oriented Programming, SQL, JavaScript, React.js, and Data Structures & Algorithms. I am passionate about creating efficient, scalable solutions and continuously improving my technical skills.`,
}

export const socialLinks = {
  github: "https://github.com/RaghavTiwari-7",
  linkedin: "https://www.linkedin.com/in/raghavtiwari07/",
  leetcode: "https://leetcode.com/u/Raghavt07/",
  email: "mailto:raghavtiwari0077@gmail.com",
  phone: "tel:+91-8529846231",
}

export const experience = [
  {
    id: 1,
    company: "Tech Jose",
    role: "MERN Stack Intern",
    duration: "Oct 2025 – Dec 2025",
    responsibilities: [
      "Developed and maintained full-stack web applications using the MERN stack (MongoDB, Express.js, React.js, Node.js)",
      "Built RESTful APIs and integrated them with frontend components",
      "Implemented authentication and authorization mechanisms using JWT",
      "Collaborated with the development team to deliver features on time",
      "Optimized database queries and improved application performance",
    ],
    technologies: ["MongoDB", "Express.js", "React.js", "Node.js", "JWT", "REST APIs"],
  },
  {
    id: 2,
    company: "Celebal Technologies",
    role: "Node.js Intern",
    duration: "Jun 2025 – Aug 2025",
    responsibilities: [
      "Developed backend services and APIs using Node.js and Express.js",
      "Worked with databases to design schemas and manage data efficiently",
      "Implemented middleware for request validation and error handling",
      "Participated in code reviews and followed best practices for clean code",
      "Gained hands-on experience with server-side development and deployment",
    ],
    technologies: ["Node.js", "Express.js", "JavaScript", "REST APIs", "Database Design"],
  },
]

export const skills = {
  languages: [
    { name: "Java", icon: "java" },
    { name: "JavaScript", icon: "javascript" },
    { name: "SQL", icon: "database" },
    { name: "C/C++", icon: "code" },
  ],
  backend: [
    { name: "Node.js", icon: "nodejs" },
    { name: "Express.js", icon: "server" },
    { name: "REST APIs", icon: "api" },
    { name: "Spring Boot", icon: "spring" },
  ],
  frontend: [
    { name: "HTML5", icon: "html5" },
    { name: "CSS3", icon: "css3" },
    { name: "JavaScript", icon: "javascript" },
    { name: "React.js", icon: "react" },
    { name: "Tailwind CSS", icon: "tailwind" },
    { name: "Bootstrap", icon: "bootstrap" },
  ],
  database: [
    { name: "MongoDB", icon: "mongodb" },
    { name: "PostgreSQL", icon: "postgresql" },
  ],
  tools: [
    { name: "Git", icon: "git" },
    { name: "GitHub", icon: "github" },
    { name: "VS Code", icon: "vscode" },
    { name: "Postman", icon: "postman" },
  ],
  cloud: [
    { name: "AWS", icon: "aws" },
    { name: "Render", icon: "cloud" },
    { name: "Vercel", icon: "vercel" },
  ],
  coreCS: [
    { name: "Data Structures", icon: "structure" },
    { name: "Algorithms", icon: "algorithm" },
    { name: "Low-Level Design", icon: "design" },
    { name: "OOPS", icon: "oop" },
    { name: "Operating Systems", icon: "os" },
    { name: "DBMS", icon: "dbms" },
    { name: "Computer Networks", icon: "network" },
  ],
  realTime: [
    { name: "WebSockets", icon: "websocket" },
    { name: "Socket.io", icon: "socket" },
  ],
  softSkills: [
    { name: "Communication", icon: "communication" },
    { name: "Team Collaboration", icon: "team" },
    { name: "Adaptability", icon: "adapt" },
    { name: "Quick Learning", icon: "learn" },
    { name: "Attention to Detail", icon: "detail" },
  ],
}

export const projects = [
  {
    id: 1,
    number: "01",
    name: "TIFFIN HUB",
    description: "A marketplace platform connecting users with local tiffin providers for meal discovery and subscriptions.",
    technologies: ["React.js", "Node.js", "Express.js", "PostgreSQL", "JWT"],
    features: [
      "JWT-based authentication with secure token management",
      "Role-based authorization for users and tiffin providers",
      "PostgreSQL database with optimized schema design",
      "Robust backend services with RESTful API architecture",
      "Responsive React frontend with intuitive user interface",
    ],
    githubUrl: "https://github.com/RaghavTiwari-7/Tiffin-hub",
    liveUrl: "https://tiffin-hub-omega.vercel.app/",
  },
  {
    id: 2,
    number: "02",
    name: "INTERVIEW PREP AI",
    description: "An AI-powered interview preparation platform providing personalized question sets, real-time feedback, and performance analytics.",
    technologies: ["MongoDB", "Express.js", "React.js", "Node.js", "JWT"],
    features: [
      "REST APIs for seamless data communication",
      "JWT authentication for secure user sessions",
      "MongoDB database for flexible data storage",
      "User and interview data management system",
      "Interactive frontend for interview practice",
    ],
    githubUrl: "https://github.com/RaghavTiwari-7/Interview-PrepAI",
    liveUrl: "https://interview-prep-ai-sigma.vercel.app/",
  },
  {
    id: 3,
    number: "03",
    name: "AI Code Review",
    description: "AI-powered tool that analyzes GitHub PRs to detect bugs, security issues, and code-quality problems. (Coming Soon)",
    technologies: ["AI", "GitHub API", "Node.js", "React.js"],
    features: [
      "Automated bug and security issue detection",
      "Code-quality analysis on GitHub Pull Requests",
      "Seamless GitHub integration",
    ],
    githubUrl: "#",
    liveUrl: "#",
    comingSoon: true,
  },
  {
    id: 4,
    number: "04",
    name: "FlowForge",
    description: "Zapier-style workflow automation platform that connects apps through triggers, actions, and webhooks. (Coming Soon)",
    technologies: ["Node.js", "Express.js", "React.js", "Webhooks", "MongoDB"],
    features: [
      "Create complex workflows with triggers and actions",
      "Webhook integration for real-time events",
      "Intuitive drag-and-drop workflow builder",
    ],
    githubUrl: "#",
    liveUrl: "#",
    comingSoon: true,
  },
  {
    id: 5,
    number: "05",
    name: "MoneyOS",
    description: "Unified dashboard to manage multiple bank accounts, expenses, bills, and financial activity. (Coming Soon)",
    technologies: ["React.js", "Node.js", "Plaid API", "PostgreSQL"],
    features: [
      "Track expenses and bills in one place",
      "Multi-bank account syncing",
      "Financial activity visualization and reporting",
    ],
    githubUrl: "#",
    liveUrl: "#",
    comingSoon: true,
  },
  {
    id: 6,
    number: "06",
    name: "TradeLab",
    description: "Virtual stock-trading and strategy backtesting platform for testing investment/trading strategies. (Coming Soon)",
    technologies: ["React.js", "Python", "Node.js", "Stock Market APIs"],
    features: [
      "Virtual portfolio management",
      "Backtest trading strategies with historical data",
      "Real-time market data integration",
    ],
    githubUrl: "#",
    liveUrl: "#",
    comingSoon: true,
  },
  {
    id: 7,
    number: "07",
    name: "KnowledgeGraph AI",
    description: "AI-powered platform converting articles/PDFs into an interconnected knowledge graph with semantic search and personalized quizzes. (Coming Soon)",
    technologies: ["Python", "React.js", "Vector DB", "LLMs", "Node.js"],
    features: [
      "Convert documents into knowledge graphs",
      "Semantic search capabilities",
      "Adaptive learning and personalized quizzes",
    ],
    githubUrl: "#",
    liveUrl: "#",
    comingSoon: true,
  },
]

export const freelanceProjects = [
  {
    id: 1,
    number: "01",
    name: "Hug Bug Cakery",
    description: "Customer-facing product catalog, enquiry/order, and business website for a real bakery. (Coming Soon)",
    technologies: ["React.js", "Node.js", "Tailwind CSS", "MongoDB"],
    features: [
      "Interactive product catalog",
      "Online enquiry and order placement",
      "Responsive and modern bakery website design",
    ],
    githubUrl: "#",
    liveUrl: "#",
    comingSoon: true,
  },
]

export const achievements = [
  {
    id: 1,
    number: "300+",
    label: "Algorithmic Problems Solved",
    description: "Solved 300+ problems on LeetCode, GeeksforGeeks, and other competitive programming platforms",
  },
  {
    id: 2,
    number: "160-Day",
    label: "GeeksforGeeks DSA Challenge",
    description: "Completed the 160-Day Data Structures and Algorithms challenge on GeeksforGeeks",
  },
  {
    id: 3,
    number: "Hackathon",
    label: "Participation",
    description: "Active participant in coding hackathons and competitive programming events",
  },
]

export const resumeInfo = {
  fileName: "RT_resume.pdf",
  fileUrl: "https://drive.google.com/file/d/1SGi4_yIu_itZUs2UiN2Gp5VEQNZlZLjE/view?usp=sharing",
}
