/* ==========================================================================
   JobPulse - Seed Job Dataset & JobRepository API
   ========================================================================== */

const SEED_JOBS = [
  {
    id: "job-101",
    title: "Senior Full-Stack Developer (React & Node)",
    companyId: "comp-01",
    companyName: "TechCorp Solutions",
    companyLogo: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=120",
    category: "Software Development",
    jobType: "Full-Time",
    workMode: "Remote",
    experience: "Senior Level",
    location: "Bengaluru, India (Remote)",
    salaryMin: 1400000,
    salaryMax: 2200000,
    salaryPeriod: "yr",
    description: "We are seeking a high-caliber Senior Full-Stack Engineer to architect, build, and deploy cloud-native scalable microservices and intuitive React dashboards.",
    requirements: [
      "5+ years of software development experience using JavaScript/TypeScript, React, and Node.js.",
      "Hands-on experience with PostgreSQL or MongoDB database design and query optimization.",
      "Familiarity with AWS cloud services (Lambda, S3, ECS) and Docker containerization.",
      "Strong understanding of RESTful API architecture and WebSockets."
    ],
    benefits: [
      "100% Remote flexibility",
      "Competitive annual bonus & ESOPs",
      "Comprehensive Health & Dental Insurance",
      "Annual $1,500 Learning & Home Office Stipend"
    ],
    postedDate: "2026-10-02",
    deadline: "2026-10-31",
    status: "active",
    applicantsCount: 18
  },
  {
    id: "job-102",
    title: "Lead UI/UX Product Designer",
    companyId: "comp-02",
    companyName: "DesignCraft Studios",
    companyLogo: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=120",
    category: "Design",
    jobType: "Full-Time",
    workMode: "Hybrid",
    experience: "Mid Level",
    location: "Mumbai, India",
    salaryMin: 900000,
    salaryMax: 1500000,
    salaryPeriod: "yr",
    description: "DesignCraft is looking for an experienced UI/UX Product Designer to shape end-to-end user journeys, wireframes, and design systems for client SaaS platforms.",
    requirements: [
      "3+ years experience designing mobile and web application interfaces using Figma.",
      "Proven track record creating design systems, interactive prototypes, and usability testing.",
      "Strong portfolio demonstrating user-centered design processes.",
      "Understanding of HTML/CSS capabilities and mobile-first design principles."
    ],
    benefits: [
      "Hybrid work schedule (2 days office / 3 days remote)",
      "MacBook Pro M3 provided",
      "Health Insurance coverage",
      "Flexible working hours"
    ],
    postedDate: "2026-10-04",
    deadline: "2026-11-05",
    status: "active",
    applicantsCount: 12
  },
  {
    id: "job-103",
    title: "Data Scientist & AI Specialist",
    companyId: "comp-03",
    companyName: "DataPulse Analytics",
    companyLogo: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=120",
    category: "Data Science",
    jobType: "Full-Time",
    workMode: "Remote",
    experience: "Senior Level",
    location: "Hyderabad, India (Remote)",
    salaryMin: 1600000,
    salaryMax: 2600000,
    salaryPeriod: "yr",
    description: "Join DataPulse to build predictive machine learning models, LLM fine-tuning pipelines, and automated business analytics engines.",
    requirements: [
      "Master's or Bachelor's in Computer Science, Statistics, or related technical field.",
      "4+ years building ML models using Python (PyTorch, TensorFlow, Scikit-Learn).",
      "Experience deploying ML pipelines to production with FastAPI and Docker.",
      "Proficiency in SQL, Pandas, and big data processing."
    ],
    benefits: [
      "Global remote team environment",
      "Generous equity stock option plan",
      "Health & Wellness monthly allowance"
    ],
    postedDate: "2026-10-01",
    deadline: "2026-10-28",
    status: "active",
    applicantsCount: 24
  },
  {
    id: "job-104",
    title: "Digital Growth Marketing Manager",
    companyId: "comp-04",
    companyName: "Apex Digital Agency",
    companyLogo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=120",
    category: "Marketing",
    jobType: "Full-Time",
    workMode: "On-Site",
    experience: "Mid Level",
    location: "Gurugram, India",
    salaryMin: 700000,
    salaryMax: 1100000,
    salaryPeriod: "yr",
    description: "Lead multi-channel performance marketing campaigns (Google Ads, Meta Ads, SEO, Content Marketing) to drive B2B customer acquisition.",
    requirements: [
      "3+ years managing performance ad budgets ($50k+/month).",
      "Proficiency with Google Analytics 4, Hubspot CRM, and A/B testing tools.",
      "Strong analytical mindset and conversion rate optimization (CRO) skills."
    ],
    benefits: [
      "Performance performance bonuses up to 30%",
      "In-office catering & gym membership",
      "Career growth fast track"
    ],
    postedDate: "2026-10-05",
    deadline: "2026-11-10",
    status: "active",
    applicantsCount: 9
  },
  {
    id: "job-105",
    title: "DevOps & Cloud Infrastructure Engineer",
    companyId: "comp-01",
    companyName: "TechCorp Solutions",
    companyLogo: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=120",
    category: "Software Development",
    jobType: "Full-Time",
    workMode: "Remote",
    experience: "Senior Level",
    location: "Pune, India (Remote)",
    salaryMin: 1500000,
    salaryMax: 2400000,
    salaryPeriod: "yr",
    description: "Manage zero-downtime CI/CD deployment pipelines, Terraform IaC configurations, and Kubernetes cluster management on AWS.",
    requirements: [
      "4+ years DevOps experience with Kubernetes, Docker, and Terraform.",
      "Strong scripting skills in Bash, Python, or Go.",
      "Expertise in Prometheus/Grafana monitoring and security hardening."
    ],
    benefits: [
      "Flexible work schedule",
      "Full medical coverage for family",
      "Latest M3 Max laptop"
    ],
    postedDate: "2026-10-03",
    deadline: "2026-11-01",
    status: "active",
    applicantsCount: 15
  },
  {
    id: "job-106",
    title: "Senior Product Manager - Fintech",
    companyId: "comp-05",
    companyName: "FinPay Global",
    companyLogo: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=120",
    category: "Product Management",
    jobType: "Full-Time",
    workMode: "Hybrid",
    experience: "Senior Level",
    location: "Bengaluru, India",
    salaryMin: 2000000,
    salaryMax: 3200000,
    salaryPeriod: "yr",
    description: "Own the product roadmap for payment gateway integrations, UPI merchant processing, and risk management modules.",
    requirements: [
      "5+ years Product Management experience in Fintech or Payments domain.",
      "Proven record launching products with 1M+ active users.",
      "Strong technical literacy and data-driven prioritization skills."
    ],
    benefits: [
      "Top-tier industry compensation & stock options",
      "Annual international retreat",
      "Comprehensive medical package"
    ],
    postedDate: "2026-09-28",
    deadline: "2026-10-25",
    status: "active",
    applicantsCount: 31
  },
  {
    id: "job-107",
    title: "Frontend Developer (React.js & Tailwind)",
    companyId: "comp-02",
    companyName: "DesignCraft Studios",
    companyLogo: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=120",
    category: "Software Development",
    jobType: "Full-Time",
    workMode: "Remote",
    experience: "Entry Level",
    location: "Chennai, India (Remote)",
    salaryMin: 500000,
    salaryMax: 800000,
    salaryPeriod: "yr",
    description: "We are seeking a enthusiastic Frontend Developer to turn UI mocks into pixel-perfect, accessible React components.",
    requirements: [
      "1-2 years experience with Modern JavaScript, React.js, and CSS/Tailwind.",
      "Strong understanding of responsive layouts and cross-browser compatibility.",
      "Familiarity with REST APIs and Git version control."
    ],
    benefits: [
      "Mentorship from Senior Engineers",
      "Remote work stipend",
      "Health insurance"
    ],
    postedDate: "2026-10-06",
    deadline: "2026-11-15",
    status: "active",
    applicantsCount: 42
  },
  {
    id: "job-108",
    title: "Human Resources (HR) Operations Lead",
    companyId: "comp-04",
    companyName: "Apex Digital Agency",
    companyLogo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=120",
    category: "Human Resources",
    jobType: "Full-Time",
    workMode: "On-Site",
    experience: "Mid Level",
    location: "Delhi NCR, India",
    salaryMin: 650000,
    salaryMax: 950000,
    salaryPeriod: "yr",
    description: "Oversee talent acquisition, employee onboarding, payroll compliance, and team engagement initiatives.",
    requirements: [
      "3+ years experience in HR management or tech talent acquisition.",
      "In-depth knowledge of Indian labor laws and compliance requirements.",
      "Excellent interpersonal and conflict resolution skills."
    ],
    benefits: [
      "Annual performance bonus",
      "In-house cafeteria perks",
      "Medical insurance"
    ],
    postedDate: "2026-10-03",
    deadline: "2026-11-02",
    status: "active",
    applicantsCount: 11
  }
];

class JobRepository {
  static KEY = "jobpulse_jobs";
  static BOOKMARKS_KEY = "jobpulse_bookmarks";

  static init() {
    if (!localStorage.getItem(this.KEY)) {
      localStorage.setItem(this.KEY, JSON.stringify(SEED_JOBS));
    }
    if (!localStorage.getItem(this.BOOKMARKS_KEY)) {
      localStorage.setItem(this.BOOKMARKS_KEY, JSON.stringify([]));
    }
  }

  static getAll() {
    this.init();
    return JSON.parse(localStorage.getItem(this.KEY)) || [];
  }

  static getById(id) {
    const jobs = this.getAll();
    return jobs.find(j => j.id === id) || null;
  }

  static searchAndFilter(options = {}) {
    let jobs = this.getAll();

    const { keyword, category, workMode, jobType, experience, minSalary, sort } = options;

    if (keyword) {
      const q = keyword.toLowerCase().trim();
      jobs = jobs.filter(j => 
        j.title.toLowerCase().includes(q) ||
        j.companyName.toLowerCase().includes(q) ||
        j.category.toLowerCase().includes(q) ||
        j.location.toLowerCase().includes(q) ||
        (j.requirements && j.requirements.some(req => req.toLowerCase().includes(q)))
      );
    }

    if (category && category.length > 0 && !category.includes("All")) {
      jobs = jobs.filter(j => category.includes(j.category));
    }

    if (workMode && workMode.length > 0 && !workMode.includes("All")) {
      jobs = jobs.filter(j => workMode.includes(j.workMode));
    }

    if (jobType && jobType.length > 0 && !jobType.includes("All")) {
      jobs = jobs.filter(j => jobType.includes(j.jobType));
    }

    if (experience && experience !== "All") {
      jobs = jobs.filter(j => j.experience === experience);
    }

    if (minSalary && minSalary > 0) {
      jobs = jobs.filter(j => j.salaryMax >= minSalary);
    }

    // Sorting
    if (sort === "salary-desc") {
      jobs.sort((a, b) => b.salaryMax - a.salaryMax);
    } else if (sort === "salary-asc") {
      jobs.sort((a, b) => a.salaryMin - b.salaryMin);
    } else if (sort === "latest") {
      jobs.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
    }

    return jobs;
  }

  static createJob(jobData) {
    const jobs = this.getAll();
    const newJob = {
      id: "job-" + Date.now(),
      applicantsCount: 0,
      postedDate: new Date().toISOString().split("T")[0],
      status: "active",
      ...jobData
    };
    jobs.unshift(newJob);
    localStorage.setItem(this.KEY, JSON.stringify(jobs));
    return newJob;
  }

  static updateJob(id, updatedFields) {
    const jobs = this.getAll();
    const index = jobs.findIndex(j => j.id === id);
    if (index !== -1) {
      jobs[index] = { ...jobs[index], ...updatedFields };
      localStorage.setItem(this.KEY, JSON.stringify(jobs));
      return jobs[index];
    }
    return null;
  }

  static deleteJob(id) {
    let jobs = this.getAll();
    jobs = jobs.filter(j => j.id !== id);
    localStorage.setItem(this.KEY, JSON.stringify(jobs));
  }

  // Bookmark actions
  static getBookmarks() {
    this.init();
    return JSON.parse(localStorage.getItem(this.BOOKMARKS_KEY)) || [];
  }

  static toggleBookmark(jobId) {
    let bookmarks = this.getBookmarks();
    if (bookmarks.includes(jobId)) {
      bookmarks = bookmarks.filter(id => id !== jobId);
    } else {
      bookmarks.push(jobId);
    }
    localStorage.setItem(this.BOOKMARKS_KEY, JSON.stringify(bookmarks));
    return bookmarks.includes(jobId);
  }

  static isBookmarked(jobId) {
    const bookmarks = this.getBookmarks();
    return bookmarks.includes(jobId);
  }
}

// Auto init on load
JobRepository.init();
