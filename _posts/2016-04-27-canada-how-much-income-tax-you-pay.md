---
layout: post
title: "How Much Income Tax Canadians Pay: A Provincial Comparison"
custom_js:
- jquery-2.1.3.min.js
- tabletop-1.4.3.min.js
- d3-3.5.16.min.js
- d3kit-1.1.0mod.min.js
- underscore-1.8.3.min.js
- d3help-0.0.1.js
- fetch-1.0.0.min.js
- 201604/ranking.js
- 201604/flatTax.js
- 201604/bracketCreep.js
- 201604/hiddenTaxes.js
- 201604/taxDiff.js
- 201604/incomeTaxCanada.js
custom_css:
- d3KitChart.css
- 201604/incomeTaxCanada.css
---

<meta property="og:image"
    content="http://i.imgur.com/Z1gkPv0.png" />
<link rel="image_src" content="http://i.imgur.com/Z1gkPv0.png">

{% if page.custom_css %}
  {% for css_file in page.custom_css %}
  <link rel="stylesheet" href='/public/css/{{ css_file }}'></script>
  {% endfor %}
{% endif %}

Who pays the least income tax in Canada, and how has that changed over time?

This simple question turns out not to have an easy answer. The combination of hidden income taxes, some province's reluctance to change their brackets with inflation, and "curvy flat taxes" results in an income tax horse race. Where you'd pay the least tax is completely dependent on how much you earn.

<h3>Canadian Provincial + Federal Effective Tax Ranking, 2016</h3>
<div id="ranking" class="chart"></div><br>

The tax calculations for this include federal and provincial income tax, Employment Insurance, the Canadian & Québec Pension Plans, provincial health fees, surtaxes (that is, a tax on how much tax you pay), Québec's Parental Insurance Plan, the basic exemption, as well as special adjustments to the Federal tax rate for Québec tax payers (they pay 83.5% of the federal tax that other provinces and territories pay). All dollars have been inflation adjusted to 2016 dollars using the same formula used by the federal government to adjust their tax brackets.
<br><br>
To keep things simple, I visualized what tax rates look like for a single person with no dependents, earning their income through the work they do as opposed to interest on investments. This, of course, is an approximation, but it's good enough for comparison purposes.
<br><br>
When you combine all of these things together, you get the 'effective tax rate' at every income for each province. All those taxes combined form a unique curve that represents how much income tax a resident of each province pays. Below, you can see how these curves have changed since 2005, and since last year. In general, there have been tax decreases for people earning up to about $200,000 in most provinces, and increases for those earning more than that, with some exceptions.

<h3>Comparing the Effective Tax Rates Over Time</h3>
<p id="menu">
  How have income taxes in
  <select id="provMenu">
    <option value="ab">Alberta</option>
    <option value="bc">British Columbia</option>
    <option value="mb">Manitoba</option>
    <option value="nb">New Brunswick</option>
    <option value="nl">Newfoundland and Labrador</option>
    <option value="nt">Northwest Territories</option>
    <option value="ns">Nova Scotia</option>
    <option value="nu">Nunavut</option>
    <option value="on"  selected="selected">Ontario</option>
    <option value="pe">Prince Edward Island</option>
    <option value="qc">Quebec</option>
    <option value="sk">Saskatchewan</option>
    <option value="yt">Yukon</option>
  </select> changed since
  <select id="yearMenu">
    <option value="2015">2015</option>
    <option value="2005" selected="selected">2005</option>
  </select> ?
</p>
<div id="taxDiff" class="chart"></div>
<div class="note">Note: This chart does not include the changes to Newfoundland and Labrador's income tax announced in mid-April 2016 that come into affect mid-year.</div><br>

Instead of raising the income tax, many provinces create new taxes such as health fees, parental insurance fees and surtaxes. The result is a lumpy tax curve - especially noticeable in Ontario - that is indicative of a much more complicated tax system. Note that Quebec is an outlier in the chart below because they pay a reduced federal rate, giving them the ability to collect more tax as a province.

<h3>Hidden Income Taxes</h3>
<div id="hiddenTaxes" class="chart"></div><br>

In addition, taking this approach gives the appearance of a province having lower income tax, when in reality it is spread over multiple types of tax.
<br><br>
Taxes can also be increased without passing any legislation. Between 2005 and 2015, Prince Edward Island introduced an almost 1% increase in personal income tax for some earners by not changing their tax brackets with inflation.
<br><br>
For example, while the lowest tax bracket in New Brunswick was $32,730 in 2005, it was $39,973 in 2015 because it was adjusted along with inflation each year. PEI, however, almost never changes their brackets, with the lowest bracket only changing from $30,754 in 2005 to $31,984 in 2015 - well below the rate of inflation.
<br><br>
The result of this can be seen in this next chart, where the orange lines represent NB's effective tax rates in 2005 and 2014 - which almost perfectly overlap - while PEI's show a large gap between the two years. This tax increase will continue to grow each year unless this policy changes.

<h3>How to Increase Taxes Without Increasing Them: Bracket Creep</h3>
<div id="bracketCreep" class="chart"></div><br>

Sometimes, taxes don't behave the way you might think. For example, until 2015, Alberta had a single tax rate for all people: 10%. Intuitively, you may think this would result in a horizontal line where everyone pays the same rate. In reality, it's as as curved as any other!

<h3>Why A Flat Tax Isn't Flat</h3>
<div id="flattax" class="chart"></div>
<div class="note">Note: The gap between the lines is not a plotting error. Alberta adjusted the amount of income people do not need to pay tax on by more than inflation. As a result, everyone's rate declined by about 0.1%.</div><br>

The reason is the basic personal amount: the first part of your income on which you don't pay tax. In Alberta, this amount is $18,451 for 2016, so if you earn $20,000, you only pay tax on $1,549 dollars. This means you pay $155 tax on your $20,000 income, or 0.8% - far from the 10% rate.
<br><br>
The tax system is complicated. While the use of hidden taxes and inflation to raise taxes may be politically beneficial, it makes the system even harder to understand. My hope is that this piece helps to clarify the way that the income tax system works, and makes it easier for that average citizen to make sense of what can be an overwhelming topic.
<br>
__
<br>
<em>Ryan Brideau</em>
<br><br>
<div class="note" style="margin-left:0">
<strong>Some Notes on Data Sources and Methodology</strong>

<p>Tax bracket and credit data are not stored in a single document that shows their changes over time; they are stored in 30 years of PDFs across two government websites (<a href="http://www.cra-arc.gc.ca/formspubs/t1gnrl/menu-eng.html">1</a>) (<a href="http://www.revenuquebec.ca/en/sepf/formulaires/tp/tp-1/">2</a>). To produce these charts, I downloaded the federal, provincial and territorial tax-return forms for the last 10 years (<a href="https://github.com/CitizensCode/CanadianIncomeTaxes/blob/master/IncomeTaxDownloader.ipynb">code here</a>). I then compiled that tax bracket and tax credit information into <a href="https://github.com/CitizensCode/CanadianIncomeTaxes/blob/master/web/data/incomeTax.json">a giant JSON object</a>, cross-referencing with documents from <a href="http://www.kpmg.com/ca/en/services/tax/pages/tax-rates.aspx">KPMG</a>, <a href="http://www.ey.com/CA/en/Services/Tax/Tax-Calculators-2015-Personal-Tax">Ernst & Young</a>, and the <a href="http://www.taxpayer.com/news-releases/bc--ctf-releases-new-year-s-tax-changes-for-2016">Canadian Tax Payers Federation</a> to validate the data. Once this information was recorded, I wrote a program (<a href="https://github.com/CitizensCode/CanadianIncomeTaxes/blob/master/CanadianTaxAnalysis.ipynb">code here</a>) that calculated what percentage tax was paid by every earner from $0 to $500,000 income.</p>
<p>
The federal government's method for adjusting for CPI is described <a href="http://www.fin.gc.ca/n05/05-087-eng.asp">here</a>, though their definition isn't quite correct. Instead of multiplying the previous-years value by the "A divided by B" they mention, it is simply the value of A divided by B. The source of the CPI values is <a href="http://www.statcan.gc.ca/tables-tableaux/sum-som/l01/cst01/cpis01a-eng.htm">here</a>.
</p>
</div>

{% if page.custom_js %}
  {% for js_file in page.custom_js %}
  <script src='/public/js/{{ js_file }}' type="text/javascript"></script>
  {% endfor %}
{% endif %}
