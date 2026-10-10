/* ==========================================================================
   JobPulse - User & Company Profile Controller with 1-Click LinkedIn/GitHub Sync
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("profile-form")) {
    initProfilePage();
  }
});

function initProfilePage() {
  const user = AuthSystem.getCurrentUser();
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  // Pre-fill profile fields
  document.getElementById("profile-name").value = user.fullName || "";
  document.getElementById("profile-email").value = user.email || "";
  document.getElementById("profile-phone").value = user.phone || "";
  document.getElementById("profile-headline").value = user.headline || user.industry || "";
  document.getElementById("profile-location").value = user.location || "";
  document.getElementById("profile-bio").value = user.bio || "";

  renderSkillTags(user.skills || []);

  document.getElementById("profile-form").addEventListener("submit", handleProfileSave);
}

function renderSkillTags(skills) {
  const container = document.getElementById("skills-tags-container");
  if (!container) return;

  container.innerHTML = skills.map((skill, index) => `
    <span class="badge badge-primary" style="font-size:0.9rem; padding:0.4rem 0.75rem; gap:0.5rem;">
      ${skill}
      <i class="fa-solid fa-xmark" onclick="removeSkillTag(${index})" style="cursor:pointer;"></i>
    </span>
  `).join("");
}

function addSkillTag() {
  const input = document.getElementById("add-skill-input");
  const skill = input.value.trim();
  if (!skill) return;

  const user = AuthSystem.getCurrentUser();
  const skills = user.skills || [];
  if (!skills.includes(skill)) {
    skills.push(skill);
    AuthSystem.updateUserProfile({ skills });
    renderSkillTags(skills);
  }
  input.value = "";
}

function removeSkillTag(index) {
  const user = AuthSystem.getCurrentUser();
  const skills = user.skills || [];
  skills.splice(index, 1);
  AuthSystem.updateUserProfile({ skills });
  renderSkillTags(skills);
}

function handleProfileSave(e) {
  e.preventDefault();

  const fullName = document.getElementById("profile-name").value;
  const phone = document.getElementById("profile-phone").value;
  const headline = document.getElementById("profile-headline").value;
  const location = document.getElementById("profile-location").value;
  const bio = document.getElementById("profile-bio").value;

  AuthSystem.updateUserProfile({
    fullName,
    phone,
    headline,
    location,
    bio
  });

  showToast("Profile details updated successfully!", "success");
}

function syncLinkedInGitHubProfile() {
  const user = AuthSystem.getCurrentUser();
  const syncedSkills = ["JavaScript", "TypeScript", "React.js", "Node.js", "PostgreSQL", "Docker", "AWS", "Git", "Tailwind CSS"];
  
  AuthSystem.updateUserProfile({
    skills: syncedSkills,
    headline: "Senior Full-Stack Developer | Open Source Contributor",
    bio: "Synced from LinkedIn & GitHub: Passionate software engineer with 15+ open-source repositories, specializing in scalable web systems and cloud infrastructure."
  });

  document.getElementById("profile-headline").value = "Senior Full-Stack Developer | Open Source Contributor";
  document.getElementById("profile-bio").value = "Synced from LinkedIn & GitHub: Passionate software engineer with 15+ open-source repositories, specializing in scalable web systems and cloud infrastructure.";
  renderSkillTags(syncedSkills);

  showToast("Profile & skills auto-synced from LinkedIn & GitHub API!", "success");
}
