/* ==========================================================================
   JobPulse - User Authentication & Session Management System
   ========================================================================== */

const DEMO_SEEKER = {
  id: "usr-seeker-01",
  fullName: "Alex Morgan",
  email: "seeker@jobpulse.com",
  role: "seeker",
  phone: "+91 9876543210",
  headline: "Senior Full-Stack Software Developer",
  location: "Bengaluru, India",
  skills: ["JavaScript", "TypeScript", "React.js", "Node.js", "PostgreSQL", "Docker", "Tailwind CSS"],
  resumeName: "Alex_Morgan_Resume.pdf",
  bio: "Experienced Web Developer with 4+ years of expertise building high-performance web applications and REST APIs."
};

const DEMO_EMPLOYER = {
  id: "usr-employer-01",
  fullName: "Sarah Jenkins",
  email: "employer@techcorp.com",
  role: "employer",
  phone: "+91 9123456789",
  companyId: "comp-01",
  companyName: "TechCorp Solutions",
  companyLogo: "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=120",
  industry: "Information Technology & Services",
  website: "https://techcorp.example.com",
  location: "Bengaluru, India"
};

const SEED_APPLICATIONS = [
  {
    id: "app-101",
    jobId: "job-101",
    jobTitle: "Senior Full-Stack Developer (React & Node)",
    companyName: "TechCorp Solutions",
    seekerId: "usr-seeker-01",
    seekerName: "Alex Morgan",
    seekerEmail: "seeker@jobpulse.com",
    seekerPhone: "+91 9876543210",
    coverLetter: "I am excited to apply for the Senior Full-Stack Developer position. I have over 4 years of hands-on experience building scalable applications using React, Node.js, and PostgreSQL.",
    resumeName: "Alex_Morgan_Resume.pdf",
    appliedDate: "2026-10-05",
    status: "Shortlisted",
    notes: "Great technical profile. Scheduled for round 1 interview."
  },
  {
    id: "app-102",
    jobId: "job-103",
    jobTitle: "Data Scientist & AI Specialist",
    companyName: "DataPulse Analytics",
    seekerId: "usr-seeker-01",
    seekerName: "Alex Morgan",
    seekerEmail: "seeker@jobpulse.com",
    seekerPhone: "+91 9876543210",
    coverLetter: "Applying for the Data Scientist role. My background includes ML modeling in Python.",
    resumeName: "Alex_Morgan_Resume.pdf",
    appliedDate: "2026-10-04",
    status: "Under Review",
    notes: "Reviewing resume portfolio."
  }
];

class AuthSystem {
  static USER_KEY = "jobpulse_current_user";
  static USERS_DB_KEY = "jobpulse_users_db";
  static APPS_KEY = "jobpulse_applications";

  static init() {
    if (!localStorage.getItem(this.USERS_DB_KEY)) {
      localStorage.setItem(this.USERS_DB_KEY, JSON.stringify([DEMO_SEEKER, DEMO_EMPLOYER]));
    }
    if (!localStorage.getItem(this.APPS_KEY)) {
      localStorage.setItem(this.APPS_KEY, JSON.stringify(SEED_APPLICATIONS));
    }
    // Default to candidate demo user if non logged in
    if (!localStorage.getItem(this.USER_KEY)) {
      localStorage.setItem(this.USER_KEY, JSON.stringify(DEMO_SEEKER));
    }
  }

  static getCurrentUser() {
    this.init();
    return JSON.parse(localStorage.getItem(this.USER_KEY));
  }

  static login(email, password, role) {
    this.init();
    const users = JSON.parse(localStorage.getItem(this.USERS_DB_KEY)) || [];
    let user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      // Create user on the fly if new email
      user = {
        id: "usr-" + Date.now(),
        fullName: email.split("@")[0].replace(".", " "),
        email: email,
        role: role || "seeker",
        skills: ["JavaScript", "HTML", "CSS"],
        resumeName: "Resume.pdf"
      };
      users.push(user);
      localStorage.setItem(this.USERS_DB_KEY, JSON.stringify(users));
    }

    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    return user;
  }

  static loginAsDemo(role) {
    const user = role === "employer" ? DEMO_EMPLOYER : DEMO_SEEKER;
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    return user;
  }

  static register(userData) {
    this.init();
    const users = JSON.parse(localStorage.getItem(this.USERS_DB_KEY)) || [];
    const newUser = {
      id: "usr-" + Date.now(),
      skills: ["JavaScript", "HTML", "CSS"],
      resumeName: "Resume.pdf",
      ...userData
    };
    users.push(newUser);
    localStorage.setItem(this.USERS_DB_KEY, JSON.stringify(users));
    localStorage.setItem(this.USER_KEY, JSON.stringify(newUser));
    return newUser;
  }

  static updateUserProfile(updatedFields) {
    let currentUser = this.getCurrentUser();
    currentUser = { ...currentUser, ...updatedFields };
    localStorage.setItem(this.USER_KEY, JSON.stringify(currentUser));

    const users = JSON.parse(localStorage.getItem(this.USERS_DB_KEY)) || [];
    const index = users.findIndex(u => u.id === currentUser.id);
    if (index !== -1) {
      users[index] = currentUser;
      localStorage.setItem(this.USERS_DB_KEY, JSON.stringify(users));
    }
    return currentUser;
  }

  static logout() {
    localStorage.removeItem(this.USER_KEY);
    window.location.href = "login.html";
  }

  // Application Actions
  static getApplications() {
    this.init();
    return JSON.parse(localStorage.getItem(this.APPS_KEY)) || [];
  }

  static getApplicationsForSeeker(seekerId) {
    const apps = this.getApplications();
    return apps.filter(a => a.seekerId === seekerId);
  }

  static getApplicationsForJob(jobId) {
    const apps = this.getApplications();
    return apps.filter(a => a.jobId === jobId);
  }

  static submitApplication(appData) {
    const apps = this.getApplications();
    const newApp = {
      id: "app-" + Date.now(),
      appliedDate: new Date().toISOString().split("T")[0],
      status: "Submitted",
      notes: "Application received.",
      ...appData
    };
    apps.unshift(newApp);
    localStorage.setItem(this.APPS_KEY, JSON.stringify(apps));

    // Increment applicantsCount on job
    if (typeof JobRepository !== "undefined") {
      const job = JobRepository.getById(appData.jobId);
      if (job) {
        JobRepository.updateJob(job.id, { applicantsCount: (job.applicantsCount || 0) + 1 });
      }
    }

    return newApp;
  }

  static updateApplicationStatus(appId, status, notes = "") {
    const apps = this.getApplications();
    const index = apps.findIndex(a => a.id === appId);
    if (index !== -1) {
      apps[index].status = status;
      if (notes) apps[index].notes = notes;
      localStorage.setItem(this.APPS_KEY, JSON.stringify(apps));
      return apps[index];
    }
    return null;
  }

  static withdrawApplication(appId) {
    let apps = this.getApplications();
    apps = apps.filter(a => a.id !== appId);
    localStorage.setItem(this.APPS_KEY, JSON.stringify(apps));
  }
}

// Auto init on load
AuthSystem.init();
