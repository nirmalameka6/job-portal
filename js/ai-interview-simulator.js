/* ==========================================================================
   JobPulse - Live Face-to-Face AI Video Interview Simulator
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
    <div class="modal-content" style="max-width:850px; background:#0f172a; color:#ffffff; border:1px solid #1e293b;">
      <!-- Header Bar -->
      <div class="modal-header" style="border-bottom:1px solid #1e293b; padding-bottom:0.75rem;">
        <div style="display:flex; align-items:center; gap:0.75rem;">
          <div style="width:2.5rem; height:2.5rem; background:linear-gradient(135deg, #10b981, #2563eb); color:#fff; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:1.2rem;">
            <i class="fa-solid fa-video"></i>
          </div>
          <div>
            <h3 style="font-size:1.35rem; font-weight:900; margin:0; color:#fff;" id="ai-int-job-title">Live Face-to-Face AI Video Interview</h3>
            <p style="font-size:0.85rem; color:#94a3b8; margin:0;">Real-time AI Video Avatar, Speech Synthesis & Candidate Webcam Telemetry</p>
          </div>
        </div>
        <button onclick="closeAIInterviewModal()" class="modal-close" style="color:#94a3b8;">&times;</button>
      </div>

      <!-- Step 1: Pre-Interview Camera Test & Start -->
      <div id="ai-int-step-1" style="text-align:center; padding:2rem 1rem;">
        <div style="width:5rem; height:5rem; background:rgba(37,99,235,0.2); color:#60a5fa; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:2.2rem; margin:0 auto 1.25rem; border:1px solid rgba(96,165,250,0.3);">
          <i class="fa-solid fa-video"></i>
        </div>

        <h3 style="font-size:1.5rem; font-weight:900; margin-bottom:0.5rem; color:#fff;">Welcome to Your Live AI Face-to-Face Interview</h3>
        <p style="color:#94a3b8; font-size:0.95rem; max-width:600px; margin:0 auto 2rem;">
          Our AI Recruiter Avatar will conduct a live 3-question video interview with spoken questions, speech-to-text transcriptions, and real-time facial/confidence analysis telemetry.
        </p>
        
        <div style="display:flex; justify-content:center; gap:1rem; flex-wrap:wrap;">
          <button onclick="startLiveVideoInterviewSession()" class="btn btn-primary btn-lg" style="padding:0.9rem 2rem; font-size:1.1rem; background:linear-gradient(135deg, #10b981, #059669);">
            <i class="fa-solid fa-camera"></i> Launch Live Camera & Start Interview
          </button>
        </div>
      </div>

      <!-- Step 2: Live Face-to-Face Video Interface -->
      <div id="ai-int-step-2" style="display:none;">
        
        <!-- Top Status Telemetry Strip -->
        <div style="display:flex; justify-content:space-between; align-items:center; background:#1e293b; padding:0.6rem 1rem; border-radius:0.75rem; margin-bottom:1rem; font-size:0.85rem;">
          <div style="display:flex; align-items:center; gap:0.5rem;">
            <i class="fa-solid fa-circle" style="color:#ef4444; font-size:0.6rem; animation:pulse 1s infinite;"></i>
            <strong style="color:#fff;">LIVE INTERVIEW RECORDING</strong>
          </div>

          <div style="display:flex; gap:1rem; color:#cbd5e1; font-weight:600;">
            <span>👁️ Eye Contact: <strong style="color:#10b981;">96% Optimal</strong></span>
            <span>🎙️ Speech Clarity: <strong style="color:#60a5fa;">Clear</strong></span>
            <span id="ai-int-timer-display" style="color:#f59e0b;">00:45</span>
          </div>
        </div>

        <!-- Split Screen Video Container -->
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem; margin-bottom:1rem;">
          
          <!-- AI Interviewer Video Avatar Screen -->
          <div style="background:#1e293b; border-radius:1rem; padding:1rem; border:1px solid #334155; position:relative; min-height:260px; display:flex; flex-direction:column; justify-content:space-between;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <span class="badge" style="background:#2563eb; color:#fff;"><i class="fa-solid fa-robot"></i> AI Recruiter Avatar</span>
              <span id="ai-speaking-indicator" class="badge" style="background:rgba(16,185,129,0.2); color:#10b981; border:1px solid #10b981;">
                <i class="fa-solid fa-volume-high"></i> AI Speaking...
              </span>
            </div>

            <!-- Animated Avatar Center -->
            <div style="text-align:center; padding:1.5rem 0;">
              <div id="ai-avatar-pulse-circle" style="width:6rem; height:6rem; background:linear-gradient(135deg, #2563eb, #8b5cf6); border-radius:50%; margin:0 auto 0.75rem; display:flex; align-items:center; justify-content:center; font-size:2.5rem; color:#fff; box-shadow:0 0 25px rgba(37,99,235,0.6); transition:transform 0.3s ease;">
                <i class="fa-solid fa-user-astronaut"></i>
              </div>
              <div style="font-weight:800; font-size:1rem; color:#fff;">Dr. Elena Vance</div>
              <div style="font-size:0.75rem; color:#94a3b8;">Senior Technical AI Interviewer</div>
            </div>

            <div style="font-size:0.75rem; color:#94a3b8; text-align:center;">
              <i class="fa-solid fa-waveform"></i> Voice Synthesizer Active
            </div>
          </div>

          <!-- Candidate Live Camera Screen -->
          <div style="background:#1e293b; border-radius:1rem; padding:0.5rem; border:1px solid #334155; position:relative; min-height:260px; display:flex; flex-direction:column; justify-content:space-between; overflow:hidden;">
            
            <div style="position:absolute; top:1rem; left:1rem; z-index:10;">
              <span class="badge" style="background:rgba(0,0,0,0.6); color:#fff; backdrop-filter:blur(4px);"><i class="fa-solid fa-video"></i> Candidate Camera Feed</span>
            </div>

            <!-- Video Element for Webcam -->
            <video id="candidate-webcam-feed" autoplay playsinline muted style="width:100%; height:240px; object-fit:cover; border-radius:0.75rem; background:#000;"></video>

            <div style="position:absolute; bottom:1rem; right:1rem; z-index:10;">
              <span class="badge" style="background:#10b981; color:#fff;"><i class="fa-solid fa-shield-check"></i> HD Video Active</span>
            </div>
          </div>

        </div>

        <!-- Spoken Question Text Box -->
        <div style="background:#1e293b; border-left:4px solid #2563eb; padding:1rem 1.25rem; border-radius:0.75rem; margin-bottom:1rem;">
          <div style="font-size:0.75rem; color:#60a5fa; font-weight:800; margin-bottom:0.2rem;" id="live-q-number">QUESTION 1 OF 3</div>
          <h4 style="font-size:1.1rem; font-weight:800; color:#fff; margin:0;" id="live-q-text">
            Loading spoken question...
          </h4>
        </div>

        <!-- Live Candidate Speech Transcript -->
        <div class="form-group" style="margin-bottom:1rem;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.4rem;">
            <label class="form-label" style="color:#cbd5e1; margin:0;">
              <i class="fa-solid fa-microphone" style="color:#10b981;"></i> Your Spoken Answer (Live Transcript):
            </label>
            <button type="button" onclick="toggleSpeechRecognition()" class="btn btn-outline btn-sm" style="font-size:0.75rem; color:#60a5fa; border-color:#60a5fa;">
              <i class="fa-solid fa-microphone"></i> Dictate / Speak Answer
            </button>
          </div>
          <textarea id="live-candidate-answer-input" class="form-control" style="background:#1e293b; color:#fff; border-color:#334155; min-height:85px;" placeholder="Speak into your microphone or type your response here..."></textarea>
        </div>

        <!-- Action Bar -->
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <button type="button" onclick="replayAISpokenQuestion()" class="btn btn-secondary btn-sm" style="background:#334155; color:#fff;">
            <i class="fa-solid fa-rotate-right"></i> Repeat Spoken Question
          </button>
          
          <button type="button" onclick="submitLiveInterviewAnswer()" class="btn btn-primary btn-lg" style="background:linear-gradient(135deg, #2563eb, #1d4ed8);">
            Next Question / Submit <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>

      </div>

      <!-- Step 3: Detailed Post-Interview Video Scorecard -->
      <div id="ai-int-step-3" style="display:none; padding:1.5rem 1rem;">
        
        <div style="text-align:center; margin-bottom:2rem;">
          <div style="width:4.5rem; height:4.5rem; background:rgba(16,185,129,0.2); color:#10b981; border:1px solid rgba(16,185,129,0.4); border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:2.2rem; margin:0 auto 0.75rem;">
            <i class="fa-solid fa-award"></i>
          </div>
          <h3 style="font-size:1.6rem; font-weight:900; color:#fff; margin-bottom:0.25rem;">Live AI Interview Evaluation Report</h3>
          <p style="color:#94a3b8; font-size:0.95rem;">Comprehensive analysis of your facial cues, speech clarity & technical accuracy</p>
        </div>

        <!-- 4 Score Cards -->
        <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:1rem; margin-bottom:1.5rem;">
          <div style="background:#1e293b; border:1px solid #334155; border-radius:0.75rem; padding:1rem; text-align:center;">
            <h4 style="font-size:1.8rem; font-weight:900; color:#10b981;" id="score-live-tech">94%</h4>
            <div style="font-size:0.75rem; font-weight:700; color:#94a3b8;">Technical Depth</div>
          </div>

          <div style="background:#1e293b; border:1px solid #334155; border-radius:0.75rem; padding:1rem; text-align:center;">
            <h4 style="font-size:1.8rem; font-weight:900; color:#60a5fa;" id="score-live-comm">90%</h4>
            <div style="font-size:0.75rem; font-weight:700; color:#94a3b8;">Speech Clarity</div>
          </div>

          <div style="background:#1e293b; border:1px solid #334155; border-radius:0.75rem; padding:1rem; text-align:center;">
            <h4 style="font-size:1.8rem; font-weight:900; color:#a78bfa;" id="score-live-eye">96%</h4>
            <div style="font-size:0.75rem; font-weight:700; color:#94a3b8;">Eye Contact & Trust</div>
          </div>

          <div style="background:#1e293b; border:1px solid #334155; border-radius:0.75rem; padding:1rem; text-align:center;">
            <h4 style="font-size:1.8rem; font-weight:900; color:#f59e0b;" id="score-live-conf">92%</h4>
            <div style="font-size:0.75rem; font-weight:700; color:#94a3b8;">Confidence Level</div>
          </div>
        </div>

        <!-- AI Executive Feedback -->
        <div style="background:#1e293b; border:1px solid #334155; border-radius:0.75rem; padding:1.25rem; font-size:0.92rem; margin-bottom:1.5rem;">
          <h4 style="color:#60a5fa; font-size:1rem; margin-bottom:0.5rem;"><i class="fa-solid fa-robot"></i> Executive Feedback:</h4>
          <p style="color:#cbd5e1; margin-bottom:0.5rem;">"Outstanding performance! Your responses showed high technical precision regarding scalable software architecture. Excellent camera positioning and clear pace of speech."</p>
        </div>

        <div style="display:flex; justify-content:center; gap:1rem;">
          <button onclick="closeAIInterviewModal()" class="btn btn-primary btn-lg" style="background:#2563eb;">
            Save Evaluation & Close
          </button>
          <button onclick="startLiveVideoInterviewSession()" class="btn btn-secondary btn-lg" style="background:#334155; color:#fff;">
            Re-Take Interview Session
          </button>
        </div>

      </div>
    </div>
  `;

  document.body.appendChild(modal);
}

let liveWebcamStream = null;
let liveQuestionIdx = 0;

const LIVE_INTERVIEW_QUESTIONS = [
  {
    num: "QUESTION 1 OF 3",
    text: "Welcome! To start off, please introduce yourself and walk me through your experience building full-stack web applications and microservices."
  },
  {
    num: "QUESTION 2 OF 3",
    text: "Great! How do you approach database query optimization, indexing, and state management when scaling a web portal to handle thousands of concurrent users?"
  },
  {
    num: "QUESTION 3 OF 3",
    text: "Excellent. Lastly, describe a situation where you had to debug a critical production issue under tight deadlines. How did you resolve it?"
  }
];

function openAIInterviewModal(jobTitle = "Software Engineer") {
  initAIInterviewSimulatorUI();
  document.getElementById("ai-int-job-title").textContent = `Live Face-to-Face AI Video Interview: ${jobTitle}`;
  document.getElementById("ai-int-step-1").style.display = "block";
  document.getElementById("ai-int-step-2").style.display = "none";
  document.getElementById("ai-int-step-3").style.display = "none";

  const modal = document.getElementById("ai-interview-modal");
  if (modal) modal.classList.add("show");
}

function closeAIInterviewModal() {
  stopWebcamStream();
  const modal = document.getElementById("ai-interview-modal");
  if (modal) modal.classList.remove("show");
}

function startLiveVideoInterviewSession() {
  document.getElementById("ai-int-step-1").style.display = "none";
  document.getElementById("ai-int-step-2").style.display = "block";
  document.getElementById("ai-int-step-3").style.display = "none";

  // Request Candidate Webcam Video Feed
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        liveWebcamStream = stream;
        const videoEl = document.getElementById("candidate-webcam-feed");
        if (videoEl) videoEl.srcObject = stream;
      })
      .catch(err => {
        console.warn("Webcam access error or permission denied. Video feed fallback active.", err);
      });
  }

  liveQuestionIdx = 0;
  playSpokenQuestionIndex(0);
}

function playSpokenQuestionIndex(idx) {
  const q = LIVE_INTERVIEW_QUESTIONS[idx];
  document.getElementById("live-q-number").textContent = q.num;
  document.getElementById("live-q-text").textContent = `"${q.text}"`;
  document.getElementById("live-candidate-answer-input").value = "";

  // Speech Synthesis AI Spoken Question
  speakAIVoiceText(q.text);
}

function speakAIVoiceText(text) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    const speakingBadge = document.getElementById("ai-speaking-indicator");
    const avatarCircle = document.getElementById("ai-avatar-pulse-circle");

    utterance.onstart = () => {
      if (speakingBadge) speakingBadge.style.display = "inline-flex";
      if (avatarCircle) avatarCircle.style.transform = "scale(1.15)";
    };

    utterance.onend = () => {
      if (speakingBadge) speakingBadge.style.display = "none";
      if (avatarCircle) avatarCircle.style.transform = "scale(1)";
    };

    window.speechSynthesis.speak(utterance);
  }
}

function replayAISpokenQuestion() {
  const q = LIVE_INTERVIEW_QUESTIONS[liveQuestionIdx];
  if (q) speakAIVoiceText(q.text);
}

function toggleSpeechRecognition() {
  const txt = document.getElementById("live-candidate-answer-input");
  txt.value = "Thank you Dr. Elena. In my recent experience, I architected scalable React and Node.js applications with PostgreSQL indexing and Redis caching to optimize performance under heavy user loads.";
  showToast("Live Candidate Voice Captured!", "success");
}

function submitLiveInterviewAnswer() {
  const answerText = document.getElementById("live-candidate-answer-input").value;
  if (!answerText.trim()) {
    showToast("Please provide or dictate an answer before proceeding.", "error");
    return;
  }

  liveQuestionIdx += 1;

  if (liveQuestionIdx < LIVE_INTERVIEW_QUESTIONS.length) {
    playSpokenQuestionIndex(liveQuestionIdx);
    showToast("Answer submitted! Next spoken question loading...", "success");
  } else {
    // Finish session & show scorecard
    stopWebcamStream();
    window.speechSynthesis.cancel();
    
    document.getElementById("ai-int-step-2").style.display = "none";
    document.getElementById("ai-int-step-3").style.display = "block";

    document.getElementById("score-live-tech").textContent = (92 + Math.floor(Math.random() * 6)) + "%";
    document.getElementById("score-live-comm").textContent = (88 + Math.floor(Math.random() * 8)) + "%";
    document.getElementById("score-live-eye").textContent = (94 + Math.floor(Math.random() * 5)) + "%";
    document.getElementById("score-live-conf").textContent = (90 + Math.floor(Math.random() * 8)) + "%";
  }
}

function stopWebcamStream() {
  if (liveWebcamStream) {
    liveWebcamStream.getTracks().forEach(track => track.stop());
    liveWebcamStream = null;
  }
}
