# IBM Bob AI Coding Workshop Framework

一套可長期維護、持續擴充的 **AI Coding Workshop Framework**，用來快速建立不同產業的 IBM Bob 實作課程（Hands-on Workshop）。

這裡提供的不是單一課程，而是一套**標準化的教學架構**：故事背景、商業需求、Prompt 設計、Bob 操作技巧、預期成果、重點說明、挑戰題、課後反思。所有 Workshop 共用相同的教學流程、網站架構與最佳實務，新增產業案例時不需要重新設計網站或教學流程，只需要依照規範新增內容。

第一個範例是 **Medical（智慧診所 / AI Clinic）**，用來驗證整個 Framework 是否足夠彈性。後續會陸續加入 Banking、Manufacturing、Retail、Government 等產業案例。

## 這是什麼

課程教的不是「把 Prompt 貼給 AI」，而是完整的 AI Coding Workflow：

需求分析 → Prompt 設計 → 用 IBM Bob 產生程式碼 → 檢查與修改結果 → 重構程式 → 完成專案

除了 Prompt 之外，也會逐步納入 IBM Bob 的進階能力：AGENTS、Rules、Skills、Commands，後續再擴充 MCP 與 API Integration。

## 資料夾結構

```
.
├── framework/          # Framework 規範與模板：Workshop 標準教學架構、新增產業案例指南
├── workshops/          # 各產業 Workshop 案例（目前：medical，未來：banking、manufacturing...）
├── starter/            # 各 Workshop 的課程起始程式碼（依 workshop id 分子資料夾）
├── solution/           # 各 Workshop 的課程完成版程式碼（依 workshop id 分子資料夾）
├── prompt-library/      # 可重複使用的 Prompt 範例，依 workshop 分類
├── instructor/         # 講師教材（教學流程、時間安排、常見問題應對）
├── bob/                # IBM Bob 最佳實務：AGENTS、Rules、Skills、Commands（後續加入 MCP、API Integration）
└── docs/               # GitHub Pages 官方網站原始碼（純 HTML + Bootstrap 5 + Vanilla JS）
```

每個資料夾底下的 README 有更詳細的說明。

## 官方網站

網站原始碼在 [`docs/`](docs/)，直接以 GitHub Pages 從 `main` 分支的 `/docs` 資料夾部署，不需要建置流程。網站內容包含 Getting Started、Workshop、Prompt Library、Playground、Best Practices、FAQ。第一版以中文為主，後續規劃中英文切換。

## 技術原則

第一版刻意保持簡單：**HTML + Bootstrap 5 + Vanilla JavaScript**，不使用 React、Vue 等框架，方便學員理解，也讓 IBM Bob 能穩定產生程式碼，並可直接部署到 GitHub Pages。

## 如何新增一個 Workshop

參考 [`framework/CONTRIBUTING.md`](framework/CONTRIBUTING.md)。簡單來說：複製 [`framework/workshop-template/`](framework/workshop-template/)，依照標準架構填寫內容，並在 `starter/`、`solution/`、`prompt-library/`、`instructor/`、`docs/assets/data/workshops.json` 中加入對應的產業資料夾與項目。

## 授權

[MIT License](LICENSE)
