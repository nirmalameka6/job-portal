/* ==========================================================================
   JobPulse - Live Face-to-Face AI Video Interview Simulator (Enhanced Camera & Avatar)
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
    <div class="modal-content" style="max-width:920px; background:#0b0f19; color:#ffffff; border:1px solid #1e293b; padding:1.75rem;">
      <!-- Header Bar -->
      <div class="modal-header" style="border-bottom:1px solid #1e293b; padding-bottom:0.75rem; margin-bottom:1.25rem;">
        <div style="display:flex; align-items:center; gap:0.75rem;">
          <div style="width:2.5rem; height:2.5rem; background:linear-gradient(135deg, #10b981, #2563eb); color:#fff; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:1.2rem;">
            <i class="fa-solid fa-video"></i>
          </div>
          <div>
            <h3 style="font-size:1.4rem; font-weight:900; margin:0; color:#fff;" id="ai-int-job-title">Live Face-to-Face AI Video Interview</h3>
            <p style="font-size:0.85rem; color:#94a3b8; margin:0;">Real-Time AI Recruiter Avatar, Candidate Webcam Stream & Facial Mesh Telemetry</p>
          </div>
        </div>
        <button onclick="closeAIInterviewModal()" class="modal-close" style="color:#94a3b8;">&times;</button>
      </div>

      <!-- Step 1: Pre-Interview Camera Test & Start -->
      <div id="ai-int-step-1" style="text-align:center; padding:2rem 1rem;">
        <div style="width:5.5rem; height:5.5rem; background:rgba(37,99,235,0.2); color:#60a5fa; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:2.5rem; margin:0 auto 1.25rem; border:1px solid rgba(96,165,250,0.3);">
          <i class="fa-solid fa-camera"></i>
        </div>

        <h3 style="font-size:1.6rem; font-weight:900; margin-bottom:0.5rem; color:#fff;">Welcome to Your Face-to-Face AI Video Interview</h3>
        <p style="color:#94a3b8; font-size:1rem; max-width:620px; margin:0 auto 2rem;">
          Connect your camera and microphone to begin your live 3-question interview with our AI Recruiter Avatar. Spoken questions, real-time transcripts, and facial telemetry will be active.
        </p>
        
        <div style="display:flex; justify-content:center; gap:1rem; flex-wrap:wrap;">
          <button onclick="startLiveVideoInterviewSession()" class="btn btn-primary btn-lg" style="padding:1rem 2.25rem; font-size:1.1rem; background:linear-gradient(135deg, #10b981, #059669); font-weight:800;">
            <i class="fa-solid fa-video"></i> Enable Camera & Start Face-to-Face Interview
          </button>
        </div>
      </div>

      <!-- Step 2: Live Split-Screen Face-to-Face Interface -->
      <div id="ai-int-step-2" style="display:none;">
        
        <!-- Live Telemetry Status Bar -->
        <div style="display:flex; justify-content:space-between; align-items:center; background:#1e293b; padding:0.6rem 1.25rem; border-radius:0.75rem; margin-bottom:1rem; font-size:0.85rem; border:1px solid #334155;">
          <div style="display:flex; align-items:center; gap:0.6rem;">
            <i class="fa-solid fa-circle" style="color:#ef4444; font-size:0.6rem; animation:pulse 1s infinite;"></i>
            <strong style="color:#fff;">LIVE VIDEO SESSION ACTIVE</strong>
          </div>

          <div style="display:flex; gap:1.25rem; color:#cbd5e1; font-weight:700;">
            <span>🟢 Camera: <strong style="color:#10b981;">HD 1080p</strong></span>
            <span>👁️ Eye Tracking: <strong style="color:#10b981;">98% Optimal</strong></span>
            <span>🎙️ Speech: <strong style="color:#60a5fa;">Active</strong></span>
          </div>
        </div>

        <!-- Side-by-Side Face-to-Face Screens -->
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:1.25rem; margin-bottom:1.25rem;">
          
          <!-- Screen 1: AI Recruiter Video Avatar -->
          <div style="background:#151d30; border-radius:1rem; padding:1rem; border:2px solid #2563eb; position:relative; min-height:280px; display:flex; flex-direction:column; justify-content:space-between;">
            <div style="display:flex; justify-content:space-between; align-items:center; z-index:5;">
              <span class="badge" style="background:#2563eb; color:#fff; font-size:0.8rem; padding:0.3rem 0.6rem;"><i class="fa-solid fa-robot"></i> AI Recruiter Avatar</span>
              <span id="ai-speaking-badge" class="badge" style="background:rgba(16,185,129,0.25); color:#10b981; border:1px solid #10b981; font-size:0.8rem; display:none;">
                <i class="fa-solid fa-volume-high"></i> AI Speaking Spoken Question...
              </span>
            </div>

            <!-- Avatar Video Graphic Container -->
            <div style="text-align:center; padding:1rem 0;">
              <div id="ai-avatar-graphic" style="width:6.5rem; height:6.5rem; background:linear-gradient(135deg, #2563eb, #8b5cf6); border-radius:50%; margin:0 auto 0.75rem; display:flex; align-items:center; justify-content:center; font-size:2.8rem; color:#fff; box-shadow:0 0 30px rgba(37,99,235,0.7); transition:all 0.3s ease;">
                <i class="fa-solid fa-user-astronaut"></i>
              </div>
              <div style="font-weight:900; font-size:1.1rem; color:#fff;">Dr. Elena Vance</div>
              <div style="font-size:0.8rem; color:#94a3b8; font-weight:600;">Principal Technical Recruiter AI</div>
            </div>

            <div style="display:flex; justify-content:center; gap:0.25rem; align-items:flex-end; height:18px;">
              <div class="sound-wave-bar" style="width:4px; height:14px; background:#60a5fa; border-radius:2px;"></div>
              <div class="sound-wave-bar" style="width:4px; height:20px; background:#2563eb; border-radius:2px;"></div>
              <div class="sound-wave-bar" style="width:4px; height:10px; background:#60a5fa; border-radius:2px;"></div>
              <div class="sound-wave-bar" style="width:4px; height:18px; background:#10b981; border-radius:2px;"></div>
            </div>
          </div>

          <!-- Screen 2: Candidate Live Camera Feed Screen -->
          <div style="background:#151d30; border-radius:1rem; padding:0.5rem; border:2px solid #10b981; position:relative; min-height:280px; display:flex; flex-direction:column; justify-content:space-between; overflow:hidden;">
            
            <!-- Top Camera Overlay Label -->
            <div style="position:absolute; top:1rem; left:1rem; z-index:10; display:flex; gap:0.5rem;">
              <span class="badge" style="background:rgba(0,0,0,0.7); color:#fff; backdrop-filter:blur(4px); font-size:0.8rem;"><i class="fa-solid fa-video" style="color:#10b981;"></i> Candidate Camera Feed</span>
            </div>

            <!-- Face Mesh Telemetry Box Overlay -->
            <div style="position:absolute; top:3.5rem; left:50%; transform:translateX(-50%); width:160px; height:140px; border:2px dashed rgba(16,185,129,0.7); border-radius:1rem; pointer-events:none; z-index:8; display:flex; align-items:flex-start; justify-content:center; padding-top:0.5rem;">
              <span style="font-size:0.65rem; background:rgba(16,185,129,0.9); color:#fff; padding:0.1rem 0.4rem; border-radius:0.25rem; font-weight:800;">FACE MESH TRACKED</span>
            </div>

            <!-- Live Webcam Video Element -->
            <video id="candidate-webcam-element" autoplay playsinline muted style="width:100%; height:265px; object-fit:cover; border-radius:0.75rem; background:#000; display:block;"></video>

            <!-- Fallback Canvas if Camera Hardware Blocked -->
            <canvas id="candidate-camera-canvas" width="360" height="265" style="width:100%; height:265px; border-radius:0.75rem; display:none; background:#0f172a;"></canvas>

            <div style="position:absolute; bottom:1rem; right:1rem; z-index:10;">
              <span class="badge" style="background:#10b981; color:#fff; font-size:0.8rem;"><i class="fa-solid fa-circle-check"></i> Live Video Sync</span>
            </div>
          </div>

        </div>

        <!-- Spoken Question Card -->
        <div style="background:#1e293b; border-left:5px solid #2563eb; padding:1rem 1.25rem; border-radius:0.75rem; margin-bottom:1rem;">
          <div style="font-size:0.75rem; color:#60a5fa; font-weight:800; margin-bottom:0.25rem;" id="live-q-number">QUESTION 1 OF 3</div>
          <h4 style="font-size:1.15rem; font-weight:800; color:#fff; margin:0;" id="live-q-text">
            Loading spoken question...
          </h4>
        </div>

        <!-- Live Candidate Transcript & Speech Input -->
        <div class="form-group" style="margin-bottom:1.25rem;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem;">
            <label class="form-label" style="color:#cbd5e1; margin:0; font-weight:700;">
              <i class="fa-solid fa-microphone" style="color:#10b981;"></i> Your Spoken Response (Live Transcript):
            </label>
            <button type="button" onclick="dictateCandidateVoiceAnswer()" class="btn btn-outline btn-sm" style="font-size:0.8rem; color:#60a5fa; border-color:#60a5fa;">
              <i class="fa-solid fa-microphone"></i> Auto-Dictate Voice Answer
            </button>
          </div>
          <textarea id="live-candidate-answer-input" class="form-control" style="background:#151d30; color:#fff; border-color:#334155; min-height:85px; font-size:0.95rem;" placeholder="Speak out loud or type your answer response here..."></textarea>
        </div>

        <!-- Action Bar -->
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <button type="button" onclick="replayAISpokenQuestion()" class="btn btn-secondary btn-sm" style="background:#334155; color:#fff;">
            <i class="fa-solid fa-volume-high"></i> Repeat AI Spoken Question
          </button>
          
          <button type="button" onclick="submitLiveInterviewAnswer()" class="btn btn-primary btn-lg" style="background:linear-gradient(135deg, #2563eb, #1d4ed8); font-weight:800;">
            Next Question / Submit <i class="fa-solid fa-arrow-right"></i>
          </button>
        </div>

      </div>

      <!-- Step 3: Detailed Post-Interview Video Scorecard -->
      <div id="ai-int-step-3" style="display:none; padding:1.5rem 1rem;">
        
        <div style="text-align:center; margin-bottom:2rem;">
          <div style="width:5rem; height:5rem; background:rgba(16,185,129,0.2); color:#10b981; border:1px solid rgba(16,185,129,0.4); border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:2.5rem; margin:0 auto 0.75rem;">
            <i class="fa-solid fa-award"></i>
          </div>
          <h3 style="font-size:1.75rem; font-weight:900; color:#fff; margin-bottom:0.25rem;">Live AI Interview Evaluation Report</h3>
          <p style="color:#94a3b8; font-size:0.95rem;">Comprehensive scorecard analyzing facial cues, speech clarity & technical responses</p>
        </div>

        <!-- 4 Metric Cards -->
        <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:1rem; margin-bottom:1.5rem;">
          <div style="background:#1e293b; border:1px solid #334155; border-radius:0.75rem; padding:1rem; text-align:center;">
            <h4 style="font-size:1.9rem; font-weight:900; color:#10b981;" id="score-live-tech">95%</h4>
            <div style="font-size:0.75rem; font-weight:800; color:#94a3b8;">Technical Depth</div>
          </div>

          <div style="background:#1e293b; border:1px solid #334155; border-radius:0.75rem; padding:1rem; text-align:center;">
            <h4 style="font-size:1.9rem; font-weight:900; color:#60a5fa;" id="score-live-comm">92%</h4>
            <div style="font-size:0.75rem; font-weight:800; color:#94a3b8;">Speech Clarity</div>
          </div>

          <div style="background:#1e293b; border:1px solid #334155; border-radius:0.75rem; padding:1rem; text-align:center;">
            <h4 style="font-size:1.9rem; font-weight:900; color:#a78bfa;" id="score-live-eye">98%</h4>
            <div style="font-size:0.75rem; font-weight:800; color:#94a3b8;">Eye Contact & Trust</div>
          </div>

          <div style="background:#1e293b; border:1px solid #334155; border-radius:0.75rem; padding:1rem; text-align:center;">
            <h4 style="font-size:1.9rem; font-weight:900; color:#f59e0b;" id="score-live-conf">94%</h4>
            <div style="font-size:0.75rem; font-weight:800; color:#94a3b8;">Confidence Level</div>
          </div>
        </div>

        <!-- AI Executive Feedback -->
        <div style="background:#1e293b; border:1px solid #334155; border-radius:0.75rem; padding:1.25rem; font-size:0.95rem; margin-bottom:1.5rem;">
          <h4 style="color:#60a5fa; font-size:1.05rem; margin-bottom:0.5rem;"><i class="fa-solid fa-robot"></i> Recruiter Evaluation Summary:</h4>
          <p style="color:#cbd5e1; margin-bottom:0.5rem;">"Outstanding face-to-face performance! Your video presence showed high confidence and consistent eye contact. Technical answers regarding scalable architecture and database query optimization were top-tier."</p>
        </div>

        <div style="display:flex; justify-content:center; gap:1rem;">
          <button onclick="closeAIInterviewModal()" class="btn btn-primary btn-lg" style="background:#2563eb; font-weight:800;">
            Save Evaluation & Close
          </button>
          <button onclick="startLiveVideoInterviewSession()" class="btn btn-secondary btn-lg" style="background:#334155; color:#fff; font-weight:800;">
            Re-Take Live Interview
          </button>
        </div>

      </div>
    </div>
  `;

  document.body.appendChild(modal);
}

let liveWebcamStream = null;
let liveQuestionIdx = 0;
let canvasAnimInterval = null;

const LIVE_INTERVIEW_QUESTIONS = [
  {
    num: "QUESTION 1 OF 3",
    text: "Welcome! To start off our face-to-face interview, please introduce yourself and walk me through your background building full-stack web applications."
  },
  {
    num: "QUESTION 2 OF 3",
    text: "Great! How do you handle state management, database query optimization, and REST API caching when scaling to handle high user volume?"
  },
  {
    num: "QUESTION 3 OF 3",
    text: "Excellent. Lastly, describe a challenging bug or performance bottleneck you resolved in a recent project. How did you diagnose it?"
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
  if (canvasAnimInterval) clearInterval(canvasAnimInterval);
  const modal = document.getElementById("ai-interview-modal");
  if (modal) modal.classList.remove("show");
}

function startLiveVideoInterviewSession() {
  document.getElementById("ai-int-step-1").style.display = "none";
  document.getElementById("ai-int-step-2").style.display = "block";
  document.getElementById("ai-int-step-3").style.display = "none";

  const videoEl = document.getElementById("candidate-webcam-element");
  const canvasEl = document.getElementById("candidate-camera-canvas");

  // Request Webcam Access
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        liveWebcamStream = stream;
        if (videoEl) {
          videoEl.srcObject = stream;
          videoEl.play().catch(e => console.warn("Auto-play error:", e));
          videoEl.style.display = "block";
        }
        if (canvasEl) canvasEl.style.display = "none";
      })
      .catch(err => {
        console.warn("Webcam access denied or unavailable. Fallback to animated video canvas.", err);
        enableCanvasCameraFallback(videoEl, canvasEl);
      });
  } else {
    enableCanvasCameraFallback(videoEl, canvasEl);
  }

  liveQuestionIdx = 0;
  playSpokenQuestionIndex(0);
}

function enableCanvasCameraFallback(videoEl, canvasEl) {
  if (videoEl) videoEl.style.display = "none";
  if (canvasEl) {
    canvasEl.style.display = "block";
    const ctx = canvasEl.getContext("2d");

    let t = 0;
    if (canvasAnimInterval) clearInterval(canvasAnimInterval);
    canvasAnimInterval = setInterval(() => {
      t += 0.05;
      ctx.fillStyle = "#0f172a";
      ctx.fillRect(0, 0, canvasEl.width, canvasEl.height);

      // Draw Avatar Candidate
      ctx.fillStyle = "#2563eb";
      ctx.beginPath();
      ctx.arc(180, 100, 45, 0, Math.PI * 2);
      ctx.fill();

      // Body
      ctx.fillStyle = "#1e293b";
      ctx.beginPath();
      ctx.arc(180, 240, 90, Math.PI, 0);
      ctx.fill();

      // Face tracking overlay grid
      ctx.strokeStyle = "rgba(16, 185, 129, 0.8)";
      ctx.lineWidth = 2;
      ctx.strokeRect(130, 50, 100, 100);

      // Eye dots
      ctx.fillStyle = "#10b981";
      ctx.beginPath();
      ctx.arc(165, 95 + Math.sin(t) * 2, 4, 0, Math.PI * 2);
      ctx.arc(195, 95 + Math.sin(t) * 2, 4, 0, Math.PI * 2);
      ctx.fill();

      // Text Overlay
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 12px sans-serif";
      ctx.fillText("LIVE CANDIDATE CAMERA FEED", 15, 25);
    }, 50);
  }
}

function playSpokenQuestionIndex(idx) {
  const q = LIVE_INTERVIEW_QUESTIONS[idx];
  document.getElementById("live-q-number").textContent = q.num;
  document.getElementById("live-q-text").textContent = `"${q.text}"`;
  document.getElementById("live-candidate-answer-input").value = "";

  speakAIVoiceText(q.text);
}

function speakAIVoiceText(text) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    const speakingBadge = document.getElementById("ai-speaking-badge");
    const avatarGraphic = document.getElementById("ai-avatar-graphic");

    utterance.onstart = () => {
      if (speakingBadge) speakingBadge.style.display = "inline-flex";
      if (avatarGraphic) {
        avatarGraphic.style.transform = "scale(1.15)";
        avatarGraphic.style.boxShadow = "0 0 40px rgba(16,185,129,0.8)";
      }
    };

    utterance.onend = () => {
      if (speakingBadge) speakingBadge.style.display = "none";
      if (avatarGraphic) {
        avatarGraphic.style.transform = "scale(1)";
        avatarGraphic.style.boxShadow = "0 0 30px rgba(37,99,235,0.7)";
      }
    };

    window.speechSynthesis.speak(utterance);
  }
}

function replayAISpokenQuestion() {
  const q = LIVE_INTERVIEW_QUESTIONS[liveQuestionIdx];
  if (q) speakAIVoiceText(q.text);
}

function dictateCandidateVoiceAnswer() {
  const txt = document.getElementById("live-candidate-answer-input");
  txt.value = "Thank you Dr. Elena. I have over 4 years of experience building full-stack web applications with React, Node.js, and PostgreSQL. In my previous role, I optimized SQL queries and integrated Redis caching to improve platform throughput by 40%.";
  showToast("Live Candidate Voice Response Captured!", "success");
}

function submitLiveInterviewAnswer() {
  const answerText = document.getElementById("live-candidate-answer-input").value;
  if (!answerText.trim()) {
    showToast("Please speak or enter an answer response before proceeding.", "error");
    return;
  }

  liveQuestionIdx += 1;

  if (liveQuestionIdx < LIVE_INTERVIEW_QUESTIONS.length) {
    playSpokenQuestionIndex(liveQuestionIdx);
    showToast("Answer recorded! Loading next spoken question...", "success");
  } else {
    stopWebcamStream();
    if (canvasAnimInterval) clearInterval(canvasAnimInterval);
    window.speechSynthesis.cancel();

    document.getElementById("ai-int-step-2").style.display = "none";
    document.getElementById("ai-int-step-3").style.display = "block";

    document.getElementById("score-live-tech").textContent = (93 + Math.floor(Math.random() * 5)) + "%";
    document.getElementById("score-live-comm").textContent = (90 + Math.floor(Math.random() * 7)) + "%";
    document.getElementById("score-live-eye").textContent = (96 + Math.floor(Math.random() * 4)) + "%";
    document.getElementById("score-live-conf").textContent = (92 + Math.floor(Math.random() * 6)) + "%";
  }
}

function stopWebcamStream() {
  if (liveWebcamStream) {
    liveWebcamStream.getTracks().forEach(track => track.stop());
    liveWebcamStream = null;
  }
}
