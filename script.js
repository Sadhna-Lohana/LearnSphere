
// ---------- Mobile Navigation ----------
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation" : "Open navigation"
  );

  menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Close mobile menu after clicking a link
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    menuToggle.textContent = "☰";
  });
});

// ---------- Course Search and Filter ----------
const courseSearch = document.getElementById("courseSearch");
const categoryFilter = document.getElementById("categoryFilter");
const courseCards = document.querySelectorAll(".course-card");
const noResults = document.getElementById("noResults");

function filterCourses() {
  const searchTerm = courseSearch.value.trim().toLowerCase();
  const selectedCategory = categoryFilter.value;

  let visibleCourses = 0;

  courseCards.forEach((card) => {
    const title = card.dataset.title.toLowerCase();
    const description = card.querySelector("p").textContent.toLowerCase();
    const category = card.dataset.category;

    const matchesSearch =
      title.includes(searchTerm) || description.includes(searchTerm);

    const matchesCategory =
      selectedCategory === "All" || category === selectedCategory;

    const isVisible = matchesSearch && matchesCategory;

    card.hidden = !isVisible;

    if (isVisible) {
      visibleCourses++;
    }
  });

  noResults.hidden = visibleCourses !== 0;
}

courseSearch.addEventListener("input", filterCourses);
categoryFilter.addEventListener("change", filterCourses);

// ---------- Category Quick Links ----------
document.querySelectorAll(".category-card").forEach((card) => {
  card.addEventListener("click", () => {
    categoryFilter.value = card.dataset.category;
    filterCourses();
  });
});

// ---------- Toast Notification ----------
const toast = document.getElementById("toast");
let toastTimeout;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimeout);

  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

// ---------- Enrollment Buttons ----------
document.querySelectorAll(".enroll-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const courseName = button.dataset.course;

    showToast(
      `You selected "${courseName}". Student enrollment is not connected yet.`
    );
  });
});

// ---------- Dynamic Copyright Year ----------
document.getElementById("year").textContent = new Date().getFullYear();



/* ---------- Newsletter Form ---------- */

const newsletterForm = document.getElementById("newsletterForm");
const newsletterEmail = document.getElementById("newsletterEmail");
const newsletterMessage = document.getElementById("newsletterMessage");

newsletterForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const email = newsletterEmail.value.trim();

  // Check whether the email field is valid
  if (!newsletterEmail.checkValidity() || email.length === 0) {
    newsletterMessage.textContent =
      "Please enter a valid email address.";

    newsletterMessage.className = "newsletter-message error";
    newsletterEmail.focus();
    return;
  }

  // Frontend demo confirmation only
  newsletterMessage.textContent =
    "Thanks for your interest! Newsletter signup is a demo only.";

  newsletterMessage.className = "newsletter-message success";

  newsletterForm.reset();
});





/* Active Navigation Link Highlighting */
const activeNavLinks = document.querySelectorAll(
  '.nav-links a[href^="#"]:not(.btn):not(.nav-cta)'
);

const navTargets = Array.from(activeNavLinks)
  .map(link => {
    const target = document.querySelector(
      link.getAttribute("href")
    );

    return { link, target };
  })
  .filter(item => item.target !== null);

function updateActiveNavLink() {
  const marker = window.scrollY + 180;
  let currentItem = null;
  let currentTop = -Infinity;

  navTargets.forEach(item => {
    const sectionTop =
      item.target.getBoundingClientRect().top + window.scrollY;

    if (sectionTop <= marker && sectionTop > currentTop) {
      currentTop = sectionTop;
      currentItem = item;
    }
  });

  activeNavLinks.forEach(link => {
    const isActive = currentItem?.link === link;

    link.classList.toggle("active", isActive);

    if (isActive) {
      link.setAttribute("aria-current", "location");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

window.addEventListener("scroll", updateActiveNavLink);
window.addEventListener("resize", updateActiveNavLink);
window.addEventListener("load", updateActiveNavLink);

updateActiveNavLink();
