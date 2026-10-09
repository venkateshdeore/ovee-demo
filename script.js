// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Theme toggle (remembers choice when storage is available)
const root = document.documentElement;
const toggle = document.getElementById("themeToggle");
try {
  const saved = localStorage.getItem("theme");
  if (saved) root.dataset.theme = saved;
} catch (e) {}

toggle.addEventListener("click", () => {
  const isDark = root.dataset.theme
    ? root.dataset.theme === "dark"
    : matchMedia("(prefers-color-scheme: dark)").matches;
  root.dataset.theme = isDark ? "light" : "dark";
  try { localStorage.setItem("theme", root.dataset.theme); } catch (e) {}
});

// Writing filters
const chips = document.querySelectorAll(".chip");
const cards = document.querySelectorAll(".card");
chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    chips.forEach((c) => c.classList.remove("active"));
    chip.classList.add("active");
    const filter = chip.dataset.filter;
    cards.forEach((card) => {
      const topics = card.dataset.topic.split(" ");
      card.classList.toggle("hidden", filter !== "all" && !topics.includes(filter));
    });
  });
});

// Fade sections in as they scroll into view
const revealables = document.querySelectorAll(".section, .card");
revealables.forEach((el) => el.classList.add("reveal"));
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);
revealables.forEach((el) => observer.observe(el));
