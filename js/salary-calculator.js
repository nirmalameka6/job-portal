/* ==========================================================================
   JobPulse - Interactive Salary Market Calculator & Benchmark Tool
   ========================================================================== */

function openSalaryCalculatorModal() {
  let modal = document.getElementById("salary-calc-modal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "salary-calc-modal";
    modal.className = "modal-backdrop";
    modal.innerHTML = `
      <div class="modal-content" style="max-width:650px;">
        <div class="modal-header">
          <div style="display:flex; align-items:center; gap:0.75rem;">
            <div style="width:2.5rem; height:2.5rem; background:linear-gradient(135deg, #10b981, #059669); color:#fff; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:1.2rem;">
              <i class="fa-solid fa-calculator"></i>
            </div>
            <div>
              <h3 style="font-size:1.35rem; font-weight:900; margin:0;">Salary Market Benchmark Calculator</h3>
              <p style="font-size:0.85rem; color:var(--text-muted); margin:0;">Check average compensation percentiles based on role, location & experience</p>
            </div>
          </div>
          <button onclick="document.getElementById('salary-calc-modal').classList.remove('show')" class="modal-close">&times;</button>
        </div>

        <form onsubmit="handleCalculateSalaryBenchmark(event)">
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:1rem;">
            <div class="form-group">
              <label class="form-label">Job Category / Role</label>
              <select id="calc-role" class="form-control">
                <option value="Software Development">Software Development</option>
                <option value="UI/UX Design">UI/UX Design</option>
                <option value="Data Science & AI">Data Science & AI</option>
                <option value="Growth Marketing">Growth Marketing</option>
                <option value="Product Management">Product Management</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Experience Level</label>
              <select id="calc-exp" class="form-control">
                <option value="Entry Level">Entry Level (0-2 yrs)</option>
                <option value="Mid Level">Mid Level (3-5 yrs)</option>
                <option value="Senior Level">Senior Level (5+ yrs)</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Location / Work Mode</label>
            <select id="calc-loc" class="form-control">
              <option value="Bengaluru">Bengaluru, India</option>
              <option value="Mumbai">Mumbai, India</option>
              <option value="Delhi NCR">Delhi NCR, India</option>
              <option value="Remote">100% Remote Global</option>
            </select>
          </div>

          <button type="submit" class="btn btn-primary" style="width:100%;">
            Calculate Market Salary Percentiles <i class="fa-solid fa-chart-pie"></i>
          </button>
        </form>

        <div id="salary-calc-results" style="display:none; margin-top:1.5rem; background:var(--body-bg); border:1px solid var(--border-color); border-radius:var(--radius-lg); padding:1.25rem;">
          <h4 style="font-size:1.1rem; font-weight:800; margin-bottom:1rem; text-align:center;">Estimated Compensation Range:</h4>
          
          <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:1rem; text-align:center;">
            <div>
              <div style="font-size:0.75rem; font-weight:700; color:var(--text-muted);">25TH PERCENTILE</div>
              <div style="font-size:1.3rem; font-weight:900; color:var(--text-main);" id="p-25">₹8.5 Lakhs</div>
            </div>

            <div style="background:var(--card-bg); padding:0.5rem; border-radius:var(--radius-md); border:1px solid var(--primary-light);">
              <div style="font-size:0.75rem; font-weight:700; color:var(--primary);">MEDIAN (50TH)</div>
              <div style="font-size:1.5rem; font-weight:900; color:var(--primary);" id="p-50">₹14.0 Lakhs</div>
            </div>

            <div>
              <div style="font-size:0.75rem; font-weight:700; color:var(--text-muted);">75TH PERCENTILE</div>
              <div style="font-size:1.3rem; font-weight:900; color:var(--accent);" id="p-75">₹22.5 Lakhs</div>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  modal.classList.add("show");
}

function handleCalculateSalaryBenchmark(e) {
  e.preventDefault();
  const role = document.getElementById("calc-role").value;
  const exp = document.getElementById("calc-exp").value;

  let base = 8;
  if (exp === "Mid Level") base = 14;
  if (exp === "Senior Level") base = 22;

  if (role.includes("Software") || role.includes("Data")) base += 3;

  document.getElementById("p-25").textContent = `₹${(base * 0.75).toFixed(1)} Lakhs`;
  document.getElementById("p-50").textContent = `₹${base.toFixed(1)} Lakhs`;
  document.getElementById("p-75").textContent = `₹${(base * 1.4).toFixed(1)} Lakhs`;

  document.getElementById("salary-calc-results").style.display = "block";
}
