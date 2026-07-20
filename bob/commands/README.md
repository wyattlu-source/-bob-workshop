# Commands（自訂指令）

Slash Commands 是四種自訂機制裡**成本最低**的一種：只有手動觸發時才會載入，平常完全不佔用對話成本。適合用來加速「常常要打但每次描述都差不多」的操作。

## 放在哪裡

```
.bob/commands/
└── command-name.md
```

用 YAML front matter 描述指令的說明與參數提示，本文則是實際要送給 Bob 的 Prompt 樣板：

```markdown
---
description: Create a new API endpoint
argument-hint: <endpoint> <method>
---

Create API endpoint called $1 that handles $2 requests.
Include error handling and docs.
```

`$1`、`$2` 這類參數會被你在觸發指令時輸入的內容取代，讓同一個 Command 可以套用在不同情境。

## 什麼時候該用

- 重複性高、每次描述方式都差不多的操作（建立元件、寫 commit 訊息、產生某種樣板檔案）。
- 想讓團隊成員（或 Workshop 學員）用同一種方式觸發某個操作，而不是各自描述一次。
- 需要在執行前先手動確認或修改內容的操作——Command 產生的指令通常可以在送出前編輯。

## 最佳實務

- **一個指令只做一件事**：`/create-component` 就只負責建立元件，不要把「建立元件 + 寫測試 + 更新文件」全部塞進同一個 Command，複合任務更適合拆成 Skill 或分次下 Prompt。
- **`argument-hint` 寫清楚**：讓觸發指令的人一看就知道要帶什麼參數，減少來回確認。
- **跟 Skills 分工**：如果操作只是「填入參數、送出一段固定 Prompt」，用 Command 就夠了；如果需要多步驟、需要中途判斷分支，才需要升級成 Skill。

## 常見錯誤

- 把 Command 當成長篇規則在寫——Command 是要被「觸發」的，內容應該是一段具體的操作指示，不是持續生效的偏好設定（那是 Rules 的工作）。
- 命名不直覺，導致團隊成員記不住有哪些 Command 可以用；建議搭配一份簡短的指令清單（例如放在 `bob/commands/` 底下逐一列出）方便查閱。

## 跟 Workshop 的對應

這個 Workshop（Medical）主要練習 Prompt 設計本身，還沒有用到自訂 Commands。如果後續 Workshop 需要示範 Commands 用法，對應的 `04-bob-tips.md` 應該連結回這裡，而不是重複說明設定細節。
