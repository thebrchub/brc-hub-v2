export interface Project {
  id: string;
  title: string;
  category: "SaaS" | "Web" | "App" | "Design";
  client: string;
  timeline: string;
  description: string;
  fullDescription: string;
  challenge: string;
  solution: string;
  results: string[];
  stack: string[];
  image: string;      // Main Thumbnail for Home Page
  gallery?: string[]; // Array of images for Case Study carousel
  liveUrl?: string;   // Link for live websites
}


// Creates: ["/portfolio/graphics/1.webp", "/portfolio/graphics/2.webp", ... "/portfolio/graphics/21.webp"]
const graphicGallery = Array.from({ length: 17 }, (_, i) => `/portfolio/graphics/${i + 1}.webp`);

export const projects: Project[] = [
  // --- FEATURED SAAS ---
  {
    id: "itat-analyser",
    title: "LawWise ITAT Analyser",
    category: "SaaS",
    client: "Sanket Milind Joshi & Co.",
    timeline: "3 Weeks", 
    description: "AI-powered legal scraper & summarizer for tax professionals.",
    fullDescription: "We developed a web-based SaaS platform that automates the ingestion, analysis, and reporting of tax tribunal orders. By leveraging BRC HUB’s proprietary 'Benk-Y Architecture', we bypassed the need for building a scraping engine from scratch.",
    challenge: "Chartered Accountants were spending hundreds of hours manually reading complex PDF orders. They needed to eliminate manual reading and standardize unstructured data.",
    solution: "We engineered the 'Benk-Y' Kernel to normalize binary data from PDFs into readable text, then integrated Google Gemini AI to semantically identify legal entities.",
    results: [
      "Reduced analysis time by 95% (20m to <30s)",
      "Delivered in 2 Weeks",
      "Zero manual data entry required"
    ],
    stack: ["React (Vite)", "Node.js", "Benk-Y Engine", "Gemini AI", "Tailwind"],
    image: "/portfolio/itat.webp",
    gallery: [
        "/portfolio/lawwise/1.webp", 
        "/portfolio/lawwise/2.webp", 
        "/portfolio/lawwise/3.webp",  
        "/portfolio/lawwise/4.webp"
    ]
  },

  // --- WEB (Has Live Link) ---
  {
    id: "powerbird",
    title: "Powerbird Elevators",
    category: "Web",
    client: "Powerbird Elevators",
    timeline: "3 Weeks", 
    description: "Premium animated website for a vertical mobility leader.",
    fullDescription: "A high-end corporate website featuring an immersive 'Lift Intro' animation, interactive product showcases, and a dark-themed premium UI. Built to reflect the engineering precision of Powerbird Elevators.",
    challenge: "The client needed a distinct digital identity to stand out from traditional, static competitor sites.",
    solution: "We engineered a custom React application with complex Framer Motion animations, a unique preloader, and a responsive glassmorphism design.",
    results: ["Enhanced Brand Image", "Increased Service Inquiries"],
    stack: ["React", "Tailwind CSS", "Framer Motion"],
    image: "/portfolio/powerbird/thumb.webp",
    gallery: [
        "/portfolio/powerbird/1.webp",
        "/portfolio/powerbird/2.webp", 
        "/portfolio/powerbird/3.webp",  
        "/portfolio/powerbird/4.webp",
        "/portfolio/powerbird/5.webp"
    ],
    liveUrl: "https://powerbird-elevators.brchub.me/" 
  },

  // --- WEB (Has Live Link) ---
  {
    id: "byxbyte-web",
    title: "Byxbyte Media",
    category: "Web",
    timeline: "3 Weeks", 
    client: "Byxbyte Media",
    description: "High-performance corporate site along with appointment system.",
    fullDescription: "A complete rebrand and digital presence for a top legal firm.",
    challenge: "Old site was slow and non-responsive.",
    solution: "Next.js site optimized for SEO and performance.",
    results: ["40% Traffic Increase", "Doubled lead generation"],
    stack: ["Next.js", "Tailwind", "Framer Motion"],
    image: "/portfolio/byxbyte/thumb.webp",
    gallery: [
        "/portfolio/byxbyte/1.webp", 
        "/portfolio/byxbyte/2.webp", 
        "/portfolio/byxbyte/3.webp",  
        "/portfolio/byxbyte/4.webp",
        "/portfolio/byxbyte/5.webp",
        "/portfolio/byxbyte/6.webp",
    ],
    liveUrl: "https://byxbytemedia.brchub.me/" 
  },

  // --- APPS ---
  // --- APPS ---
  {
    id: "payzo",
    title: "Payzo",
    category: "App",
    client: "BRC Hub (Internal)",
    timeline: "Under Development", 
    description: "Smart expense tracker & credit card offer optimizer.",
    fullDescription: "An intelligent financial companion designed to maximize savings. Payzo tracks daily expenses and manages credit card portfolios. Its standout feature is the 'Best Card Finder': users can paste product links from Amazon, Flipkart, or Snapdeal, and the app instantly analyzes valid bank offers to suggest which saved credit card provides the maximum discount.",
    challenge: "Real-time parsing of dynamic bank offers across multiple e-commerce platforms and mapping them accurately to user-specific cards.",
    solution: "Developed a cross-platform Flutter app with a Java backend that aggregates live offer data and runs a comparison algorithm to calculate the lowest net effective price.",
    results: ["Expense Tracking Module Ready", "Offer Engine Logic Finalized"],
    stack: ["Flutter", "Java", "Automation"], 
    image: "/portfolio/payzo/thumb.webp",
    gallery: [
        "/portfolio/payzo/1.webp", 
        "/portfolio/payzo/2.webp", 
    ]
  },

  // --- DESIGN (Kept as is) ---
  {
    id: "graphic-design-portfolio",
    title: "Graphic Designing",
    category: "Design",
    client: "Multiple Brands & Startups",
    timeline: "Ongoing Retainer", 
    description: "High-impact visuals: Social Media, Ads, & Brand Identity.",
    fullDescription: "A curated collection of our best graphic design work across various industries. From high-energy social media creatives to professional corporate branding, we ensure every pixel serves a business purpose.",
    challenge: "Brands struggle to capture attention in a saturated market.",
    solution: "We combine design psychology with marketing strategy.",
    results: ["Delivered 100+ Creatives", "High CTR on Ad Campaigns"],
    stack: ["Photoshop", "Illustrator", "Figma", "Canva"],
    image: "/portfolio/graphics/thumb.webp",
    gallery: graphicGallery 
  },

  // --- NON-FEATURED WEB PROJECTS ---

  {
    id: "legalvala",
    title: "LVC LegalVala",
    category: "Web",
    client: "LVC LegalVala Consultancy LLP",
    timeline: "3 Weeks",
    description: "Corporate site for an Agra-based legal consultancy.",
    fullDescription: "A professional digital presence for a leading legal firm in Agra, streamlining client inquiries and service showcasing.",
    challenge: "Client needed a fast, SEO-friendly site to capture local search traffic.",
    solution: "Custom website built with vanilla JavaScript for maximum performance.",
    results: ["Increased Local Inquiries", "Fast Page Load Speeds"],
    stack: ["JavaScript", "HTML", "CSS"],
    image: "/portfolio/nonfeature/legalvala.webp",
    liveUrl: "https://legalvala.com"
  },

  {
    id: "quantacel",
    title: "Quantacel",
    category: "Web",
    client: "Orvexa Softech Pvt Ltd",
    timeline: "1 Week",
    description: "Product showcase website.",
    fullDescription: "A dedicated landing page and website for Quantacel, a product by Orvexa Softech.",
    challenge: "Launching a product site within a tight deadline.",
    solution: "Rapid development using React to ensure a modern, responsive UI.",
    results: ["Launched on Schedule", "Mobile Responsive"],
    stack: ["React", "JavaScript", "Tailwind"],
    image: "/portfolio/nonfeature/quantacel.webp",
    liveUrl: "https://orvexa.brchub.me/"
  },

  {
    id: "digivala",
    title: "Digivala LLP",
    category: "Web",
    client: "Digivala LLP",
    timeline: "2 Weeks",
    description: "Agency website for a digital marketing firm.",
    fullDescription: "A vibrant website for Digivala, a sub-company of LegalVala focused on digital growth.",
    challenge: "Creating a distinct brand identity separate from the parent legal firm.",
    solution: "Clean, lightweight website using pure HTML/CSS.",
    results: ["Brand Identity Established"],
    stack: ["HTML", "CSS"],
    image: "/portfolio/nonfeature/digivala.webp",
    liveUrl: "https://digivala.in/"
  },

  {
    id: "if",
    title: "Industrial Forge",
    category: "Web",
    client: "Internal Demo Project",
    timeline: "2 Weeks",
    description: "Industrial sector demo website.",
    fullDescription: "A concept website designed to showcase our capability in building robust sites for manufacturing and industrial clients.",
    challenge: "Demonstrating design versatility for heavy industries.",
    solution: "Standard semantic HTML structure with custom styling.",
    results: ["Added to Portfolio"],
    stack: ["HTML", "CSS"],
    image: "/portfolio/nonfeature/if.webp",
    liveUrl: "https://industrialforge.brchub.me/"
  },

  {
    id: "gita-app",
    title: "Gita Path App",
    category: "App",
    client: "BRC Hub (Internal)",
    timeline: "Under Development",
    description: "Spiritual app for reading the Bhagavad Gita (Under Development).",
    fullDescription: "An internal project focused on making spiritual texts accessible via mobile with a clean, distraction-free UI.",
    challenge: "Handling large text databases and ensuring smooth scrolling/reading experience.",
    solution: "Cross-platform development using Flutter backed by Java.",
    results: ["UI/UX Finalized"],
    stack: ["Flutter", "Java"],
    image: "/portfolio/nonfeature/gita.webp"
  }
];