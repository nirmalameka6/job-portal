/* ==========================================================================
   JobPulse - Job Details & Direct Application Controller
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("job-details-container")) {
    initJobDetailsPage();
  }
});

function initJobDetailsPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const jobId = urlParams.get("id") || "job-101";
  const job = JobRepository.getById(jobId);

  const container = document.getElementById("job-details-container");
  if (!job || !container) {
    if (container) {
      container.innerHTML = `
        <div style="text-align:center; padding:5rem 1rem;">
          <h2>Job Post Not Found</h2>
          <p>The requested job posting may have been closed or removed.</p>
          <a href="jobs.html" class="btn btn-primary" style="margin-top:1.5rem;">Browse All Jobs</a>
        </div>
      `;
    }
    return;
  }

  // Populate Job Details HTML
  document.title = `${job.title} at ${job.companyName} - JobPulse`;

  const isSaved = JobRepository.isBookmarked(job.id);
  const user = AuthSystem.getCurrentUser();
  const formattedSalary = `₹${(job.salaryMin / 100000).toFixed(1)} Lakhs - ₹${(job.salaryMax / 100000).toFixed(1)} Lakhs / year`;

  container.innerHTML = `
    <!-- Header Hero Banner -->
    <div class="job-details-header">
      <div class="container">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:1.5rem;">
          <div style="display:flex; gap:1.5rem; align-items:center;">
            <img src="${job.companyLogo}" alt="${job.companyName}" style="width:5rem; height:5rem; border-radius:var(--radius-lg); border:1px solid var(--border-color); object-fit:cover;">
            <div>
              <h1 style="font-size:2rem; font-weight:800; margin-bottom:0.35rem;">${job.title}</h1>
              <div style="color:var(--text-muted); font-size:1rem; font-weight:500;">
                <i class="fa-solid fa-building"></i> ${job.companyName} • <i class="fa-solid fa-location-dot"></i> ${job.location}
              </div>
            </div>
          </div>

          <div style="display:flex; gap:1rem; align-items:center;">
            <button onclick="handleToggleBookmark('${job.id}', this)" class="btn btn-secondary ${isSaved ? 'active' : ''}" style="gap:0.5rem;">
              <i class="fa-${isSaved ? 'solid' : 'regular'} fa-bookmark"></i> ${isSaved ? 'Saved' : 'Save Job'}
            </button>
            <button onclick="openApplicationModal('${job.id}')" class="btn btn-primary btn-lg">
              Apply Now <i class="fa-solid fa-paper-plane"></i>
            </button>
          </div>
        </div>

        <div class="tags-group" style="margin-top:1.5rem;">
          <span class="badge badge-primary" style="font-size:0.9rem; padding:0.4rem 0.8rem;"><i class="fa-solid fa-layer-group"></i> ${job.category}</span>
          <span class="badge badge-accent" style="font-size:0.9rem; padding:0.4rem 0.8rem;"><i class="fa-solid fa-laptop-code"></i> ${job.workMode}</span>
          <span class="badge" style="font-size:0.9rem; padding:0.4rem 0.8rem;"><i class="fa-solid fa-clock"></i> ${job.jobType}</span>
          <span class="badge" style="font-size:0.9rem; padding:0.4rem 0.8rem;"><i class="fa-solid fa-user-graduate"></i> ${job.experience}</span>
        </div>
      </div>
    </div>

    <!-- Main Content Layout -->
    <div class="container">
      <div class="job-details-grid">
        <!-- Main Description -->
        <div>
          <div class="details-card">
            <h3 class="details-title">Job Overview</h3>
            <p style="white-space:pre-line; color:var(--text-main); font-size:1.05rem;">${job.description}</p>
          </div>

          <div class="details-card">
            <h3 class="details-title">Key Responsibilities & Requirements</h3>
            <ul class="details-list">
              ${job.requirements.map(req => `<li>${req}</li>`).join("")}
            </ul>
          </div>

          <div class="details-card">
            <h3 class="details-title">Benefits & Perks</h3>
            <ul class="details-list">
              ${job.benefits.map(ben => `<li>${ben}</li>`).join("")}
            </ul>
          </div>
        </div>

        <!-- Sidebar Summary Box -->
        <div>
          <div class="details-card" style="position:sticky; top:5.5rem;">
            <h3 class="details-title" style="font-size:1.15rem;">Job Highlights</h3>
            
            <div style="margin-bottom:1.25rem;">
              <div style="font-size:0.85rem; color:var(--text-muted); font-weight:600;">OFFERED SALARY</div>
              <div style="font-size:1.15rem; font-weight:800; color:var(--primary);">${formattedSalary}</div>
            </div>

            <div style="margin-bottom:1.25rem;">
              <div style="font-size:0.85rem; color:var(--text-muted); font-weight:600;">WORK LOCATION</div>
              <div style="font-weight:700;">${job.location}</div>
            </div>

            <div style="margin-bottom:1.25rem;">
              <div style="font-size:0.85rem; color:var(--text-muted); font-weight:600;">POSTED DATE</div>
              <div style="font-weight:600;">${job.postedDate}</div>
            </div>

            <div style="margin-bottom:1.5rem;">
              <div style="font-size:0.85rem; color:var(--text-muted); font-weight:600;">APPLICATION DEADLINE</div>
              <div style="font-weight:600; color:#ef4444;">${job.deadline}</div>
            </div>

            <button onclick="openApplicationModal('${job.id}')" class="btn btn-primary" style="width:100%;">
              Apply For Position <i class="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Pre-fill user data in modal if logged in
  if (user) {
    const nameIn = document.getElementById("app-seeker-name");
    const emailIn = document.getElementById("app-seeker-email");
    const phoneIn = document.getElementById("app-seeker-phone");
    if (nameIn) nameIn.value = user.fullName || "";
    if (emailIn) emailIn.value = user.email || "";
    if (phoneIn) phoneIn.value = user.phone || "";
  }
}

function openApplicationModal(jobId) {
  const modal = document.getElementById("application-modal");
  const job = JobRepository.getById(jobId);
  if (modal && job) {
    document.getElementById("modal-job-id").value = job.id;
    document.getElementById("modal-job-title-display").textContent = `${job.title} at ${job.companyName}`;
    modal.classList.add("show");
  }
}

function closeApplicationModal() {
  const modal = document.getElementById("application-modal");
  if (modal) modal.classList.remove("show");
}

function handleApplicationSubmit(e) {
  e.preventDefault();

  const user = AuthSystem.getCurrentUser();
  const jobId = document.getElementById("modal-job-id").value;
  const job = JobRepository.getById(jobId);

  const seekerName = document.getElementById("app-seeker-name").value;
  const seekerEmail = document.getElementById("app-seeker-email").value;
  const seekerPhone = document.getElementById("app-seeker-phone").value;
  const coverLetter = document.getElementById("app-cover-letter").value;
  const resumeFile = document.getElementById("app-resume-file").files[0];

  const appData = {
    jobId: job.id,
    jobTitle: job.title,
    companyName: job.companyName,
    seekerId: user ? user.id : "usr-guest",
    seekerName,
    seekerEmail,
    seekerPhone,
    coverLetter,
    resumeName: resumeFile ? resumeFile.name : (user ? user.resumeName : "Resume_Attached.pdf")
  };

  AuthSystem.submitApplication(appData);

  closeApplicationModal();
  showToast("Application submitted successfully! Track progress in your Candidate Dashboard.", "success");

  setTimeout(() => {
    window.location.href = "seeker-dashboard.html";
  }, 1500);
}
