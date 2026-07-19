// 候診看板 - 起始程式碼
// 跟著 workshops/medical/03-prompts.md 的 Prompt 1~5，把下面的 TODO 逐步完成。

let patients = [
  { id: 1, name: "王小明", phone: "0912-345-678", appointmentTime: "09:00", status: "waiting" },
  { id: 2, name: "陳雅婷", phone: "0922-111-222", appointmentTime: "09:15", status: "waiting" },
  { id: 3, name: "李大同", phone: "0933-444-555", appointmentTime: "08:45", status: "waiting" },
];

// TODO（Prompt 1）：
// 1. 把 patients 依 appointmentTime 由小到大排序
// 2. 渲染成 index.html 中 id="patient-table-body" 的表格列
//    每列顯示姓名、電話、預約時間、狀態徽章
function render() {
  // 在這裡實作
}

document.addEventListener("DOMContentLoaded", () => {
  render();
});
