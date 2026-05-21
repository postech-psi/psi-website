---
layout: default
title: Contact
title_ko: 참여
title_en: Join
description_ko: PSI 참여, 협업, 문의 방법을 안내합니다.
description_en: Contact PSI for joining, collaboration, and general inquiries.
---

<section class="page-hero compact">
    <div class="container">
        <p class="eyebrow">Join PSI</p>
        <h1><span class="i18n-ko">로켓을 보고 싶다면 관객이 될 수 있습니다. 만들고 싶다면 PSI에 오세요.</span><span class="i18n-en">You can watch rockets as an audience. At PSI, you can help build them.</span></h1>
        <p><span class="i18n-ko">신입, 협업, 발표, 후원, 일반 문의를 환영합니다.</span><span class="i18n-en">We welcome inquiries about membership, collaboration, talks, support, and general questions.</span></p>
    </div>
</section>

<section class="section">
    <div class="container contact-layout">
        <div class="stack">
            <article class="content-panel">
                <h2><span class="i18n-ko">참여 대상</span><span class="i18n-en">Who can join</span></h2>
                <p><span class="i18n-ko">항공우주, 로봇, 임베디드, 기계 설계, 데이터 분석에 관심 있는 POSTECH 학생을 환영합니다. 사전 로켓 경험은 필수가 아닙니다.</span><span class="i18n-en">POSTECH students interested in aerospace, robotics, embedded systems, mechanical design, or data analysis are welcome. Prior rocketry experience is not required.</span></p>
            </article>
            <article class="content-panel">
                <h2><span class="i18n-ko">문의 전 준비하면 좋은 것</span><span class="i18n-en">Helpful context to include</span></h2>
                <ul class="check-list">
                    <li><span class="i18n-ko">관심 있는 연구 축 또는 프로젝트</span><span class="i18n-en">Research track or project of interest</span></li>
                    <li><span class="i18n-ko">배우고 싶은 기술 또는 맡고 싶은 역할</span><span class="i18n-en">Skills you want to learn or role you want to try</span></li>
                    <li><span class="i18n-ko">협업 또는 발표 문의의 경우 목적과 일정</span><span class="i18n-en">For collaboration or talks, the goal and timing</span></li>
                </ul>
            </article>
        </div>
        <aside class="contact-card" aria-label="Contact methods">
            <h2><span class="i18n-ko">연락처</span><span class="i18n-en">Contact</span></h2>
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
