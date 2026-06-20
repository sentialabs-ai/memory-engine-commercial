const liveScenarios = {
  companion: {
    standardTokens: 18400,
    engineTokens: 3600,
    standardRecalled: "Full transcript",
    engineRecalled: "6 durable memories",
    saved: "Up to 80%+ Token Reduction",
    standard: [
      "Prior sessions are replayed with greetings, repeated preferences, and topic drift.",
      "Relevant preference must be rediscovered from a long context window.",
      "Prompt cost rises as user history grows."
    ],
    engine: [
      "Preference memory: evening check-ins are useful.",
      "Constraint memory: avoid morning notifications.",
      "Context packet includes only records relevant to the current reply."
    ]
  },
  agent: {
    standardTokens: 23600,
    engineTokens: 4600,
    standardRecalled: "Meeting history",
    engineRecalled: "7 project memories",
    saved: "Up to 80%+ Token Reduction",
    standard: [
      "Customer decisions are mixed with old planning messages.",
      "Latency and token budget constraints appear in multiple places.",
      "The agent must scan broad task history before acting."
    ],
    engine: [
      "Project memory: Atlas retrieval target is under 50 ms.",
      "Constraint memory: 400 token context packet budget.",
      "Decision memory: store customer constraints and skip low-value turns."
    ]
  },
  game: {
    standardTokens: 15800,
    engineTokens: 3000,
    standardRecalled: "Scene transcript",
    engineRecalled: "5 NPC memories",
    saved: "Up to 80%+ Token Reduction",
    standard: [
      "Quest dialogue and shop dialogue are replayed together.",
      "NPC-relevant facts are buried in prior session text.",
      "Repeated player preference details increase context size."
    ],
    engine: [
      "NPC memory: Mira remembers blue paintbrush gifts.",
      "Player state can be retrieved by character, quest, or tag.",
      "Duplicate memories consolidate into repeated durable records."
    ]
  }
};

function liveFormat(value) {
  return new Intl.NumberFormat("en-US").format(value);
}

function liveSet(id, value) {
  const node = document.getElementById(id);
  if (node) node.textContent = value;
}

function liveList(id, items) {
  const list = document.getElementById(id);
  if (!list) return;
  list.innerHTML = "";
  for (const item of items) {
    const li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);
  }
}

function renderLiveScenario(name) {
  const scenario = liveScenarios[name] || liveScenarios.companion;
  const maxTokens = Math.max(scenario.standardTokens, scenario.engineTokens);

  liveSet("live-standard-tokens", liveFormat(scenario.standardTokens));
  liveSet("live-engine-tokens", liveFormat(scenario.engineTokens));
  liveSet("live-standard-recalled", scenario.standardRecalled);
  liveSet("live-engine-recalled", scenario.engineRecalled);
  liveSet("live-standard-saved", "0%");
  liveSet("live-engine-saved", scenario.saved);
  liveList("live-standard-list", scenario.standard);
  liveList("live-engine-list", scenario.engine);

  document.getElementById("live-standard-meter").style.width = `${(scenario.standardTokens / maxTokens) * 100}%`;
  document.getElementById("live-engine-meter").style.width = `${Math.max(12, (scenario.engineTokens / maxTokens) * 100)}%`;

  document.querySelectorAll("[data-live-scenario]").forEach((button) => {
    button.classList.toggle("active", button.dataset.liveScenario === name);
  });
}

document.querySelectorAll("[data-live-scenario]").forEach((button) => {
  button.addEventListener("click", () => renderLiveScenario(button.dataset.liveScenario));
});

renderLiveScenario("companion");
