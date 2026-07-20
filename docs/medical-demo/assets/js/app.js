// 候診看板 - 完成版 + 分科別叫號看板
// 對應 workshops/medical/03-prompts.md 的 Prompt 1~5，
// 加上 medical-tutorial.html Step 12（分科別叫號看板）的延伸功能。

const DEPARTMENTS = ["內科", "外科", "小兒科", "骨科", "皮膚科"];

let patients = [
  { id: 1, name: "王小明", phone: "0912-345-678", appointmentTime: "09:00", status: "waiting", department: "內科" },
  { id: 2, name: "陳雅婷", phone: "0922-111-222", appointmentTime: "09:15", status: "waiting", department: "外科" },
  { id: 3, name: "李大同", phone: "0933-444-555", appointmentTime: "08:45", status: "in-consultation", department: "內科" },
  { id: 4, name: "張美玲", phone: "0955-666-777", appointmentTime: "08:30", status: "done", department: "小兒科" },
];

let searchQuery = "";
let statusFilter = "all";

const STATUS_META = {
  waiting: { label: "候診中", badgeClass: "text-bg-warning" },
  "in-consultation": { label: "看診中", badgeClass: "text-bg-info" },
  done: { label: "已完成", badgeClass: "text-bg-success" },
};

function getFilteredPatients() {
  return patients
    .filter((p) => statusFilter === "all" || p.status === statusFilter)
    .filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => a.appointmentTime.localeCompare(b.appointmentTime));
}

function actionButtonsHtml(patient) {
  if (patient.status === "waiting") {
    return `<button class="btn btn-sm btn-outline-info" data-action="call" data-id="${patient.id}">叫號</button>`;
  }
  if (patient.status === "in-consultation") {
    return `<button class="btn btn-sm btn-outline-success" data-action="complete" data-id="${patient.id}">完成看診</button>`;
  }
  return "";
}

function render() {
  const tbody = document.getElementById("patient-table-body");
  const rows = getFilteredPatients();

  if (rows.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" class="text-center text-body-secondary py-4">沒有符合條件的病患</td></tr>`;
  } else {
    tbody.innerHTML = rows
      .map((p) => {
        const meta = STATUS_META[p.status];
        return `
          <tr>
            <td>${p.name}</td>
            <td>${p.department}</td>
            <td>${p.phone || "-"}</td>
            <td>${p.appointmentTime}</td>
            <td><span class="badge ${meta.badgeClass}">${meta.label}</span></td>
            <td>${actionButtonsHtml(p)}</td>
          </tr>`;
      })
      .join("");
  }

  renderStats();
  renderDepartmentStatus();
}

function renderStats() {
  document.getElementById("stat-total").textContent = patients.length;
  document.getElementById("stat-waiting").textContent = patients.filter((p) => p.status === "waiting").length;
  document.getElementById("stat-in-consultation").textContent = patients.filter(
    (p) => p.status === "in-consultation"
  ).length;
  document.getElementById("stat-done").textContent = patients.filter((p) => p.status === "done").length;
}

function renderDepartmentStatus() {
  const container = document.getElementById("department-status");
  if (!container) return;

  container.innerHTML = DEPARTMENTS.map((dept) => {
    const current = patients.find((p) => p.department === dept && p.status === "in-consultation");
    const label = current ? current.name : "暫無看診";
    const badgeClass = current ? "text-bg-info" : "text-bg-secondary";
    return `
      <div class="col-6 col-md-4 col-lg-2">
        <div class="card text-center shadow-sm h-100">
          <div class="card-body">
            <div class="text-body-secondary small">${dept}</div>
            <span class="badge ${badgeClass} mt-2">${label}</span>
          </div>
        </div>
      </div>`;
  }).join("");
}

function setPatientStatus(id, newStatus) {
  const patient = patients.find((p) => p.id === id);
  if (patient) {
    patient.status = newStatus;
  }
}

function callPatient(id) {
  const target = patients.find((p) => p.id === id);
  if (!target) return;

  const current = patients.find(
    (p) => p.department === target.department && p.status === "in-consultation"
  );
  if (current) {
    const confirmed = confirm(
      `${target.department} 目前 ${current.name} 正在看診中，是否將其標記為完成看診，並改叫 ${target.name}？`
    );
    if (!confirmed) return;
    setPatientStatus(current.id, "done");
  }

  setPatientStatus(id, "in-consultation");
  render();
}

function completePatient(id) {
  setPatientStatus(id, "done");
  render();
}

function setupTableActions() {
  document.getElementById("patient-table-body").addEventListener("click", (event) => {
    const button = event.target.closest("button[data-action]");
    if (!button) return;

    const id = Number(button.dataset.id);
    if (button.dataset.action === "call") {
      callPatient(id);
    } else if (button.dataset.action === "complete") {
      completePatient(id);
    }
  });
}

function setupSearchAndFilter() {
  document.getElementById("search-input").addEventListener("input", (event) => {
    searchQuery = event.target.value;
    render();
  });

  document.getElementById("filter-buttons").addEventListener("click", (event) => {
    const button = event.target.closest("button[data-status]");
    if (!button) return;

    statusFilter = button.dataset.status;
    document
      .querySelectorAll("#filter-buttons button")
      .forEach((btn) => btn.classList.toggle("active", btn === button));
    render();
  });
}

function currentTimeHHMM() {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
}

function setupAddPatientForm() {
  const modalEl = document.getElementById("addPatientModal");
  const modal = new bootstrap.Modal(modalEl);
  const form = document.getElementById("add-patient-form");
  const errorBox = document.getElementById("form-error");

  modalEl.addEventListener("show.bs.modal", () => {
    form.reset();
    errorBox.classList.add("d-none");
    document.getElementById("patient-time").value = currentTimeHHMM();
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("patient-name").value.trim();
    const phone = document.getElementById("patient-phone").value.trim();
    const appointmentTime = document.getElementById("patient-time").value || currentTimeHHMM();
    const department = document.getElementById("patient-department").value;

    if (!name) {
      errorBox.textContent = "姓名為必填欄位。";
      errorBox.classList.remove("d-none");
      return;
    }

    patients.push({
      id: Date.now(),
      name,
      phone,
      appointmentTime,
      department,
      status: "waiting",
    });

    modal.hide();
    render();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupTableActions();
  setupSearchAndFilter();
  setupAddPatientForm();
  render();
});
