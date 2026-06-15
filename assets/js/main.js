(function () {
    "use strict";

    const body = document.body;
    const header = document.querySelector("[data-site-header]");
    const menu = document.querySelector("[data-menu]");
    const menuToggle = document.querySelector("[data-menu-toggle]");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function closeMenu() {
        if (!menu || !menuToggle) return;
        menu.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        body.classList.remove("menu-open");
    }

    function updateHeader() {
        if (!header) return;
        header.classList.toggle("scrolled", window.scrollY > 18);
    }

    function initReveal() {
        const revealTargets = document.querySelectorAll(".section, .record-card, .project-record, .system-node, .image-frame, .stat-card, .timeline-list li");
        revealTargets.forEach((target) => target.setAttribute("data-reveal", ""));

        if (reduceMotion || !("IntersectionObserver" in window)) {
            revealTargets.forEach((target) => target.classList.add("is-visible"));
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

        revealTargets.forEach((target) => observer.observe(target));
    }

    updateHeader();
    initReveal();
    window.addEventListener("scroll", updateHeader, { passive: true });

    if (menu && menuToggle) {
        menuToggle.addEventListener("click", () => {
            const expanded = menuToggle.getAttribute("aria-expanded") === "true";
            menuToggle.setAttribute("aria-expanded", String(!expanded));
            menu.classList.toggle("active", !expanded);
            body.classList.toggle("menu-open", !expanded);
        });

        menu.addEventListener("click", (event) => {
            if (event.target.closest("a")) closeMenu();
        });
    }

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") closeMenu();
    });

    document.addEventListener("click", (event) => {
        if (!menu || !menuToggle) return;
        if (!menu.contains(event.target) && !menuToggle.contains(event.target)) closeMenu();
    });
})();
