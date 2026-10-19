---
layout: about
title: Home
permalink: /
description: Frontend engineer portfolio for Yunke Li.
full_width: true
body_class: home-theme
page_shell_class: home-page-shell
social: false
---

{% assign featured_projects = site.projects | sort: "importance" | slice: 0, 3 %}

<section class="home-hero">
  <div class="home-section home-hero__inner">
    <div class="home-hero__content">
      <p class="section-kicker">Frontend Engineer Portfolio</p>
      <h1>Yunke Li builds thoughtful web interfaces with product polish and engineering discipline.</h1>
      <p class="home-hero__lead">
        I am a Computer Science master's student at
        <a href="https://vancouver.northeastern.edu/academic_program/align-master-of-science-in-computer-science/">Northeastern University</a>,
        focused on frontend engineering, full-stack product delivery, and experiences that feel fast, clear, and well-crafted.
      </p>
      <div class="home-hero__actions">
        <a class="button button--primary" href="/projects/">View Selected Work</a>
        <a class="button button--secondary" href="/assets/pdf/CV_YunkeLi.pdf">Download Resume</a>
      </div>
      <ul class="signal-list">
        <li>Open to full-time and co-op opportunities in frontend or product engineering.</li>
        <li>Working across JavaScript, React, Node.js, Python, and modern web tooling.</li>
        <li>Interested in products where usability, performance, and implementation quality all matter.</li>
      </ul>
    </div>
    <div class="home-hero__visual">
      <div class="orbital-frame">
        <div class="orbital-frame__glow"></div>
        <img src="/assets/img/avatar.jpeg" alt="Portrait of Yunke Li" class="orbital-frame__portrait">
        <div class="orbital-frame__ring orbital-frame__ring--one"></div>
        <div class="orbital-frame__ring orbital-frame__ring--two"></div>
        <div class="orbital-frame__panel orbital-frame__panel--top">UI systems / interaction detail / delivery</div>
        <div class="orbital-frame__panel orbital-frame__panel--bottom">React  Node.js  APIs  performance  DX</div>
      </div>
    </div>
  </div>
</section>

<section class="home-section section-block">
  <div class="section-heading">
    <p class="section-kicker">Selected Work</p>
    <h2>Projects that show how I think through product and implementation.</h2>
    <p>I care about interfaces that are intuitive on the surface and well-structured underneath.</p>
  </div>
  <div class="featured-grid">
    {% for project in featured_projects %}
    <article class="featured-project">
      <div class="featured-project__media">
        {% if project.img %}
        <img src="{{ project.img | relative_url }}" alt="{{ project.title }}">
        {% endif %}
      </div>
      <div class="featured-project__content">
        <p class="featured-project__meta">{{ project.role }}{% if project.year %} / {{ project.year }}{% endif %}</p>
        <h3><a href="{{ project.url | relative_url }}">{{ project.title }}</a></h3>
        <p>{{ project.description }}</p>
        {% if project.stack %}
        <p class="featured-project__stack">{{ project.stack }}</p>
        {% endif %}
      </div>
    </article>
    {% endfor %}
  </div>
</section>

<section class="home-section section-block capabilities-section">
  <div class="section-heading">
    <p class="section-kicker">Capabilities</p>
    <h2>What I like to bring to a team.</h2>
  </div>
  <div class="capabilities-grid">
    <article>
      <h3>Frontend Craft</h3>
      <p>Responsive UI, component thinking, interaction polish, and visual hierarchy that feels intentional.</p>
    </article>
    <article>
      <h3>Full-Stack Delivery</h3>
      <p>Comfortable moving from browser to API and database when a product needs end-to-end ownership.</p>
    </article>
    <article>
      <h3>Engineering Discipline</h3>
      <p>I value maintainable structure, readable code, and implementation choices that scale with product growth.</p>
    </article>
    <article>
      <h3>Learning Velocity</h3>
      <p>I enjoy picking up new domains quickly and turning ambiguous requirements into concrete working software.</p>
    </article>
  </div>
</section>

<section class="home-section section-block">
  <div class="section-heading">
    <p class="section-kicker">Journey</p>
    <h2>Bringing together software, systems thinking, and product curiosity.</h2>
  </div>
  <div class="timeline-grid">
    <article>
      <span>Now</span>
      <h3>Northeastern University</h3>
      <p>MS in Computer Science, sharpening software engineering fundamentals and building production-minded web projects.</p>
    </article>
    <article>
      <span>2020</span>
      <h3>The University of Hong Kong</h3>
      <p>Master's degree in Industrial Engineering and Logistics Management, which strengthened my systems perspective.</p>
    </article>
    <article>
      <span>2019</span>
      <h3>Shanghai Jiao Tong University</h3>
      <p>Bachelor's degree in Nuclear Engineering, a training ground for analytical thinking and structured problem solving.</p>
    </article>
  </div>
</section>

<section class="home-section section-block contact-block">
  <div class="section-heading">
    <p class="section-kicker">Contact</p>
    <h2>Let’s build something sharp, useful, and reliable.</h2>
    <p>Email is the fastest way to reach me if you are hiring or want to collaborate.</p>
  </div>
  <div class="contact-block__row">
    <a class="button button--primary" href="mailto:yunkeli.work@gmail.com">yunkeli.work@gmail.com</a>
    <a class="button button--secondary" href="https://github.com/yunke-l">GitHub</a>
    <a class="button button--secondary" href="https://www.linkedin.com/in/yunke-l-70084a160">LinkedIn</a>
  </div>
  <div class="contact-block__social">
    {% include social.html %}
  </div>
</section>
