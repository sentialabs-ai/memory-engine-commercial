const numberFormat = new Intl.NumberFormat("en-US");

const scenarios = {
  companion: {
    eyebrow: "AI Companion",
    title: "User preference memory",
    stored: "User prefers evening check-ins.",
    retrieved: "User prefers evening check-ins.",
    standardTokens: 581,
    engineTokens: 16,
    relevantCount: 1,
    packet: "[1] (preference, importance=0.92) User prefers evening check-ins."
  },
  agent: {
    eyebrow: "AI Agent",
    title: "Project, task, and customer memory",
    stored: "Project Alpha status is In Development.",
    retrieved: "Project Alpha status is In Development. Updated detail: still In Development after planning review.",
    standardTokens: 706,
    engineTokens: 71,
    relevantCount: 3,
    packet: [
      "[1] (project, importance=0.98, repeated=2x) Project Alpha status is In Development. Updated detail: still In Development after planning review.",
      "[2] (task, importance=0.88) Project Alpha needs API validation before customer demo.",
      "[3] (preference, importance=0.86) Customer prefers concise weekly updates."
    ].join("\n")
  },
  game: {
    eyebrow: "Game NPC",
    title: "NPC remembers player actions",
    stored: "NPC Mira remembers that the player gave her a silver music box as a gift.",
    retrieved: "NPC Mira remembers that the player gave her a silver music box as a gift.",
    standardTokens: 668,
    engineTokens: 19,
    relevantCount: 1,
    packet: "[1] (event, importance=0.94) NPC Mira remembers that the player gave her a silver music box as a gift."
  }
};

const benchmarkPackets = [
  "[1] (project, importance=0.96) Project Atlas enterprise launch is scheduled for the September customer pilot.",
  "[2] (customer_requirement, importance=0.94) Context packets must stay under 700 tokens.",
  "[3] (customer_requirement, importance=0.93) Retrieval must return only launch-relevant memories.",
  "[4] (task, importance=0.92) Complete local validation before outreach.",
  "[5] (event, importance=0.88) Mira recalls the player gift reliably.",
  "[6] (project, importance=0.95) Enterprise launch preparation is in final validation.",
  "[7] (task, importance=0.91) Prepare a founder-facing demo with token savings.",
  "[8] (preference, importance=0.90) Show business-friendly numbers first."
];

const benchmarkScenarios = {
  500: {
    standardTokens: 19237,
    engineTokens: 171
  },
  1000: {
    standardTokens: 38642,
    engineTokens: 171
  },
  5000: {
    standardTokens: 194875,
    engineTokens: 171
  }
};

let activeMode = "companion";
let activeRecords = "500";

function byId(id) {
  return document.getElementById(id);
}

function setText(id, value) {
  const node = byId(id);
  if (node) node.textContent = value;
}

function format(value) {
  return numberFormat.format(value);
}

function reduction(standardTokens, engineTokens) {
  const saved = Math.max(0, standardTokens - engineTokens);
  const percent = standardTokens ? (saved / standardTokens) * 100 : 0;
  return { saved, percent };
}

function benchmarkData() {
  const tokenData = benchmarkScenarios[activeRecords];
  return {
    eyebrow: "Large Context Benchmark",
    title: `${format(Number(activeRecords))} stored records`,
    stored: `Synthetic local history with ${format(Number(activeRecords))} records across preferences, tasks, project facts, customer requirements, and NPC events.`,
    retrieved: "8 Project Atlas memories retrieved for the enterprise launch query.",
    standardTokens: tokenData.standardTokens,
    engineTokens: tokenData.engineTokens,
    relevantCount: 8,
    packet: benchmarkPackets.join("\n")
  };
}

function currentScenario() {
  return activeMode === "benchmark" ? benchmarkData() : scenarios[activeMode];
}

function renderDemo() {
  const scenario = currentScenario();
  const token = reduction(scenario.standardTokens, scenario.engineTokens);

  setText("mode-eyebrow", scenario.eyebrow);
  setText("mode-title", scenario.title);
  setText("stored-memory", scenario.stored);
  setText("retrieved-memory", scenario.retrieved);
  setText("standard-tokens", format(scenario.standardTokens));
  setText("engine-tokens", format(scenario.engineTokens));
  setText("tokens-saved", format(token.saved));
  setText("reduction-percent", `${token.percent.toFixed(2)}%`);
  setText("relevant-count", `${scenario.relevantCount} relevant ${scenario.relevantCount === 1 ? "memory" : "memories"}`);
  setText("context-packet", scenario.packet);

  document.querySelectorAll("[data-mode]").forEach((button) => {
    button.classList.toggle("active", button.dataset.mode === activeMode);
  });
  document.querySelectorAll("[data-records]").forEach((button) => {
    button.classList.toggle("active", button.dataset.records === activeRecords);
  });

  const benchmarkPicker = byId("benchmark-picker");
  if (benchmarkPicker) benchmarkPicker.hidden = activeMode !== "benchmark";

}

document.querySelectorAll("[data-mode]").forEach((button) => {
  button.addEventListener("click", () => {
    activeMode = button.dataset.mode;
    renderDemo();
  });
});

document.querySelectorAll("[data-records]").forEach((button) => {
  button.addEventListener("click", () => {
    activeRecords = button.dataset.records;
    renderDemo();
  });
});

const runDemoButton = byId("run-demo-button");
if (runDemoButton) {
  runDemoButton.addEventListener("click", renderDemo);
}

renderDemo();
