/* script.js - versión lista para copiar */

/* Estado del menú */
let menuVisible = false;

function mostrarOcultarMenu() {
  const nav = document.getElementById("nav");
  if (!nav) return;
  menuVisible = !menuVisible;
  nav.classList.toggle("responsive", menuVisible);
  const btn = document.querySelector(".nav-responsive");
  if (btn) btn.setAttribute("aria-expanded", String(menuVisible));
}

function seleccionar() {
  const nav = document.getElementById("nav");
  if (!nav) return;
  nav.classList.remove("responsive");
  menuVisible = false;
  const btn = document.querySelector(".nav-responsive");
  if (btn) btn.setAttribute("aria-expanded", "false");
}

/* Typewriter */
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const typewriter = document.getElementById("typewriter");
const fallbackPhrases = [
  "Programador Web Junior",
  "Frontend en modo supervivencia",
  "HTML, CSS y JavaScript",
  "Interfaces con señal propia"
];
let phrases = fallbackPhrases;

if (typewriter?.dataset?.phrases) {
  try {
    phrases = JSON.parse(typewriter.dataset.phrases);
  } catch (e) {
    phrases = fallbackPhrases;
  }
}

let phraseIndex = 0;
let letterIndex = 0;
let deleting = false;

function typeLoop() {
  if (!typewriter || prefersReducedMotion) return;
  const phrase = phrases[phraseIndex] || "";
  typewriter.textContent = phrase.slice(0, letterIndex);

  if (!deleting && letterIndex < phrase.length) {
    letterIndex += 1;
    setTimeout(typeLoop, 70);
    return;
  }

  if (!deleting && letterIndex === phrase.length) {
    deleting = true;
    setTimeout(typeLoop, 1250);
    return;
  }

  if (deleting && letterIndex > 0) {
    letterIndex -= 1;
    setTimeout(typeLoop, 38);
    return;
  }

  deleting = false;
  phraseIndex = (phraseIndex + 1) % phrases.length;
  setTimeout(typeLoop, 220);
}

typeLoop();

/* Animación de barras de skill */
function animateSkill(bar) {
  if (!bar || bar.dataset.animated === "true") return;
  const target = Number(bar.dataset.progress_percent || 0);
  const label = bar.querySelector("span");
  const start = performance.now();
  const duration = 1300;
  bar.dataset.animated = "true";
  bar.style.width = `${target}%`;

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const value = Math.round(target * progress);
    if (label) label.textContent = `${value}%`;
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const skillBars = document.querySelectorAll(".progreso");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateSkill(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.45 });
  skillBars.forEach((b) => observer.observe(b));
} else {
  skillBars.forEach(animateSkill);
}

/* Contador decorativo (opcional) */
const radCounter = document.getElementById("rad-counter");
if (radCounter && !prefersReducedMotion) {
  setInterval(() => {
    const nextValue = 10 + Math.floor(Math.random() * 35);
    radCounter.textContent = String(nextValue).padStart(3, "0");
  }, 1100);
}

/* Cursor personalizado */
const customCursor = document.querySelector(".wasteland-cursor");
const hasFinePointer = window.matchMedia("(pointer: fine)").matches;

let lastPointer = 0;
const THROTTLE = 16;

document.addEventListener("pointermove", (e) => {
  const now = performance.now();
  if (now - lastPointer < THROTTLE) return;
  lastPointer = now;

  document.documentElement.style.setProperty("--mouse-x", `${e.clientX}px`);
  document.documentElement.style.setProperty("--mouse-y", `${e.clientY}px`);

  if (customCursor && hasFinePointer) {
    document.body.classList.add("cursor-ready");
    document.documentElement.style.setProperty("--cursor-x", `${e.clientX}px`);
    document.documentElement.style.setProperty("--cursor-y", `${e.clientY}px`);
    customCursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
  }
});

if (customCursor && hasFinePointer) {
  const interactiveSelector = "a, button, input, textarea, [role='button']";

  document.addEventListener("pointerover", (ev) => {
    if (!(ev.target instanceof Element)) return;
    if (ev.target.closest(interactiveSelector)) customCursor.classList.add("is-hovering");
  });

  document.addEventListener("pointerout", (ev) => {
    if (!(ev.target instanceof Element)) return;
    if (ev.target.closest(interactiveSelector)) customCursor.classList.remove("is-hovering");
  });

  document.addEventListener("pointerdown", () => customCursor.classList.add("is-clicking"));
  document.addEventListener("pointerup", () => customCursor.classList.remove("is-clicking"));
}

/* Efecto spark decorativo */
const hero = document.querySelector(".inicio");
function randomBetween(min, max) { return Math.random() * (max - min) + min; }

if (hero && !prefersReducedMotion) {
  for (let i = 0; i < 28; i++) {
    const spark = document.createElement("span");
    spark.className = "spark";
    spark.style.setProperty("--x", `${randomBetween(0, 100)}%`);
    spark.style.setProperty("--drift", `${randomBetween(-120, 120)}px`);
    spark.style.setProperty("--duration", `${randomBetween(7, 14)}s`);
    spark.style.setProperty("--delay", `${randomBetween(-14, 0)}s`);
    hero.appendChild(spark);
  }
}

/* Tilt cards */
document.querySelectorAll("[data-tilt]").forEach((card) => {
  card.addEventListener("pointermove", (ev) => {
    if (prefersReducedMotion) return;
    const rect = card.getBoundingClientRect();
    const x = ev.clientX - rect.left;
    const y = ev.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 10;
    const rotateX = ((y / rect.height) - 0.5) * -10;
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });
  card.addEventListener("pointerleave", () => { card.style.transform = ""; });
});

/* Navegación activa por secciones */
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("nav a[href^='#']");
if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  }, { rootMargin: "-42% 0px -48% 0px" });
  sections.forEach((s) => sectionObserver.observe(s));
}

/* Formulario (EmailJS) */
const form = document.getElementById("form");
const submitButton = document.getElementById("button");
const formStatus = document.getElementById("form-status");

if (form && submitButton) {
  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    submitButton.disabled = true;
    submitButton.textContent = "Transmitiendo...";
    if (formStatus) formStatus.textContent = "Abriendo canal seguro...";

    if (!window.emailjs) {
      submitButton.disabled = false;
      submitButton.textContent = "Enviar señal";
      if (formStatus) formStatus.textContent = "No se ha podido cargar EmailJS. Revisa la conexión.";
      return;
    }

    const serviceID = "default_service";
    const templateID = "template_z4dqojz";
    window.emailjs.sendForm(serviceID, templateID, this).then(() => {
      submitButton.disabled = false;
      submitButton.textContent = "Enviar señal";
      form.reset();
      if (formStatus) formStatus.textContent = "Señal enviada. Te responderé pronto.";
    }, () => {
      submitButton.disabled = false;
      submitButton.textContent = "Enviar señal";
      if (formStatus) formStatus.textContent = "La señal se ha perdido. Inténtalo de nuevo en un momento.";
    });
  });
}
