# Skills

Skills 封裝的是「做什麼」的工作流程配方——一段有明確步驟、值得重複使用的操作流程，例如「執行安全審查」「產生 API 文件」「依照公司規範建立新元件」。跟 Rules 不同：Rules 是持續生效的偏好設定，Skills 是任務相關時才會被提示使用、預設需要你批准才會執行。

## 放在哪裡

```
.bob/skills/
└── skill-name/
    ├── SKILL.md          ← 技能主定義，被選中時才載入
    └── 其他支援檔案...
```

`SKILL.md` 用 YAML front matter 描述這個技能是什麼、什麼時候該用，本文則是具體步驟：

```markdown
---
name: security-review
description: Review code for security vulnerabilities
---

執行安全審查：
1. 檢查常見漏洞（SQL Injection、XSS、權限繞過）
2. 對照專案的安全最佳實踐
3. 條列發現的問題與建議修法

參考 severity-levels.md 判斷嚴重程度
```

## 什麼時候該用 Skills，而不是 Rules 或 Commands

| 情境 | 適合的機制 |
| --- | --- |
| 一段固定會重複用到、有明確步驟的流程 | Skills |
| 持續影響風格、不涉及多步驟操作 | Rules |
| 一次性、手動觸發的簡短操作 | Commands |

`description` 欄位很重要——Bob 會依照這個描述判斷「現在的任務跟這個 Skill 相不相關」，寫得越具體，越不容易誤觸發或該用的時候沒被用到。

## 最佳實務

- **SKILL.md 保持聚焦**：一個 Skill 只處理一種工作流程，需要的支援檔案（範本、對照表）拆成獨立檔案，不要全部塞進 `SKILL.md` 本文。
- **`description` 寫給 Bob 判斷用，不是寫給人看**：明確描述「這個 Skill 適用在什麼情境」，比籠統的一句話介紹更容易被正確觸發。
- **預期需要批准**：Skills 預設會先讓你確認才執行，設計流程時可以假設中間有一個「使用者確認」的節點，不用刻意避開。

## 常見錯誤

- 把只會用一次的操作也包裝成 Skill——如果流程不會重複使用，寫成一次性的 Prompt 或 Command 更划算。
- Skill 的步驟描述太模糊（例如「處理一下這個問題」），跟直接下 Prompt 沒有差別，失去封裝成 Skill 的意義。

## 跟 Workshop 的對應

這個 Workshop（Medical）主要練習 Prompt 設計與程式碼審查，不涉及 Skills。如果後續 Workshop 需要示範 Skills 用法，對應的 `04-bob-tips.md` 應該連結回這裡，而不是重複說明設定細節。
