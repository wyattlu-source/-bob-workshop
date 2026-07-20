// 1. 讀取 [data-include] 元素指定的 partial（nav、footer），注入頁面。
// 2. 這是單頁滾動式網站：所有區塊都在 index.html 裡依序排列並同時顯示，
//    導覽列連結只是錨點捲動（配合 CSS scroll-behavior: smooth），不會隱藏其他區塊。
// 注意：partial 是透過 fetch() 讀取，開發時請用本地伺服器預覽（見 docs/README.md），
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
    initNav();
  }

  function initNav() {
    const navLinks = Array.from(document.querySelectorAll(".nav-link[data-tab]"));
    if (!navLinks.length) return;

    document.body.addEventListener("click", (event) => {
      const link = event.target.closest(".nav-link[data-tab]");
      if (link) collapseMobileNav();
    });

    const sections = navLinks
      .map((link) => document.getElementById(link.dataset.tab))
      .filter(Boolean);

    const setActive = (id) => {
      navLinks.forEach((link) => {
        const isActive = link.dataset.tab === id;
        link.classList.toggle("active", isActive);
        if (isActive) {
          link.setAttribute("aria-current", "page");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length > 0) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    setActive(sections[0] && sections[0].id);
  }

  function collapseMobileNav() {
    const navEl = document.getElementById("mainNav");
    if (navEl && navEl.classList.contains("show") && window.bootstrap) {
      window.bootstrap.Collapse.getOrCreateInstance(navEl).hide();
    }
  }

  document.addEventListener("DOMContentLoaded", loadIncludes);
})();
