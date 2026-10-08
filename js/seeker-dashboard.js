/* ==========================================================================
   JobPulse - Job Seeker Candidate Dashboard & Recruiter Messaging Controller
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("seeker-applications-table")) {
    initSeekerDashboard();
  }
});

function initSeekerDashboard() {
  const user = AuthSystem.getCurrentUser();
  
  if (!user || user.role !== "seeker") {
    AuthSystem.loginAsDemo("seeker");
  }

  renderSeekerApplications();
  renderSeekerBookmarks();
  renderInterviewEmailAlerts();
}

function renderInterviewEmailAlerts() {
  const user = AuthSystem.getCurrentUser();
  const alertContainer = document.getElementById("seeker-interview-email-alerts");
  if (!alertContainer) return;

  const applications = AuthSystem.getApplicationsForSeeker(user.id);
  const interviewApps = applications.filter(a => a.interviewEmailSent || a.status === "Interview Scheduled" || a.status === "Shortlisted");

  if (interviewApps.length === 0) {
    alertContainer.style.display = "none";
    return;
  }

  alertContainer.style.display = "block";
  alertContainer.innerHTML = interviewApps.map(app => {
    const details = app.interviewDetails || {
      date: "2026-10-14",
      time: "11:00 AM IST",
      mode: "Google Meet Video Call",
      link: "https://meet.google.com/jobpulse-interview-demo",
      interviewer: "Sarah Jenkins (HR TechCorp)"
    };

    return `
      <div style="background:linear-gradient(135deg, #ecfdf5, #eff6ff); border:2px solid #10b981; border-radius:var(--radius-xl); padding:1.5rem; margin-bottom:2rem; box-shadow:var(--shadow-md);">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:1rem; margin-bottom:1rem;">
          <div>
            <span class="badge badge-accent" style="font-size:0.85rem; padding:0.35rem 0.75rem;"><i class="fa-solid fa-envelope-open-text"></i> OFFICIAL INTERVIEW INVITATION</span>
            <h3 style="font-size:1.3rem; font-weight:900; color:var(--text-main); margin-top:0.4rem;">
              Call for Interview: ${app.jobTitle}
            </h3>
            <div style="font-size:0.9rem; color:var(--text-muted); font-weight:600;">
              Company: <strong>${app.companyName}</strong> • Recruiter: <strong>${details.interviewer}</strong>
            </div>
          </div>

          <div style="display:flex; gap:0.5rem;">
            <button onclick="openCandidateChatModal('${app.id}', '${app.companyName}')" class="btn btn-primary btn-sm">
              <i class="fa-solid fa-comments"></i> Chat with Recruiter
            </button>
            <a href="${details.link}" target="_blank" class="btn btn-accent btn-sm">
              <i class="fa-solid fa-video"></i> Join Interview Call
            </a>
          </div>
        </div>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:1rem; background:var(--card-bg); padding:1rem; border-radius:var(--radius-lg); border:1px solid var(--border-color);">
          <div>
            <div style="font-size:0.75rem; color:var(--text-muted); font-weight:700;">INTERVIEW DATE</div>
            <div style="font-weight:800; color:var(--primary);">${details.date}</div>
          </div>
          <div>
            <div style="font-size:0.75rem; color:var(--text-muted); font-weight:700;">SCHEDULED TIME</div>
            <div style="font-weight:800; color:var(--text-main);">${details.time}</div>
          </div>
          <div>
            <div style="font-size:0.75rem; color:var(--text-muted); font-weight:700;">PLATFORM / MODE</div>
            <div style="font-weight:800; color:var(--accent);">${details.mode}</div>
          </div>
        </div>
      </div>
    `;
  }).join("");
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
          <div style="font-weight:800; font-size:0.95rem;">${app.jobTitle}</div>
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
          <div style="display:flex; gap:0.4rem;">
            <button onclick="openCandidateChatModal('${app.id}', '${app.companyName}')" class="btn btn-primary btn-sm" title="Chat with HR">
              <i class="fa-solid fa-comments"></i> Chat
            </button>
            <button onclick="handleWithdrawApp('${app.id}')" class="btn btn-secondary btn-sm" style="color:#ef4444;" title="Withdraw Application">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
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

// Candidate In-App Chat Modal
function openCandidateChatModal(appId, companyName) {
  let modal = document.getElementById("candidate-chat-modal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "candidate-chat-modal";
    modal.className = "modal-backdrop";
    document.body.appendChild(modal);
  }

  const user = AuthSystem.getCurrentUser();
  const messages = AuthSystem.getMessagesForApp(appId);

  modal.innerHTML = `
    <div class="modal-content" style="max-width:550px; height:520px; display:flex; flex-direction:column; padding:0; overflow:hidden;">
      <div class="modal-header" style="background:#0f172a; color:#fff; padding:1rem 1.25rem; margin:0;">
        <div>
          <h3 style="font-size:1.1rem; font-weight:800; margin:0; color:#fff;"><i class="fa-solid fa-comments"></i> Chat with ${companyName} Recruiter</h3>
          <div style="font-size:0.75rem; color:#60a5fa;">Direct Candidate-HR Messaging Channel</div>
        </div>
        <button onclick="document.getElementById('candidate-chat-modal').classList.remove('show')" class="modal-close" style="color:#fff;">&times;</button>
      </div>

      <div id="candidate-chat-messages-body" style="flex:1; padding:1rem; overflow-y:auto; display:flex; flex-direction:column; gap:0.75rem; background:var(--body-bg);">
        ${messages.map(m => `
          <div style="max-width:80%; padding:0.75rem 1rem; border-radius:0.75rem; font-size:0.88rem; ${m.senderRole === 'seeker' ? 'align-self:flex-end; background:#2563eb; color:#fff;' : 'align-self:flex-start; background:var(--card-bg); color:var(--text-main); border:1px solid var(--border-color);'}">
            <div style="font-size:0.75rem; font-weight:700; opacity:0.8; margin-bottom:0.2rem;">${m.senderName} (${m.timestamp})</div>
            ${m.text}
          </div>
        `).join("")}
      </div>

      <form onsubmit="handleSendCandidateChatMessage(event, '${appId}')" style="display:flex; padding:0.75rem; background:var(--card-bg); border-top:1px solid var(--border-color); gap:0.5rem;">
        <input type="text" id="candidate-chat-input" placeholder="Type a message to HR recruiter..." required style="flex:1; border:1px solid var(--border-color); padding:0.6rem 0.85rem; border-radius:0.5rem; outline:none; background:var(--card-bg); color:var(--text-main);">
        <button type="submit" class="btn btn-primary"><i class="fa-solid fa-paper-plane"></i></button>
      </form>
    </div>
  `;

  modal.classList.add("show");
  const body = document.getElementById("candidate-chat-messages-body");
  if (body) body.scrollTop = body.scrollHeight;
}

function handleSendCandidateChatMessage(e, appId) {
  e.preventDefault();
  const input = document.getElementById("candidate-chat-input");
  const text = input.value.trim();
  if (!text) return;

  const user = AuthSystem.getCurrentUser();
  const apps = AuthSystem.getApplications();
  const app = apps.find(a => a.id === appId);

  AuthSystem.sendMessage(appId, user.id, user.fullName || "Candidate", "seeker", "usr-employer-01", text);
  input.value = "";
  openCandidateChatModal(appId, app ? app.companyName : "Recruiter");
}
