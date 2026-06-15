---
layout: default
title: Shop
description: Shop PSI mission merchandise and reserve the PSLV-I launch vehicle T-shirt.
---

<section class="shop-hero">
    <div class="container-wide shop-hero-grid">
        <div class="shop-hero-copy">
            <p class="eyebrow">06 / Shop</p>
            <h1>Wear the mission record.</h1>
            <p class="hero-lede">A small PSI merch drop inspired by launch vehicle drawings, team hardware, and the visual language of Korea's new-space builders.</p>
            <div class="hero-actions">
                <a class="btn btn-primary" href="#shop-product">Shop The Tee</a>
                <a class="btn btn-secondary" href="mailto:{{ site.author.email }}?subject=PSI%20Shop%20Inquiry">Bulk Inquiry</a>
            </div>
        </div>
        <div class="shop-hero-media" aria-label="PSI launch vehicle T-shirt front and back">
            <img class="shop-tee-front" src="{{ '/assets/images/shop/psi-launch-tee-front.png' | relative_url }}" alt="Front of black PSI launch vehicle T-shirt with white PSI chest print">
            <img class="shop-tee-back" src="{{ '/assets/images/shop/psi-launch-tee-back.png' | relative_url }}" alt="Back of black PSI launch vehicle T-shirt with POSTECH Science Launch Vehicle technical drawing">
        </div>
    </div>
</section>

<section class="section shop-section" id="shop-product">
    <div class="container shop-product-grid">
        <div class="shop-gallery">
            <button class="shop-image-card active" type="button" data-shop-image="front" aria-pressed="true">
                <img src="{{ '/assets/images/shop/psi-launch-tee-front.png' | relative_url }}" alt="Front view of PSI launch vehicle T-shirt">
                <span>Front</span>
            </button>
            <button class="shop-image-card" type="button" data-shop-image="back" aria-pressed="false">
                <img src="{{ '/assets/images/shop/psi-launch-tee-back.png' | relative_url }}" alt="Back view of PSI launch vehicle T-shirt">
                <span>Back</span>
            </button>
        </div>

        <article class="shop-buy-panel">
            <p class="status">Preorder</p>
            <h2>PSLV-I Technical Tee</h2>
            <p class="shop-price">KRW 29,000</p>
            <p class="section-copy">Black heavyweight cotton tee with PSI chest mark and POSTECH Science Launch Vehicle I technical artwork on the back.</p>

            <div class="shop-options" aria-label="Product options">
                <div>
                    <span class="label">Size</span>
                    <div class="size-grid" data-size-options>
                        <button type="button" class="option-chip active" data-size="S" aria-pressed="true">S</button>
                        <button type="button" class="option-chip" data-size="M" aria-pressed="false">M</button>
                        <button type="button" class="option-chip" data-size="L" aria-pressed="false">L</button>
                        <button type="button" class="option-chip" data-size="XL" aria-pressed="false">XL</button>
                    </div>
                </div>
                <label class="quantity-control">
                    <span class="label">Qty</span>
                    <input type="number" min="1" max="10" value="1" data-shop-qty>
                </label>
            </div>

            <button class="btn btn-primary shop-add-button" type="button" data-add-to-cart>Add To Cart</button>

            <dl class="shop-specs">
                <div><dt>Status</dt><dd>Preorder reservation</dd></div>
                <div><dt>Color</dt><dd>Black / white print</dd></div>
                <div><dt>Fit</dt><dd>Unisex regular fit</dd></div>
                <div><dt>Pickup</dt><dd>POSTECH campus handoff</dd></div>
            </dl>
        </article>
    </div>
</section>

<section class="section toned">
    <div class="container shop-notes-grid">
        <article class="content-panel">
            <p class="label">01 / Reserve</p>
            <h2>Student-club storefront, simple by design.</h2>
            <p>Checkout opens an email draft with your cart. PSI can confirm availability, pickup timing, and payment details directly.</p>
        </article>
        <article class="content-panel">
            <p class="label">02 / Drop Logic</p>
            <h2>Small batches, mission-first.</h2>
            <p>Merch drops help fund prototypes, test hardware, event logistics, and public records for the next PSI mission.</p>
        </article>
    </div>
</section>

<aside class="cart-drawer" aria-label="Shopping cart" data-cart-drawer aria-hidden="true">
    <div class="cart-panel">
        <div class="cart-header">
            <div>
                <p class="label">Cart</p>
                <h2>PSI Shop</h2>
            </div>
            <button class="cart-close" type="button" data-cart-close aria-label="Close cart">Close</button>
        </div>
        <div class="cart-items" data-cart-items>
            <p class="cart-empty">Your cart is empty.</p>
        </div>
        <div class="cart-summary">
            <div><span>Estimated Total</span><strong data-cart-total>KRW 0</strong></div>
            <a class="btn btn-primary" href="mailto:{{ site.author.email }}?subject=PSI%20Shop%20Order" data-checkout-link>Checkout By Email</a>
        </div>
    </div>
</aside>
