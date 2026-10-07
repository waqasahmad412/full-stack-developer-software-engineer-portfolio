export interface Project {
  id: string;
  name: string;
  category: 'AI & Automation' | 'Web Development' | 'Mobile Apps' | 'Desktop Applications' | 'Laravel & Backend';
  subCategory: string;
  description: string;
  longDescription: string;
  technologies: string[];
  status: 'In Development' | 'Portfolio Project' | 'Development Project';
  featured: boolean;
  image: string;
  features: string[];
  githubUrl?: string;
  demoUrl?: string;
  architectureHighlights?: string[];
}

export interface SkillItem {
  name: string;
  category: string;
  level: 'Core' | 'Proficient' | 'Exploring';
  focus: string;
  iconName: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  deliverables: string[];
  iconName: string;
}

export interface TimelineItem {
  id: string;
  period: string;
  title: string;
  organization: string;
  type: 'Education' | 'Learning Milestone' | 'Project Journey';
  description: string;
  highlights: string[];
}

export interface ProcessStep {
  step: string;
  number: string;
  title: string;
  description: string;
  activities: string[];
}

export const PERSONAL_INFO = {
  name: 'Waqas',
  tagline: "HELLO, I'M WAQAS",
  heading: 'Building Digital Experiences That Matter.',
  titles: [
    'Full-Stack Developer',
    'Flutter App Developer',
    'AI/ML Enthusiast',
    'Software Engineering Student',
  ],
  bio: 'I am Waqas, a passionate software developer focused on building modern web applications, mobile apps, and AI-powered digital solutions. I enjoy transforming creative ideas into functional, elegant, and user-friendly products.',
  secondaryBio: 'With a strong foundation in modern web technologies, Flutter mobile engineering, and AI automation, I develop clean software architectures and intuitive user experiences. Continuously learning and building software engineering solutions.',
  education: {
    institution: 'COMSATS University Islamabad, Sahiwal Campus',
    degree: 'Software Engineering',
    status: 'Enrolled / In Progress',
  },
  socials: {
    github: 'https://github.com/waqasahmad412',
    linkedin: 'https://www.linkedin.com/in/malik-waqas-a9a659403/',
    email: 'waqasahmad08766@gmail.com',
  },
  avatar: '/src/assets/images/waqas_profile_1791043702949.jpg',
  heroVisual: '/src/assets/images/hero_workspace_mesh_1790958555266.jpg',
};

export const HIGHLIGHT_CARDS = [
  {
    id: 'web',
    title: 'Web Development',
    description: 'Modern, component-driven web architectures utilizing React, TypeScript, Vite, and scalable backend APIs.',
    icon: 'Globe',
    accent: 'from-blue-500/20 to-cyan-500/10',
    border: 'border-blue-500/30',
  },
  {
    id: 'mobile',
    title: 'Mobile App Development',
    description: 'Cross-platform mobile applications crafted with Flutter, Dart, and responsive mobile interfaces.',
    icon: 'Smartphone',
    accent: 'from-cyan-500/20 to-teal-500/10',
    border: 'border-cyan-500/30',
  },
  {
    id: 'ai',
    title: 'AI & Automation',
    description: 'Integration of Gemini LLMs, intelligent agent logic, visual automation pipelines, and Python tooling.',
    icon: 'Sparkles',
    accent: 'from-purple-500/20 to-indigo-500/10',
    border: 'border-purple-500/30',
  },
  {
    id: 'problem_solving',
    title: 'Problem Solving',
    description: 'Translating complex requirements into systematic algorithms, clean data structures, and maintainable code.',
    icon: 'Cpu',
    accent: 'from-indigo-500/20 to-blue-500/10',
    border: 'border-indigo-500/30',
  },
];

export const SKILL_CATEGORIES = [
  'All Skills',
  'Programming Languages',
  'Frontend Development',
  'Backend Development',
  'Mobile App Development',
  'Databases & Services',
  'AI & Automation',
  'Development Tools',
] as const;

export const SKILLS_DATA: SkillItem[] = [
  // Programming Languages
  { name: 'Python', category: 'Programming Languages', level: 'Core', focus: 'AI scripting, automation, backend logic', iconName: 'Terminal' },
  { name: 'JavaScript', category: 'Programming Languages', level: 'Core', focus: 'ESNext, async patterns, DOM manipulation', iconName: 'Code2' },
  { name: 'TypeScript', category: 'Programming Languages', level: 'Core', focus: 'Strict types, interfaces, generics', iconName: 'FileCode2' },
  { name: 'Dart', category: 'Programming Languages', level: 'Proficient', focus: 'Flutter development, OOP, reactive state', iconName: 'Smartphone' },
  { name: 'PHP', category: 'Programming Languages', level: 'Proficient', focus: 'Server-side scripting, MVC backend systems', iconName: 'Server' },
  { name: 'SQL', category: 'Programming Languages', level: 'Core', focus: 'Relational querying, schema design, joins', iconName: 'Database' },

  // Frontend Development
  { name: 'React', category: 'Frontend Development', level: 'Core', focus: 'Hooks, custom state, component lifecycle', iconName: 'Atom' },
  { name: 'Next.js', category: 'Frontend Development', level: 'Proficient', focus: 'App router, SSR/SSG concepts, SEO', iconName: 'Layers' },
  { name: 'HTML5', category: 'Frontend Development', level: 'Core', focus: 'Semantic markup, accessibility, modern standards', iconName: 'Code' },
  { name: 'CSS3', category: 'Frontend Development', level: 'Core', focus: 'Flexbox, CSS Grid, animations, Tailwind', iconName: 'Palette' },

  // Backend Development
  { name: 'Node.js', category: 'Backend Development', level: 'Core', focus: 'Asynchronous event loops, REST servers', iconName: 'Server' },
  { name: 'Express.js', category: 'Backend Development', level: 'Core', focus: 'Middleware, routing, API architecture', iconName: 'Network' },
  { name: 'Laravel', category: 'Backend Development', level: 'Proficient', focus: 'Eloquent ORM, authentication, MVC', iconName: 'Boxes' },
  { name: 'REST APIs', category: 'Backend Development', level: 'Core', focus: 'Stateless endpoints, JSON serialization, auth headers', iconName: 'Workflow' },

  // Mobile App Development
  { name: 'Flutter', category: 'Mobile App Development', level: 'Core', focus: 'Widget trees, responsive layouts, animations', iconName: 'Smartphone' },
  { name: 'Firebase Mobile SDK', category: 'Mobile App Development', level: 'Core', focus: 'Firestore, auth, push notifications, storage', iconName: 'Flame' },

  // Databases and Backend Services
  { name: 'Firebase', category: 'Databases & Services', level: 'Core', focus: 'Firestore NoSQL, rules, real-time sync', iconName: 'Flame' },
  { name: 'Supabase', category: 'Databases & Services', level: 'Proficient', focus: 'Postgres backend, row-level security', iconName: 'Database' },
  { name: 'MySQL', category: 'Databases & Services', level: 'Core', focus: 'Relational storage, indexing, transactions', iconName: 'HardDrive' },

  // AI and Automation
  { name: 'Artificial Intelligence', category: 'AI & Automation', level: 'Core', focus: 'Machine learning fundamentals, predictive models', iconName: 'Brain' },
  { name: 'Generative AI Integration', category: 'AI & Automation', level: 'Core', focus: 'Google Gemini API, multimodal prompting, context windows', iconName: 'Sparkles' },
  { name: 'AI Automation Workflows', category: 'AI & Automation', level: 'Core', focus: 'DAG pipelines, visual node automation, webhooks', iconName: 'Workflow' },
  { name: 'Python Automation', category: 'AI & Automation', level: 'Core', focus: 'Data processing, scheduled scripts, file routines', iconName: 'Cpu' },

  // Development Tools
  { name: 'VS Code', category: 'Development Tools', level: 'Core', focus: 'Debugging, extension ecosystem, terminal tooling', iconName: 'Laptop' },
  { name: 'Git', category: 'Development Tools', level: 'Core', focus: 'Branching, merging, rebasing, versioning', iconName: 'GitBranch' },
  { name: 'GitHub', category: 'Development Tools', level: 'Core', focus: 'Repository hosting, collaborative reviews, CI/CD basics', iconName: 'Github' },
  { name: 'Postman', category: 'Development Tools', level: 'Core', focus: 'Endpoint testing, mocking, collection specs', iconName: 'Send' },
  { name: 'Android Emulator', category: 'Development Tools', level: 'Proficient', focus: 'Device testing, responsiveness, logcat analysis', iconName: 'Tablet' },
];

export const PROJECTS_DATA: Project[] = [
  {
    id: 'flowpilot-ai',
    name: 'FlowPilot AI',
    category: 'AI & Automation',
    subCategory: 'AI Automation Platform',
    description: 'An AI-powered workflow automation platform featuring a visual workflow builder, automation nodes, Gemini AI integration, and workflow management.',
    longDescription: 'FlowPilot AI is a comprehensive workflow engine engineered to empower developers and power users to construct visual multi-step automated execution pipelines. By linking input triggers, Gemini AI transformation nodes, external HTTP webhooks, and structured data sinks, it executes complex automation flows with real-time log tracking.',
    technologies: ['React', 'TypeScript', 'Vite', 'Express', 'Google Gemini API', 'Firebase', 'Firestore'],
    status: 'In Development',
    featured: true,
    image: '/src/assets/images/project_flowpilot_preview_1790958567725.jpg',
    features: [
      'Visual workflow builder with interactive node-link graph canvas',
      'AI-powered workflow nodes powered by Gemini API',
      'HTTP requests and external webhook ingestion',
      'Conditional branching logic and decision gates',
      'Google Sheets integration for data collection',
      'Gmail workflow notification and dispatch integration',
      'Pre-built industry workflow templates',
      'Live execution interface with step-by-step telemetry logs',
    ],
    architectureHighlights: [
      'State-driven DAG graph execution engine',
      'Zero-latency node parameter validation',
      'Secure credential proxy layer for API keys',
    ],
    githubUrl: 'https://github.com/waqasahmad412',
  },
  {
    id: 'eduportal-lms',
    name: 'EduPortal ERP & Academic LMS',
    category: 'Laravel & Backend',
    subCategory: 'Laravel / PHP Full-Stack System',
    description: 'A comprehensive academic ERP and learning management system built with Laravel, PHP, and MySQL featuring multi-role portals, course scheduling, and grading ledgers.',
    longDescription: 'EduPortal is a full-featured institutional management suite developed in Laravel. It handles administrative admissions, faculty course allocation, student gradebooks, automated fee invoice generation with DomPDF, and attendance audit tracking with strict Eloquent relations.',
    technologies: ['Laravel', 'PHP', 'MySQL', 'Blade', 'Tailwind CSS', 'REST APIs'],
    status: 'Portfolio Project',
    featured: true,
    image: '/src/assets/images/project_laravel_eduportal_1790960001564.jpg',
    features: [
      'Multi-role authentication guards (Admin, Faculty, Student, Bursar)',
      'Course syllabus distribution and assignment submission portal',
      'Dynamic GPA calculation engine and printable semester transcripts',
      'Automated student tuition fee vouchers with QR code verification',
      'Faculty biometric attendance logging and leave management',
      'Comprehensive REST API endpoints for external mobile integration',
    ],
    architectureHighlights: [
      'Repository-Service pattern isolating business logic from controllers',
      'Optimized MySQL indexing on enrollment records and transcripts',
      'Queue-backed email notification dispatch using Redis',
    ],
    githubUrl: 'https://github.com/waqasahmad412',
  },
  {
    id: 'quickcart-api',
    name: 'QuickCart Multi-Vendor E-Commerce',
    category: 'Laravel & Backend',
    subCategory: 'Laravel REST API & React Storefront',
    description: 'A scalable multi-vendor e-commerce platform with a high-performance Laravel RESTful API backend and a responsive React shopping storefront.',
    longDescription: 'QuickCart separates client presentation from commerce data using Laravel Sanctum for token authentication, MySQL transactional tables for order fulfillment, Stripe checkout webhooks, and Redis-cached catalog queries.',
    technologies: ['Laravel', 'PHP', 'React', 'TypeScript', 'MySQL', 'Stripe API'],
    status: 'Development Project',
    featured: true,
    image: '/src/assets/images/project_laravel_quickcart_1790960016963.jpg',
    features: [
      'Vendor management dashboard with inventory alert thresholds',
      'Token-based authentication with Laravel Sanctum',
      'Dynamic shopping cart with automated tax, discounts, and shipping logic',
      'Webhook-driven payment reconciliation via Stripe & PayPal',
      'Customer review system with verified purchase badges',
      'Search and filter pipeline with price range, brand, and rating filters',
    ],
    architectureHighlights: [
      'Database transactions ensuring atomic order placements',
      'Redis cache caching product collections to eliminate database bottlenecks',
      'Clean JSON:API standardized error and success envelopes',
    ],
    githubUrl: 'https://github.com/waqasahmad412',
  },
  {
    id: 'hospital-management',
    name: 'St. Jude Metropolitan Hospital Management System',
    category: 'Web Development',
    subCategory: 'Web Application',
    description: 'A modern hospital management web application with a professional interface and organized healthcare management experience.',
    longDescription: 'Engineered to streamline healthcare administration, this hospital management platform brings order to inpatient records, staff duty rosters, department allocations, and clinical appointment booking with high-contrast accessibility and data cleanliness.',
    technologies: ['React', 'TypeScript', 'Vite', 'CSS'],
    status: 'Portfolio Project',
    featured: true,
    image: '/src/assets/images/project_hospital_preview_1790958578821.jpg',
    features: [
      'Patient admissions and clinical profile directory',
      'Doctor appointment scheduling matrix with conflict prevention',
      'Departmental bed occupancy and wing monitoring',
      'Prescription tracking and pharmacy requisition log',
      'Role-tailored interfaces for administrative staff and triage units',
      'Filtered query system for swift medical record retrieval',
    ],
    architectureHighlights: [
      'Strict TypeScript data models for patient history',
      'Component modularity for rapid dashboard extensibility',
    ],
    githubUrl: 'https://github.com/waqasahmad412',
  },
  {
    id: 'aurelia-salon',
    name: 'Aurelia Luxury Salon & Beauty Studio',
    category: 'Web Development',
    subCategory: 'Business Website',
    description: 'A premium salon website featuring an elegant visual identity, modern layouts, and a luxury beauty studio experience.',
    longDescription: 'A high-end digital storefront designed for luxury wellness and beauty studios. It combines editorial visual rhythm, smooth treatment catalog browsing, stylist portfolios, and an integrated reservation inquiry flow.',
    technologies: ['React', 'TypeScript', 'Vite', 'CSS'],
    status: 'Portfolio Project',
    featured: false,
    image: '',
    features: [
      'Editorial services menu with detailed duration and price guides',
      'Master stylist showcase with specialized technique showcases',
      'Interactive date and time reservation booking request system',
      'High-fashion aesthetic with smooth micro-interactions',
      'Full responsive adaptation across desktop, tablet, and smartphone',
    ],
    architectureHighlights: [
      'Curated typography system with editorial contrast',
      'Lightweight bundle footprint for instant first-contentful paint',
    ],
    githubUrl: 'https://github.com/waqasahmad412',
  },
  {
    id: 'taskflow-pro',
    name: 'TaskFlow Pro — Agile Workspace',
    category: 'Web Development',
    subCategory: 'Next.js & TypeScript Web App',
    description: 'An agile task and sprint management tool with drag-and-drop Kanban boards, team role permissions, and milestone tracking.',
    longDescription: 'Engineered for developer teams, TaskFlow Pro features visual sprint planning, markdown task issue threads, tag filters, subtask completion meters, and real-time team collaboration.',
    technologies: ['Next.js', 'React', 'TypeScript', 'Node.js', 'Tailwind CSS'],
    status: 'Portfolio Project',
    featured: true,
    image: '',
    features: [
      'Drag-and-drop Kanban columns (Backlog, In Progress, Review, Done)',
      'Sprint burndown metrics and story point estimation',
      'Markdown-enabled task discussions with @mention syntax',
      'Custom tags, priority badges, and deadline indicators',
      'Member assignment matrix and activity audit feed',
    ],
    architectureHighlights: [
      'Optimistic UI state updates for immediate user tactile response',
      'Modular compound component architecture for boards and cards',
    ],
    githubUrl: 'https://github.com/waqasahmad412',
  },
  {
    id: 'foodhub',
    name: 'FoodHub',
    category: 'Mobile Apps',
    subCategory: 'Food Delivery Application',
    description: 'A modern food ordering application concept with restaurant discovery, search, categories, favorites, and a shopping cart.',
    longDescription: 'FoodHub is a Flutter mobile application built for seamless culinary discovery. It incorporates category-based filtering, custom item modifiers, an active cart manager, and Firebase data synchronization.',
    technologies: ['Flutter', 'Dart', 'Firebase'],
    status: 'Development Project',
    featured: true,
    image: '/src/assets/images/project_flutter_foodhub_1790960029170.jpg',
    features: [
      'Categorized food item explorer with dietary filter tags',
      'Interactive restaurant profile pages with review indicators',
      'Dynamic shopping cart state manager with total calculation',
      'Favorites bookmarking with real-time Firebase sync',
      'Order checkout simulation with delivery address picker',
    ],
    architectureHighlights: [
      'Provider / Riverpod state architecture pattern',
      'Responsive widget compositions for cross-device consistency',
    ],
    githubUrl: 'https://github.com/waqasahmad412',
  },
  {
    id: 'habitzen-mobile',
    name: 'HabitZen — Streak & Habit Tracker',
    category: 'Mobile Apps',
    subCategory: 'Flutter & Dart Mobile Application',
    description: 'A minimalist mobile habit tracker engineered with Flutter and Dart, featuring gamified streak mechanics and offline-first local Hive database storage.',
    longDescription: 'Designed with mindful aesthetics, HabitZen helps users maintain daily routines with interactive calendar heatmaps, motivational progress badges, scheduled push notifications, and zero-latency local state persistence.',
    technologies: ['Flutter', 'Dart', 'Hive DB', 'Firebase'],
    status: 'Portfolio Project',
    featured: true,
    image: '',
    features: [
      'Interactive habit streak calendar with GitHub-style activity heatmaps',
      'Custom habit cadence (Daily, Specific Days, Weekly targets)',
      'Streak freezing shields and milestone celebration animations',
      'Offline-first architecture with Hive encrypted key-value store',
      'Cloud sync option with Firebase Authentication and Firestore',
    ],
    architectureHighlights: [
      'Instantaneous local read/writes without blocking network delays',
      'Smooth Flutter implicit and explicit custom animations',
    ],
    githubUrl: 'https://github.com/waqasahmad412',
  },
  {
    id: 'cryptopulse-flutter',
    name: 'CryptoPulse Real-Time Tracker',
    category: 'Mobile Apps',
    subCategory: 'Flutter & WebSocket Mobile Application',
    description: 'A live cryptocurrency price tracking mobile app with real-time WebSocket ticker updates, candlestick charting, and portfolio calculation.',
    longDescription: 'CryptoPulse streams live market transactions via WebSocket channels into an optimized Flutter UI, providing interactive price change charts, customized price threshold alerts, and portfolio profit/loss computations.',
    technologies: ['Flutter', 'Dart', 'WebSockets', 'CoinGecko API'],
    status: 'Development Project',
    featured: false,
    image: '/src/assets/images/project_flutter_crypto_1790960047254.jpg',
    features: [
      'Sub-second live ticker streaming via bidirectional WebSockets',
      'Interactive candlestick and line charts with 24h volume metrics',
      'Personal crypto asset holding calculator with gain/loss tracking',
      'Custom push notifications on significant price spikes or dips',
      'Currency converter supporting USD, EUR, PKR, and GBP',
    ],
    architectureHighlights: [
      'StreamController and reactive streams for efficient frame rendering',
      'Clean repository pattern decoupling network sockets from UI widgets',
    ],
    githubUrl: 'https://github.com/waqasahmad412',
  },
  {
    id: 'smart-zameen',
    name: 'Smart Zameen',
    category: 'Mobile Apps',
    subCategory: 'Android Application',
    description: 'An Android application project developed using Kotlin, with a focus on mobile app functionality.',
    longDescription: 'Smart Zameen is a native Android project focused on property discovery and real estate cataloging. Built with modern Android architecture guidelines, it offers property filtering, geographic locality tagging, and high-performance native scrolling.',
    technologies: ['Kotlin', 'Android', 'Gradle'],
    status: 'Development Project',
    featured: false,
    image: '',
    features: [
      'Native Android UI with Material guidelines',
      'Property listing cards with area, price, and locality metrics',
      'Search filters by residential, commercial, and agricultural zoning',
      'Saved properties bookmarking with local persistence',
      'Direct inquiry dispatch mechanism for buyer-seller connection',
    ],
    architectureHighlights: [
      'Kotlin coroutines for non-blocking asynchronous list rendering',
      'Modular Gradle structure with separation of concerns',
    ],
    githubUrl: 'https://github.com/waqasahmad412',
  },
  {
    id: 'invitation-maker',
    name: 'Invitation Maker',
    category: 'Mobile Apps',
    subCategory: 'Android Application',
    description: 'A mobile invitation maker application project designed to create and manage digital invitations.',
    longDescription: 'A creative mobile design tool on Android allowing users to craft personalized invitations for ceremonies, conferences, and celebrations. Features dynamic text customization, template selection, and exportable digital invite cards.',
    technologies: ['Kotlin', 'Android', 'Gradle'],
    status: 'In Development',
    featured: false,
    image: '',
    features: [
      'Card template picker across wedding, birthday, and formal event types',
      'Text formatting with custom typography, font sizing, and palette controls',
      'Date, time, venue, and RSVP coordinate overlays',
      'Live card rendering viewport with pinch-to-zoom adjustment',
      'Card asset export and Android native sharing intent integration',
    ],
    architectureHighlights: [
      'Custom canvas rendering for rapid design preview generation',
      'Memory-efficient image caching and bitmap scaling',
    ],
    githubUrl: 'https://github.com/waqasahmad412',
  },
  {
    id: 'gym-management',
    name: 'Gym Management System',
    category: 'Mobile Apps',
    subCategory: 'Web / Mobile Application',
    description: 'A gym management system concept for managing members, attendance, workout plans, diet plans, payments, and progress.',
    longDescription: 'A multi-faceted health club management tool created with Flutter and Firebase. It tracks gym member enrollment, recurring dues, trainer-assigned workout regimens, caloric diet charts, and physical fitness milestone records.',
    technologies: ['Flutter', 'Dart', 'Firebase'],
    status: 'Development Project',
    featured: false,
    image: '',
    features: [
      'Member membership lifecycle and expiration monitoring',
      'QR/ID check-in attendance logging',
      'Custom workout split plan builder for personal trainers',
      'Dietary macro guideline trackers for athletes',
      'Membership fee payment tracking ledger',
    ],
    architectureHighlights: [
      'Multi-tenant data structure in Firestore',
      'Offline-first data caching for quick gym reception floor lookups',
    ],
    githubUrl: 'https://github.com/waqasahmad412',
  },
  {
    id: 'pydoc-analyzer',
    name: 'PyDoc Semantic Intelligence Engine',
    category: 'AI & Automation',
    subCategory: 'Python AI & Document Automation',
    description: 'A document intelligence pipeline that processes PDFs, technical manuals, and code documentation using Python and Google Gemini API for conversational Q&A.',
    longDescription: 'PyDoc extracts textual structures from complex document sets, chunks semantic paragraphs, and integrates Google Gemini API with vector similarity search for grounded conversational discovery with source page citations.',
    technologies: ['Python', 'Google Gemini API', 'FastAPI', 'LangChain', 'ChromaDB'],
    status: 'Development Project',
    featured: true,
    image: '',
    features: [
      'Automated PDF, DOCX, and Markdown parsing pipeline',
      'Semantic text chunking and vector embedding generation',
      'Context-grounded natural language Q&A using Google Gemini',
      'Inline source citations indicating exact paragraph origins',
      'High-speed async API endpoints developed in FastAPI',
    ],
    architectureHighlights: [
      'Asynchronous task processing preventing request timeouts on large files',
      'Local vector index caching for near-instant repeat lookups',
    ],
    githubUrl: 'https://github.com/waqasahmad412',
  },
  {
    id: 'autolead-scraper',
    name: 'AutoLead Automation & Harvester',
    category: 'AI & Automation',
    subCategory: 'Python Data Extraction Pipeline',
    description: 'An automated web scraping and data pipeline engineered in Python with Playwright and Pandas to extract, clean, and export structured business directories.',
    longDescription: 'AutoLead automates repetitive data harvesting workflows with headless browser control, concurrent request throttling, intelligent schema normalization, and automated export to Excel and CSV spreadsheets.',
    technologies: ['Python', 'Playwright', 'BeautifulSoup4', 'Pandas'],
    status: 'Portfolio Project',
    featured: false,
    image: '',
    features: [
      'Headless browser automation handling dynamic Single-Page-Apps',
      'Anti-detection throttling, user-agent rotation, and session management',
      'Data cleaning and regex normalization for phone numbers and emails',
      'Automated multi-sheet Excel export with formatting and summary stats',
      'CLI interface with progress indicators and error retry logs',
    ],
    architectureHighlights: [
      'Python generator pipelines minimizing memory consumption during large crawls',
      'Robust error handling preventing crawler interruption on network dropouts',
    ],
    githubUrl: 'https://github.com/waqasahmad412',
  },
  {
    id: 'jarvis-assistant',
    name: 'J.A.R.V.I.S AI Assistant',
    category: 'Desktop Applications',
    subCategory: 'AI Desktop Application',
    description: 'A Python-based desktop AI assistant concept with a custom interface and an interactive futuristic HUD.',
    longDescription: 'A desktop command hub engineered in Python featuring a futuristic Heads-Up Display (HUD) constructed with CustomTkinter. Capable of system utility automation, speech synthesis, weather queries, and intelligent conversational queries via integrated AI APIs.',
    technologies: ['Python', 'CustomTkinter', 'AI Integration'],
    status: 'Development Project',
    featured: false,
    image: '',
    features: [
      'Futuristic dark HUD layout with interactive status dials',
      'Voice input recognition and text-to-speech feedback',
      'Automated desktop shortcuts for app launch and web navigation',
      'Natural language question answering via LLM integration',
      'Real-time system resource (CPU, memory) telemetry graphs',
    ],
    architectureHighlights: [
      'Multithreaded architecture preventing GUI thread freezing',
      'Modular command dispatch system for rapid skill extensions',
    ],
    githubUrl: 'https://github.com/waqasahmad412',
  },
  {
    id: 'devsnippet-desktop',
    name: 'DevSnippet Hub Desktop Tool',
    category: 'Desktop Applications',
    subCategory: 'Cross-Platform Developer Desktop Utility',
    description: 'A desktop developer utility to organize code snippets, SQL queries, regex patterns, and API payloads with syntax highlighting and instant global hotkey search.',
    longDescription: 'DevSnippet provides software engineers with an offline snippet manager supporting instant keyboard-driven search, multi-language syntax formatting, tags, and one-touch clipboard copying.',
    technologies: ['Electron', 'React', 'TypeScript', 'SQLite'],
    status: 'Development Project',
    featured: false,
    image: '',
    features: [
      'Instant global keyboard hotkey toggle (Cmd/Ctrl + Shift + S)',
      'Syntax highlighting for 20+ programming languages',
      'SQLite encrypted local storage with lightning-fast full-text search',
      'Category tag manager and favorite bookmarks',
      'One-click formatted copy with temporary clipboard wiping option',
    ],
    architectureHighlights: [
      'Electron IPC communication with strictly typed channels',
      'Ultra-compact local database footprint',
    ],
    githubUrl: 'https://github.com/waqasahmad412',
  },
];

export const TIMELINE_DATA: TimelineItem[] = [
  {
    id: 'edu-comsats',
    period: 'Current Academic Focus',
    title: 'Software Engineering Degree Program',
    organization: 'COMSATS University Islamabad, Sahiwal Campus',
    type: 'Education',
    description: 'Rigorous academic curriculum covering software development life cycle, object-oriented analysis, algorithms, database systems, and collaborative engineering.',
    highlights: [
      'Core coursework in Data Structures, OOP, Software Design & Architecture',
      'Practical lab systems in Relational Databases, Web Technologies, and C++/Java/Python',
      'Team projects implementing standardized documentation and version control workflows',
    ],
  },
  {
    id: 'learn-web',
    period: 'Foundations & Mastery',
    title: 'Modern Web Development & React Architecture',
    organization: 'Self-Driven Engineering',
    type: 'Learning Milestone',
    description: 'Mastered frontend engineering with modern React, TypeScript, state orchestration, responsive Tailwind CSS layouts, and full-stack Express REST APIs.',
    highlights: [
      'Building performant single-page applications with clean component boundaries',
      'Implementing type-safe client-server interactions with proper error handling',
      'Architecting resilient state systems and accessible UI components',
    ],
  },
  {
    id: 'learn-flutter',
    period: 'Mobile Specialization',
    title: 'Flutter & Dart Cross-Platform Engineering',
    organization: 'Mobile App Specialization',
    type: 'Learning Milestone',
    description: 'Developed native-feel mobile applications targeting Android with Flutter, incorporating state management patterns and Firebase cloud backends.',
    highlights: [
      'Building reactive UIs with Dart and Flutter widget trees',
      'Integrating Firebase Authentication, Firestore databases, and device capabilities',
      'Exploring Kotlin native Android development with Gradle builds',
    ],
  },
  {
    id: 'learn-ai',
    period: 'Applied AI & Automation',
    title: 'Artificial Intelligence & Gemini Integration',
    organization: 'Specialized Exploration',
    type: 'Learning Milestone',
    description: 'Exploring machine learning concepts and engineering production AI integrations using Google Gemini API, automated Python workflows, and visual node architectures.',
    highlights: [
      'Prototyping FlowPilot AI: node-based automation orchestrator',
      'Crafting structured LLM prompt workflows and multi-modal integrations',
      'Developing desktop assistant prototypes and automation scripts in Python',
    ],
  },
  {
    id: 'projects-journey',
    period: 'Continuous Practice',
    title: 'Hands-on Software Development & Open Source',
    organization: 'Portfolio & Project Lab',
    type: 'Project Journey',
    description: 'Designing, building, and deploying real-world software products spanning healthcare management, food delivery, property exploration, and developer tools.',
    highlights: [
      '8+ multi-tier projects developed across web, mobile, and desktop environments',
      'Emphasis on readable, maintainable codebase architecture and human-centered UX',
      'Continuous iteration and learning across evolving software paradigms',
    ],
  },
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'website-dev',
    title: 'Website Development',
    description: 'Designing and building modern, high-speed, responsive websites that present your brand with elegance and structural clarity.',
    deliverables: [
      'Modern responsive layouts optimized for all screens',
      'Interactive user interfaces with smooth micro-interactions',
      'Professional landing pages with zero layout shifts',
      'Clean SEO structure and accessible semantics',
    ],
    iconName: 'Globe',
  },
  {
    id: 'frontend-dev',
    title: 'Frontend Development',
    description: 'Creating scalable, component-based frontend web applications using React, TypeScript, and modern styling libraries.',
    deliverables: [
      'React single-page applications with clean architecture',
      'Type-safe interfaces with strict TypeScript discipline',
      'State management, custom hooks, and API integration',
      'Tailwind CSS styling and fluid motion animations',
    ],
    iconName: 'Code2',
  },
  {
    id: 'flutter-dev',
    title: 'Flutter App Development',
    description: 'Developing polished cross-platform mobile apps for Android and iOS using Flutter and Dart with cloud backends.',
    deliverables: [
      'Cross-platform mobile application development',
      'Native-grade Flutter UI implementation and custom widgets',
      'Firebase integration (Auth, Firestore, Cloud Storage)',
      'Smooth navigation transitions and offline-ready states',
    ],
    iconName: 'Smartphone',
  },
  {
    id: 'backend-dev',
    title: 'Backend Development',
    description: 'Architecting reliable REST APIs and server-side logic using Node.js, Express, and structured databases.',
    deliverables: [
      'Stateless REST API development and JSON contract design',
      'Database integration with MySQL, Supabase, and Firestore',
      'Backend application architecture and route handlers',
      'Input validation, authentication, and error handling',
    ],
    iconName: 'Server',
  },
  {
    id: 'ai-integration',
    title: 'AI Integration',
    description: 'Infusing digital products with modern generative AI capabilities via the Google Gemini API and automated logic pipelines.',
    deliverables: [
      'Google Gemini API integration for text, reasoning, and multimodal inputs',
      'AI-powered application features (summarizers, generators, extractors)',
      'Workflow automation concepts and visual execution nodes',
      'Python automation scripts for data transformation',
    ],
    iconName: 'Sparkles',
  },
  {
    id: 'ui-implementation',
    title: 'UI Implementation',
    description: 'Translating design concepts and mockups into pixel-accurate, responsive, and accessible interactive interfaces.',
    deliverables: [
      'Converting visual designs into responsive code',
      'Interactive components and micro-interaction states',
      'Performance optimization and light/dark theme adaptation',
      'Cross-browser fidelity and smooth scrolling experiences',
    ],
    iconName: 'Palette',
  },
];

export const WORK_PROCESS_STEPS: ProcessStep[] = [
  {
    step: 'Step 1',
    number: '01',
    title: 'Discover',
    description: 'Understand the requirements, identify the core problem statement, evaluate technical constraints, and define tangible project goals.',
    activities: [
      'Requirement gathering & feature scoping',
      'Architecture & technology stack selection',
      'Data modeling and component flow diagramming',
    ],
  },
  {
    step: 'Step 2',
    number: '02',
    title: 'Design',
    description: 'Plan the user experience, wireframe interface layouts, structure navigation hierarchies, and establish a consistent visual design system.',
    activities: [
      'User journey mapping & screen layouts',
      'Design tokens (typography, color palettes, spacing math)',
      'Component contract specifications',
    ],
  },
  {
    step: 'Step 3',
    number: '03',
    title: 'Develop',
    description: 'Build the application using suitable technologies, modular components, clean code principles, and rigorous type safety.',
    activities: [
      'Writing maintainable, modular React/Flutter/Node code',
      'Integrating API endpoints and database models',
      'Implementing responsive layouts and polished animations',
    ],
  },
  {
    step: 'Step 4',
    number: '04',
    title: 'Improve',
    description: 'Test, optimize performance, debug edge cases, ensure accessibility compliance, and continuously refine the final product.',
    activities: [
      'Cross-browser and multi-screen testing',
      'Performance audits and asset optimization',
      'Polishing user feedback states and documentation',
    ],
  },
];
