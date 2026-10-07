/* ==========================================================================
   JobPulse - Interactive AI Career & Hiring Assistant Widget
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initAIAssistantWidget();
});

function initAIAssistantWidget() {
  if (document.getElementById("ai-assistant-fab")) return;

  // Create Floating Action Button & Chat Window Markup
  const widgetContainer = document.createElement("div");
  widgetContainer.id = "ai-assistant-widget-container";
  widgetContainer.innerHTML = `
    <!-- Floating Action Button -->
    <button id="ai-assistant-fab" onclick="toggleAIChatWindow()" title="Ask JobPulse AI Assistant">
      <i class="fa-solid fa-robot"></i>
      <span class="ai-fab-badge">AI Assistant</span>
    </button>

    <!-- Chat Modal Window -->
    <div id="ai-chat-window" class="ai-chat-window">
      <div class="ai-chat-header">
        <div style="display:flex; align-items:center; gap:0.75rem;">
          <div class="ai-avatar-icon"><i class="fa-solid fa-robot"></i></div>
          <div>
            <h4 style="font-size:1rem; font-weight:800; margin:0; color:#ffffff;">JobPulse AI Assistant</h4>
            <span style="font-size:0.75rem; color:#60a5fa; display:flex; align-items:center; gap:0.3rem;">
              <i class="fa-solid fa-circle" style="font-size:0.5rem; color:#10b981;"></i> Online & Ready to Help
            </span>
          </div>
        </div>
        <button onclick="toggleAIChatWindow()" class="ai-chat-close">&times;</button>
      </div>

      <!-- Quick Action Pills -->
      <div class="ai-quick-pills">
        <button onclick="sendQuickMessage('Suggest matching jobs for my profile')" class="ai-pill">🎯 Matching Jobs</button>
        <button onclick="sendQuickMessage('Help me write a cover letter')" class="ai-pill">✍️ Cover Letter</button>
        <button onclick="sendQuickMessage('Give me resume optimization tips')" class="ai-pill">📄 Resume Tips</button>
        <button onclick="sendQuickMessage('How to post a job as an employer?')" class="ai-pill">💼 Hiring Help</button>
      </div>

      <!-- Messages Body -->
      <div id="ai-chat-messages" class="ai-chat-messages">
        <div class="ai-msg ai-msg-bot">
          Hello! I'm your <strong>JobPulse AI Career Assistant</strong>. 🚀<br><br>
          How can I assist you today? You can ask me for job recommendations, cover letter drafts, interview prep, or employer hiring advice!
        </div>
      </div>

      <!-- Chat Input Footer -->
      <form onsubmit="handleAIChatSubmit(event)" class="ai-chat-footer">
        <input type="text" id="ai-chat-input" placeholder="Ask AI anything (e.g. 'Resume tips')..." autocomplete="off" required>
        <button type="submit" class="ai-send-btn" title="Send Message">
          <i class="fa-solid fa-paper-plane"></i>
        </button>
      </form>
    </div>
  `;

  document.body.appendChild(widgetContainer);
  injectAIStyles();
}

function injectAIStyles() {
  if (document.getElementById("ai-widget-styles")) return;
  const style = document.createElement("style");
  style.id = "ai-widget-styles";
  style.textContent = `
    #ai-assistant-fab {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      z-index: 2500;
      background: linear-gradient(135deg, #2563eb, #1d4ed8);
      color: #ffffff;
      border: none;
      padding: 0.85rem 1.35rem;
      border-radius: 9999px;
      box-shadow: 0 10px 25px -5px rgba(37, 99, 235, 0.4);
      display: flex;
      align-items: center;
      gap: 0.65rem;
      font-weight: 700;
      font-size: 0.95rem;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    #ai-assistant-fab:hover {
      transform: translateY(-3px) scale(1.03);
      box-shadow: 0 15px 30px -5px rgba(37, 99, 235, 0.5);
    }
    .ai-chat-window {
      position: fixed;
      bottom: 5.5rem;
      right: 2rem;
      z-index: 2500;
      width: 380px;
      max-width: calc(100vw - 2rem);
      height: 520px;
      background-color: var(--card-bg, #ffffff);
      border: 1px solid var(--border-color, #e2e8f0);
      border-radius: 1rem;
      box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.25);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      opacity: 0;
      visibility: hidden;
      transform: translateY(20px) scale(0.95);
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .ai-chat-window.show {
      opacity: 1;
      visibility: visible;
      transform: translateY(0) scale(1);
    }
    .ai-chat-header {
      background: #0f172a;
      padding: 1rem 1.25rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .ai-avatar-icon {
      width: 2.25rem;
      height: 2.25rem;
      background: #2563eb;
      color: #fff;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.1rem;
    }
    .ai-chat-close {
      background: transparent;
      border: none;
      color: #94a3b8;
      font-size: 1.5rem;
      cursor: pointer;
    }
    .ai-quick-pills {
      display: flex;
      gap: 0.4rem;
      padding: 0.65rem 0.85rem;
      background: var(--body-bg, #f8fafc);
      overflow-x: auto;
      border-bottom: 1px solid var(--border-color, #e2e8f0);
    }
    .ai-pill {
      background: var(--card-bg, #ffffff);
      border: 1px solid var(--border-color, #cbd5e1);
      border-radius: 9999px;
      padding: 0.25rem 0.65rem;
      font-size: 0.75rem;
      font-weight: 600;
      white-space: nowrap;
      cursor: pointer;
      color: var(--text-main, #1e293b);
      transition: all 0.2s ease;
    }
    .ai-pill:hover {
      background: #2563eb;
      color: #ffffff;
      border-color: #2563eb;
    }
    .ai-chat-messages {
      flex: 1;
      padding: 1rem;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 0.85rem;
    }
    .ai-msg {
      max-width: 85%;
      padding: 0.75rem 1rem;
      border-radius: 0.85rem;
      font-size: 0.88rem;
      line-height: 1.5;
    }
    .ai-msg-bot {
      background: var(--body-bg, #f1f5f9);
      color: var(--text-main, #1e293b);
      align-self: flex-start;
      border-bottom-left-radius: 0.2rem;
      border: 1px solid var(--border-color, #e2e8f0);
    }
    .ai-msg-user {
      background: #2563eb;
      color: #ffffff;
      align-self: flex-end;
      border-bottom-right-radius: 0.2rem;
    }
    .ai-chat-footer {
      display: flex;
      padding: 0.75rem;
      background: var(--card-bg, #ffffff);
      border-top: 1px solid var(--border-color, #e2e8f0);
      gap: 0.5rem;
    }
    .ai-chat-footer input {
      flex: 1;
      border: 1px solid var(--border-color, #cbd5e1);
      border-radius: 0.5rem;
      padding: 0.5rem 0.75rem;
      outline: none;
      font-size: 0.88rem;
      background: var(--card-bg, #ffffff);
      color: var(--text-main, #1e293b);
    }
    .ai-send-btn {
      background: #2563eb;
      color: #fff;
      border: none;
      width: 2.25rem;
      height: 2.25rem;
      border-radius: 0.5rem;
      cursor: pointer;
    }
  `;
  document.head.appendChild(style);
}

function toggleAIChatWindow() {
  const chatWin = document.getElementById("ai-chat-window");
  if (chatWin) chatWin.classList.toggle("show");
}

function sendQuickMessage(text) {
  document.getElementById("ai-chat-input").value = text;
  handleAIChatSubmit(new Event("submit"));
}

function handleAIChatSubmit(e) {
  if (e) e.preventDefault();
  const input = document.getElementById("ai-chat-input");
  const query = input.value.trim();
  if (!query) return;

  const msgsContainer = document.getElementById("ai-chat-messages");

  // User message
  const userMsg = document.createElement("div");
  userMsg.className = "ai-msg ai-msg-user";
  userMsg.textContent = query;
  msgsContainer.appendChild(userMsg);
  input.value = "";
  msgsContainer.scrollTop = msgsContainer.scrollHeight;

  // Simulate AI Thinking response
  setTimeout(() => {
    const botMsg = document.createElement("div");
    botMsg.className = "ai-msg ai-msg-bot";
    botMsg.innerHTML = getAIResponse(query);
    msgsContainer.appendChild(botMsg);
    msgsContainer.scrollTop = msgsContainer.scrollHeight;
  }, 600);
}

function getAIResponse(query) {
  const q = query.toLowerCase();
  const user = AuthSystem.getCurrentUser();

  if (q.includes("match") || q.includes("job") || q.includes("suggest")) {
    const jobs = JobRepository.getAll().slice(0, 3);
    return `
      🎯 <strong>Recommended Jobs for You:</strong><br><br>
      ${jobs.map(j => `• <a href="job-details.html?id=${j.id}" style="font-weight:700; color:#2563eb;">${j.title}</a> at ${j.companyName} (${j.workMode})`).join("<br>")}<br><br>
      <em>Check out the <a href="jobs.html" style="color:#2563eb; font-weight:700;">Jobs Catalog</a> to apply!</em>
    `;
  }

  if (q.includes("cover letter") || q.includes("write") || q.includes("letter")) {
    return `
      ✍️ <strong>Cover Letter Generator Tip:</strong><br><br>
      "Dear Hiring Manager,<br>
      I am writing to express my strong interest in the role. With my background in ${user ? user.skills.join(', ') : 'software engineering'}, I have built scalable applications and led technical projects..."<br><br>
      💡 <em>Tip: Use our 1-click apply form on any job details page!</em>
    `;
  }

  if (q.includes("resume") || q.includes("cv") || q.includes("tips")) {
    return `
      📄 <strong>Top 3 Resume Optimization Tips:</strong><br>
      1. <strong>Quantify achievements:</strong> Use numbers like <em>"Improved performance by 40%"</em>.<br>
      2. <strong>Keywords:</strong> Include skills like <em>JavaScript, React, Node.js, AWS</em>.<br>
      3. <strong>Length:</strong> Keep it concise (1-2 pages maximum).
    `;
  }

  if (q.includes("hire") || q.includes("employer") || q.includes("post")) {
    return `
      💼 <strong>Employer Hiring Advice:</strong><br>
      You can post job listings directly using our <a href="employer-dashboard.html" style="color:#2563eb; font-weight:700;">Employer Hiring Portal</a>! You can also review candidates and update their application status in 1 click.
    `;
  }

  return `
    💡 I am here to help you navigate JobPulse! You can ask me about:<br>
    - Job recommendations tailored to your profile<br>
    - Resume & cover letter optimization<br>
    - Interview preparation strategies<br>
    - Employer hiring & job posting guides
  `;
}
