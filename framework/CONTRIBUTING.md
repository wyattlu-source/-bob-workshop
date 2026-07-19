# 新增一個 Workshop

歡迎依照這份指南新增新的產業 Workshop（例如 Banking、Manufacturing、Retail、Government）。目標是讓任何人 clone 這個 repository 後，都能在不修改 Framework 或網站架構的情況下加入新案例。

## 步驟

1. **選定 workshop id**：小寫、英文、連字號分隔，例如 `medical`、`banking`、`manufacturing`。之後所有資料夾與 metadata 都用這個 id 對應。

2. **複製教學內容模板**
   ```
   framework/workshop-template/  →  workshops/<id>/
   ```
   依照模板內固定的 8 個章節填寫內容（見 [framework/README.md](README.md#標準教學架構)），並更新 `workshop.json` 的 metadata。

3. **建立程式碼資料夾**
   ```
   starter/<id>/     # 課程開始前的起始專案
   solution/<id>/    # 課程完成後的參考解答
   ```
   技術棧維持第一版原則：HTML + Bootstrap 5 + Vanilla JavaScript，除非該產業案例有特別需求並與維護者討論過。

4. **建立 Prompt Library 分類**
   ```
   prompt-library/<id>/
   ```
   收錄該 workshop 中出現過、可重複使用的 Prompt，並簡述使用情境與預期輸出。

5. **建立講師教材**
   ```
   instructor/<id>/
   ```
   包含建議時間分配、易卡關的地方、常見學員問題與回答方式。

6. **註冊到網站**
   在 [`docs/assets/data/workshops.json`](../docs/assets/data/workshops.json) 新增一筆物件（欄位定義見該檔案），網站的 Workshop 列表、首頁卡片會自動讀取渲染，不需要改動任何 HTML 頁面。

7. **檢查一致性**
   - 8 個教學章節是否齊全、順序正確
   - Prompt 是否可以直接複製貼上到 Bob 使用並得到教材中描述的結果
   - Starter 專案是否能直接執行、Solution 是否對應課程最終狀態
   - workshop.json 與 workshops.json 的 id、標題是否一致

## 語言

第一版内容以繁體中文為主。若要提供英文版，檔名加上 `.en.md` 後綴（例如 `01-story-background.en.md`），保留原檔案為中文版。

## 貢獻方式

歡迎以 Pull Request 提交新的產業 Workshop。請在 PR 描述中說明目標學員、預計課程時長，以及對應的產業情境。維護者會依照上述檢查清單審核。
