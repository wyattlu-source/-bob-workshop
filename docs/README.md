# Docs — 官方網站

這是 GitHub Pages 官方網站的原始碼，純 **HTML + Bootstrap 5（CDN）+ Vanilla JavaScript**，沒有建置流程，改完檔案就是最終部署內容。

## 架構

```
docs/
├── index.html              # 首頁
├── getting-started.html
├── workshops.html
├── prompt-library.html
├── playground.html
├── best-practices.html
├── faq.html
├── partials/
│   ├── nav.html             # 共用導覽列，所有頁面用 JS 注入
│   └── footer.html          # 共用頁尾
└── assets/
    ├── css/style.css
    ├── js/
    │   ├── include.js        # 注入 partials/、標記目前頁面的導覽列高亮
    │   └── workshops.js       # 讀取 workshops.json，渲染 Workshop 卡片
    └── data/workshops.json    # 所有 Workshop 的 metadata，新增 Workshop 只需要改這裡
```

新增一個 Workshop 時，只需要在 `assets/data/workshops.json` 加入一筆資料，首頁與 `workshops.html` 的卡片會自動更新，不需要修改任何 HTML 頁面。

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
