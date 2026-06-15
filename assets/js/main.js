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
        const revealTargets = document.querySelectorAll(".section, .record-card, .project-record, .system-node, .image-frame, .stat-card, .timeline-list li, .shop-image-card, .shop-buy-panel");
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

    function initShop() {
        const addButton = document.querySelector("[data-add-to-cart]");
        const qtyInput = document.querySelector("[data-shop-qty]");
        const sizeOptions = Array.from(document.querySelectorAll("[data-size]"));
        const imageButtons = Array.from(document.querySelectorAll("[data-shop-image]"));
        const drawer = document.querySelector("[data-cart-drawer]");
        const closeButton = document.querySelector("[data-cart-close]");
        const itemsNode = document.querySelector("[data-cart-items]");
        const totalNode = document.querySelector("[data-cart-total]");
        const checkoutLink = document.querySelector("[data-checkout-link]");
        const price = 29000;
        let selectedSize = "S";
        let cart = [];

        if (!addButton || !qtyInput || !drawer || !itemsNode || !totalNode || !checkoutLink) return;

        function formatCurrency(value) {
            return `KRW ${value.toLocaleString("en-US")}`;
        }

        function updateImageChoice(activeButton) {
            imageButtons.forEach((button) => {
                const active = button === activeButton;
                button.classList.toggle("active", active);
                button.setAttribute("aria-pressed", String(active));
            });
        }

        function updateSize(activeButton) {
            selectedSize = activeButton.dataset.size || "S";
            sizeOptions.forEach((button) => {
                const active = button === activeButton;
                button.classList.toggle("active", active);
                button.setAttribute("aria-pressed", String(active));
            });
        }

        function openCart() {
            drawer.classList.add("open");
            drawer.setAttribute("aria-hidden", "false");
        }

        function closeCart() {
            drawer.classList.remove("open");
            drawer.setAttribute("aria-hidden", "true");
        }

        function renderCart() {
            if (!cart.length) {
                itemsNode.innerHTML = '<p class="cart-empty">Your cart is empty.</p>';
                totalNode.textContent = formatCurrency(0);
                checkoutLink.href = checkoutLink.href.split("?")[0] + "?subject=PSI%20Shop%20Order";
                return;
            }

            const total = cart.reduce((sum, item) => sum + item.qty * price, 0);
            itemsNode.innerHTML = cart.map((item) => `
                <div class="cart-line">
                    <div>
                        <strong>PSLV-I Technical Tee</strong>
                        <span>Size ${item.size} / Qty ${item.qty}</span>
                    </div>
                    <strong>${formatCurrency(item.qty * price)}</strong>
                </div>
            `).join("");
            totalNode.textContent = formatCurrency(total);

            const body = [
                "Hello PSI,",
                "",
                "I would like to reserve:",
                ...cart.map((item) => `- PSLV-I Technical Tee / Size ${item.size} / Qty ${item.qty}`),
                "",
                `Estimated total: ${formatCurrency(total)}`,
                "",
                "Name:",
                "Phone:",
                "Pickup preference:"
            ].join("\n");
            checkoutLink.href = `mailto:uikangee@postech.ac.kr?subject=${encodeURIComponent("PSI Shop Order")}&body=${encodeURIComponent(body)}`;
        }

        imageButtons.forEach((button) => {
            button.addEventListener("click", () => updateImageChoice(button));
        });

        sizeOptions.forEach((button) => {
            button.addEventListener("click", () => updateSize(button));
        });

        addButton.addEventListener("click", () => {
            const qty = Math.max(1, Math.min(10, Number(qtyInput.value) || 1));
            const existing = cart.find((item) => item.size === selectedSize);
            if (existing) existing.qty = Math.min(10, existing.qty + qty);
            else cart.push({ size: selectedSize, qty });
            renderCart();
            openCart();
        });

        closeButton.addEventListener("click", closeCart);
        drawer.addEventListener("click", (event) => {
            if (event.target === drawer) closeCart();
        });
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") closeCart();
        });
    }

    updateHeader();
    initReveal();
    initShop();
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
