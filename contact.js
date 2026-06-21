document.querySelectorAll("[data-copy-email]").forEach((button) => {
  button.addEventListener("click", async () => {
    const email = button.dataset.copyEmail || "";
    const card = button.closest(".contact-card");
    const status = card ? card.querySelector("[data-copy-status]") : null;

    try {
      await navigator.clipboard.writeText(email);
      if (status) status.textContent = "Email copied.";
    } catch (_error) {
      if (status) status.textContent = email;
    }
  });
});
