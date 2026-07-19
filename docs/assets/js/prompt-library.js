// 從 assets/data/prompts.json 讀取各 Workshop 的 Prompt 分類並渲染成卡片。
// 新增一個 Workshop 的 Prompt Library 時，只需要在 prompts.json 加入一筆資料，
// 這支腳本與呼叫它的 index.html 都不需要修改。
(function () {
  const GITHUB_REPO_URL = "https://github.com/wyattlu-source/-bob-workshop";
  const DATA_URL = "assets/data/prompts.json";

  function promptCategoryCardHtml(category) {
    const repoUrl = `${GITHUB_REPO_URL}/tree/main/${category.path}`;
    const promptItems = (category.prompts || [])
      .map(
        (p) => `
        <li class="mb-2">
          <strong>${p.title}</strong>
          <div class="text-body-secondary small">${p.scenario || ""}</div>
        </li>`
      )
      .join("");

    return `
      <div class="col-lg-6">
        <div class="card h-100 shadow-sm">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <span class="badge text-bg-primary">${category.industry}</span>
            </div>
            <h5 class="card-title">${category.workshopTitle}</h5>
            <p class="card-text text-body-secondary small">${category.summary || ""}</p>
            <ul class="list-unstyled mb-3">${promptItems}</ul>
            <a class="btn btn-sm btn-outline-primary" href="${repoUrl}" target="_blank" rel="noopener">
              到 GitHub 看完整 Prompt
            </a>
          </div>
        </div>
      </div>`;
  }

  async function renderPromptLibrary() {
    const containers = document.querySelectorAll("[data-prompt-library-list]");
    if (containers.length === 0) return;

    try {
      const res = await fetch(DATA_URL);
      const categories = await res.json();
      const html = categories.map(promptCategoryCardHtml).join("");
      containers.forEach((container) => {
        container.innerHTML =
          html || `<p class="text-body-secondary">目前還沒有已發布的 Prompt 分類。</p>`;
      });
    } catch (err) {
      console.error("無法載入 prompts.json", err);
      containers.forEach((container) => {
        container.innerHTML = `<p class="text-danger">Prompt Library 載入失敗，請確認是透過本地伺服器開啟本頁面（見 docs/README.md）。</p>`;
      });
    }
  }

  document.addEventListener("DOMContentLoaded", renderPromptLibrary);
})();
