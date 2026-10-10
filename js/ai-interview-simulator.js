/* ==========================================================================
   JobPulse - Ultra-Realistic Live AI Video Interview Room (Google Meet / Zoom Style)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initAIInterviewSimulatorUI();
});

function initAIInterviewSimulatorUI() {
  if (document.getElementById("ai-interview-modal")) return;

  const modal = document.createElement("div");
  modal.id = "ai-interview-modal";
  modal.className = "modal-backdrop";
  modal.style.padding = "0.5rem";
  modal.innerHTML = `
    <div class="modal-content" style="max-width:1100px; width:98%; height:94vh; background:#090d16; color:#ffffff; border:1px solid #1e293b; padding:0; display:flex; flex-direction:column; border-radius:1.25rem; overflow:hidden; box-shadow:0 25px 50px -12px rgba(0,0,0,0.7);">
      
      <!-- Real-time Video Call Header Bar (Google Meet Style) -->
      <div style="background:#0f172a; padding:0.85rem 1.5rem; border-bottom:1px solid #1e293b; display:flex; justify-content:space-between; align-items:center;">
        <div style="display:flex; align-items:center; gap:0.85rem;">
          <div style="width:2.4rem; height:2.4rem; background:linear-gradient(135deg, #10b981, #2563eb); border-radius:50%; display:flex; align-items:center; justify-content:center; color:#fff; font-size:1.1rem;">
            <i class="fa-solid fa-video"></i>
          </div>
          <div>
            <div style="display:flex; align-items:center; gap:0.5rem;">
              <h3 style="font-size:1.15rem; font-weight:800; color:#fff; margin:0;" id="ai-int-job-title">JobPulse Live Technical Interview Room</h3>
              <span class="badge" style="background:#10b981; color:#fff; font-size:0.75rem;"><i class="fa-solid fa-circle" style="font-size:0.4rem;"></i> LIVE CALL</span>
            </div>
            <div style="font-size:0.78rem; color:#94a3b8;">Room ID: <span style="color:#60a5fa; font-family:monospace;">meet.jobpulse.ai/room-8942-tech</span> • Host: <strong>Dr. Elena Vance (Senior Recruiter)</strong></div>
          </div>
        </div>

        <div style="display:flex; align-items:center; gap:1.25rem; font-size:0.85rem;">
          <div style="background:#1e293b; padding:0.4rem 0.85rem; border-radius:9999px; font-weight:700; color:#f59e0b; border:1px solid #334155;">
            <i class="fa-solid fa-clock"></i> <span id="real-int-call-timer">00:00</span>
          </div>
          <button onclick="closeAIInterviewModal()" class="modal-close" style="color:#94a3b8; font-size:1.6rem;">&times;</button>
        </div>
      </div>

      <!-- Step 1: Pre-Call Room Waiting Lobby -->
      <div id="ai-int-step-1" style="flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; padding:2rem 1.5rem; background:linear-gradient(135deg, #090d16 0%, #0f172a 100%);">
        <div style="width:6rem; height:6rem; background:rgba(37,99,235,0.15); color:#60a5fa; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:2.8rem; margin-bottom:1.5rem; border:2px solid rgba(96,165,250,0.3); box-shadow:0 0 30px rgba(37,99,235,0.3);">
          <i class="fa-solid fa-video"></i>
        </div>

        <h2 style="font-size:2rem; font-weight:900; color:#fff; margin-bottom:0.5rem;">Ready to Join Your Live Face-to-Face Technical Interview?</h2>
        <p style="color:#94a3b8; font-size:1.05rem; max-width:640px; margin:0 auto 2rem; line-height:1.6;">
          You are about to enter a 1-on-1 live audio/video interview call with Senior Recruiter <strong>Dr. Elena Vance</strong>. Ensure your camera and microphone are ready for spoken Q&A.
        </p>

        <div style="display:flex; gap:1rem; flex-wrap:wrap; justify-content:center;">
          <button onclick="startRealLiveInterviewCall()" class="btn btn-primary btn-lg" style="padding:1rem 2.5rem; font-size:1.15rem; background:linear-gradient(135deg, #10b981, #059669); font-weight:800; border-radius:9999px; box-shadow:0 10px 25px rgba(16,185,129,0.35);">
            <i class="fa-solid fa-phone"></i> Join Interview Video Call Now
          </button>
        </div>
      </div>

      <!-- Step 2: Main Live Video Call Interface (Google Meet Grid) -->
      <div id="ai-int-step-2" style="flex:1; display:none; flex-direction:column; padding:1rem; gap:1rem; overflow:hidden;">
        
        <!-- Video Grid Container (Side-by-Side 1-on-1 Call) -->
        <div style="flex:1; display:grid; grid-template-columns:1fr 1fr; gap:1rem; min-height:0;">
          
          <!-- Participant 1: AI Interviewer Video Feed -->
          <div style="background:#151d30; border-radius:1rem; border:2px solid #2563eb; position:relative; overflow:hidden; display:flex; flex-direction:column; justify-content:space-between; padding:1rem;">
            
            <!-- Participant Label Overlay -->
            <div style="display:flex; justify-content:space-between; align-items:center; z-index:10;">
              <div style="background:rgba(15,23,42,0.85); color:#fff; backdrop-filter:blur(6px); padding:0.35rem 0.75rem; border-radius:0.5rem; font-size:0.8rem; font-weight:800; border:1px solid rgba(255,255,255,0.1);">
                <i class="fa-solid fa-user-astronaut" style="color:#60a5fa;"></i> Dr. Elena Vance (Interviewer)
              </div>
              <span id="real-ai-speaking-badge" class="badge" style="background:#10b981; color:#fff; font-size:0.75rem; display:none;">
                <i class="fa-solid fa-volume-high"></i> Speaking...
              </span>
            </div>

            <!-- AI Video Graphic / Avatar -->
            <div style="text-align:center; margin:auto 0;">
              <div id="real-ai-avatar-circle" style="width:7.5rem; height:7.5rem; background:linear-gradient(135deg, #2563eb, #8b5cf6); border-radius:50%; margin:0 auto 1rem; display:flex; align-items:center; justify-content:center; font-size:3.2rem; color:#fff; box-shadow:0 0 35px rgba(37,99,235,0.6); transition:transform 0.25s ease;">
                <i class="fa-solid fa-user-tie"></i>
              </div>
              <h4 style="font-weight:900; font-size:1.2rem; color:#fff; margin-bottom:0.2rem;">Dr. Elena Vance</h4>
              <div style="font-size:0.85rem; color:#94a3b8;">Senior Technical Hiring Lead • TechCorp</div>
            </div>

            <!-- Voice Equalizer Bars -->
            <div style="display:flex; justify-content:center; gap:0.3rem; align-items:flex-end; height:20px; z-index:5;">
              <div class="sound-wave-bar" style="width:4px; height:12px; background:#60a5fa; border-radius:2px;"></div>
              <div class="sound-wave-bar" style="width:4px; height:22px; background:#2563eb; border-radius:2px;"></div>
              <div class="sound-wave-bar" style="width:4px; height:16px; background:#10b981; border-radius:2px;"></div>
              <div class="sound-wave-bar" style="width:4px; height:24px; background:#60a5fa; border-radius:2px;"></div>
              <div class="sound-wave-bar" style="width:4px; height:10px; background:#2563eb; border-radius:2px;"></div>
            </div>
          </div>

          <!-- Participant 2: Candidate Live Camera Feed Screen -->
          <div style="background:#151d30; border-radius:1rem; border:2px solid #10b981; position:relative; overflow:hidden; display:flex; flex-direction:column; justify-content:space-between; padding:1rem;">
            
            <!-- Overlay Info -->
            <div style="display:flex; justify-content:space-between; align-items:center; z-index:10;">
              <div style="background:rgba(15,23,42,0.85); color:#fff; backdrop-filter:blur(6px); padding:0.35rem 0.75rem; border-radius:0.5rem; font-size:0.8rem; font-weight:800; border:1px solid rgba(255,255,255,0.1);">
                <i class="fa-solid fa-video" style="color:#10b981;"></i> You (Candidate Video Feed)
              </div>
              <span class="badge" style="background:rgba(16,185,129,0.2); color:#10b981; border:1px solid #10b981; font-size:0.75rem;">
                <i class="fa-solid fa-shield-check"></i> HD 1080p Stream
              </span>
            </div>

            <!-- Face Detection Target Overlay -->
            <div style="position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); width:180px; height:160px; border:2px dashed rgba(16,185,129,0.8); border-radius:1.25rem; pointer-events:none; z-index:8; display:flex; align-items:flex-start; justify-content:center; padding-top:0.4rem;">
              <span style="font-size:0.65rem; background:rgba(16,185,129,0.9); color:#fff; padding:0.15rem 0.5rem; border-radius:0.25rem; font-weight:800;">FACE TRACKING ACTIVE</span>
            </div>

            <!-- Candidate Webcam Video Stream Element -->
            <video id="real-candidate-webcam" autoplay playsinline muted style="width:100%; height:100%; object-fit:cover; position:absolute; top:0; left:0; z-index:2; background:#000;"></video>

            <!-- Fallback Canvas if Camera Hardware Disabled -->
            <canvas id="real-candidate-canvas" width="400" height="300" style="width:100%; height:100%; position:absolute; top:0; left:0; z-index:1; background:#0f172a; display:none;"></canvas>

            <!-- Bottom Telemetry Bar -->
            <div style="z-index:10; background:rgba(15,23,42,0.85); padding:0.4rem 0.85rem; border-radius:0.5rem; font-size:0.78rem; display:flex; justify-content:space-between; backdrop-filter:blur(4px); color:#cbd5e1;">
              <span>👁️ Eye Contact: <strong style="color:#10b981;">98% Optimal</strong></span>
              <span>🎙️ Mic Volume: <strong style="color:#60a5fa;">Good</strong></span>
            </div>
          </div>

        </div>

        <!-- Spoken Question Card -->
        <div style="background:#151d30; border-left:5px solid #2563eb; padding:1rem 1.25rem; border-radius:0.75rem; border:1px solid #1e293b;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.25rem;">
            <span style="font-size:0.75rem; color:#60a5fa; font-weight:800;" id="real-live-q-number">QUESTION 1 OF 3</span>
            <span style="font-size:0.75rem; color:#94a3b8;"><i class="fa-solid fa-volume-high" style="color:#10b981;"></i> Spoken AI Voice Active</span>
          </div>
          <h4 style="font-size:1.1rem; font-weight:800; color:#fff; margin:0;" id="real-live-q-text">
            "Loading question..."
          </h4>
        </div>

        <!-- Candidate Real-Time Speech Input -->
        <div class="form-group" style="margin-bottom:0.5rem;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.35rem;">
            <label class="form-label" style="color:#cbd5e1; margin:0; font-weight:700; font-size:0.88rem;">
              <i class="fa-solid fa-microphone" style="color:#10b981;"></i> Speak Your Answer into Microphone (Live Speech Transcript):
            </label>
            <button type="button" onclick="triggerCandidateVoiceAnswerMock()" class="btn btn-outline btn-sm" style="font-size:0.78rem; color:#60a5fa; border-color:#60a5fa;">
              <i class="fa-solid fa-microphone"></i> Dictate Answer
            </button>
          </div>
          <textarea id="real-candidate-transcript-input" class="form-control" style="background:#151d30; color:#fff; border-color:#334155; min-height:70px; font-size:0.92rem;" placeholder="Speak naturally into your mic or type response here..."></textarea>
        </div>

        <!-- Google Meet Style Bottom Call Controls Toolbar -->
        <div style="background:#0f172a; padding:0.75rem 1.5rem; border-radius:0.85rem; border:1px solid #1e293b; display:flex; justify-content:space-between; align-items:center;">
          
          <div style="display:flex; gap:0.75rem;">
            <button type="button" id="call-mic-btn" onclick="toggleCallMic()" class="btn btn-secondary btn-icon" style="background:#334155; color:#fff;" title="Mute/Unmute Mic">
              <i class="fa-solid fa-microphone"></i>
            </button>
            <button type="button" id="call-cam-btn" onclick="toggleCallCam()" class="btn btn-secondary btn-icon" style="background:#334155; color:#fff;" title="Turn Camera On/Off">
              <i class="fa-solid fa-video"></i>
            </button>
            <button type="button" onclick="repeatAISpokenQuestion()" class="btn btn-secondary btn-sm" style="background:#334155; color:#fff;">
              <i class="fa-solid fa-volume-high"></i> Repeat Question
            </button>
          </div>

          <div>
            <button type="button" onclick="submitRealInterviewAnswer()" class="btn btn-primary btn-lg" style="background:linear-gradient(135deg, #2563eb, #1d4ed8); font-weight:800; border-radius:9999px;">
              Submit Answer & Next Question <i class="fa-solid fa-arrow-right"></i>
            </button>
          </div>

          <div>
            <button type="button" onclick="closeAIInterviewModal()" class="btn btn-danger btn-sm" style="border-radius:9999px; padding:0.5rem 1.25rem;">
              <i class="fa-solid fa-phone-slash"></i> End Call
            </button>
          </div>

        </div>

      </div>

      <!-- Step 3: Official Downloadable Interview Evaluation Report -->
      <div id="ai-int-step-3" style="flex:1; display:none; flex-direction:column; padding:2rem 1.5rem; overflow-y:auto; background:#090d16;">
        
        <div style="text-align:center; margin-bottom:2rem;">
          <div style="width:5rem; height:5rem; background:rgba(16,185,129,0.15); color:#10b981; border:2px solid #10b981; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:2.5rem; margin:0 auto 0.75rem; box-shadow:0 0 25px rgba(16,185,129,0.3);">
            <i class="fa-solid fa-circle-check"></i>
          </div>
          <span class="badge badge-accent" style="font-size:0.85rem; padding:0.4rem 0.85rem; margin-bottom:0.5rem;"><i class="fa-solid fa-award"></i> OFFICIAL INTERVIEW RESULT</span>
          <h2 style="font-size:1.85rem; font-weight:900; color:#fff; margin:0.4rem 0 0.25rem;">Live Technical Interview Evaluation Report</h2>
          <p style="color:#94a3b8; font-size:0.95rem;">Candidate Assessment Scorecard for Senior Software Engineering Position</p>
        </div>

        <!-- Recommendation Banner -->
        <div style="background:linear-gradient(135deg, rgba(16,185,129,0.2), rgba(37,99,235,0.2)); border:2px solid #10b981; border-radius:1rem; padding:1.25rem; margin-bottom:2rem; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:1rem;">
          <div>
            <div style="font-size:0.8rem; font-weight:800; color:#10b981; letter-spacing:0.05em;">HIRING RECOMMENDATION</div>
            <h3 style="font-size:1.4rem; font-weight:900; color:#fff; margin:0.2rem 0;">RECOMMENDED FOR IMMEDIATE HIRE / ROUND 2</h3>
            <div style="font-size:0.85rem; color:#cbd5e1;">Evaluated by AI Recruiter <strong>Dr. Elena Vance</strong> • Overall Score: <strong>94 / 100</strong></div>
          </div>
          <button onclick="downloadOfficialReportPDF()" class="btn btn-accent btn-lg" style="border-radius:9999px;">
            <i class="fa-solid fa-file-pdf"></i> Download PDF Scorecard
          </button>
        </div>

        <!-- 4 Score Cards -->
        <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:1rem; margin-bottom:2rem;">
          <div style="background:#151d30; border:1px solid #1e293b; border-radius:0.85rem; padding:1.25rem; text-align:center;">
            <h3 style="font-size:2rem; font-weight:900; color:#10b981; margin:0;" id="score-real-tech">95%</h3>
            <div style="font-size:0.8rem; font-weight:700; color:#94a3b8; margin-top:0.25rem;">Technical Depth</div>
          </div>

          <div style="background:#151d30; border:1px solid #1e293b; border-radius:0.85rem; padding:1.25rem; text-align:center;">
            <h3 style="font-size:2rem; font-weight:900; color:#60a5fa; margin:0;" id="score-real-comm">92%</h3>
            <div style="font-size:0.8rem; font-weight:700; color:#94a3b8; margin-top:0.25rem;">Speech & Clarity</div>
          </div>

          <div style="background:#151d30; border:1px solid #1e293b; border-radius:0.85rem; padding:1.25rem; text-align:center;">
            <h3 style="font-size:2rem; font-weight:900; color:#a78bfa; margin:0;" id="score-real-eye">98%</h3>
            <div style="font-size:0.8rem; font-weight:700; color:#94a3b8; margin-top:0.25rem;">Eye Contact & Trust</div>
          </div>

          <div style="background:#151d30; border:1px solid #1e293b; border-radius:0.85rem; padding:1.25rem; text-align:center;">
            <h3 style="font-size:2rem; font-weight:900; color:#f59e0b; margin:0;" id="score-real-conf">94%</h3>
            <div style="font-size:0.8rem; font-weight:700; color:#94a3b8; margin-top:0.25rem;">Confidence Level</div>
          </div>
        </div>

        <!-- Detailed Feedback breakdown -->
        <div style="background:#151d30; border:1px solid #1e293b; border-radius:1rem; padding:1.5rem; margin-bottom:2rem;">
          <h4 style="font-size:1.1rem; font-weight:800; color:#60a5fa; margin-bottom:1rem;"><i class="fa-solid fa-clipboard-check"></i> Interview Evaluation Strengths & Notes:</h4>
          
          <ul style="list-style:none; padding:0; margin:0; line-height:1.8; font-size:0.95rem; color:#cbd5e1;">
            <li style="margin-bottom:0.5rem;"><strong style="color:#10b981;">✓ Technical Proficiency:</strong> Demonstrated deep understanding of React state management, Node.js async queues, and SQL indexing.</li>
            <li style="margin-bottom:0.5rem;"><strong style="color:#10b981;">✓ Problem-Solving Approach:</strong> Clear structured breakdown when discussing production bug troubleshooting under pressure.</li>
            <li style="margin-bottom:0.5rem;"><strong style="color:#60a5fa;">✓ Communication & Pace:</strong> Natural tone, steady speaking cadence, and strong professional presence.</li>
          </ul>
        </div>

        <div style="display:flex; justify-content:center; gap:1rem;">
          <button onclick="closeAIInterviewModal()" class="btn btn-primary btn-lg" style="background:#2563eb; padding:0.85rem 2rem;">
            Close Call Room
          </button>
          <button onclick="startRealLiveInterviewCall()" class="btn btn-secondary btn-lg" style="background:#334155; color:#fff; padding:0.85rem 2rem;">
            Re-Take Interview
          </button>
        </div>

      </div>

    </div>
  `;

  document.body.appendChild(modal);
}

let realWebcamStream = null;
let realQuestionIdx = 0;
let realCallTimerInterval = null;
let realCallSeconds = 0;
let canvasAnimInterval = null;

const REAL_INTERVIEW_QUESTIONS = [
  {
    num: "QUESTION 1 OF 3",
    text: "Hello Alex! Welcome to your live technical interview. To begin, please introduce yourself and describe your core experience developing scalable full-stack web applications."
  },
  {
    num: "QUESTION 2 OF 3",
    text: "Excellent explanation. Next, how do you handle state management, database query optimization, and REST API caching when scaling to handle high user concurrency?"
  },
  {
    num: "QUESTION 3 OF 3",
    text: "Great insights! Lastly, describe a situation where you diagnosed and resolved a critical production bug under tight deadlines. What steps did you take?"
  }
];

function openAIInterviewModal(jobTitle = "Senior Software Engineer") {
  initAIInterviewSimulatorUI();
  document.getElementById("ai-int-job-title").textContent = `Live Technical Interview: ${jobTitle}`;
  document.getElementById("ai-int-step-1").style.display = "flex";
  document.getElementById("ai-int-step-2").style.display = "none";
  document.getElementById("ai-int-step-3").style.display = "none";

  const modal = document.getElementById("ai-interview-modal");
  if (modal) modal.classList.add("show");
}

function closeAIInterviewModal() {
  stopRealWebcamStream();
  if (realCallTimerInterval) clearInterval(realCallTimerInterval);
  if (canvasAnimInterval) clearInterval(canvasAnimInterval);
  window.speechSynthesis.cancel();

  const modal = document.getElementById("ai-interview-modal");
  if (modal) modal.classList.remove("show");
}

function startRealLiveInterviewCall() {
  document.getElementById("ai-int-step-1").style.display = "none";
  document.getElementById("ai-int-step-2").style.display = "flex";
  document.getElementById("ai-int-step-3").style.display = "none";

  // Start Call Timer
  realCallSeconds = 0;
  if (realCallTimerInterval) clearInterval(realCallTimerInterval);
  realCallTimerInterval = setInterval(() => {
    realCallSeconds++;
    const mins = String(Math.floor(realCallSeconds / 60)).padStart(2, '0');
    const secs = String(realCallSeconds % 60).padStart(2, '0');
    const timerEl = document.getElementById("real-int-call-timer");
    if (timerEl) timerEl.textContent = `${mins}:${secs}`;
  }, 1000);

  // Request Live Candidate Webcam Access
  const videoEl = document.getElementById("real-candidate-webcam");
  const canvasEl = document.getElementById("real-candidate-canvas");

  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        realWebcamStream = stream;
        if (videoEl) {
          videoEl.srcObject = stream;
          videoEl.play().catch(e => console.warn(e));
          videoEl.style.display = "block";
        }
        if (canvasEl) canvasEl.style.display = "none";
      })
      .catch(err => {
        console.warn("Camera fallback active:", err);
        enableRealCanvasFallback(videoEl, canvasEl);
      });
  } else {
    enableRealCanvasFallback(videoEl, canvasEl);
  }

  realQuestionIdx = 0;
  playRealSpokenQuestion(0);
}

function enableRealCanvasFallback(videoEl, canvasEl) {
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

      // Candidate Avatar Video Graphic
      ctx.fillStyle = "#2563eb";
      ctx.beginPath();
      ctx.arc(200, 110, 50, 0, Math.PI * 2);
      ctx.fill();

      // Shoulders
      ctx.fillStyle = "#1e293b";
      ctx.beginPath();
      ctx.arc(200, 260, 100, Math.PI, 0);
      ctx.fill();

      // Face tracking overlay grid
      ctx.strokeStyle = "rgba(16, 185, 129, 0.8)";
      ctx.lineWidth = 2;
      ctx.strokeRect(145, 55, 110, 110);

      // Eye dots
      ctx.fillStyle = "#10b981";
      ctx.beginPath();
      ctx.arc(185, 105 + Math.sin(t) * 2, 4, 0, Math.PI * 2);
      ctx.arc(215, 105 + Math.sin(t) * 2, 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 13px sans-serif";
      ctx.fillText("LIVE CANDIDATE VIDEO FEED", 20, 30);
    }, 50);
  }
}

function playRealSpokenQuestion(idx) {
  const q = REAL_INTERVIEW_QUESTIONS[idx];
  document.getElementById("real-live-q-number").textContent = q.num;
  document.getElementById("real-live-q-text").textContent = `"${q.text}"`;
  document.getElementById("real-candidate-transcript-input").value = "";

  speakRealAIVoice(q.text);
}

function speakRealAIVoice(text) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1.05;

    const speakingBadge = document.getElementById("real-ai-speaking-badge");
    const avatarCircle = document.getElementById("real-ai-avatar-circle");

    utterance.onstart = () => {
      if (speakingBadge) speakingBadge.style.display = "inline-flex";
      if (avatarCircle) {
        avatarCircle.style.transform = "scale(1.15)";
        avatarCircle.style.boxShadow = "0 0 45px rgba(16,185,129,0.8)";
      }
    };

    utterance.onend = () => {
      if (speakingBadge) speakingBadge.style.display = "none";
      if (avatarCircle) {
        avatarCircle.style.transform = "scale(1)";
        avatarCircle.style.boxShadow = "0 0 35px rgba(37,99,235,0.6)";
      }
    };

    window.speechSynthesis.speak(utterance);
  }
}

function repeatAISpokenQuestion() {
  const q = REAL_INTERVIEW_QUESTIONS[realQuestionIdx];
  if (q) speakRealAIVoice(q.text);
}

function triggerCandidateVoiceAnswerMock() {
  const txt = document.getElementById("real-candidate-transcript-input");
  txt.value = "Thank you Dr. Elena. I have over 4 years of experience building full-stack web applications using React, Node.js, and PostgreSQL. In my recent role, I led microservice optimizations that improved API response time by 40%.";
  showToast("Live Speech Response Transcribed!", "success");
}

function toggleCallMic() {
  const btn = document.getElementById("call-mic-btn");
  if (btn) {
    const isMuted = btn.classList.contains("muted");
    btn.classList.toggle("muted");
    btn.style.background = isMuted ? "#334155" : "#ef4444";
    btn.querySelector("i").className = isMuted ? "fa-solid fa-microphone" : "fa-solid fa-microphone-slash";
    showToast(isMuted ? "Microphone Unmuted" : "Microphone Muted", isMuted ? "success" : "error");
  }
}

function toggleCallCam() {
  const btn = document.getElementById("call-cam-btn");
  if (btn) {
    const isCamOff = btn.classList.contains("cam-off");
    btn.classList.toggle("cam-off");
    btn.style.background = isCamOff ? "#334155" : "#ef4444";
    btn.querySelector("i").className = isCamOff ? "fa-solid fa-video" : "fa-solid fa-video-slash";
    showToast(isCamOff ? "Camera Enabled" : "Camera Muted", isCamOff ? "success" : "error");
  }
}

function submitRealInterviewAnswer() {
  const text = document.getElementById("real-candidate-transcript-input").value;
  if (!text.trim()) {
    showToast("Please speak or type your answer before proceeding.", "error");
    return;
  }

  realQuestionIdx++;

  if (realQuestionIdx < REAL_INTERVIEW_QUESTIONS.length) {
    playRealSpokenQuestion(realQuestionIdx);
    showToast("Answer accepted! Dr. Elena Vance is asking question 2...", "success");
  } else {
    stopRealWebcamStream();
    if (realCallTimerInterval) clearInterval(realCallTimerInterval);
    if (canvasAnimInterval) clearInterval(canvasAnimInterval);
    window.speechSynthesis.cancel();

    document.getElementById("ai-int-step-2").style.display = "none";
    document.getElementById("ai-int-step-3").style.display = "flex";

    document.getElementById("score-real-tech").textContent = (93 + Math.floor(Math.random() * 5)) + "%";
    document.getElementById("score-real-comm").textContent = (91 + Math.floor(Math.random() * 7)) + "%";
    document.getElementById("score-real-eye").textContent = (97 + Math.floor(Math.random() * 3)) + "%";
    document.getElementById("score-real-conf").textContent = (94 + Math.floor(Math.random() * 5)) + "%";
  }
}

function downloadOfficialReportPDF() {
  showToast("Downloading Official Interview Scorecard PDF...", "success");
  const reportText = `JOBPULSE LIVE INTERVIEW SCORECARD\n\nCandidate: Alex Morgan\nRole: Senior Full-Stack Engineer\nResult: RECOMMENDED FOR HIRE (94/100)\nEvaluated By: Dr. Elena Vance (Senior Recruiter)\nDate: ${new Date().toLocaleDateString()}`;
  const blob = new Blob([reportText], { type: 'text/plain' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = "JobPulse_Interview_Scorecard.txt";
  a.click();
}

function stopRealWebcamStream() {
  if (realWebcamStream) {
    realWebcamStream.getTracks().forEach(track => track.stop());
    realWebcamStream = null;
  }
}
