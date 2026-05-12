const revealItems = document.querySelectorAll("[data-reveal]");
const counterItems = document.querySelectorAll("[data-counter]");
const accessForm = document.querySelector(".access-form");

const formatNumber = (value) => new Intl.NumberFormat("ru-RU").format(value);

const animateCounter = (node) => {
  if (node.dataset.counted === "true") return;

  const target = Number(node.dataset.counter);
  const duration = 900;
  const startedAt = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - startedAt) / duration, 1);
    const value = Math.round(target * progress);

    node.textContent = formatNumber(value);

    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      node.textContent = formatNumber(target);
      node.dataset.counted = "true";
    }
  };

  requestAnimationFrame(tick);
};

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counterItems.forEach((item) => counterObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
  counterItems.forEach(animateCounter);
}

if (accessForm) {
  accessForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const note = accessForm.querySelector(".form-note");
    const name = accessForm.elements.name?.value.trim();
    const contact = accessForm.elements.contact?.value.trim();

    if (!note) return;

    if (!name || !contact) {
      note.textContent = "Заполните имя и контакт для отправки доступа.";
      return;
    }

    note.textContent = "Заявка готова. Подключите обработчик формы к CRM или почте.";
    accessForm.reset();
  });
}
