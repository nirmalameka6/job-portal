/* ==========================================================================
   JobPulse - AI Mock Interview Simulator
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initAIInterviewSimulatorUI();
});

function initAIInterviewSimulatorUI() {
  if (document.getElementById("ai-interview-modal")) return;

  const modal = document.createElement("div");
  modal.id = "ai-interview-modal";
  modal.className = "modal-backdrop";
  modal.innerHTML = `
    <div class="modal-content" style="max-width:700px;">
      <div class="modal-header">
        <div style="display:flex; align-items:center; gap:0.75rem;">
          <div style="width:2.5rem; height:2.5rem; background:linear-gradient(135deg, #10b981, #2563eb); color:#fff; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:1.2rem;">
            <i class="fa-solid fa-microphone"></i>
          </div>
          <div>
            <h3 style="font-size:1.35rem; font-weight:900; margin:0;" id="ai-int-job-title">AI Mock Interview Simulator</h3>
            <p style="font-size:0.85rem; color:var(--text-muted); margin:0;">Practice role-specific interview Q&A and receive instant AI performance scoring</p>
          </div>
        </div>
        <button onclick="closeAIInterviewModal()" class="modal-close">&times;</button>
      </div>

      <!-- Step 1: Start Simulation -->
      <div id="ai-int-step-1" style="text-align:center; padding:1.5rem 1rem;">
        <i class="fa-solid fa-headset" style="font-size:3rem; color:var(--primary); margin-bottom:1rem;"></i>
        <h4 style="font-size:1.2rem; font-weight:800; margin-bottom:0.5rem;">Ready to Practice Your Technical & HR Interview?</h4>
        <p style="color:var(--text-muted); font-size:0.95rem; margin-bottom:1.5rem;">Our AI Interviewer will ask you 3 tailored questions based on the job requirements. Submit your responses to get instant feedback!</p>
        
        <button onclick="startAIInterviewSession()" class="btn btn-primary btn-lg" style="width:100%;">
          Start AI Practice Session <i class="fa-solid fa-play"></i>
        </button>
      </div>

      <!-- Step 2: Interactive Q&A Session -->
      <div id="ai-int-step-2" style="display:none;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; font-size:0.85rem; font-weight:700; color:var(--primary);">
          <span><i class="fa-solid fa-circle" style="font-size:0.5rem; color:#10b981;"></i> SESSION IN PROGRESS</span>
          <span id="ai-int-question-number">Question 1 of 3</span>
        </div>

        <div style="background:var(--body-bg); border:1px solid var(--border-color); border-radius:var(--radius-lg); padding:1.25rem; margin-bottom:1.25rem;">
          <h4 style="font-weight:800; font-size:1.05rem; color:var(--text-main); margin-bottom:0.5rem;" id="ai-int-question-text">
            Question loading...
          </h4>
          <span class="badge badge-primary" id="ai-int-question-category">Technical Assessment</span>
        </div>

        <div class="form-group">
          <label class="form-label">Type Your Response / Speaking Transcript:</label>
          <textarea id="ai-int-user-response" class="form-control" style="min-height:120px;" placeholder="Type or dictate your answer to the interviewer..."></textarea>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center;">
          <button type="button" onclick="recordVoiceAnswerMock()" class="btn btn-outline btn-sm">
            <i class="fa-solid fa-microphone"></i> Simulated Voice Dictation
          </button>
          <button type="button" onclick="submitAIInterviewAnswer()" class="btn btn-primary">
            Submit Answer <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>

      <!-- Step 3: Performance Feedback Scorecard -->
      <div id="ai-int-step-3" style="display:none; text-align:center; padding:1.5rem 1rem;">
        <div style="width:4.5rem; height:4.5rem; background:var(--accent-light); color:var(--accent); border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:2rem; margin:0 auto 1rem;">
          <i class="fa-solid fa-trophy"></i>
        </div>

        <h3 style="font-size:1.5rem; font-weight:900; margin-bottom:0.25rem;">Interview Practice Completed!</h3>
        <p style="color:var(--text-muted); font-size:0.95rem; margin-bottom:1.5rem;">Here is your instant AI performance evaluation score:</p>

        <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:1rem; margin-bottom:1.5rem;">
          <div style="background:var(--body-bg); border:1px solid var(--border-color); border-radius:var(--radius-lg); padding:1rem;">
            <h4 style="font-size:1.75rem; font-weight:900; color:var(--accent);" id="score-tech">92%</h4>
            <div style="font-size:0.8rem; font-weight:700; color:var(--text-muted);">Technical Accuracy</div>
          </div>

          <div style="background:var(--body-bg); border:1px solid var(--border-color); border-radius:var(--radius-lg); padding:1rem;">
            <h4 style="font-size:1.75rem; font-weight:900; color:var(--primary);" id="score-comm">88%</h4>
            <div style="font-size:0.8rem; font-weight:700; color:var(--text-muted);">Communication</div>
          </div>

          <div style="background:var(--body-bg); border:1px solid var(--border-color); border-radius:var(--radius-lg); padding:1rem;">
            <h4 style="font-size:1.75rem; font-weight:900; color:var(--purple-glow, #8b5cf6);" id="score-problem">95%</h4>
            <div style="font-size:0.8rem; font-weight:700; color:var(--text-muted);">Problem Solving</div>
          </div>
        </div>

        <div style="background:var(--body-bg); border:1px solid var(--border-color); border-radius:var(--radius-lg); padding:1rem; text-align:left; font-size:0.9rem; margin-bottom:1.5rem;">
          <strong>🤖 AI Feedback Summary:</strong><br>
          "Excellent structure and technical depth in your responses! Great mention of state management and error boundary patterns. Recommended to elaborate slightly more on database indexing performance."
        </div>

        <div style="display:flex; gap:1rem; justify-content:center;">
          <button onclick="closeAIInterviewModal()" class="btn btn-primary">Done & Close</button>
          <button onclick="startAIInterviewSession()" class="btn btn-secondary">Practice Again</button>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
}

let currentIntQuestionIdx = 0;
const MOCK_QUESTIONS = [
  {
    category: "Technical Architecture",
    question: "Can you explain how you handle state management, asynchronous API calls, and caching in high-traffic web applications?"
  },
  {
    category: "Problem Solving",
    question: "Describe a challenging bug or performance bottleneck you encountered in a recent project and how you resolved it."
  },
  {
    category: "Culture & Teamwork",
    question: "How do you prioritize competing deadlines and collaborate with cross-functional product and design teams?"
  }
];

function openAIInterviewModal(jobTitle = "Software Engineer") {
  initAIInterviewSimulatorUI();
  document.getElementById("ai-int-job-title").textContent = `AI Practice: ${jobTitle}`;
  document.getElementById("ai-int-step-1").style.display = "block";
  document.getElementById("ai-int-step-2").style.display = "none";
  document.getElementById("ai-int-step-3").style.display = "none";
  
  const modal = document.getElementById("ai-interview-modal");
  if (modal) modal.classList.add("show");
}

function closeAIInterviewModal() {
  const modal = document.getElementById("ai-interview-modal");
  if (modal) modal.classList.remove("show");
}

function startAIInterviewSession() {
  currentIntQuestionIdx = 0;
  document.getElementById("ai-int-step-1").style.display = "none";
  document.getElementById("ai-int-step-2").style.display = "block";
  document.getElementById("ai-int-step-3").style.display = "none";
  loadQuestionIndex(0);
}

function loadQuestionIndex(idx) {
  const q = MOCK_QUESTIONS[idx];
  document.getElementById("ai-int-question-number").textContent = `Question ${idx + 1} of ${MOCK_QUESTIONS.length}`;
  document.getElementById("ai-int-question-text").textContent = `"${q.question}"`;
  document.getElementById("ai-int-question-category").textContent = q.category;
  document.getElementById("ai-int-user-response").value = "";
}

function recordVoiceAnswerMock() {
  const txt = document.getElementById("ai-int-user-response");
  txt.value = "In my recent projects, I implemented modular state management using Redux and React Query for caching. When handling high-traffic APIs, we integrated redis caching and optimized SQL queries to reduce response time by 40%.";
  showToast("Simulated voice dictation captured response!", "success");
}

function submitAIInterviewAnswer() {
  const resp = document.getElementById("ai-int-user-response").value;
  if (!resp.trim()) {
    showToast("Please enter or dictate an answer before proceeding.", "error");
    return;
  }

  currentIntQuestionIdx += 1;
  if (currentIntQuestionIdx < MOCK_QUESTIONS.length) {
    loadQuestionIndex(currentIntQuestionIdx);
    showToast("Answer recorded! Loading next question...", "success");
  } else {
    // Finish session
    document.getElementById("ai-int-step-2").style.display = "none";
    document.getElementById("ai-int-step-3").style.display = "block";
    
    // Generate scores
    document.getElementById("score-tech").textContent = (88 + Math.floor(Math.random() * 10)) + "%";
    document.getElementById("score-comm").textContent = (85 + Math.floor(Math.random() * 12)) + "%";
    document.getElementById("score-problem").textContent = (90 + Math.floor(Math.random() * 8)) + "%";
  }
}
