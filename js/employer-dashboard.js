/* ==========================================================================
   JobPulse - Employer Dashboard, ATS Candidate Reviewer & HR Messaging Pipeline
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("employer-jobs-table")) {
    initEmployerDashboard();
  }
});

function initEmployerDashboard() {
  const user = AuthSystem.getCurrentUser();

  if (!user || user.role !== "employer") {
    AuthSystem.loginAsDemo("employer");
  }

  renderEmployerJobListings();
}

function renderEmployerJobListings() {
  const user = AuthSystem.getCurrentUser();
  const tableBody = document.getElementById("employer-jobs-tbody");
  const activeCountEl = document.getElementById("emp-active-jobs-count");
  const totalAppsCountEl = document.getElementById("emp-total-apps-count");

  if (!tableBody) return;

  const allJobs = JobRepository.getAll();
  const employerJobs = allJobs.filter(j => j.companyName === user.companyName || j.companyId === user.companyId || true);

  const activeJobs = employerJobs.filter(j => j.status === "active");
  const allApps = AuthSystem.getApplications();

  if (activeCountEl) activeCountEl.textContent = activeJobs.length;
  if (totalAppsCountEl) totalAppsCountEl.textContent = allApps.length;

  if (employerJobs.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align:center; padding:3rem 1rem; color:var(--text-muted);">
          No active job postings found.<br>
          <button onclick="openPostJobModal()" class="btn btn-primary btn-sm" style="margin-top:1rem;">Post Your First Job</button>
        </td>
      </tr>
    `;
    return;
  }

  tableBody.innerHTML = employerJobs.map(job => {
    const jobApps = AuthSystem.getApplicationsForJob(job.id);
    const isClosed = job.status === "closed" || job.status === "filled";

    return `
      <tr>
        <td>
          <div style="font-weight:800; font-size:0.95rem;">${job.title}</div>
          <div style="font-size:0.8rem; color:var(--text-muted);">${job.category} • ${job.location}</div>
        </td>
        <td>
          <span class="badge badge-primary">${job.workMode}</span>
          <span class="badge">${job.jobType}</span>
        </td>
        <td>
          <a href="javascript:void(0)" onclick="openATSModal('${job.id}')" style="font-weight:800; color:var(--primary); text-decoration:underline;">
            <i class="fa-solid fa-users"></i> ${jobApps.length} Applicants
          </a>
        </td>
        <td>${job.postedDate}</td>
        <td>
          <span class="status-pill ${isClosed ? 'status-rejected' : 'status-shortlisted'}">
            ${isClosed ? 'Filled / Closed' : 'Active'}
          </span>
        </td>
        <td>
          <div style="display:flex; gap:0.5rem;">
            <button onclick="openATSModal('${job.id}')" class="btn btn-primary btn-sm" title="Review Candidates ATS">
              <i class="fa-solid fa-user-check"></i> Review
            </button>
            <button onclick="toggleJobStatus('${job.id}')" class="btn btn-secondary btn-sm" title="Toggle Status">
              <i class="fa-solid fa-toggle-on"></i>
            </button>
            <button onclick="handleDeleteJob('${job.id}')" class="btn btn-secondary btn-sm" style="color:#ef4444;" title="Delete Listing">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join("");
}

// Modal actions
function openPostJobModal() {
  const modal = document.getElementById("post-job-modal");
  if (modal) modal.classList.add("show");
}

function closePostJobModal() {
  const modal = document.getElementById("post-job-modal");
  if (modal) modal.classList.remove("show");
}

function handleCreateJobSubmit(e) {
  e.preventDefault();
  const user = AuthSystem.getCurrentUser();

  const title = document.getElementById("job-form-title").value;
  const category = document.getElementById("job-form-category").value;
  const workMode = document.getElementById("job-form-workmode").value;
  const jobType = document.getElementById("job-form-jobtype").value;
  const experience = document.getElementById("job-form-experience").value;
  const location = document.getElementById("job-form-location").value;
  const salaryMin = parseInt(document.getElementById("job-form-salary-min").value, 10);
  const salaryMax = parseInt(document.getElementById("job-form-salary-max").value, 10);
  const description = document.getElementById("job-form-description").value;
  const reqsRaw = document.getElementById("job-form-requirements").value;
  const benefitsRaw = document.getElementById("job-form-benefits").value;

  JobRepository.createJob({
    title,
    companyId: user.companyId || "comp-01",
    companyName: user.companyName || "TechCorp Solutions",
    companyLogo: user.companyLogo || "https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=120",
    category,
    workMode,
    jobType,
    experience,
    location,
    salaryMin,
    salaryMax,
    description,
    requirements: reqsRaw.split("\n").filter(r => r.trim().length > 0),
    benefits: benefitsRaw.split("\n").filter(b => b.trim().length > 0),
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
  });

  closePostJobModal();
  showToast("New Job Listing posted successfully!", "success");
  renderEmployerJobListings();
}

function toggleJobStatus(jobId) {
  const job = JobRepository.getById(jobId);
  if (job) {
    const newStatus = job.status === "active" ? "closed" : "active";
    JobRepository.updateJob(jobId, { status: newStatus });
    showToast(`Job listing status updated to ${newStatus}.`, "success");
    renderEmployerJobListings();
  }
}

function handleDeleteJob(jobId) {
  if (confirm("Are you sure you want to delete this job listing?")) {
    JobRepository.deleteJob(jobId);
    showToast("Job listing deleted.", "error");
    renderEmployerJobListings();
  }
}

// ATS Candidate Reviewer Modal
function openATSModal(jobId) {
  const modal = document.getElementById("ats-candidates-modal");
  const job = JobRepository.getById(jobId);
  const apps = AuthSystem.getApplicationsForJob(jobId);
  
  if (!modal || !job) return;

  document.getElementById("ats-modal-job-title").textContent = `Candidates for ${job.title}`;
  const container = document.getElementById("ats-candidates-container");

  if (apps.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding:3rem 1rem; color:var(--text-muted);">
        <i class="fa-solid fa-user-clock" style="font-size:2.5rem; margin-bottom:1rem; display:block;"></i>
        No candidates have applied for this job yet.
      </div>
    `;
  } else {
    container.innerHTML = apps.map(app => `
      <div style="background:var(--body-bg); border:1px solid var(--border-color); border-radius:var(--radius-lg); padding:1.25rem; margin-bottom:1rem;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.75rem; flex-wrap:wrap; gap:0.5rem;">
          <div>
            <h4 style="font-size:1.15rem; font-weight:800; color:var(--text-main); margin-bottom:0.25rem;">${app.seekerName}</h4>
            <div style="font-size:0.85rem; color:var(--text-muted);">
              <i class="fa-solid fa-envelope"></i> ${app.seekerEmail} • <i class="fa-solid fa-phone"></i> ${app.seekerPhone}
            </div>
          </div>

          <div style="display:flex; align-items:center; gap:0.5rem;">
            <select onchange="handleUpdateCandidateStatus('${app.id}', this.value)" class="sort-select" style="font-weight:700;">
              <option value="Submitted" ${app.status === 'Submitted' ? 'selected' : ''}>Submitted</option>
              <option value="Under Review" ${app.status === 'Under Review' ? 'selected' : ''}>Under Review</option>
              <option value="Shortlisted" ${app.status === 'Shortlisted' ? 'selected' : ''}>Shortlisted</option>
              <option value="Interview Scheduled" ${app.status === 'Interview Scheduled' ? 'selected' : ''}>Interview Scheduled</option>
              <option value="Hired" ${app.status === 'Hired' ? 'selected' : ''}>Hired</option>
              <option value="Rejected" ${app.status === 'Rejected' ? 'selected' : ''}>Rejected</option>
            </select>
          </div>
        </div>

        <div style="font-size:0.9rem; margin-bottom:0.75rem; background:var(--card-bg); padding:0.75rem 1rem; border-radius:var(--radius-md); border:1px solid var(--border-color);">
          <strong>Cover Letter / Pitch:</strong><br>
          ${app.coverLetter || 'No cover letter provided.'}
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.75rem; font-size:0.85rem;">
          <div>
            <button onclick="openCandidateProfileModal('${app.seekerId || 'usr-seeker-01'}')" class="btn btn-outline btn-sm">
              <i class="fa-solid fa-id-card"></i> HR View Profile
            </button>
            <button onclick="openRecruiterChatModal('${app.id}', '${app.seekerName}')" class="btn btn-primary btn-sm">
              <i class="fa-solid fa-comments"></i> Chat with Candidate
            </button>
            <button onclick="openSendInterviewEmailModal('${app.id}')" class="btn btn-accent btn-sm">
              <i class="fa-solid fa-paper-plane"></i> Send Interview Email Call
            </button>
          </div>

          <div style="color:var(--text-muted);">
            <i class="fa-solid fa-file-pdf"></i> Attached: <strong>${app.resumeName || 'Resume.pdf'}</strong>
          </div>
        </div>
      </div>
    `).join("");
  }

  modal.classList.add("show");
}

function closeATSModal() {
  const modal = document.getElementById("ats-candidates-modal");
  if (modal) modal.classList.remove("show");
}

// Feature 2: View Candidate Full Profile Modal
function openCandidateProfileModal(seekerId) {
  let user = AuthSystem.getUserById(seekerId);
  if (!user) user = DEMO_SEEKER;

  let modal = document.getElementById("candidate-profile-modal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "candidate-profile-modal";
    modal.className = "modal-backdrop";
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="modal-content" style="max-width:620px;">
      <div class="modal-header">
        <h3 style="font-size:1.35rem; font-weight:800;">HR Candidate Profile Access</h3>
        <button onclick="document.getElementById('candidate-profile-modal').classList.remove('show')" class="modal-close">&times;</button>
      </div>

      <div style="display:flex; align-items:center; gap:1.25rem; margin-bottom:1.5rem;">
        <div style="width:4.5rem; height:4.5rem; border-radius:50%; background:var(--primary); color:#fff; display:flex; align-items:center; justify-content:center; font-size:2rem; font-weight:800;">
          ${user.fullName ? user.fullName.charAt(0).toUpperCase() : 'C'}
        </div>
        <div>
          <h3 style="font-size:1.4rem; font-weight:800; margin-bottom:0.2rem;">${user.fullName}</h3>
          <div style="font-weight:600; color:var(--primary); font-size:0.95rem;">${user.headline || 'Senior Full-Stack Developer'}</div>
          <div style="font-size:0.85rem; color:var(--text-muted); margin-top:0.2rem;">
            <i class="fa-solid fa-envelope"></i> ${user.email} • <i class="fa-solid fa-phone"></i> ${user.phone} • <i class="fa-solid fa-location-dot"></i> ${user.location || 'Bengaluru, India'}
          </div>
        </div>
      </div>

      <div style="margin-bottom:1.25rem;">
        <h4 style="font-size:0.95rem; font-weight:800; margin-bottom:0.5rem;">Verified Technical Skills:</h4>
        <div style="display:flex; flex-wrap:wrap; gap:0.5rem;">
          ${(user.skills || ["React.js", "Node.js", "TypeScript", "PostgreSQL", "Docker"]).map(s => `<span class="badge badge-primary"><i class="fa-solid fa-check"></i> ${s}</span>`).join("")}
        </div>
      </div>

      <div style="margin-bottom:1.5rem;">
        <h4 style="font-size:0.95rem; font-weight:800; margin-bottom:0.4rem;">Professional Bio & Summary:</h4>
        <p style="background:var(--body-bg); padding:0.85rem; border-radius:var(--radius-md); font-size:0.9rem; border:1px solid var(--border-color);">
          ${user.bio || 'Experienced software professional with strong expertise in web development, database architecture, and frontend UI design.'}
        </p>
      </div>

      <div style="display:flex; justify-content:flex-end;">
        <button onclick="document.getElementById('candidate-profile-modal').classList.remove('show')" class="btn btn-secondary">Close Profile</button>
      </div>
    </div>
  `;

  modal.classList.add("show");
}

// Feature 3: Send Interview Call Email Alert Modal
function openSendInterviewEmailModal(appId) {
  const apps = AuthSystem.getApplications();
  const app = apps.find(a => a.id === appId);
  if (!app) return;

  let modal = document.getElementById("interview-email-dispatch-modal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "interview-email-dispatch-modal";
    modal.className = "modal-backdrop";
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="modal-content" style="max-width:650px;">
      <div class="modal-header">
        <div>
          <h3 style="font-size:1.35rem; font-weight:800;">✉️ Dispatch Interview Call Letter</h3>
          <div style="font-size:0.85rem; color:var(--text-muted);">Recipient Email: <strong>${app.seekerEmail}</strong></div>
        </div>
        <button onclick="document.getElementById('interview-email-dispatch-modal').classList.remove('show')" class="modal-close">&times;</button>
      </div>

      <form onsubmit="handleSendInterviewEmailSubmit(event, '${app.id}')">
        <div class="form-group">
          <label class="form-label">Interview Date</label>
          <input type="date" id="email-int-date" class="form-control" required value="2026-10-14">
        </div>

        <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
          <div class="form-group">
            <label class="form-label">Interview Time</label>
            <input type="text" id="email-int-time" class="form-control" required value="11:00 AM IST">
          </div>

          <div class="form-group">
            <label class="form-label">Interview Mode / Platform</label>
            <select id="email-int-mode" class="form-control" required>
              <option value="Google Meet Video Call">Google Meet Video Call</option>
              <option value="Microsoft Teams">Microsoft Teams</option>
              <option value="On-Site Office Interview">On-Site Office Interview</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Meeting Link / Address</label>
          <input type="text" id="email-int-link" class="form-control" required value="https://meet.google.com/jobpulse-interview-${app.id}">
        </div>

        <div class="form-group">
          <label class="form-label">Email Message Preview</label>
          <div style="background:var(--body-bg); border:1px solid var(--border-color); padding:1rem; border-radius:var(--radius-md); font-size:0.88rem;">
            <strong>Subject: Congratulations! Interview Invitation for ${app.jobTitle} at TechCorp Solutions</strong><br><br>
            Dear ${app.seekerName},<br><br>
            We are pleased to inform you that your application for the <strong>${app.jobTitle}</strong> position has been shortlisted! We would like to invite you for an official interview.
          </div>
        </div>

        <div style="display:flex; justify-content:flex-end; gap:1rem; margin-top:1.5rem;">
          <button type="button" onclick="document.getElementById('interview-email-dispatch-modal').classList.remove('show')" class="btn btn-secondary">Cancel</button>
          <button type="submit" class="btn btn-accent"><i class="fa-solid fa-paper-plane"></i> Send Official Interview Email</button>
        </div>
      </form>
    </div>
  `;

  modal.classList.add("show");
}

function handleSendInterviewEmailSubmit(e, appId) {
  e.preventDefault();

  const date = document.getElementById("email-int-date").value;
  const time = document.getElementById("email-int-time").value;
  const mode = document.getElementById("email-int-mode").value;
  const link = document.getElementById("email-int-link").value;

  const user = AuthSystem.getCurrentUser();

  const interviewData = {
    date,
    time,
    mode,
    link,
    interviewer: user ? user.fullName : "HR Hiring Team"
  };

  AuthSystem.updateApplicationStatus(appId, "Interview Scheduled", "Interview call letter dispatched via email.", interviewData);

  document.getElementById("interview-email-dispatch-modal").classList.remove("show");
  showToast("Interview Email Call Letter dispatched to candidate's email!", "success");
  renderEmployerJobListings();
}

// Feature 1: Recruiter-Candidate In-App Live Messaging
function openRecruiterChatModal(appId, candidateName) {
  let modal = document.getElementById("recruiter-chat-modal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "recruiter-chat-modal";
    modal.className = "modal-backdrop";
    document.body.appendChild(modal);
  }

  const user = AuthSystem.getCurrentUser();
  const messages = AuthSystem.getMessagesForApp(appId);

  modal.innerHTML = `
    <div class="modal-content" style="max-width:550px; height:520px; display:flex; flex-direction:column; padding:0; overflow:hidden;">
      <div class="modal-header" style="background:#0f172a; color:#fff; padding:1rem 1.25rem; margin:0;">
        <div>
          <h3 style="font-size:1.1rem; font-weight:800; margin:0; color:#fff;"><i class="fa-solid fa-comments"></i> Chat with ${candidateName}</h3>
          <div style="font-size:0.75rem; color:#60a5fa;">Direct Candidate-Recruiter Communication Channel</div>
        </div>
        <button onclick="document.getElementById('recruiter-chat-modal').classList.remove('show')" class="modal-close" style="color:#fff;">&times;</button>
      </div>

      <div id="recruiter-chat-messages-body" style="flex:1; padding:1rem; overflow-y:auto; display:flex; flex-direction:column; gap:0.75rem; background:var(--body-bg);">
        ${messages.map(m => `
          <div style="max-width:80%; padding:0.75rem 1rem; border-radius:0.75rem; font-size:0.88rem; ${m.senderRole === 'employer' ? 'align-self:flex-end; background:#2563eb; color:#fff;' : 'align-self:flex-start; background:var(--card-bg); color:var(--text-main); border:1px solid var(--border-color);'}">
            <div style="font-size:0.75rem; font-weight:700; opacity:0.8; margin-bottom:0.2rem;">${m.senderName} (${m.timestamp})</div>
            ${m.text}
          </div>
        `).join("")}
      </div>

      <form onsubmit="handleSendRecruiterChatMessage(event, '${appId}')" style="display:flex; padding:0.75rem; background:var(--card-bg); border-top:1px solid var(--border-color); gap:0.5rem;">
        <input type="text" id="recruiter-chat-input" placeholder="Type a message to candidate..." required style="flex:1; border:1px solid var(--border-color); padding:0.6rem 0.85rem; border-radius:0.5rem; outline:none; background:var(--card-bg); color:var(--text-main);">
        <button type="submit" class="btn btn-primary"><i class="fa-solid fa-paper-plane"></i></button>
      </form>
    </div>
  `;

  modal.classList.add("show");
  const body = document.getElementById("recruiter-chat-messages-body");
  if (body) body.scrollTop = body.scrollHeight;
}

function handleSendRecruiterChatMessage(e, appId) {
  e.preventDefault();
  const input = document.getElementById("recruiter-chat-input");
  const text = input.value.trim();
  if (!text) return;

  const user = AuthSystem.getCurrentUser();
  const apps = AuthSystem.getApplications();
  const app = apps.find(a => a.id === appId);

  AuthSystem.sendMessage(appId, user.id, user.fullName || "HR Hiring Team", "employer", app ? app.seekerId : "usr-seeker-01", text);
  input.value = "";
  openRecruiterChatModal(appId, app ? app.seekerName : "Candidate");
}

function handleUpdateCandidateStatus(appId, newStatus) {
  if (newStatus === "Interview Scheduled" || newStatus === "Shortlisted") {
    openSendInterviewEmailModal(appId);
  } else {
    AuthSystem.updateApplicationStatus(appId, newStatus);
    showToast(`Candidate application status updated to '${newStatus}'!`, "success");
  }
}
