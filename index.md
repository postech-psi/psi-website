---
layout: default
title: Home
title_ko: 홈
title_en: Home
description_ko: POSTECH AeroSpace Initiatives는 로켓, 항전, 추진 시험, 비행 운용을 연구하는 POSTECH 학생 항공우주 연구회입니다.
description_en: POSTECH AeroSpace Initiatives is a student aerospace research club building rockets, avionics, propulsion test systems, and flight operations capability.
---

<section class="hero hero-home">
    <div class="hero-media" aria-hidden="true">
        <img src="{{ '/assets/images/generated/psi-hero-range-v2.png' | relative_url }}" alt="">
    </div>
    <div class="hero-overlay"></div>
    <div class="orbital-arc" aria-hidden="true"></div>
    <div class="container hero-content">
        <p class="mission-kicker">
            <span>PSI / FLIGHT SYSTEMS LAB</span>
            <span>Pohang, Republic of Korea</span>
        </p>
        <h1>
            <span class="i18n-ko">우리는 학생 연구를 비행 가능한 시스템으로 번역합니다.</span>
            <span class="i18n-en">We translate student research into flight-ready systems.</span>
        </h1>
        <p class="hero-lede">
            <span class="i18n-ko">POSTECH AeroSpace Initiatives는 로켓, 항전, 추진 시험, 지상 운용을 하나의 임무 체계로 연결하는 학생 항공우주 연구회입니다.</span>
            <span class="i18n-en">POSTECH AeroSpace Initiatives connects rockets, avionics, propulsion tests, and ground operations into one student-built mission system.</span>
        </p>
        <div class="hero-actions">
            <a class="btn btn-primary" href="{{ '/projects' | relative_url }}"><span class="i18n-ko">임무 기록 보기</span><span class="i18n-en">View mission records</span></a>
            <a class="btn btn-secondary" href="{{ '/contact' | relative_url }}"><span class="i18n-ko">팀 참여하기</span><span class="i18n-en">Join the crew</span></a>
        </div>
    </div>
    <aside class="hero-console" aria-label="Mission telemetry snapshot">
        <div><span>STATUS</span><strong>ACTIVE</strong></div>
        <div><span>VEHICLE</span><strong>PSLV-I</strong></div>
        <div><span>STACK</span><strong>AVIONICS / TMS</strong></div>
        <div><span>MODE</span><strong>RESEARCH</strong></div>
    </aside>
</section>

<section class="telemetry-strip" aria-label="PSI mission metrics">
    <div class="container telemetry-grid">
        <div class="telemetry-cell"><span>T+00</span><strong>2024</strong><em class="i18n-ko">창립</em><em class="i18n-en">Founded</em></div>
        <div class="telemetry-cell"><span>SYS</span><strong>3</strong><em class="i18n-ko">핵심 연구 축</em><em class="i18n-en">Core tracks</em></div>
        <div class="telemetry-cell"><span>FLT</span><strong>PSLV-I</strong><em class="i18n-ko">발사 경험</em><em class="i18n-en">Launch record</em></div>
        <div class="telemetry-cell"><span>DATA</span><strong>OPEN</strong><em class="i18n-ko">공개 기록</em><em class="i18n-en">Public records</em></div>
    </div>
</section>

<section class="section systems-section" id="mission">
    <div class="container">
        <div class="section-header split">
            <div>
                <p class="eyebrow">Mission Architecture</p>
                <h2><span class="i18n-ko">PSI의 프로젝트는 따로 놓인 과제가 아니라 하나의 비행체를 향한 하위 시스템입니다.</span><span class="i18n-en">PSI projects are not isolated tasks. They are subsystems moving toward one flight vehicle.</span></h2>
            </div>
            <p><span class="i18n-ko">각 팀은 설계, 제작, 시험, 데이터 리뷰를 반복하며 실제 운용 가능한 절차와 하드웨어를 남깁니다.</span><span class="i18n-en">Each team repeats design, fabrication, testing, and data review to leave behind hardware and procedures that can actually operate.</span></p>
        </div>
        <div class="systems-map">
            <article class="system-node">
                <span>01 / Vehicle</span>
                <h3><span class="i18n-ko">로켓 시스템</span><span class="i18n-en">Rocket Systems</span></h3>
                <p><span class="i18n-ko">구조, 회수, 추진기관 통합, 발사 준비 절차를 하나의 물리적 시스템으로 묶습니다.</span><span class="i18n-en">Structures, recovery, propulsion integration, and launch readiness become one physical system.</span></p>
            </article>
            <article class="system-node">
                <span>02 / Brain</span>
                <h3>Avionics</h3>
                <p><span class="i18n-ko">센서 융합, 비행 단계 판단, 텔레메트리, 회수 명령을 담당하는 비행 소프트웨어를 만듭니다.</span><span class="i18n-en">Flight software handles sensor fusion, stage logic, telemetry, and recovery commands.</span></p>
            </article>
            <article class="system-node">
                <span>03 / Ground Truth</span>
                <h3><span class="i18n-ko">시험 계측</span><span class="i18n-en">Test Instrumentation</span></h3>
                <p><span class="i18n-ko">정적 연소와 지상 시험에서 다음 설계를 판단할 수 있는 신뢰도 높은 데이터를 확보합니다.</span><span class="i18n-en">Static-fire and ground tests produce reliable data for the next design decision.</span></p>
            </article>
        </div>
    </div>
</section>

<section class="section image-feature">
    <div class="container image-feature-grid">
        <div class="image-frame">
            <img src="{{ '/assets/images/generated/ground-station-workshop.png' | relative_url }}" alt="Students reviewing telemetry in a dark aerospace workshop with ground station electronics" loading="lazy">
        </div>
        <div class="prose dossier-copy">
            <p class="eyebrow">Inside The Loop</p>
            <h2><span class="i18n-ko">멋진 순간보다 중요한 것은 반복 가능한 임무 루프입니다.</span><span class="i18n-en">More important than a dramatic moment is a repeatable mission loop.</span></h2>
            <p><span class="i18n-ko">PSI는 시험 전 체크리스트, 지상국 로그, 센서 데이터, 설계 리뷰를 한 흐름으로 연결합니다. 실패와 성공은 모두 다음 비행체의 입력값입니다.</span><span class="i18n-en">PSI connects pre-test checklists, ground-station logs, sensor data, and design reviews into one flow. Both failures and successes become inputs to the next vehicle.</span></p>
            <a class="text-link" href="{{ '/about' | relative_url }}"><span class="i18n-ko">운영 방식 보기</span><span class="i18n-en">See how PSI works</span></a>
        </div>
    </div>
</section>

<section class="section projects-preview" id="projects">
    <div class="container">
        <div class="section-header split">
            <div>
                <p class="eyebrow">Mission Records</p>
                <h2><span class="i18n-ko">공개 가능한 프로젝트 기록</span><span class="i18n-en">Public project records</span></h2>
            </div>
            <p><span class="i18n-ko">각 프로젝트는 목표, 제약, 하드웨어, 데이터, 다음 마일스톤을 기준으로 읽히도록 정리합니다.</span><span class="i18n-en">Each project is organized around objective, constraints, hardware, data, and the next milestone.</span></p>
        </div>
        <div class="program-grid cinematic">
            <article class="program-card featured">
                <img src="{{ '/assets/images/generated/avionics-macro-bay.png' | relative_url }}" alt="Macro view of avionics hardware inside a compact rocket avionics bay" loading="lazy">
                <div class="program-card-body">
                    <p class="status active">Active Development</p>
                    <h3>Avionics Flight Computer</h3>
                    <p><span class="i18n-ko">비행체의 상태를 추정하고, 텔레메트리를 송신하며, 회수 판단을 내리는 로켓의 신경계입니다.</span><span class="i18n-en">The vehicle's nervous system: state estimation, telemetry, and recovery decisions.</span></p>
                </div>
            </article>
            <article class="program-card">
                <img src="{{ '/assets/images/generated/propulsion-test.png' | relative_url }}" alt="Static fire test stand and data acquisition equipment" loading="lazy">
                <div class="program-card-body">
                    <p class="status active">Active Development</p>
                    <h3>TMS - Thrust Measurement System</h3>
                    <p><span class="i18n-ko">추진기관의 실제 성능을 곡선으로 남기는 지상 시험 계측 시스템입니다.</span><span class="i18n-en">A ground-test instrument that turns motor performance into usable thrust curves.</span></p>
                </div>
            </article>
            <article class="program-card text-only">
                <div class="program-card-body">
                    <p class="status complete">Flight Record</p>
                    <h3>PSLV-I Sounding Rocket</h3>
                    <p><span class="i18n-ko">초기 발사 경험을 만든 PSI의 사운딩 로켓 프로그램입니다.</span><span class="i18n-en">The sounding rocket program that created PSI's first launch operations record.</span></p>
                </div>
            </article>
        </div>
        <div class="section-cta">
            <a class="btn btn-primary" href="{{ '/projects' | relative_url }}"><span class="i18n-ko">프로젝트 도시에 보기</span><span class="i18n-en">Open project dossiers</span></a>
        </div>
    </div>
</section>

<section class="section trajectory-section">
    <div class="container">
        <div class="section-header">
            <p class="eyebrow">Trajectory</p>
            <h2><span class="i18n-ko">짧은 시간 안에 실제 시험과 발사를 남겼습니다.</span><span class="i18n-en">A short history, already marked by real tests and launches.</span></h2>
        </div>
        <ol class="trajectory-list">
            <li><time>2024.02</time><strong>PSI Founded</strong><span class="i18n-ko">POSTECH 항공우주 학생 연구회 출범</span><span class="i18n-en">POSTECH aerospace student research club founded</span></li>
            <li><time>2024.11</time><strong>PSLV-I Test Flight</strong><span class="i18n-ko">고흥 시험 발사 성공</span><span class="i18n-en">Goheung test flight success</span></li>
            <li><time>2025.07</time><strong>NURA Academic Conference</strong><span class="i18n-ko">KARI 원장상 수상</span><span class="i18n-en">KARI President's Award</span></li>
            <li><time>2025.08</time><strong>NURA Launch Competition</strong><span class="i18n-ko">PSLV-I 발사 성공</span><span class="i18n-en">PSLV-I launch success</span></li>
        </ol>
        <a class="text-link" href="{{ '/events' | relative_url }}"><span class="i18n-ko">전체 궤적 보기</span><span class="i18n-en">See full trajectory</span></a>
    </div>
</section>

<section class="section join-strip">
    <div class="container join-inner">
        <div>
            <p class="eyebrow">Join The Mission</p>
            <h2><span class="i18n-ko">관객으로 남지 말고, 다음 비행체의 일부를 만드세요.</span><span class="i18n-en">Do not stay in the audience. Build part of the next vehicle.</span></h2>
        </div>
        <a class="btn btn-primary" href="{{ '/contact' | relative_url }}"><span class="i18n-ko">참여 문의</span><span class="i18n-en">Join PSI</span></a>
    </div>
</section>
