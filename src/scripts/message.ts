const form = document.querySelector<HTMLFormElement>("[data-message-form]");

if (form) {
  const name = form.elements.namedItem("name") as HTMLInputElement;
  const email = form.elements.namedItem("email") as HTMLInputElement;
  const message = form.elements.namedItem("message") as HTMLTextAreaElement;
  const button = form.querySelector<HTMLButtonElement>("[data-message-send]")!;
  const label = form.querySelector<HTMLElement>("[data-send-label]")!;
  const status = form.querySelector<HTMLElement>("[data-message-status]")!;
  const count = form.querySelector<HTMLElement>("[data-message-count]")!;
  const draftKey = "yunke.message.draft.v1";
  let sending = false;

  function updateDraft() {
    status.textContent = "";
    status.removeAttribute("data-error");
    count.textContent = `${message.value.length.toLocaleString("en-US")} / 5,000`;
    try { sessionStorage.setItem(draftKey, JSON.stringify({ name: name.value, email: email.value, message: message.value })); } catch { /* The form also works without storage. */ }
  }

  try {
    const draft = JSON.parse(sessionStorage.getItem(draftKey) ?? "null");
    if (draft && typeof draft === "object") {
      for (const field of [name, email, message]) {
        if (typeof draft[field.name] === "string") field.value = draft[field.name].slice(0, field.maxLength);
      }
    }
  } catch { /* Ignore unavailable or invalid saved drafts. */ }
  count.textContent = `${message.value.length.toLocaleString("en-US")} / 5,000`;
  form.addEventListener("input", updateDraft);

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (sending) return;
    const honey = form.elements.namedItem("_honey") as HTMLInputElement;
    if (honey.value) return;
    if (!message.value.trim()) {
      message.setCustomValidity("Please write a message before sending.");
      message.reportValidity();
      message.addEventListener("input", () => message.setCustomValidity(""), { once: true });
      return;
    }
    sending = true;
    button.disabled = true;
    label.textContent = "Sending…";
    status.textContent = "Submitting your message…";
    status.removeAttribute("data-error");
    form.setAttribute("aria-busy", "true");
    // Keep the submitted draft stable while the request is in flight.
    for (const field of [name, email, message]) field.readOnly = true;

    try {
      const response = await fetch(form.dataset.ajaxEndpoint!, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
        signal: AbortSignal.timeout(20000)
      });
      const result = await response.json();
      if (!response.ok || (result.success !== true && result.success !== "true")) throw new Error("Submission was not accepted");
      status.textContent = "Message submitted. Thanks for reaching out!";
      form.reset();
      count.textContent = "0 / 5,000";
      try { sessionStorage.removeItem(draftKey); } catch { /* Storage is optional. */ }
    } catch {
      status.textContent = "Couldn't confirm submission. Your message is still here — please try again, or use the email link above.";
      status.setAttribute("data-error", "true");
    } finally {
      sending = false;
      button.disabled = false;
      label.textContent = "Send message";
      form.removeAttribute("aria-busy");
      for (const field of [name, email, message]) field.readOnly = false;
    }
  });
}
