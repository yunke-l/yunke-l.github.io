---
layout: page
title: Work
permalink: /projects/
description: Selected software and engineering projects by Yunke Li.
nav: true
nav_order: 2
---

{% assign sorted_projects = site.projects | sort: "importance" %}

<div class="work-intro">
  <p class="section-kicker">Selected Work</p>
  <h2>Projects across web applications, backend services, robotics, and data analysis.</h2>
  <p>These projects reflect the environments I enjoy most: practical product work, clean interfaces, and engineering challenges with real constraints.</p>
</div>

<div class="work-list">
  {% for project in sorted_projects %}
  <article class="work-listing">
    <div class="work-listing__media">
      {% if project.img %}
      <img src="{{ project.img | relative_url }}" alt="{{ project.title }}">
      {% endif %}
    </div>
    <div class="work-listing__content">
      <p class="work-listing__meta">{{ project.role }}{% if project.year %} / {{ project.year }}{% endif %}</p>
      <h3><a href="{{ project.url | relative_url }}">{{ project.title }}</a></h3>
      <p>{{ project.description }}</p>
      {% if project.stack %}
      <p class="work-listing__stack">{{ project.stack }}</p>
      {% endif %}
      <div class="work-listing__actions">
        <a href="{{ project.url | relative_url }}">Read case study</a>
        {% if project.github %}
        <a href="{{ project.github }}">View repository</a>
        {% endif %}
      </div>
    </div>
  </article>
  {% endfor %}
</div>
