// 1. 讀取 [data-include] 元素指定的 partial（nav、footer），注入頁面。
// 2. 這是單頁式（one-page）網站：所有分頁內容都在 index.html 裡的 [data-tab-panel]
//    區塊中，靠這支腳本依網址 hash（例如 #workshops）切換顯示，不會整頁重新載入。
// 注意：partial 是透過 fetch() 讀取，開發時請用本地伺服器預覽（見 docs/README.md），
// 直接用瀏覽器開啟 file:// 會因為 CORS 限制而讀取失敗。
(function () {
  const TAB_IDS = Array.from(document.querySelectorAll("[data-tab-panel]")).map(
    (el) => el.dataset.tabPanel
  );
  const DEFAULT_TAB = TAB_IDS[0] || "home";

  async function loadIncludes() {
    const targets = document.querySelectorAll("[data-include]");
    await Promise.all(
      Array.from(targets).map(async (el) => {
        const url = el.getAttribute("data-include");
        try {
          const res = await fetch(url);
          el.innerHTML = await res.text();
        } catch (err) {
          console.error(`無法載入 ${url}`, err);
        }
      })
    );
    initTabs();
  }

  function showTab(id, updateHash) {
    if (!TAB_IDS.includes(id)) id = DEFAULT_TAB;

    document.querySelectorAll("[data-tab-panel]").forEach((panel) => {
      panel.classList.toggle("active", panel.dataset.tabPanel === id);
    });

    document.querySelectorAll(".nav-link[data-tab]").forEach((link) => {
      const isActive = link.dataset.tab === id;
      link.classList.toggle("active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });

    if (updateHash && window.location.hash !== `#${id}`) {
      history.pushState(null, "", `#${id}`);
    }

    window.scrollTo(0, 0);
    collapseMobileNav();
  }

  function collapseMobileNav() {
    const navEl = document.getElementById("mainNav");
    if (navEl && navEl.classList.contains("show") && window.bootstrap) {
      window.bootstrap.Collapse.getOrCreateInstance(navEl).hide();
    }
  }

  function currentTabFromHash() {
    return window.location.hash.replace(/^#/, "") || DEFAULT_TAB;
  }

  function initTabs() {
    document.body.addEventListener("click", (event) => {
      const link = event.target.closest("a[href^='#']");
      if (!link) return;
      const id = link.getAttribute("href").slice(1);
      if (!TAB_IDS.includes(id)) return; // 不是分頁連結（例如 FAQ 手風琴），交給 Bootstrap 處理
      event.preventDefault();
      showTab(id, true);
    });

    window.addEventListener("hashchange", () => showTab(currentTabFromHash(), false));

    showTab(currentTabFromHash(), false);
  }

  document.addEventListener("DOMContentLoaded", loadIncludes);
})();
