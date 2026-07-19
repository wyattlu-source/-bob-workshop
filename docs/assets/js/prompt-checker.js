// 離線、規則式的 Prompt 自我檢查工具。不呼叫任何 AI 服務，純粹用正規表示式
// 對照 Workshop（見 workshops/medical/04-bob-tips.md、06-key-takeaways.md）教過的
// 幾個 Prompt 寫作重點，給學員一個練習寫 Prompt 時可以自我檢查的清單。
(function () {
  const RULES = [
    {
      id: "specific-target",
      label: "有指定具體檔案、函式或元素",
      tip: "提到檔案名稱、函式名稱，或用反引號標出程式碼片段、id/class，Bob 比較不會猜錯要改哪裡。",
      test: (text) =>
        /`[^`]+`/.test(text) ||
        /\.(js|html|css|json)\b/i.test(text) ||
        /[a-zA-Z_][\w]*\(\)/.test(text) ||
        /[#.][a-zA-Z][\w-]*/.test(text),
    },
    {
      id: "boundary",
      label: "有畫出「不要動什麼」的邊界",
      tip: "明確講「不要修改 XX，只新增 YY」，可以保護已經驗證過的程式碼不被連帶改掉。",
      test: (text) => /不要(修改|更動|動|重寫|影響)|只(新增|加|改)/.test(text),
    },
    {
      id: "expected-result",
      label: "有描述預期結果或驗收方式",
      tip: "講清楚做完應該長怎樣、要顯示什麼，才能知道 Bob 有沒有做對。",
      test: (text) => /預期|應該|驗收|確認|顯示|回傳|檢查|測試/.test(text),
    },
    {
      id: "edge-case",
      label: "有提到例外狀況或業務規則",
      tip: "隱含的業務規則（例如「同一時間只能有一個」）要明講，Bob 才會處理例外情況。",
      test: (text) => /如果|例外|否則|但是|除非|只能有一/.test(text),
    },
    {
      id: "scope-size",
      label: "長度適中，範圍不會太模糊也不會太大",
      tip: "太短（例如「做一個看診系統」）容易讓 Bob 自由發揮；一次塞太多需求，會讓改動範圍難以檢查。建議一個 Prompt 專注一件事。",
      test: (text) => text.trim().length >= 20 && text.trim().length <= 600,
    },
  ];

  const EXAMPLES = {
    good:
      "在候診名單每一列加上操作按鈕：狀態為 waiting 的列顯示「叫號」按鈕，點擊後把該病患狀態改成 in-consultation。" +
      "但如果目前已經有其他病患是 in-consultation 狀態，要先跳出確認視窗，使用者確認後才切換狀態。" +
      "不要修改 render() 已經完成的排序與顯示邏輯，改動後呼叫 render() 更新畫面。",
    weak: "幫我做一個看診系統",
  };

  function evaluate(text) {
    return RULES.map((rule) => ({ ...rule, pass: rule.test(text) }));
  }

  function renderResults(container, text) {
    if (!text.trim()) {
      container.innerHTML = `<p class="text-body-secondary mb-0">貼上或輸入你的 Prompt，下面會即時對照 Workshop 教過的重點自我檢查。</p>`;
      return;
    }

    const results = evaluate(text);
    const passCount = results.filter((r) => r.pass).length;
    const items = results
      .map(
        (r) => `
        <li class="list-group-item d-flex gap-2 align-items-start">
          <span class="fs-5 ${r.pass ? "text-success" : "text-warning"}">${r.pass ? "✓" : "△"}</span>
          <div>
            <div class="fw-semibold">${r.label}</div>
            <div class="text-body-secondary small">${r.tip}</div>
          </div>
        </li>`
      )
      .join("");

    container.innerHTML = `
      <p class="fw-semibold mb-3">符合 ${passCount} / ${results.length} 項</p>
      <ul class="list-group mb-3">${items}</ul>
      <p class="text-body-secondary small mb-0">
        這是規則式的自我檢查，不是 AI 評分：用來提醒 Workshop 教過的幾個重點，不保證涵蓋所有情況，也不代表 Bob 一定會照著做。
      </p>`;
  }

  function setupPromptChecker() {
    const input = document.getElementById("playground-prompt-input");
    const results = document.getElementById("playground-check-results");
    if (!input || !results) return;

    input.addEventListener("input", () => renderResults(results, input.value));

    document.getElementById("playground-example-good")?.addEventListener("click", () => {
      input.value = EXAMPLES.good;
      renderResults(results, input.value);
    });

    document.getElementById("playground-example-weak")?.addEventListener("click", () => {
      input.value = EXAMPLES.weak;
      renderResults(results, input.value);
    });

    document.getElementById("playground-clear")?.addEventListener("click", () => {
      input.value = "";
      renderResults(results, input.value);
    });

    renderResults(results, input.value);
  }

  document.addEventListener("DOMContentLoaded", setupPromptChecker);
})();
