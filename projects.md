---
layout: default
title: Projects
description: Explore our rocketry and aerospace engineering projects
---

<div class="page-header">
    <div class="container">
        <span class="section-label">Engineering</span>
        <h1>Projects</h1>
        <p class="page-subtitle">Our latest rocketry and aerospace engineering work</p>
    </div>
</div>

<section class="content-section">
    <div class="container">
        <div class="projects-grid">
            <article class="project-card">
                <div class="project-content">
                    <h2>Avionics Flight Computer</h2>
                    <p class="project-meta">● Active Development</p>
                    <p>An RTOS-based flight stack for the Arduino Portenta H7 that drives autonomous recovery, high-rate telemetry, and deterministic flight-stage logic. It fuses GNSS, IMU, and BMP3XX pressure data through an Unscented Kalman Filter to maintain precise state estimates across Calibration → Prelaunch → Launch → Deploy → Landed phases.</p>
                    <div class="project-features">
                        <h3>Key Features</h3>
                        <ul>
                            <li>Multi-sensor fusion (GNSS, 9-DOF IMU, BMP3XX barometer)</li>
                            <li>UKF-based real-time state estimation at flight-rate frequencies</li>
                            <li>Concurrent RTOS threads for decision logic and XBee telemetry</li>
                            <li>Deterministic flight-stage detection and parachute deployment</li>
                            <li>Failsafe watchdogs and journaling for mission assurance</li>
                        </ul>
                    </div>
                    <div class="project-tech">
                        <h3>Tech Stack</h3>
                        <span class="tech-tag">Arduino Portenta H7</span>
                        <span class="tech-tag">mbed RTOS</span>
                        <span class="tech-tag">C++</span>
                        <span class="tech-tag">Unscented Kalman Filter</span>
                        <span class="tech-tag">XBee Telemetry</span>
                    </div>
                    <a href="https://github.com/postech-psi/Avionics" target="_blank" rel="noopener noreferrer" class="btn btn-primary">View on GitHub →</a>
                </div>
            </article>

            <article class="project-card">
                <div class="project-content">
                    <h2>TMS — Thrust Measurement System</h2>
                    <p class="project-meta">● Active Development</p>
                    <p>A deterministic, embedded data acquisition unit for static fire propulsion tests. TMS synchronizes ignition triggers with high-speed load-cell sampling (320 SPS) via dual 16-bit ADS1115 ADCs on an Arduino Nano, guaranteeing high-fidelity thrust curves and safe relay control throughout each 15-second burn window.</p>
                    <div class="project-features">
                        <h3>Key Features</h3>
                        <ul>
                            <li>Interrupt-driven firmware with ignition/thrust capture synchronization</li>
                            <li>Dual 16-bit ADS1115 acquisition at 320 samples per second</li>
                            <li>Finite state machine for automated journaling and failsafe relays</li>
                            <li>Deterministic timing to preserve transient thrust data</li>
                        </ul>
                    </div>
                    <div class="project-tech">
                        <h3>Tech Stack</h3>
                        <span class="tech-tag">Arduino Nano</span>
                        <span class="tech-tag">ADS1115</span>
                        <span class="tech-tag">Embedded C++</span>
                        <span class="tech-tag">Load Cell DAQ</span>
                    </div>
                    <a href="https://github.com/postech-psi/TMS" target="_blank" rel="noopener noreferrer" class="btn btn-primary">View on GitHub →</a>
                </div>
            </article>

            <article class="project-card">
                <div class="project-content">
                    <h2>PSLV-I Sounding Rocket</h2>
                    <p class="project-meta">✓ Successfully Launched</p>
                    <p>Solid-propellant sounding rocket designed and built by PSI. Successfully launched at the National Comprehensive Performance Test Range (KARI Goheung) and at the NURA competition.</p>
                    <div class="project-tech">
                        <h3>Tech Stack</h3>
                        <span class="tech-tag">KNSB Propellant</span>
                        <span class="tech-tag">Solid Motor</span>
                        <span class="tech-tag">Recovery System</span>
                    </div>
                </div>
            </article>
        </div>
    </div>
</section>
