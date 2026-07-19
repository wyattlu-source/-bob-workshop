# Docs — 官方網站

這是 GitHub Pages 官方網站的原始碼，純 **HTML + Bootstrap 5（CDN）+ Vanilla JavaScript**，沒有建置流程，改完檔案就是最終部署內容。

## 架構

網站是**單頁式（one-page）應用**：只有一個 `index.html`，每個分頁（首頁、Getting Started、Workshop...）都是頁面裡的一個 `[data-tab-panel]` 區塊，靠網址 hash（例如 `#workshops`）切換顯示，不會整頁重新載入。

```
docs/
├── index.html               # 唯一的頁面，所有 [data-tab-panel] 區塊都在這裡
├── partials/
│   ├── nav.html              # 共用導覽列，連結是 #home、#workshops 這類 hash
│   └── footer.html           # 共用頁尾
└── assets/
    ├── css/style.css          # 含 [data-tab-panel] 的顯示/隱藏樣式
    ├── js/
    │   ├── include.js         # 注入 partials/、依 hash 切換 tab、監聽 hashchange
    │   └── workshops.js        # 讀取 workshops.json，渲染 Workshop 卡片
    └── data/workshops.json     # 所有 Workshop 的 metadata，新增 Workshop 只需要改這裡
```

新增一個分頁時，在 `index.html` 加一個 `<section data-tab-panel="新id">`，並在 `partials/nav.html` 加一個 `<a data-tab="新id" href="#新id">`，`include.js` 會自動讀取所有 `[data-tab-panel]` 的 id，不需要在 JS 裡另外註冊。

新增一個 Workshop 時，只需要在 `assets/data/workshops.json` 加入一筆資料，首頁與 Workshop 分頁的卡片會自動更新，不需要修改任何 HTML。

## 本地預覽

因為 `nav.html` / `footer.html` / `workshops.json` 是用 `fetch()` 讀取，直接用瀏覽器開啟 `file://` 路徑會因為 CORS 限制讀取失敗。請在 `docs/` 資料夾啟動一個簡單的本地伺服器，例如：

```bash
cd docs
python -m http.server 8000
# 或
npx serve .
```

再用瀏覽器開啟 `http://localhost:8000`。

## 部署

GitHub Pages 設定為從 `main` 分支的 `/docs` 資料夾部署，不需要 GitHub Actions 或建置步驟，push 到 `main` 即可更新網站。

## 待辦

- 目前僅繁體中文版；中英文切換規劃在後續版本加入。
