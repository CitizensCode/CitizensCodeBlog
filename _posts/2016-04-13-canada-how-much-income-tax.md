---
layout: post
title: "Income Tax"
custom_js:
- jquery-2.1.3.min.js
- tabletop-1.4.3.js
- d3-3.5.16.min.js
- d3kit-1.1.0.js
- 201604/ranking.js
- 201604/flatTax.js
- 201604/incomeTaxCanada.js
custom_css:
---

{% if page.custom_css %}
  {% for css_file in page.custom_css %}
  <script src='/public/css/{{ css_file }}' type="text/css" charset="utf-8"></script>
  {% endfor %}
{% endif %}

Admittedly, the Canadian government hasn't been the best at communicating the logistics of the operation, but thanks to a leaked document titled ["Operation Syrian Refugees" ](http://news.nationalpost.com/news/canada/500k-federal-ad-campaign-to-tout-refugee-plan-as-a-national-project-document-reveals), we can start to piece together the details.

<div id="flattax"></div>

Since their goal is to fly 900 people on 3 planes, they'll need a plane that can seat 300, and it turns out there are a number of those, one being the Boeing 767. As a bonus, it has [a flight range of 7,130 to 11,825 km](https://en.wikipedia.org/wiki/Boeing_767), so it could potentially even do the trip in a single flight (not that it would _have_ to, but it could).


{% if page.custom_js %}
  {% for js_file in page.custom_js %}
  <script src='/public/js/{{ js_file }}' type="text/javascript"></script>
  {% endfor %}
{% endif %}

__

_Ryan Brideau_
