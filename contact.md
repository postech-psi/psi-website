---
layout: default
title: Join
description: Contact PSI for joining, collaboration, and general inquiries.
---

<section class="page-hero">
    <div class="container">
        <p class="eyebrow">05 / Join</p>
        <h1>You can watch rockets as an audience. At PSI, you can help build them.</h1>
        <p>We welcome inquiries about membership, collaboration, talks, support, and general questions.</p>
    </div>
</section>

<section class="section">
    <div class="container contact-layout">
        <div class="stack">
            <article class="content-panel">
                <p class="section-index">Membership</p>
                <h2>Who can join</h2>
                <p>POSTECH students interested in aerospace, robotics, embedded systems, mechanical design, operations, or data analysis are welcome. Prior rocketry experience is helpful, but not required.</p>
            </article>
            <article class="content-panel">
                <p class="section-index">Before You Write</p>
                <h2>Helpful context to include</h2>
                <ul class="check-list">
                    <li>Research track or project of interest</li>
                    <li>Skills you want to learn or role you want to try</li>
                    <li>For collaboration or talks, the goal and timing</li>
                </ul>
            </article>
        </div>
        <aside class="contact-card" aria-label="Contact methods">
            <h2>Contact</h2>
            <a href="https://www.instagram.com/postech_psi/" target="_blank" rel="noopener noreferrer"><span>Instagram</span><strong>@postech_psi</strong></a>
            <a href="https://github.com/postech-psi" target="_blank" rel="noopener noreferrer"><span>GitHub</span><strong>postech-psi</strong></a>
            {% if site.author.email %}
            <a href="mailto:{{ site.author.email }}"><span>Email</span><strong>{{ site.author.email }}</strong></a>
            {% endif %}
            <div class="location">
                <span>Location</span>
                <strong>POSTECH, Pohang, South Korea</strong>
            </div>
        </aside>
    </div>
</section>
