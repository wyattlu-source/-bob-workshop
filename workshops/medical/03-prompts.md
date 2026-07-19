# Prompt 設計

打開 [`starter/medical/`](../../starter/medical/)，裡面已經有一個最小的 Bootstrap 5 頁面骨架與 `assets/js/app.js`（含幾筆範例病患資料與待完成的 `render()` 函式）。以下 Prompt 依照「商業需求」的順序，一步步把它變成完整的候診看板。每個 Prompt 都刻意只做一件事——這是跟 Bob 協作時最重要的習慣：範圍越小，Bob 產生的結果越容易檢查，出錯也容易定位是哪一步造成的。

## Prompt 1：確認資料模型並畫出候診名單

**為什麼這樣寫**：不要一開始就要求「做出完整系統」，先讓 Bob 讀懂現有的資料結構，把「顯示」這個最基本的需求做出來，你才能確認 Bob 對資料模型的理解跟你一致。

```
這是一個診所候診看板的起始專案（純 HTML + Bootstrap 5 + Vanilla JS）。
assets/js/app.js 裡的 patients 陣列是病患資料，每筆包含 id、name、phone、
appointmentTime（HH:MM 字串）、status（waiting / in-consultation / done）。

請完成 render() 函式：把 patients 依 appointmentTime 由小到大排序後，
渲染成 index.html 裡 id="patient-table-body" 的表格列，每列顯示姓名、
電話、預約時間、狀態徽章（不同狀態用不同 Bootstrap badge 顏色）。
不要更動資料模型本身。
```

**預期 Bob 回應**：修改 `app.js` 的 `render()`，用 `patients.map()` 產生 `<tr>` HTML 字串或用 DOM API 建立元素，狀態用 `text-bg-warning` / `text-bg-info` / `text-bg-success` 之類的 badge 呈現。

## Prompt 2：新增病患掛號表單

**為什麼這樣寫**：先確認「顯示」正確後，再加「新增」功能。明確告訴 Bob 驗證規則（姓名必填），避免它自己猜測，也避免它順便改動你在 Prompt 1 已經確認過的渲染邏輯。

```
在 index.html 加一個「臨時掛號」按鈕，點擊後開啟 Bootstrap Modal，
表單欄位：姓名（必填）、電話（選填）、到診時間（預設為目前時間，可修改）。
送出時：
1. 若姓名為空，顯示錯誤訊息，不送出。
2. 建立新病患物件（status 設為 waiting，id 用時間戳），加入 patients 陣列。
3. 關閉 Modal、清空表單、重新呼叫 render()。

不要修改 render() 已經完成的排序與顯示邏輯。
```

**預期 Bob 回應**：新增 Modal HTML 與對應的 submit 事件處理函式，重用 Prompt 1 的 `render()`。

## Prompt 3：叫號與完成看診（含業務規則）

**為什麼這樣寫**：這裡刻意把「業務規則」寫進 Prompt，而不是只講 UI 行為——「同一時間只能有一位病患看診中」是這個功能最容易被忽略的細節，要在 Prompt 裡明確講出來，Bob 才會處理例外狀況。

```
在候診名單每一列加上操作按鈕：
- 狀態為 waiting 的列顯示「叫號」按鈕，點擊後把該病患狀態改成 in-consultation。
  但如果目前已經有其他病患是 in-consultation 狀態，要先跳出確認視窗
  （用 confirm() 即可），告知目前正在看診中的病患姓名，使用者確認後
  才把原本那位改成 done、新的病患改成 in-consultation。
- 狀態為 in-consultation 的列顯示「完成看診」按鈕，點擊後把狀態改成 done。
- 狀態為 done 的列不顯示操作按鈕。

改動後呼叫 render() 更新畫面。
```

**預期 Bob 回應**：在渲染每列時依狀態加上對應按鈕與 `data-id` 屬性，並實作 `callPatient(id)` / `completePatient(id)` 函式處理狀態轉換與例外確認。

## Prompt 4：搜尋、篩選與今日統計

**為什麼這樣寫**：這個 Prompt 涉及多個既有功能（render、資料陣列）的整合，容易讓 Bob 想要重寫整個檔案。明確要求「只加不改」，可以降低它動到前面已經驗證過的程式碼的機率。

```
在候診名單上方加入：
1. 一個搜尋輸入框，輸入時即時用姓名關鍵字過濾名單（不分大小寫）。
2. 狀態篩選按鈕群（全部 / 候診中 / 看診中 / 已完成），點擊後只顯示對應狀態。
3. 四張統計卡片：今日總人數、候診中人數、看診中人數、已完成人數，
   數字要即時反映 patients 陣列的目前狀態，不受搜尋/篩選影響。

搜尋與篩選只影響表格顯示的內容，不要修改 patients 陣列本身。
盡量重用 render() 現有的邏輯，加上篩選條件即可，不要整個重寫。
```

**預期 Bob 回應**：`render()` 內部加入搜尋字串與目前篩選狀態的判斷，統計卡片另外寫一個獨立的 `renderStats()`，避免跟篩選邏輯混在一起。

## Prompt 5：重構收尾

**為什麼這樣寫**：走完前四步後，`app.js` 可能已經有點亂（例如渲染邏輯散落在多個函式）。這一步不加新功能，只請 Bob 檢視現有程式碼並提出重構建議，訓練學員「檢查與修改 Bob 的產出」而不是照單全收。

```
請檢視目前的 assets/js/app.js，指出有沒有重複的邏輯、命名不一致、
或是可以拆成更小函式的地方，列出你會怎麼重構，但先不要直接改動檔案，
等我確認後再進行。
```

**預期 Bob 回應**：先列出具體的重構建議（例如把狀態轉換邏輯抽成 `setPatientStatus(id, newStatus)`），等你確認範圍後，再用下一個 Prompt 請它實際修改。這一步的重點是練習「先看計畫、再放行修改」的習慣。
