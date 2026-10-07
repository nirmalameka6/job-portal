/* ==========================================================================
   JobPulse - Job Catalog & Multi-Filtering Engine Controller
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("catalog-jobs-list")) {
    initJobsCatalog();
  }
});

function initJobsCatalog() {
  const urlParams = new URLSearchParams(window.location.search);
  const keywordParam = urlParams.get("keyword") || "";
  const categoryParam = urlParams.get("category") || "";

  // Pre-fill search inputs if present in URL
  const keywordInput = document.getElementById("catalog-keyword-search");
  if (keywordInput && keywordParam) keywordInput.value = keywordParam;

  if (categoryParam) {
    const catCheck = document.querySelector(`.category-filter-checkbox[value="${categoryParam}"]`);
    if (catCheck) catCheck.checked = true;
  }

  // Event Listeners
  if (keywordInput) {
    keywordInput.addEventListener("input", debounce(renderCatalogJobs, 300));
  }

  const sortSelect = document.getElementById("catalog-sort-select");
  if (sortSelect) {
    sortSelect.addEventListener("change", renderCatalogJobs);
  }

  const salarySlider = document.getElementById("salary-range-slider");
  const salaryVal = document.getElementById("salary-range-value");
  if (salarySlider && salaryVal) {
    salarySlider.addEventListener("input", (e) => {
      salaryVal.textContent = `₹${(e.target.value / 100000).toFixed(1)} Lakhs+`;
      renderCatalogJobs();
    });
  }

  document.querySelectorAll(".filter-checkbox-group input").forEach(checkbox => {
    checkbox.addEventListener("change", renderCatalogJobs);
  });

  renderCatalogJobs();
}

function renderCatalogJobs() {
  const container = document.getElementById("catalog-jobs-list");
  const countEl = document.getElementById("catalog-results-count");
  if (!container) return;

  const keyword = document.getElementById("catalog-keyword-search")?.value || "";
  const sort = document.getElementById("catalog-sort-select")?.value || "latest";
  const minSalary = parseInt(document.getElementById("salary-range-slider")?.value || 0, 10);

  // Selected categories
  const category = Array.from(document.querySelectorAll('.category-filter-checkbox:checked')).map(c => c.value);
  const workMode = Array.from(document.querySelectorAll('.workmode-filter-checkbox:checked')).map(c => c.value);
  const jobType = Array.from(document.querySelectorAll('.jobtype-filter-checkbox:checked')).map(c => c.value);
  const experience = document.querySelector('.experience-filter-select')?.value || "All";

  const filteredJobs = JobRepository.searchAndFilter({
    keyword,
    category,
    workMode,
    jobType,
    experience,
    minSalary,
    sort
  });

  if (countEl) {
    countEl.textContent = `Showing ${filteredJobs.length} Job Listings`;
  }

  if (filteredJobs.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; background: var(--card-bg); border-radius: var(--radius-lg); border: 1px solid var(--border-color);">
        <i class="fa-solid fa-briefcase" style="font-size: 3rem; color: var(--text-muted); margin-bottom: 1rem;"></i>
        <h3>No Matching Jobs Found</h3>
        <p style="color: var(--text-muted); margin-top: 0.5rem;">Try adjusting your keyword search or clear your filter criteria.</p>
        <button onclick="clearCatalogFilters()" class="btn btn-outline btn-sm" style="margin-top: 1.25rem;">Clear All Filters</button>
      </div>
    `;
    return;
  }

  container.innerHTML = filteredJobs.map(job => createJobCardHTML(job)).join("");
}

function createJobCardHTML(job) {
  const isSaved = JobRepository.isBookmarked(job.id);
  const formattedSalary = `₹${(job.salaryMin / 100000).toFixed(1)}L - ₹${(job.salaryMax / 100000).toFixed(1)}L / yr`;

  return `
    <div class="job-card">
      <div>
        <div class="job-card-header">
          <img src="${job.companyLogo}" alt="${job.companyName}" class="company-logo" onerror="this.src='https://via.placeholder.com/60?text=Job'">
          <div class="job-title-group">
            <a href="job-details.html?id=${job.id}" class="job-title">${job.title}</a>
            <div class="company-name"><i class="fa-solid fa-building"></i> ${job.companyName} • <i class="fa-solid fa-location-dot"></i> ${job.location}</div>
          </div>
          <button onclick="handleToggleBookmark('${job.id}', this)" class="bookmark-btn ${isSaved ? 'active' : ''}" title="${isSaved ? 'Remove Bookmark' : 'Save Job'}">
            <i class="fa-${isSaved ? 'solid' : 'regular'} fa-bookmark"></i>
          </button>
        </div>

        <div class="tags-group">
          <span class="badge badge-primary"><i class="fa-solid fa-layer-group"></i> ${job.category}</span>
          <span class="badge badge-accent"><i class="fa-solid fa-laptop-code"></i> ${job.workMode}</span>
          <span class="badge"><i class="fa-solid fa-clock"></i> ${job.jobType}</span>
          <span class="badge"><i class="fa-solid fa-user-graduate"></i> ${job.experience}</span>
        </div>
      </div>

      <div class="job-meta">
        <div>
          <span class="salary-text">${formattedSalary}</span>
        </div>
        <a href="job-details.html?id=${job.id}" class="btn btn-primary btn-sm">
          Apply Now <i class="fa-solid fa-arrow-right"></i>
        </a>
      </div>
    </div>
  `;
}

function handleToggleBookmark(jobId, btn) {
  const isBookmarked = JobRepository.toggleBookmark(jobId);
  const icon = btn.querySelector("i");
  if (isBookmarked) {
    btn.classList.add("active");
    icon.className = "fa-solid fa-bookmark";
    showToast("Job saved to your bookmarks!", "success");
  } else {
    btn.classList.remove("active");
    icon.className = "fa-regular fa-bookmark";
    showToast("Job removed from bookmarks.", "error");
  }
}

function clearCatalogFilters() {
  document.querySelectorAll('.filter-checkbox-group input').forEach(c => c.checked = false);
  const keywordInput = document.getElementById("catalog-keyword-search");
  if (keywordInput) keywordInput.value = "";
  const slider = document.getElementById("salary-range-slider");
  if (slider) slider.value = 0;
  const salaryVal = document.getElementById("salary-range-value");
  if (salaryVal) salaryVal.textContent = "₹0 Lakhs+";
  renderCatalogJobs();
}

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
