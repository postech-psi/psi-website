---
layout: default
title: Home
description: POSTECH AeroSpace Initiatives - A research-focused aerospace student group at POSTECH
---

<section class="hero">
    <div class="container">
        <div class="hero-content">
            <h1 class="hero-title">POSTECH AeroSpace Initiatives</h1>
            <p class="hero-subtitle">Pushing the boundaries of rocketry and aerospace engineering</p>
            <div class="hero-buttons">
                <a href="{{ '/about' | relative_url }}" class="btn btn-primary">Learn More</a>
                <a href="{{ '/projects' | relative_url }}" class="btn btn-secondary">View Projects</a>
            </div>
        </div>
    </div>
</section>

<section class="features">
    <div class="container">
        <h2 class="section-title">What We Do</h2>
        <div class="features-grid">
            <div class="feature-card">
                <h3>Avionics Development</h3>
                <p>Design and implement advanced flight computers with sensor fusion, state estimation, and autonomous recovery systems.</p>
            </div>
            <div class="feature-card">
                <h3>Rocket Engineering</h3>
                <p>Build high-performance rockets with precision guidance, telemetry, and recovery mechanisms.</p>
            </div>
            <div class="feature-card">
                <h3>Research & Innovation</h3>
                <p>Advance aerospace technology through cutting-edge research and development projects.</p>
            </div>
        </div>
    </div>
</section>

<section class="featured-project">
    <div class="container">
        <h2 class="section-title">Featured Project</h2>
        <div class="project-card-large">
            <h3>Avionics Flight Computer</h3>
            <p>A high-performance, RTOS-based avionics flight computer for the Arduino Portenta H7, designed for autonomous rocket recovery and telemetry. Features multi-sensor fusion combining GNSS, IMU, and BMP3XX barometric data with an Unscented Kalman Filter (UKF) for precise real-time state estimation.</p>
            <a href="{{ '/projects' | relative_url }}" class="btn btn-primary">View All Projects</a>
        </div>
    </div>
</section>

