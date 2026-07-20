# Bob — IBM Bob 最佳實務

這裡整理 IBM Bob 的進階能力與最佳實務，供所有 Workshop 共用參考，不綁定特定產業案例。

## 內容

- [`agents/`](agents/) — AGENTS.md 設定範例與最佳實務
- [`rules/`](rules/) — Rules 設定範例與最佳實務
- [`skills/`](skills/) — Skills 設定範例與最佳實務
- [`commands/`](commands/) — Commands（自訂指令）範例與最佳實務

規劃中，尚未建立資料夾：

- `mcp/` — MCP（Model Context Protocol）整合範例
- `api-integration/` — API Integration 最佳實務

## 四種機制怎麼選

| 需求 | 適合的機制 | 載入時機 / 成本 |
| --- | --- | --- |
| 一次性、手動觸發的簡短操作 | [Commands](commands/) | 手動觸發時載入，成本最低 |
| 持續影響風格、編碼偏好 | [Rules](rules/) | 對話開始時載入，可限定模式 |
| 有明確步驟、值得重複使用的工作流程 | [Skills](skills/) | 任務相關時提示，預設需批准 |
| 團隊層級、跟任何模式都無關的核心原則 | [AGENTS.md](agents/) | 每次對話自動載入，成本最高 |

從小開始：先寫 `AGENTS.md` 加一兩條 Rules，之後真的需要時再加 Commands 或 Skills，不要一開始就四種都設。每個檔案保持簡短、聚焦單一主題，需要引用大量內容時拆到獨立檔案再用 `@path/to/file.md` 語法引用，避免每次對話都載入用不到的內容。

Workshop 內容如果用到這裡的能力，應在對應的 `04-bob-tips.md` 中連結過來，而不是重複說明設定細節。
