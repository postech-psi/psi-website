---
layout: default
title: Contact
description: Get in touch with POSTECH AeroSpace Initiatives
---

<div class="page-header">
    <div class="container">
        <h1>Contact Us</h1>
        <p class="page-subtitle">Connect with POSTECH AeroSpace Initiatives</p>
    </div>
</div>

<section class="content-section">
    <div class="container">
        <div class="contact-grid">
            <div class="contact-info">
                <h2>Get in Touch</h2>
                <p>Have questions about our projects, want to collaborate, or interested in joining our team? We'd love to hear from you!</p>
                
                <div class="contact-methods">
                    <div class="contact-method">
                        <h3>Instagram</h3>
                        <p>Follow us for the latest updates and project highlights</p>
                        <a href="https://www.instagram.com/postech_psi/" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">Visit Instagram</a>
                    </div>
                    
                    {% if site.author.email %}
                    <div class="contact-method">
                        <h3>Email</h3>
                        <p>Send us an email for inquiries and collaboration opportunities</p>
                        <a href="mailto:{{ site.author.email }}" class="btn btn-secondary">Send Email</a>
                    </div>
                    {% endif %}
                </div>
            </div>

            <div class="contact-form-section">
                <h2>Send a Message</h2>
                <p>For direct inquiries, please reach out through our social media channels or email.</p>
            </div>
        </div>
    </div>
</section>

