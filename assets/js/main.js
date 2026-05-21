(function () {
    "use strict";

    const body = document.body;
    const header = document.querySelector("[data-site-header]");
    const menu = document.querySelector("[data-menu]");
    const menuToggle = document.querySelector("[data-menu-toggle]");
    const languageToggle = document.querySelector("[data-language-toggle]");
    const currentLang = document.querySelector("[data-current-lang]");
    const themeToggle = document.querySelector("[data-theme-toggle]");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function preferredLanguage() {
        return localStorage.getItem("psi-language") || "ko";
    }

    function preferredTheme() {
        return localStorage.getItem("psi-theme") || "dark";
    }

    function updateMeta(language) {
        const title = document.querySelector(`meta[name="psi-title-${language}"]`);
        const description = document.querySelector(`meta[name="psi-description-${language}"]`);
        const descriptionTag = document.querySelector('meta[name="description"]');

        if (title) document.title = title.content;
        if (description && descriptionTag) descriptionTag.content = description.content;
        document.documentElement.lang = language === "en" ? "en" : "ko";
    }

    function setLanguage(language) {
        const normalized = language === "en" ? "en" : "ko";
        body.classList.toggle("lang-en", normalized === "en");
        localStorage.setItem("psi-language", normalized);
        if (currentLang) currentLang.textContent = normalized.toUpperCase();
        if (languageToggle) {
            languageToggle.setAttribute("aria-pressed", String(normalized === "en"));
            languageToggle.setAttribute("aria-label", normalized === "en" ? "Switch to Korean" : "Switch to English");
        }
        updateMeta(normalized);
    }

    function setTheme(theme) {
        const normalized = theme === "light" ? "light" : "dark";
        body.classList.toggle("theme-light", normalized === "light");
        localStorage.setItem("psi-theme", normalized);
        if (themeToggle) {
            themeToggle.setAttribute("aria-pressed", String(normalized === "light"));
            themeToggle.setAttribute("aria-label", normalized === "light" ? "Switch to dark mode" : "Switch to light mode");
        }
    }

    function closeMenu() {
        if (!menu || !menuToggle) return;
        menu.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        body.classList.remove("menu-open");
    }

    function updateHeader() {
        if (!header) return;
        header.classList.toggle("scrolled", window.scrollY > 16);
    }

    function initReveal() {
        const revealTargets = document.querySelectorAll(".section, .program-card, .project-record, .system-node, .image-frame");
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

    setLanguage(preferredLanguage());
    setTheme(preferredTheme());
    updateHeader();
    initReveal();

    window.addEventListener("scroll", updateHeader, { passive: true });

    if (languageToggle) {
        languageToggle.addEventListener("click", () => {
            setLanguage(body.classList.contains("lang-en") ? "ko" : "en");
        });
    }

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            setTheme(body.classList.contains("theme-light") ? "dark" : "light");
        });
    }

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
