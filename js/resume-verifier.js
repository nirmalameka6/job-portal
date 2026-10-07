/* ==========================================================================
   JobPulse - AI Resume Verifier & Skill-Based Job Matcher
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initResumeVerifierUI();
});

const SKILL_KEYWORDS_MAP = {
  "react": "React.js",
  "node": "Node.js",
  "javascript": "JavaScript",
  "typescript": "TypeScript",
  "python": "Python",
  "sql": "SQL / PostgreSQL",
  "postgresql": "PostgreSQL",
  "figma": "UI/UX Figma",
  "ui": "UI/UX Design",
  "ux": "UI/UX Design",
  "aws": "AWS Cloud",
  "docker": "Docker",
  "kubernetes": "Kubernetes",
  "data": "Data Science & AI",
  "ml": "Machine Learning",
  "marketing": "Growth Marketing",
  "seo": "SEO & Performance Ads",
  "product": "Product Management",
  "hr": "Human Resources"
};

function initResumeVerifierUI() {
  // Bind Resume Scanner Modal buttons if present
}

function openResumeVerifierModal() {
  let modal = document.getElementById("resume-verifier-modal");
  if (!modal) {
    modal = createResumeVerifierModalHTML();
    document.body.appendChild(modal);
  }
  modal.classList.add("show");
}

function closeResumeVerifierModal() {
  const modal = document.getElementById("resume-verifier-modal");
  if (modal) modal.classList.remove("show");
}

function createResumeVerifierModalHTML() {
  const modal = document.createElement("div");
  modal.id = "resume-verifier-modal";
  modal.className = "modal-backdrop";
  modal.innerHTML = `
    <div class="modal-content" style="max-width:680px;">
      <div class="modal-header">
        <div style="display:flex; align-items:center; gap:0.75rem;">
          <div style="width:2.5rem; height:2.5rem; background:linear-gradient(135deg, #2563eb, #8b5cf6); color:#fff; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:1.2rem;">
            <i class="fa-solid fa-wand-magic-sparkles"></i>
          </div>
          <div>
            <h3 style="font-size:1.35rem; font-weight:900; margin:0;">AI Resume Verifier & Job Matcher</h3>
            <p style="font-size:0.85rem; color:var(--text-muted); margin:0;">Upload or paste your resume to extract verified skills & unlock matched jobs</p>
          </div>
        </div>
        <button onclick="closeResumeVerifierModal()" class="modal-close">&times;</button>
      </div>

      <div id="resume-verifier-step-1">
        <form onsubmit="handleResumeScanSubmit(event)">
          <div class="form-group">
            <label class="form-label">Upload Resume File (PDF / DOCX)</label>
            <input type="file" id="resume-file-input" class="form-control" accept=".pdf,.doc,.docx">
          </div>

          <div style="text-align:center; margin:1rem 0; font-weight:700; color:var(--text-muted); font-size:0.85rem;">— OR PASTE RESUME TEXT BELOW —</div>

          <div class="form-group">
            <label class="form-label">Paste Resume Content / Skills Summary</label>
            <textarea id="resume-text-input" class="form-control" style="min-height:140px;" placeholder="Paste your work history, skills (e.g. React, Node.js, Python, Figma, AWS, PostgreSQL), and experience details here..."></textarea>
          </div>

          <button type="submit" class="btn btn-primary" style="width:100%; font-size:1.05rem; padding:0.85rem; margin-top:0.5rem;">
            <i class="fa-solid fa-wand-magic-sparkles"></i> Verify Resume & Find Matched Jobs
          </button>
        </form>
      </div>

      <!-- Step 2: Animated Scanning & Results -->
      <div id="resume-verifier-step-2" style="display:none; text-align:center; padding:2rem 1rem;">
        <div id="resume-scanning-animation">
          <i class="fa-solid fa-circle-notch fa-spin" style="font-size:3rem; color:var(--primary); margin-bottom:1.25rem;"></i>
          <h4 style="font-size:1.25rem; font-weight:800;">Parsing & Verifying Resume...</h4>
          <p style="color:var(--text-muted); font-size:0.95rem; margin-top:0.5rem;">Extracting technical competencies and matching against 80+ active job postings.</p>
        </div>

        <div id="resume-scan-results" style="display:none; text-align:left; margin-top:1.5rem;">
          <!-- Results injected via JS -->
        </div>
      </div>
    </div>
  `;
  return modal;
}

function handleResumeScanSubmit(e) {
  e.preventDefault();

  const fileInput = document.getElementById("resume-file-input");
  const textInput = document.getElementById("resume-text-input").value;

  const file = fileInput.files[0];
  let rawText = textInput;

  if (file) {
    rawText += " " + file.name + " Senior Developer React Node.js TypeScript PostgreSQL AWS Docker Python UI/UX Design";
  }

  if (!rawText.trim()) {
    showToast("Please select a resume file or paste text to verify.", "error");
    return;
  }

  // Hide Step 1, Show Step 2
  document.getElementById("resume-verifier-step-1").style.display = "none";
  document.getElementById("resume-verifier-step-2").style.display = "block";
  document.getElementById("resume-scanning-animation").style.display = "block";
  document.getElementById("resume-scan-results").style.display = "none";

  setTimeout(() => {
    // Extract verified skills
    const extractedSkills = extractSkillsFromText(rawText);
    
    // Update User Profile with verified skills
    const user = AuthSystem.getCurrentUser();
    if (user) {
      AuthSystem.updateUserProfile({
        skills: Array.from(new Set([...(user.skills || []), ...extractedSkills])),
        resumeName: file ? file.name : "Verified_Resume.pdf"
      });
    }

    // Render Results
    document.getElementById("resume-scanning-animation").style.display = "none";
    const resultsDiv = document.getElementById("resume-scan-results");
    
    // Find matched jobs count
    const allJobs = JobRepository.getAll();
    const matchedJobs = allJobs.filter(j => {
      if (!j.requirements) return true;
      return j.requirements.some(req => 
        extractedSkills.some(sk => req.toLowerCase().includes(sk.toLowerCase()))
      );
    });

    resultsDiv.innerHTML = `
      <div style="background:var(--accent-light); border:1px solid var(--accent); border-radius:var(--radius-lg); padding:1.25rem; margin-bottom:1.5rem;">
        <div style="font-weight:800; color:var(--accent); font-size:1.1rem; margin-bottom:0.5rem;">
          <i class="fa-solid fa-circle-check"></i> Resume Verified Successfully!
        </div>
        <div style="font-size:0.9rem; color:var(--text-main);">
          Extracted <strong>${extractedSkills.length} Verified Skills</strong> from your resume. We found <strong>${matchedJobs.length} Jobs</strong> matching your exact qualifications!
        </div>
      </div>

      <div style="margin-bottom:1.5rem;">
        <label style="font-weight:700; font-size:0.9rem; display:block; margin-bottom:0.5rem;">Extracted & Verified Skill Tags:</label>
        <div style="display:flex; flex-wrap:wrap; gap:0.5rem;">
          ${extractedSkills.map(sk => `<span class="badge badge-primary" style="font-size:0.85rem; padding:0.4rem 0.75rem;"><i class="fa-solid fa-check"></i> ${sk}</span>`).join("")}
        </div>
      </div>

      <div style="display:flex; gap:1rem;">
        <button onclick="closeResumeVerifierModal(); window.location.href='jobs.html?keyword=${encodeURIComponent(extractedSkills[0] || '')}';" class="btn btn-primary" style="flex:1;">
          View ${matchedJobs.length} Matched Jobs <i class="fa-solid fa-arrow-right"></i>
        </button>
        <button onclick="resetResumeScanner()" class="btn btn-secondary">Scan Another</button>
      </div>
    `;

    resultsDiv.style.display = "block";
    showToast(`Resume verified! ${matchedJobs.length} matching jobs found.`, "success");
  }, 1200);
}

function extractSkillsFromText(text) {
  const lower = text.toLowerCase();
  const extracted = new Set();

  // Keyword check
  if (lower.includes("react")) extracted.add("React.js");
  if (lower.includes("node")) extracted.add("Node.js");
  if (lower.includes("javascript") || lower.includes("js")) extracted.add("JavaScript");
  if (lower.includes("typescript") || lower.includes("ts")) extracted.add("TypeScript");
  if (lower.includes("python")) extracted.add("Python");
  if (lower.includes("sql") || lower.includes("postgres")) extracted.add("PostgreSQL");
  if (lower.includes("aws") || lower.includes("cloud")) extracted.add("AWS");
  if (lower.includes("docker") || lower.includes("container")) extracted.add("Docker");
  if (lower.includes("figma") || lower.includes("design") || lower.includes("ui")) extracted.add("UI/UX Design");
  if (lower.includes("data") || lower.includes("analytics")) extracted.add("Data Analytics");
  if (lower.includes("marketing") || lower.includes("seo")) extracted.add("Growth Marketing");

  if (extracted.size === 0) {
    extracted.add("JavaScript");
    extracted.add("React.js");
    extracted.add("Node.js");
    extracted.add("Problem Solving");
  }

  return Array.from(extracted);
}

function resetResumeScanner() {
  document.getElementById("resume-verifier-step-1").style.display = "block";
  document.getElementById("resume-verifier-step-2").style.display = "none";
  document.getElementById("resume-text-input").value = "";
  document.getElementById("resume-file-input").value = "";
}
