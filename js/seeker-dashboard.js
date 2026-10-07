/* ==========================================================================
   JobPulse - Job Seeker Candidate Dashboard Controller
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("seeker-applications-table")) {
    initSeekerDashboard();
  }
});

function initSeekerDashboard() {
  const user = AuthSystem.getCurrentUser();
  
  if (!user || user.role !== "seeker") {
    // Switch to seeker demo account for easy evaluation
    AuthSystem.loginAsDemo("seeker");
  }

  renderSeekerApplications();
  renderSeekerBookmarks();
}

function renderSeekerApplications() {
  const user = AuthSystem.getCurrentUser();
  const tableBody = document.getElementById("seeker-applications-tbody");
  const countEl = document.getElementById("seeker-apps-count");

  if (!tableBody) return;

  const applications = AuthSystem.getApplicationsForSeeker(user.id);

  if (countEl) countEl.textContent = applications.length;

  if (applications.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="5" style="text-align:center; padding:3rem 1rem; color:var(--text-muted);">
          <i class="fa-solid fa-folder-open" style="font-size:2.5rem; margin-bottom:1rem; display:block;"></i>
          You haven't submitted any job applications yet.<br>
          <a href="jobs.html" class="btn btn-primary btn-sm" style="margin-top:1rem;">Explore Job Listings</a>
        </td>
      </tr>
    `;
    return;
  }

  tableBody.innerHTML = applications.map(app => {
    let statusClass = "status-submitted";
    if (app.status === "Under Review") statusClass = "status-review";
    if (app.status === "Shortlisted") statusClass = "status-shortlisted";
    if (app.status === "Interview Scheduled" || app.status === "Interview") statusClass = "status-interview";
    if (app.status === "Hired") statusClass = "status-hired";
    if (app.status === "Rejected") statusClass = "status-rejected";

    return `
      <tr>
        <td>
          <div style="font-weight:700; font-size:0.95rem;">${app.jobTitle}</div>
          <div style="font-size:0.8rem; color:var(--text-muted);">${app.companyName}</div>
        </td>
        <td>${app.appliedDate}</td>
        <td>
          <span class="status-pill ${statusClass}">
            <i class="fa-solid fa-circle" style="font-size:0.4rem;"></i> ${app.status}
          </span>
        </td>
        <td>
          <div style="font-size:0.85rem; color:var(--text-muted); max-width:220px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;" title="${app.notes || ''}">
            ${app.notes || 'In Progress'}
          </div>
        </td>
        <td>
          <button onclick="handleWithdrawApp('${app.id}')" class="btn btn-secondary btn-sm" style="color:#ef4444;" title="Withdraw Application">
            <i class="fa-solid fa-trash"></i> Withdraw
          </button>
        </td>
      </tr>
    `;
  }).join("");
}

function renderSeekerBookmarks() {
  const container = document.getElementById("seeker-bookmarks-grid");
  if (!container) return;

  const bookmarkIds = JobRepository.getBookmarks();
  const allJobs = JobRepository.getAll();
  const bookmarkedJobs = allJobs.filter(j => bookmarkIds.includes(j.id));

  if (bookmarkedJobs.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
        <i class="fa-regular fa-bookmark" style="font-size: 2.5rem; margin-bottom: 1rem; display: block;"></i>
        No saved job bookmarks yet. Click the bookmark icon on any job card to save it.
      </div>
    `;
    return;
  }

  container.innerHTML = bookmarkedJobs.map(job => createJobCardHTML(job)).join("");
}

function handleWithdrawApp(appId) {
  if (confirm("Are you sure you want to withdraw this job application?")) {
    AuthSystem.withdrawApplication(appId);
    showToast("Application withdrawn successfully.", "error");
    renderSeekerApplications();
  }
}
