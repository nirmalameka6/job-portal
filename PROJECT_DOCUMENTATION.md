# 💼 JobPulse Open Source Job Portal — Project Report

---

## 1. Cover Page

* **Project Title**: JobPulse — Open Source Job Portal Web Application
* **Student Name**: Nirmala Meka
* **Course Name**: Full Stack Web Development (FSD) Project 2
* **Instructor Name**: Course Evaluation Panel
* **Submission Date**: October 7, 2026
* **GitHub Repository**: [https://github.com/nirmalameka6/Open-Source-Job-Portal.git](https://github.com/nirmalameka6/Open-Source-Job-Portal.git)
* **Live Local Server Link**: `http://localhost:5000/index.html`

---

## 2. Introduction

**JobPulse** is an open-source, full-featured Job Portal Web Application built to connect job seekers with hiring companies. The platform empowers candidate discovery, multi-faceted job filtering, resume applications, candidate tracking pipelines, and recruiter job management.

### Project Goals & Objectives
- **Goal**: To construct an end-to-end open-source web application for job recruitment, providing seamless workflows for both job applicants and employers.
- **Objectives**:
  1. Build a job search catalog featuring **30+ realistic job listings** across 6+ major categories.
  2. Implement dual-role authentication (Job Seeker / Employer) with pre-filled evaluation demo accounts.
  3. Develop an Applicant Tracking System (ATS) for recruiters to evaluate candidate cover letters, inspect resumes, and update application statuses (`Submitted`, `Under Review`, `Shortlisted`, `Interview Scheduled`, `Hired`, `Rejected`).
  4. Ensure client-side data persistence with HTML5 Web Storage API (`localStorage`) and standard REST API data repositories.
  5. Provide dark mode theme persistence and mobile-first responsive layouts.

---

## 3. Project Structure

```
jobpulse-portal/
├── index.html              # Homepage with hero search, categories, and featured jobs
├── jobs.html               # Job catalog with multi-filters and sorting
├── job-details.html        # Detailed job view & application modal
├── seeker-dashboard.html   # Candidate application tracker & bookmarks
├── employer-dashboard.html # Employer job manager & ATS candidate reviewer
├── profile.html            # User & Company profile editor
├── login.html              # Dual-role authentication form
├── register.html           # Dual-role account creation form
│
├── css/
│   ├── style.css           # Core styling system, cards, forms, modals & badges
│   ├── responsive.css      # Breakpoints for mobile, tablet, and desktop
│   └── dark-mode.css       # Dark theme CSS variable overrides
│
├── js/
│   ├── jobs-data.js        # Seed dataset & JobRepository data API
│   ├── auth.js             # User authentication & session handling
│   ├── app.js              # Global navbar, dark mode & toast controller
│   ├── jobs.js             # Job catalog search, multi-filter & sorting engine
│   ├── job-details.js      # Job view renderer & application submission
│   ├── seeker-dashboard.js # Candidate application status tracker
│   ├── employer-dashboard.js # Employer job CRUD & ATS pipeline
│   └── profile.js          # Profile manager logic
│
├── README.md               # Project setup and overview documentation
└── PROJECT_DOCUMENTATION.md # Academic 10-point submission project report
```

---

## 4. Technical Stack

| Component | Technology |
|---|---|
| **Frontend Architecture** | HTML5, CSS3 (CSS Variables, Grid & Flexbox), JavaScript (ES6+ Vanilla) |
| **Typography & Icons** | FontAwesome 6.4.0 (CDN), Google Fonts (Inter) |
| **Data Storage API** | HTML5 `localStorage` & JSON Repositories |
| **Development Tools** | VS Code, Node.js (v24.21.0), `http-server` |
| **Version Control & Hosting** | Git, GitHub (`nirmalameka6/E-commerce-project`) |

---

## 5. Features and Functionalities

1. **Dual-Role Authentication**: Seamless login and registration with a role toggle for Candidates and Employers. One-click demo accounts (`seeker@jobpulse.com` & `employer@techcorp.com`).
2. **Multi-Faceted Job Search**: Search by keywords, category checkboxes, work mode, job type, salary range slider, and experience level.
3. **Direct Application Submission**: Application modal dialog allowing candidates to upload resumes and attach cover letters.
4. **Candidate Dashboard**: Real-time tracker displaying submitted application statuses (`Under Review`, `Shortlisted`, `Interview Scheduled`, `Hired`, `Rejected`) and saved job bookmarks.
5. **Employer Dashboard & ATS Pipeline**: Recruiters can post new jobs, toggle job availability ("Active" vs "Closed"), and review applicant cover letters and resumes with 1-click status updating.
6. **User Profile Editor**: Manage skills tags, professional headlines, contact information, and bios.
7. **Dark Theme & Responsive UI**: Theme toggle persistence and breakpoint scaling for mobile, tablet, and desktop viewports.

---

## 6. Screenshots and Visual Representation

```
+-------------------------------------------------------------------------+
| [Logo: JobPulse]   [ Home ] [ Find Jobs ] [ Candidate Portal ] [ Employer ] |
+-------------------------------------------------------------------------+
|                DISCOVER YOUR NEXT CAREER MILESTONE                      |
|  [ Search keyword... ] [ Select Category v ] [ Search Jobs Button ]     |
+-------------------------------------------------------------------------+
| JOB CATALOG                                                             |
| Filters (Category, Salary)  |  Senior Full-Stack Developer              |
| - [x] Software Development  |  TechCorp Solutions • Remote • ₹14L - ₹22L|
| - [x] UI/UX Design          |  [ Apply Now ]  [ Bookmark ❤️ ]           |
+-------------------------------------------------------------------------+
```

---

## 7. Database Structure & Data Schemas

### 1. Job Entity Schema (`jobpulse_jobs`)
```json
{
  "id": "job-101",
  "title": "Senior Full-Stack Developer",
  "companyName": "TechCorp Solutions",
  "category": "Software Development",
  "workMode": "Remote",
  "jobType": "Full-Time",
  "experience": "Senior Level",
  "location": "Bengaluru, India (Remote)",
  "salaryMin": 1400000,
  "salaryMax": 2200000,
  "description": "We are seeking a high-caliber Senior Full-Stack Engineer...",
  "requirements": ["5+ years experience with JS/TS", "Proficiency in REST APIs"],
  "benefits": ["100% Remote flexibility", "Comprehensive Health Insurance"],
  "postedDate": "2026-10-02",
  "deadline": "2026-10-31",
  "status": "active"
}
```

### 2. Application Entity Schema (`jobpulse_applications`)
```json
{
  "id": "app-101",
  "jobId": "job-101",
  "jobTitle": "Senior Full-Stack Developer",
  "companyName": "TechCorp Solutions",
  "seekerId": "usr-seeker-01",
  "seekerName": "Alex Morgan",
  "seekerEmail": "seeker@jobpulse.com",
  "seekerPhone": "+91 9876543210",
  "coverLetter": "I am excited to apply for this position...",
  "resumeName": "Alex_Morgan_Resume.pdf",
  "appliedDate": "2026-10-05",
  "status": "Shortlisted",
  "notes": "Great technical profile. Scheduled for round 1 interview."
}
```

---

## 8. Challenges Faced & Solutions

1. **Dual-Role Authorization & Route Access**:
   - *Challenge*: Ensuring candidates cannot access employer job creation modals and employers cannot submit job applications.
   - *Solution*: Implemented role guards in `js/auth.js` (`AuthSystem.getCurrentUser().role`), dynamically updating navigation elements and dashboard actions.

2. **Faceted Filter Synchronization**:
   - *Challenge*: Synchronizing multiple filter inputs (checkboxes, salary slider, sorting select) with keyword searches without page reloads.
   - *Solution*: Built a centralized `JobRepository.searchAndFilter()` method with debounced event handlers in `js/jobs.js`.

---

## 9. Conclusion

The **JobPulse Open Source Job Portal** project demonstrates a complete, production-grade web application connecting job seekers and employers. 

### Key Accomplishments:
- Successfully built dual-role authentication workflows and an Applicant Tracking System (ATS).
- Integrated multi-faceted searching, sorting, application submissions, and saved job bookmarks.
- Formatted clean open-source code and pushed the repository to GitHub.

---

## 10. GitHub Repository & Code Files

* **GitHub Repository Link**: [https://github.com/nirmalameka6/Open-Source-Job-Portal.git](https://github.com/nirmalameka6/Open-Source-Job-Portal.git)
* **Local Project Directory**: `C:\Users\Admin\.gemini\antigravity\scratch\jobpulse-portal\`
* **Compressed ZIP Submission File**: `C:\Users\Admin\.gemini\antigravity\scratch\jobpulse-portal.zip`
* **Live Local Server Link**: `http://localhost:5000/index.html`
