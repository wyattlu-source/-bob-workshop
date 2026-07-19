// 讀取 [data-include] 元素指定的 partial（例如 nav、footer），注入頁面，
// 讓每個頁面共用同一份導覽列與頁尾，不需要在每個 HTML 檔案重複維護。
// 注意：透過 fetch() 讀取本地檔案，開發時請用本地伺服器預覽（見 docs/README.md），
// 直接用瀏覽器開啟 file:// 會因為 CORS 限制而讀取失敗。
(function () {
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
    highlightActiveNavLink();
  }

  function highlightActiveNavLink() {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-link[data-page]").forEach((link) => {
      if (link.getAttribute("data-page") === currentPage) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
      }
    });
  }

  document.addEventListener("DOMContentLoaded", loadIncludes);
})();
