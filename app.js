const PUBLIC_METRIC = "Up to 80%+ Token Reduction";

const workflows = {
  companion: {
    label: "User",
    store: {
      inputTitle: "I like evening check-ins.",
      inputCopy: "The user shares a durable preference during a normal AI companion conversation.",
      engineTitle: "Stores preference",
      engineCopy: "The write gate stores the preference because it is stable, useful, and likely to matter later.",
      memories: [
        "Category: preference",
        "Memory: user likes evening check-ins",
        "Use: future companion timing and tone"
      ],
      recalled: "Preference: evening check-ins"
    },
    later: {
      inputTitle: "Later: the user returns after work.",
      inputCopy: "The active chat does not need the full prior conversation to preserve continuity.",
      engineTitle: "Keeps durable memory available",
      engineCopy: "The memory record remains available for retrieval without replaying unrelated chat history.",
      memories: [
        "Stored preference remains compact",
        "No full transcript replay required",
        "Ready for query-specific recall"
      ],
      recalled: "Stored companion preference"
    },
    retrieve: {
      inputTitle: "Should the assistant check in tonight?",
      inputCopy: "The product asks for relevant memory before generating the next response.",
      engineTitle: "Retrieve preference",
      engineCopy: "Memory Engine recalls the evening check-in preference and packages it for the model.",
      memories: [
        "Retrieved: evening check-ins are welcome",
        "Context packet: preference only",
        "Response can acknowledge the user's routine"
      ],
      recalled: "Preference: evening check-ins"
    }
  },
  agent: {
    label: "Workspace",
    store: {
      inputTitle: "Store project status, task state, and customer preference.",
      inputCopy: "An AI agent platform records durable operational state across a customer workflow.",
      engineTitle: "Stores structured work memory",
      engineCopy: "Memory Engine captures project status, task state, and customer preference as separate durable records.",
      memories: [
        "Project status: onboarding active",
        "Task state: API integration pending",
        "Customer preference: concise weekly updates"
      ],
      recalled: "Project + task + customer packet"
    },
    later: {
      inputTitle: "Later: the agent resumes the customer workspace.",
      inputCopy: "The current task needs relevant state, not the entire previous workspace transcript.",
      engineTitle: "Maintains compact state",
      engineCopy: "Stored work memory stays organized by category so the agent can retrieve only what matters.",
      memories: [
        "Project status remains available",
        "Task state is preserved",
        "Customer preference is kept separate"
      ],
      recalled: "Structured agent memory"
    },
    retrieve: {
      inputTitle: "Retrieve relevant memory packet.",
      inputCopy: "The agent asks what it needs before composing the next customer-facing update.",
      engineTitle: "Builds relevant memory packet",
      engineCopy: "Memory Engine retrieves project, task, and preference records and packages them into a compact prompt block.",
      memories: [
        "Project: onboarding active",
        "Task: API integration pending",
        "Preference: concise weekly updates"
      ],
      recalled: "Relevant memory packet"
    }
  },
  game: {
    label: "NPC",
    store: {
      inputTitle: "NPC remembers player choices, completed quests, and relationship state.",
      inputCopy: "A game workflow stores durable player state that should carry across sessions.",
      engineTitle: "Stores gameplay memory",
      engineCopy: "Memory Engine separates player choices, quest progress, and relationship state into retrievable memory records.",
      memories: [
        "Player choice: protected the village",
        "Completed quest: Moonlit Bridge",
        "Relationship state: Mira trusts the player"
      ],
      recalled: "NPC state memory"
    },
    later: {
      inputTitle: "Later: the player meets the NPC again.",
      inputCopy: "The scene needs continuity without replaying every prior dialogue line.",
      engineTitle: "Keeps session memory compact",
      engineCopy: "The NPC can retrieve the state it needs for the current scene.",
      memories: [
        "Choices remain available",
        "Completed quests stay queryable",
        "Relationship state informs dialogue"
      ],
      recalled: "Player and NPC continuity"
    },
    retrieve: {
      inputTitle: "Retrieve NPC context for dialogue.",
      inputCopy: "The game requests memory relevant to the NPC and the current scene.",
      engineTitle: "Returns scene-ready context packet",
      engineCopy: "Memory Engine recalls the relevant player choices, completed quest, and relationship state.",
      memories: [
        "Choice: protected the village",
        "Quest: Moonlit Bridge complete",
        "Relationship: Mira trusts the player"
      ],
      recalled: "NPC dialogue memory packet"
    }
  }
};

let currentScenario = "companion";
let currentStep = "store";

function setText(id, value) {
  const node = document.getElementById(id);
  if (node) node.textContent = value;
}

function renderList(id, items) {
  const list = document.getElementById(id);
  if (!list) return;
  list.innerHTML = "";
  for (const item of items) {
    const li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);
  }
}

function renderWorkflow() {
  const scenario = workflows[currentScenario] || workflows.companion;
  const step = scenario[currentStep] || scenario.store;

  setText("workflow-user-label", scenario.label);
  setText("workflow-input-title", step.inputTitle);
  setText("workflow-input-copy", step.inputCopy);
  setText("workflow-engine-title", step.engineTitle);
  setText("workflow-engine-copy", step.engineCopy);
  setText("workflow-token-saved", PUBLIC_METRIC);
  setText("workflow-memory-recalled", step.recalled);
  renderList("workflow-memory-list", step.memories);

  document.querySelectorAll("[data-scenario]").forEach((button) => {
    button.classList.toggle("active", button.dataset.scenario === currentScenario);
  });
  document.querySelectorAll("[data-step]").forEach((button) => {
    button.classList.toggle("active", button.dataset.step === currentStep);
  });
}

document.querySelectorAll("[data-scenario]").forEach((button) => {
  button.addEventListener("click", () => {
    currentScenario = button.dataset.scenario;
    currentStep = "store";
    renderWorkflow();
  });
});

document.querySelectorAll("[data-step]").forEach((button) => {
  button.addEventListener("click", () => {
    currentStep = button.dataset.step;
    renderWorkflow();
  });
});

renderWorkflow();
