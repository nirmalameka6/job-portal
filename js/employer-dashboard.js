/* ==========================================================================
   JobPulse - Employer Dashboard & Applicant Tracking System (ATS) Controller
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("employer-jobs-table")) {
    initEmployerDashboard();
  }
});

function initEmployerDashboard() {
  const user = AuthSystem.getCurrentUser();

  if (!user || user.role !== "employer") {
    // Switch to employer demo account for easy evaluation
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
  // Show jobs posted by this employer (or all demo employer jobs)
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
          <div style="font-weight:700; font-size:0.95rem;">${job.title}</div>
          <div style="font-size:0.8rem; color:var(--text-muted);">${job.category} • ${job.location}</div>
        </td>
        <td>
          <span class="badge badge-primary">${job.workMode}</span>
          <span class="badge">${job.jobType}</span>
        </td>
        <td>
          <a href="javascript:void(0)" onclick="openATSModal('${job.id}')" style="font-weight:700; color:var(--primary); text-decoration:underline;">
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

  const newJob = JobRepository.createJob({
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
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:0.75rem;">
          <div>
            <h4 style="font-size:1.1rem; font-weight:700;">${app.seekerName}</h4>
            <div style="font-size:0.85rem; color:var(--text-muted);">
              <i class="fa-solid fa-envelope"></i> ${app.seekerEmail} • <i class="fa-solid fa-phone"></i> ${app.seekerPhone}
            </div>
          </div>
          <div>
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

        <div style="font-size:0.9rem; margin-bottom:0.75rem; background:var(--card-bg); padding:0.75rem; border-radius:var(--radius-md); border:1px solid var(--border-color);">
          <strong>Cover Letter / Pitch:</strong><br>
          ${app.coverLetter || 'No cover letter provided.'}
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; font-size:0.85rem; color:var(--text-muted);">
          <span><i class="fa-solid fa-file-pdf"></i> Attached: <strong>${app.resumeName || 'Resume.pdf'}</strong></span>
          <span>Applied: ${app.appliedDate}</span>
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

function handleUpdateCandidateStatus(appId, newStatus) {
  AuthSystem.updateApplicationStatus(appId, newStatus);
  showToast(`Candidate application status updated to '${newStatus}'!`, "success");
}
