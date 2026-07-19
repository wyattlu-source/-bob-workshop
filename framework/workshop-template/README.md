# Workshop 模板

新增 Workshop 時，複製整個資料夾到 `workshops/<id>/`，並依序填寫以下檔案。所有標記為 `{{...}}` 的內容都需要替換。

## 檔案清單

| 檔案 | 對應章節 |
|------|----------|
| [workshop.json](workshop.json) | Metadata（id、標題、產業、難度、時長、標籤） |
| [01-story-background.md](01-story-background.md) | 故事背景 |
| [02-business-requirements.md](02-business-requirements.md) | 商業需求 |
| [03-prompts.md](03-prompts.md) | Prompt 設計 |
| [04-bob-tips.md](04-bob-tips.md) | Bob 操作技巧 |
| [05-expected-outcome.md](05-expected-outcome.md) | 預期成果 |
| [06-key-takeaways.md](06-key-takeaways.md) | 重點說明 |
| [07-challenges.md](07-challenges.md) | 挑戰題 |
| [08-reflection.md](08-reflection.md) | 課後反思 |

每個章節檔案內都有寫作指引（以引用區塊標示），完成後請刪除引用區塊，只保留實際教學內容。

完成後別忘了：

- 在 [`starter/<id>/`](../../starter/) 與 [`solution/<id>/`](../../solution/) 放對應程式碼
- 在 [`prompt-library/<id>/`](../../prompt-library/) 收錄可重複使用的 Prompt
- 在 [`instructor/<id>/`](../../instructor/) 補充講師教材
- 在 [`docs/assets/data/workshops.json`](../../docs/assets/data/workshops.json) 註冊這個 workshop
