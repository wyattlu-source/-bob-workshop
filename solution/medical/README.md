# Solution — 智慧診所 / AI Clinic

候診看板的完成版，滿足 [`workshops/medical/05-expected-outcome.md`](../../workshops/medical/05-expected-outcome.md) 的功能檢查清單，對應 [`workshops/medical/03-prompts.md`](../../workshops/medical/03-prompts.md) 的 Prompt 1~4（Prompt 5 是重構練習，不改變外部行為，這裡的程式碼已經是重構後的版本：狀態轉換集中在 `setPatientStatus()`，渲染與統計分開成 `render()` / `renderStats()`）。

「挑戰題」（資料持久化、預約衝突提示、列印、深色模式）不包含在這個 Solution 中，故意留給學員自行實作，沒有標準答案。

## 本地預覽

用瀏覽器直接開啟 `index.html` 即可，不需要伺服器。

## 結構

```
index.html
assets/
├── css/style.css
└── js/app.js
```
