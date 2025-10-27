document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach((el) => {
  new bootstrap.Tooltip(el);
});

const filterButtons = document.querySelectorAll(".filter-btn");
const filterItems = document.querySelectorAll(".filter-item");

filterButtons.forEach((button) => {
  button.addEventListener("click", function () {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    this.classList.add("active");
    const filterValue = this.getAttribute("data-filter");
    filterItems.forEach((item) => {
      const show =
        filterValue === "all" ||
        item.getAttribute("data-category") === filterValue;
      item.parentElement.style.display = show ? "" : "none";
    });
  });
});
document.querySelectorAll(".dropdown-item[data-filter]").forEach((item) => {
  item.addEventListener("click", function (e) {
    e.preventDefault();
    const filterValue = this.getAttribute("data-filter");


    document.getElementById("portfolio").scrollIntoView({ behavior: "smooth" });


    setTimeout(() => {
      const targetBtn = document.querySelector(
        `.filter-btn[data-filter="${filterValue}"]`
      );
      if (targetBtn) targetBtn.click();
    }, 500);
  });
});
(function () {
  const forms = document.querySelectorAll(".needs-validation");
  const toastEl = document.getElementById("successToast");
  const toast = toastEl ? new bootstrap.Toast(toastEl) : null;

  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        } else {
          event.preventDefault();
          if (toast) toast.show();
          form.reset();
          const modalEl = form.closest(".modal");
          if (modalEl) {
            const modal =
              bootstrap.Modal.getInstance(modalEl) ||
              new bootstrap.Modal(modalEl);
            modal.hide();
          }
        }
        form.classList.add("was-validated");
      },
      false
    );
  });
})();


const sections = document.querySelectorAll("section");
const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

sections.forEach((section) => {
  section.style.opacity = "0";
  section.style.transform = "translateY(20px)";
  section.style.transition = "all 0.5s ease";
  observer.observe(section);
});
