---
layout: post
title: "Income Tax"
custom_js:
- jquery-2.1.3.min.js
- tabletop-1.4.3.min.js
- d3-3.5.16.min.js
- d3kit-1.1.0mod.min.js
- underscore-1.8.3.min.js
- d3help-0.0.1.js
- 201604/ranking.js
- 201604/flatTax.js
- 201604/allAdjusted.js
- 201604/bracketCreep.js
- 201604/incomeTaxCanada.js
custom_css:
- d3KitChart.css
- 201604/incomeTaxCanada.css
---

{% if page.custom_css %}
  {% for css_file in page.custom_css %}
  <link rel="stylesheet" href='/public/css/{{ css_file }}'></script>
  {% endfor %}
{% endif %}

Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Maecenas faucibus mollis interdum. Vestibulum id ligula porta felis euismod semper.

<h3>Why A Flat Tax Isn't Flat</h3>
<div id="flattax" class="chart"></div>

Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Maecenas faucibus mollis interdum. Vestibulum id ligula porta felis euismod semper.

<h3>Provincial + Federal Effective Tax Ranking, 2016</h3>
<div id="ranking" class="chart"></div>


Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Maecenas faucibus mollis interdum. Vestibulum id ligula porta felis euismod semper.

<h3>The 2016 Effective Tax Rate by Province</h3>
<div id="allAdjusted" class="chart"></div>

Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Maecenas faucibus mollis interdum. Vestibulum id ligula porta felis euismod semper.

<h3>The 2016 Effective Tax Rate by Province</h3>
<div id="bracketCreep" class="chart"></div>

Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Maecenas faucibus mollis interdum. Vestibulum id ligula porta felis euismod semper.

{% if page.custom_js %}
  {% for js_file in page.custom_js %}
  <script src='/public/js/{{ js_file }}' type="text/javascript"></script>
  {% endfor %}
{% endif %}

__

_Ryan Brideau_
