# 💼 JobPulse — Open Source Job Portal Web Application

JobPulse is an open-source, full-featured Job Portal Web Application connecting Job Seekers with Employers and Recruiters. The platform includes dual-role authentication, live job search with multi-faceted filtering, direct job application submissions, candidate application tracking, employer job posting wizards, and an Applicant Tracking System (ATS) candidate evaluation pipeline.

---

## ✨ Features & Modules

### 1. 🔍 Job Search Engine & Multi-Filtering
- Live keyword search across titles, skills, and companies.
- Multi-checkbox filters for Category, Work Mode (Remote, Hybrid, On-site), and Job Type (Full-Time, Part-Time, Contract, Internship).
- Interactive salary range slider.
- Sorting options (Latest Posted, Salary High to Low, Salary Low to High).
- Live search auto-suggestions dropdown.

### 2. 👥 Dual-Role User Registration & Authentication
- Separate registration and login workflows for **Job Seekers** and **Employers**.
- Pre-configured demo login buttons for evaluation:
  - Candidate Demo: `seeker@jobpulse.com`
  - Employer Demo: `employer@techcorp.com`
- Session persistence via HTML5 Web Storage (`localStorage`).

### 3. 🎯 Candidate Portal (Job Seeker Dashboard)
- Real-time application tracker with status pipeline badges:
  - `Submitted` ➔ `Under Review` ➔ `Shortlisted` ➔ `Interview Scheduled` ➔ `Hired` / `Rejected`
- Saved Jobs / Bookmarks manager.
- One-click application withdrawal.

### 4. 🏢 Employer Hiring Portal & ATS Pipeline
- Employer Job Manager: Active listings table with edit, delete, and mark filled actions.
- Post New Job Wizard: Form to create listings with title, category, work mode, salary, description, and requirements.
- Applicant Tracking System (ATS): Candidate reviewer modal to inspect applicant cover letters, contact details, attached resumes, and update candidate statuses in 1 click.

### 5. 🎨 Design & Accessibility
- Responsive design tailored for Desktop (1440px), Tablet (768px), and Mobile (375px).
- Dark Mode toggle with `localStorage` preference saving.
- Toast notifications system for user actions.

---

## 📁 Directory Structure

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

## 🚀 How to Run the Project Locally

1. Clone or download the repository:
   ```bash
   git clone https://github.com/nirmalameka6/Open-Source-Job-Portal.git
   ```
2. Open `index.html` directly in any web browser, or launch a local web server:
   ```bash
   npx http-server . -p 5000
   ```
3. Access the portal at `http://localhost:5000/index.html`.

---

## 📜 License & Open Source Contribution

This project is open-source and licensed under the [MIT License](LICENSE). Contributions, pull requests, and feature suggestions are welcome!
