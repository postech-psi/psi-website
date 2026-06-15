---
layout: default
title: Projects
description: Explore PSI's rocket, avionics, and propulsion test systems as public mission dossiers.
---

<section class="page-hero">
    <div class="container">
        <p class="eyebrow">02 / Projects</p>
        <h1>A project is not a poster. It is a record for the next decision.</h1>
        <p>PSI projects are organized around objectives, constraints, hardware, test data, and next milestones.</p>
    </div>
</section>

<section class="section">
    <div class="container project-records">
        <article class="project-record">
            <img src="{{ '/assets/images/generated/avionics-macro-bay.png' | relative_url }}" alt="Avionics hardware inside a compact rocket avionics bay" loading="lazy">
            <div class="project-record-body">
                <p class="status">Active Development</p>
                <h2>Avionics Flight Computer</h2>
                <p>An embedded flight computer that estimates vehicle state, transmits telemetry, and decides recovery events.</p>
                <div class="dossier-grid">
                    <div><span class="label">Objective</span><strong>Autonomous recovery and reliable telemetry</strong></div>
                    <div><span class="label">Vehicle Role</span><strong>Flight brain and data source</strong></div>
                    <div><span class="label">Constraint</span><strong>Real-time sensor fusion under flight dynamics</strong></div>
                    <div><span class="label">Next Milestone</span><strong>Integrated flight-stack validation</strong></div>
                </div>
                <dl class="spec-grid">
                    <div><dt>Platform</dt><dd>Arduino Portenta H7, mbed RTOS</dd></div>
                    <div><dt>Signals</dt><dd>GNSS, 9-DOF IMU, BMP3XX pressure</dd></div>
                    <div><dt>Repository</dt><dd><a href="https://github.com/postech-psi/Avionics" target="_blank" rel="noopener noreferrer">postech-psi/Avionics</a></dd></div>
                </dl>
                <ul class="tag-list">
                    <li>UKF</li><li>XBee</li><li>Flight Stages</li><li>Recovery</li><li>Telemetry</li>
                </ul>
            </div>
        </article>

        <article class="project-record">
            <img src="{{ '/assets/images/generated/propulsion-test.png' | relative_url }}" alt="Propulsion static-fire test stand and protected data acquisition box" loading="lazy">
            <div class="project-record-body">
                <p class="status">Active Development</p>
                <h2>TMS - Thrust Measurement System</h2>
                <p>A test instrument that synchronizes ignition with thrust measurement and turns motor performance into reviewable data.</p>
                <div class="dossier-grid">
                    <div><span class="label">Objective</span><strong>Trustworthy thrust curves</strong></div>
                    <div><span class="label">System Role</span><strong>Ground truth for propulsion design</strong></div>
                    <div><span class="label">Constraint</span><strong>Safe timing and clean acquisition window</strong></div>
                    <div><span class="label">Next Milestone</span><strong>Repeatable static-fire workflow</strong></div>
                </div>
                <dl class="spec-grid">
                    <div><dt>Platform</dt><dd>Arduino Nano, ADS1115</dd></div>
                    <div><dt>Signals</dt><dd>Load cell, ignition trigger, relay state</dd></div>
                    <div><dt>Repository</dt><dd><a href="https://github.com/postech-psi/TMS" target="_blank" rel="noopener noreferrer">postech-psi/TMS</a></dd></div>
                </dl>
                <ul class="tag-list">
                    <li>320 SPS</li><li>Load Cell</li><li>Static Fire</li><li>DAQ</li>
                </ul>
            </div>
        </article>

        <article class="project-record text-record">
            <div class="project-record-body">
                <p class="status complete">Flight Record</p>
                <h2>PSLV-I Sounding Rocket</h2>
                <p>PSI's early sounding rocket program integrating KNSB solid propulsion, structures, recovery systems, and launch operations.</p>
                <div class="dossier-grid">
                    <div><span class="label">Objective</span><strong>First integrated launch record</strong></div>
                    <div><span class="label">Vehicle Role</span><strong>System integration demonstrator</strong></div>
                    <div><span class="label">Constraint</span><strong>Student-scale solid propulsion operations</strong></div>
                    <div><span class="label">Next Milestone</span><strong>Carry lessons into the next vehicle</strong></div>
                </div>
                <dl class="spec-grid">
                    <div><dt>Propulsion</dt><dd>KNSB solid motor</dd></div>
                    <div><dt>Operations</dt><dd>Goheung test flight, NURA launch competition</dd></div>
                    <div><dt>Record</dt><dd>Flight experience captured for future vehicles</dd></div>
                </dl>
                <ul class="tag-list">
                    <li>Sounding Rocket</li><li>KNSB</li><li>Recovery</li><li>Launch Ops</li>
                </ul>
            </div>
        </article>
    </div>
</section>

<section class="section toned">
    <div class="container image-feature-grid">
        <div class="image-frame">
            <img src="{{ '/assets/images/generated/ground-station-workshop.png' | relative_url }}" alt="Student aerospace workshop with telemetry monitors and ground-station electronics" loading="lazy">
        </div>
        <div>
            <p class="section-index">Evidence Culture</p>
            <h2>We raise the quality of records before we celebrate the result.</h2>
            <p class="section-copy">Project pages are designed so visitors can quickly understand what was built, why it was built, and what will be verified next.</p>
        </div>
    </div>
</section>
