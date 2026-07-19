# 講師教材 — 智慧診所 / AI Clinic

課程總長約 180 分鐘（3 小時），對應 [`workshops/medical/`](../../workshops/medical/) 的內容。

## 課前準備

- [ ] 確認每位學員都能在自己的電腦開啟 IBM Bob 並成功連線。
- [ ] 確認每位學員都已經 clone 這個 repository，能開啟 [`starter/medical/`](../../starter/medical/)。
- [ ] 準備好 [`solution/medical/`](../../solution/medical/) 在自己電腦上跑起來，開場示範用。
- [ ] 瀏覽一次 [`workshops/medical/03-prompts.md`](../../workshops/medical/03-prompts.md)，熟悉五個 Prompt 之間的銜接點，才能在學員卡關時快速判斷是哪一步出問題。

## 建議時間分配

| 時段 | 內容 | 時長 |
|------|------|------|
| 1 | 開場：故事背景、商業需求、展示完成版（solution）畫面 | 15 分鐘 |
| 2 | Prompt 1：資料模型 + 渲染名單 | 15 分鐘 |
| 3 | Prompt 2：新增病患表單 | 20 分鐘 |
| 4 | Prompt 3：叫號 / 完成看診 + 業務規則 | 25 分鐘 |
| — | 中場休息 | 10 分鐘 |
| 5 | Prompt 4：搜尋、篩選、統計 | 25 分鐘 |
| 6 | Prompt 5：重構收尾 + 與 solution 對照 | 20 分鐘 |
| 7 | 挑戰題（視進度選擇 1~2 題現場示範或讓學員自行嘗試） | 20 分鐘 |
| 8 | 課後反思 + 收尾討論 | 10 分鐘 |

進度落後時，優先犧牲第 7 段挑戰題（本來就是選做），第 1、8 段不建議壓縮，因為分別對應「為什麼要學這個」與「學到了什麼」，是整堂課的頭尾錨點。

## 容易卡關的地方

- **Bootstrap Modal 沒反應**：最常見原因是 `bootstrap.bundle.min.js` 沒有放在 `app.js` 之前載入，或是 Bob 生成程式碼時把 `<script>` 順序改動了。請學員檢查 `index.html` 最下方兩個 `<script>` 標籤的順序。
- **Prompt 3 的確認視窗沒有正確傳遞病患姓名**：通常是 Bob 在 `callPatient()` 裡沒有先找到目前「看診中」的病患物件就直接寫死文字。提示學員把錯誤情境具體描述給 Bob（例如「目前看診中的病患姓名沒有顯示在確認視窗裡」），而不是重新貼一次 Prompt。
- **Prompt 4 之後，統計數字被搜尋/篩選影響**：這是最常見的邏輯混淆，代表 Bob 把 `renderStats()` 跟篩選後的陣列接在一起算了。對照 [`solution/medical/assets/js/app.js`](../../solution/medical/assets/js/app.js) 中 `renderStats()` 是用完整的 `patients` 陣列計算，不是 `getFilteredPatients()`。
- **學員直接複製 Prompt Library 的通用版本**：[`prompt-library/medical/`](../../prompt-library/medical/) 裡的 Prompt 有 `{{...}}` 佔位符，是給其他人套用到別的專案用的。上課時應該引導學員使用 [`workshops/medical/03-prompts.md`](../../workshops/medical/03-prompts.md) 裡已經填好的版本。

## 常見學員問題

- **「Bob 一次把後面幾個 Prompt 的功能都做完了，是不是代表我可以跳過？」**
  可以先驗收結果是否正確，但引導學員還是照順序檢查每一步的 diff——重點是練習「檢查 AI 產出」的習慣，不是只看最終結果對不對。
- **「我的畫面跟 solution 長得不一樣，是不是做錯了？」**
  強調 `05-expected-outcome.md` 的功能檢查清單才是驗收標準，樣式與排版不需要跟 solution 一致。
- **「Prompt 應該寫多細？」**
  用 Prompt 3（業務規則）當範例：太簡略會讓 Bob 漏掉「同一時間只能一人看診中」這種隱含規則；但也不需要寫到逐行描述程式碼怎麼寫，重點是把「規則」講清楚，實作細節留給 Bob。
