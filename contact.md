---
layout: default
title: Contact
description: Get in touch with POSTECH AeroSpace Initiatives
---

<div class="page-header">
    <div class="container">
        <span class="section-label">Connect</span>
        <h1>Contact Us</h1>
        <p class="page-subtitle">Get in touch with POSTECH AeroSpace Initiatives</p>
    </div>
</div>

<section class="content-section">
    <div class="container">
        <div class="contact-grid">
            <div class="contact-info">
                <div class="content-block">
                    <h2>Let's Connect</h2>
                    <p>Have questions about our projects, want to collaborate, or interested in joining our team? We'd love to hear from you. Reach out through any of the channels below.</p>
                </div>
                
                <div class="contact-methods">
                    <div class="contact-method">
                        <h3>Instagram</h3>
                        <p>Follow us for the latest updates, launch footage, and behind-the-scenes content</p>
                        <a href="https://www.instagram.com/postech_psi/" target="_blank" rel="noopener noreferrer" class="btn btn-primary">@postech_psi →</a>
                    </div>
                    
                    <div class="contact-method">
                        <h3>GitHub</h3>
                        <p>Explore our open-source projects and contribute to our codebase</p>
                        <a href="https://github.com/postech-psi" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">View Repositories →</a>
                    </div>
                    
                    {% if site.author.email %}
                    <div class="contact-method">
                        <h3>Email</h3>
                        <p>For formal inquiries, collaborations, and partnership opportunities</p>
                        <a href="mailto:{{ site.author.email }}" class="btn btn-secondary">Send Email →</a>
                    </div>
                    {% endif %}
                </div>
            </div>

            <div class="contact-info">
                <div class="content-block">
                    <h2>Location</h2>
                    <p><strong>POSTECH</strong><br>
                    Department of Mechanical Engineering<br>
                    77 Cheongam-ro, Nam-gu<br>
                    Pohang, Gyeongbuk 37673<br>
                    South Korea</p>
                </div>

                <div class="content-block">
                    <h2>Join PSI</h2>
                    <p>We're always looking for passionate POSTECH students interested in aerospace engineering, embedded systems, propulsion, or any related field.</p>
                    <ul>
                        <li>No prior rocketry experience required</li>
                        <li>Open to all POSTECH students</li>
                        <li>Hands-on project work from day one</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</section>
