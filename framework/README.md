# Framework

這裡定義所有 Workshop 共用的**教學架構、命名規範與模板**，不放任何特定產業的課程內容。

## 內容

- [`workshop-template/`](workshop-template/) — 新增 Workshop 時要複製的標準模板，包含 8 個固定章節與 metadata schema。
- [`CONTRIBUTING.md`](CONTRIBUTING.md) — 如何依照這套規範新增一個新產業的 Workshop。

## 標準教學架構

每個 Workshop 都由相同的 8 個章節組成，順序固定，對應完整的 AI Coding Workflow：

| # | 章節 | 目的 |
|---|------|------|
| 1 | 故事背景 | 建立產業情境，讓學員進入角色 |
| 2 | 商業需求 | 把情境轉換成具體、可驗證的需求 |
| 3 | Prompt 設計 | 教學員如何把需求寫成給 Bob 的 Prompt |
| 4 | Bob 操作技巧 | 該階段適用的 Bob 功能（AGENTS / Rules / Skills / Commands 等） |
| 5 | 預期成果 | 學員應該產出的結果，供自我檢查 |
| 6 | 重點說明 | 這一步驟教了什麼觀念、為什麼這樣設計 |
| 7 | 挑戰題 | 進階練習，訓練學員獨立應用 |
| 8 | 課後反思 | 引導學員總結學到的 AI Coding 工作流程 |

這個順序刻意對應「需求分析 → Prompt 設計 → 產生程式碼 → 檢查修改 → 重構 → 完成」的完整流程，而不是只練習下 Prompt。

## 資料夾對應關係

新增一個 workshop（例如 `banking`）時，需要在以下位置各自新增以 workshop id 命名的資料夾／項目，彼此透過相同的 `id` 對應：

```
workshops/<id>/         # 教學內容（複製自 workshop-template/）
starter/<id>/           # 起始程式碼
solution/<id>/          # 完成版程式碼
prompt-library/<id>/    # 該 workshop 的可重複使用 Prompt
instructor/<id>/        # 講師教材
docs/assets/data/workshops.json   # 加入一筆 metadata，讓網站自動顯示
```

網站（`docs/`）不需要因為新增 workshop 而修改頁面結構，只需要更新 `workshops.json`。
