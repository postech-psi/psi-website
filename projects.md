---
layout: default
title: Projects
title_ko: 프로젝트
title_en: Projects
description_ko: PSI의 로켓, 항전, 추진 시험 시스템 프로젝트를 임무 기록 형식으로 소개합니다.
description_en: Explore PSI's rocket, avionics, and propulsion test systems as public mission dossiers.
---

<section class="page-hero compact dossier-hero">
    <div class="container">
        <p class="eyebrow">Mission Dossiers</p>
        <h1><span class="i18n-ko">프로젝트는 포스터가 아니라 다음 설계 결정을 위한 기록입니다.</span><span class="i18n-en">A project is not a poster. It is a record for the next design decision.</span></h1>
        <p><span class="i18n-ko">PSI의 프로젝트는 목표, 제약, 하드웨어, 시험 데이터, 다음 마일스톤이 보이도록 정리됩니다.</span><span class="i18n-en">PSI projects are organized so visitors can see the objective, constraints, hardware, test data, and next milestone.</span></p>
    </div>
</section>

<section class="section">
    <div class="container project-records dossier-records">
        <article class="project-record mission-dossier">
            <img src="{{ '/assets/images/generated/avionics-macro-bay.png' | relative_url }}" alt="Avionics hardware inside a compact rocket avionics bay" loading="lazy">
            <div class="project-record-body">
                <p class="status active">Active Development</p>
                <h2>Avionics Flight Computer</h2>
                <p><span class="i18n-ko">비행체의 상태를 추정하고, 텔레메트리를 송신하며, 회수 판단을 내리는 임베디드 비행 컴퓨터입니다.</span><span class="i18n-en">An embedded flight computer that estimates vehicle state, transmits telemetry, and decides recovery events.</span></p>
                <div class="dossier-grid">
                    <div><span>Objective</span><strong>Autonomous recovery and reliable telemetry</strong></div>
                    <div><span>Vehicle Role</span><strong>Flight brain and data source</strong></div>
                    <div><span>Constraint</span><strong>Real-time sensor fusion under flight dynamics</strong></div>
                    <div><span>Next Milestone</span><strong>Integrated flight-stack validation</strong></div>
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

        <article class="project-record mission-dossier">
            <img src="{{ '/assets/images/generated/propulsion-test.png' | relative_url }}" alt="Propulsion static-fire test stand and protected data acquisition box" loading="lazy">
            <div class="project-record-body">
                <p class="status active">Active Development</p>
                <h2>TMS - Thrust Measurement System</h2>
                <p><span class="i18n-ko">정적 연소 시험에서 점화 이벤트와 추력 측정을 동기화하고, 추진기관 성능을 검토 가능한 데이터로 남기는 계측 시스템입니다.</span><span class="i18n-en">A test instrument that synchronizes ignition with thrust measurement and turns motor performance into reviewable data.</span></p>
                <div class="dossier-grid">
                    <div><span>Objective</span><strong>Trustworthy thrust curves</strong></div>
                    <div><span>System Role</span><strong>Ground truth for propulsion design</strong></div>
                    <div><span>Constraint</span><strong>Safe timing and clean acquisition window</strong></div>
                    <div><span>Next Milestone</span><strong>Repeatable static-fire workflow</strong></div>
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

        <article class="project-record mission-dossier text-record">
            <div class="project-record-body">
                <p class="status complete">Flight Record</p>
                <h2>PSLV-I Sounding Rocket</h2>
                <p><span class="i18n-ko">KNSB 고체 추진기관, 구조, 회수 시스템, 발사 운용 절차를 통합한 PSI의 초기 사운딩 로켓 프로그램입니다.</span><span class="i18n-en">PSI's early sounding rocket program integrating KNSB solid propulsion, structures, recovery systems, and launch operations.</span></p>
                <div class="dossier-grid">
                    <div><span>Objective</span><strong>First integrated launch record</strong></div>
                    <div><span>Vehicle Role</span><strong>System integration demonstrator</strong></div>
                    <div><span>Constraint</span><strong>Student-scale solid propulsion operations</strong></div>
                    <div><span>Next Milestone</span><strong>Carry lessons into the next vehicle</strong></div>
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

<section class="section image-feature">
    <div class="container image-feature-grid reverse">
        <div class="prose dossier-copy">
            <p class="eyebrow">Evidence Culture</p>
            <h2><span class="i18n-ko">우리는 결과보다 기록의 품질을 먼저 끌어올립니다.</span><span class="i18n-en">We raise the quality of records before we celebrate the result.</span></h2>
            <p><span class="i18n-ko">프로젝트 페이지는 외부 방문자가 “무엇을 만들었고, 왜 만들었고, 무엇을 다음에 검증할 것인가”를 빠르게 이해하도록 설계됩니다.</span><span class="i18n-en">Project pages are designed so outside visitors can quickly understand what was built, why it was built, and what will be verified next.</span></p>
        </div>
        <div class="image-frame">
            <img src="{{ '/assets/images/generated/ground-station-workshop.png' | relative_url }}" alt="Student aerospace workshop with telemetry monitors and ground-station electronics" loading="lazy">
        </div>
    </div>
</section>
