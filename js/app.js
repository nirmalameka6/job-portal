/* ==========================================================================
   JobPulse - Global Application Controller & UI Utilities
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initDarkMode();
  initGlobalSearchAutocomplete();
});

// Toast notification helper
function showToast(message, type = "success") {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <i class="fa-solid ${type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation'}"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// Navbar Initializer
function initNavbar() {
  const user = AuthSystem.getCurrentUser();
  const navActions = document.getElementById("nav-actions");
  
  if (navActions) {
    if (user) {
      const isEmployer = user.role === "employer";
      navActions.innerHTML = `
        <button id="dark-mode-toggle" class="btn btn-secondary btn-icon" title="Toggle Dark Mode">
          <i class="fa-solid fa-moon"></i>
        </button>
        <div class="user-menu" style="display:flex; align-items:center; gap:0.75rem;">
          <a href="${isEmployer ? 'employer-dashboard.html' : 'seeker-dashboard.html'}" class="btn btn-outline btn-sm">
            <i class="fa-solid ${isEmployer ? 'fa-building' : 'fa-user-gear'}"></i> Dashboard
          </a>
          <a href="profile.html" class="user-avatar" title="${user.fullName}">
            <div style="width:2.25rem; height:2.25rem; border-radius:50%; background:var(--primary); color:#fff; display:flex; align-items:center; justify-content:center; font-weight:700;">
              ${user.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
            </div>
          </a>
          <button onclick="AuthSystem.logout()" class="btn btn-secondary btn-sm" title="Log Out">
            <i class="fa-solid fa-right-from-bracket"></i>
          </button>
        </div>
      `;
    } else {
      navActions.innerHTML = `
        <button id="dark-mode-toggle" class="btn btn-secondary btn-icon" title="Toggle Dark Mode">
          <i class="fa-solid fa-moon"></i>
        </button>
        <a href="login.html" class="btn btn-secondary btn-sm">Sign In</a>
        <a href="register.html" class="btn btn-primary btn-sm">Post a Job / Sign Up</a>
      `;
    }
  }

  // Highlight active link
  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-link").forEach(link => {
    if (link.getAttribute("href") === currentPath) {
      link.classList.add("active");
    }
  });
}

// Dark Mode Persistence
function initDarkMode() {
  const toggleBtn = document.getElementById("dark-mode-toggle");
  const isDark = localStorage.getItem("jobpulse_dark_mode") === "true";

  if (isDark) {
    document.body.classList.add("dark-mode");
    if (toggleBtn) toggleBtn.querySelector("i").className = "fa-solid fa-sun";
  }

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      const activeDark = document.body.classList.contains("dark-mode");
      localStorage.setItem("jobpulse_dark_mode", activeDark);
      toggleBtn.querySelector("i").className = activeDark ? "fa-solid fa-sun" : "fa-solid fa-moon";
    });
  }
}

// Header Search Autocomplete
function initGlobalSearchAutocomplete() {
  const searchInput = document.getElementById("hero-search-input");
  if (!searchInput) return;

  const suggestionBox = document.createElement("div");
  suggestionBox.id = "search-suggestions";
  suggestionBox.style.cssText = "position:absolute; top:100%; left:0; right:0; background:var(--card-bg); border:1px solid var(--border-color); border-radius:0 0 0.75rem 0.75rem; box-shadow:var(--shadow-lg); z-index:100; max-height:250px; overflow-y:auto; display:none;";
  searchInput.parentElement.appendChild(suggestionBox);

  searchInput.addEventListener("input", (e) => {
    const val = e.target.value.trim().toLowerCase();
    if (val.length < 2) {
      suggestionBox.style.display = "none";
      return;
    }

    const jobs = JobRepository.getAll();
    const matches = jobs.filter(j => 
      j.title.toLowerCase().includes(val) || j.companyName.toLowerCase().includes(val) || j.category.toLowerCase().includes(val)
    ).slice(0, 5);

    if (matches.length === 0) {
      suggestionBox.style.display = "none";
      return;
    }

    suggestionBox.innerHTML = matches.map(j => `
      <div onclick="window.location.href='job-details.html?id=${j.id}'" style="padding:0.65rem 1rem; border-bottom:1px solid var(--border-color); cursor:pointer; display:flex; justify-content:space-between; align-items:center;" onmouseover="this.style.background='var(--body-bg)'" onmouseout="this.style.background='transparent'">
        <div>
          <div style="font-weight:700; font-size:0.9rem;">${j.title}</div>
          <div style="font-size:0.8rem; color:var(--text-muted);">${j.companyName} • ${j.location}</div>
        </div>
        <span class="badge badge-primary">${j.workMode}</span>
      </div>
    `).join("");

    suggestionBox.style.display = "block";
  });

  document.addEventListener("click", (e) => {
    if (!searchInput.contains(e.target) && !suggestionBox.contains(e.target)) {
      suggestionBox.style.display = "none";
    }
  });
}
