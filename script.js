document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#primary-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    });
    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open navigation");
    }));
  }

  const year = document.querySelector("#year");
  if (year) year.textContent = new Date().getFullYear();

  const form = document.querySelector("#inquiryForm");
  const status = document.querySelector("#formStatus");
  if (form && status) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      status.className = "form-status";
      if (!form.reportValidity()) return;

      const data = new FormData(form);
      const name = String(data.get("name") || "").trim();
      const email = String(data.get("email") || "").trim();
      const service = String(data.get("service") || "").trim();
      const message = String(data.get("message") || "").trim();
      if (name.length < 2 || message.length < 10 || !email || !service) {
        status.textContent = "Please check your name, email, service and project description.";
        status.classList.add("error");
        return;
      }

      const subject = encodeURIComponent(`Project enquiry — ${service}`);
      const body = encodeURIComponent(
        `New project enquiry for The House of BigMan\n\n` +
        `Name: ${name}\nEmail: ${email}\nPhone: ${data.get("phone") || "Not provided"}\n` +
        `Service: ${service}\nBudget: ${data.get("budget") || "Not specified"}\n` +
        `Ideal date: ${data.get("date") || "Not specified"}\n\nProject details:\n${message}`
      );

      status.textContent = "Your email app should open with the enquiry details. Review the message and send it to complete your enquiry.";
      status.classList.add("success");
      // TODO: confirm this address with the business owner before publishing.
      window.location.href = `mailto:hello@thehouseofbigman.com.au?subject=${subject}&body=${body}`;
    });
  }
});
