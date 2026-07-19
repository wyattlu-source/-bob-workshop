// 從 assets/data/workshops.json 讀取所有 Workshop 的 metadata 並渲染成卡片。
// 新增一個 Workshop 時，只需要在 workshops.json 加入一筆資料，
// 這支腳本與呼叫它的 index.html 都不需要修改。
(function () {
  const GITHUB_REPO_URL = "https://github.com/wyattlu-source/-bob-workshop";
  const DATA_URL = "assets/data/workshops.json";

  const LEVEL_LABEL = {
    beginner: "入門",
    intermediate: "中階",
    advanced: "進階",
  };

  const STATUS_LABEL = {
    draft: "籌備中",
    published: "已上線",
  };

  function workshopCardHtml(workshop) {
    const level = LEVEL_LABEL[workshop.level] || workshop.level;
    const statusLabel = STATUS_LABEL[workshop.status] || workshop.status;
    const statusClass =
      workshop.status === "published" ? "status-badge-published" : "status-badge-draft";
    const repoUrl = `${GITHUB_REPO_URL}/tree/main/${workshop.path.replace(/^\.\.\//, "")}`;
    const tags = (workshop.tags || [])
      .map((tag) => `<span class="badge text-bg-light border me-1">${tag}</span>`)
      .join("");

    return `
      <div class="col-md-6 col-lg-4">
        <a class="text-decoration-none text-body" href="${repoUrl}" target="_blank" rel="noopener">
          <div class="card h-100 workshop-card shadow-sm">
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-start mb-2">
                <span class="badge text-bg-primary">${workshop.industry}</span>
                <span class="badge ${statusClass}">${statusLabel}</span>
              </div>
              <h5 class="card-title">${workshop.title}</h5>
              <p class="card-text text-body-secondary">${workshop.summary || ""}</p>
              <p class="card-text small text-body-secondary mb-2">
                難度：${level}　·　時長：約 ${Math.round((workshop.durationMinutes || 0) / 60)} 小時
              </p>
              <div>${tags}</div>
            </div>
          </div>
        </a>
      </div>`;
  }

  async function renderWorkshops() {
    const containers = document.querySelectorAll("[data-workshops-list]");
    if (containers.length === 0) return;

    try {
      const res = await fetch(DATA_URL);
      const workshops = await res.json();
      const html = workshops.map(workshopCardHtml).join("");
      containers.forEach((container) => {
        container.innerHTML = html || `<p class="text-body-secondary">目前還沒有已發布的 Workshop。</p>`;
      });
    } catch (err) {
      console.error("無法載入 workshops.json", err);
      containers.forEach((container) => {
        container.innerHTML = `<p class="text-danger">Workshop 列表載入失敗，請確認是透過本地伺服器開啟本頁面（見 docs/README.md）。</p>`;
      });
    }
  }

  document.addEventListener("DOMContentLoaded", renderWorkshops);
})();
