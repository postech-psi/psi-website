---
layout: default
title: Home
description: POSTECH AeroSpace Initiatives - A research-focused aerospace student group at POSTECH
---

<section class="hero">
    <div class="container">
        <div class="hero-content">
            <div class="hero-status">
                <span></span>Mission Active — Pohang, South Korea
            </div>
            <h1 class="hero-title">
                POSTECH<br>
                <span class="highlight">AeroSpace</span> Initiatives
            </h1>
            <p class="hero-subtitle">
                Pushing the boundaries of rocketry and aerospace engineering through rigorous research, hands-on development, and relentless innovation.
            </p>
            <div class="hero-buttons">
                <a href="{{ '/about' | relative_url }}" class="btn btn-primary">Discover PSI</a>
                <a href="{{ '/projects' | relative_url }}" class="btn btn-secondary">View Projects</a>
            </div>
        </div>
        <div class="scroll-indicator">
            <span>Scroll</span>
            <div class="scroll-line"></div>
        </div>
    </div>
</section>

<section class="features">
    <div class="container">
        <div class="section-header">
            <span class="section-label">Capabilities</span>
            <h2 class="section-title">What We Do</h2>
            <p class="section-subtitle">Engineering the future of aerospace, one mission at a time</p>
        </div>
        <div class="features-grid">
            <div class="feature-card">
                <div class="feature-icon">🛰️</div>
                <h3>Avionics Development</h3>
                <p>Design and implement advanced flight computers with sensor fusion, state estimation, and autonomous recovery systems for precision aerospace applications.</p>
            </div>
            <div class="feature-card">
                <div class="feature-icon">🚀</div>
                <h3>Rocket Engineering</h3>
                <p>Build high-performance rockets with precision guidance, real-time telemetry, and sophisticated recovery mechanisms for reliable mission success.</p>
            </div>
            <div class="feature-card">
                <div class="feature-icon">🔬</div>
                <h3>Research & Innovation</h3>
                <p>Advance aerospace technology through cutting-edge research, computational simulations, and experimental validation of novel concepts.</p>
            </div>
        </div>
    </div>
</section>

<section class="featured-project">
    <div class="container">
        <div class="section-header">
            <span class="section-label">Featured</span>
            <h2 class="section-title">Current Mission</h2>
        </div>
        <div class="project-card-large">
            <span class="project-label">Primary Project</span>
            <h3>Avionics Flight Computer</h3>
            <p>A high-performance, RTOS-based avionics flight computer designed for the Arduino Portenta H7 platform. Engineered for autonomous rocket recovery and real-time telemetry, featuring multi-sensor fusion that combines GNSS, IMU, and BMP3XX barometric data through an Unscented Kalman Filter (UKF) for precise state estimation during all flight phases.</p>
            <div class="project-stats">
                <div class="stat">
                    <div class="stat-value">1kHz</div>
                    <div class="stat-label">Sensor Rate</div>
                </div>
                <div class="stat">
                    <div class="stat-value">9-DOF</div>
                    <div class="stat-label">IMU Fusion</div>
                </div>
                <div class="stat">
                    <div class="stat-value">UKF</div>
                    <div class="stat-label">State Estimation</div>
                </div>
            </div>
            <a href="{{ '/projects' | relative_url }}" class="btn btn-primary">Explore All Projects</a>
        </div>
    </div>
</section>
