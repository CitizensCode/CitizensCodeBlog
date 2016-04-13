---
layout: post
title: "Moving 25,000 Refugees Isn't That Hard"
custom_js:
- d3.v3.min.js
- nv.d3.min.js
- jquery.min.js
- 20151121syrianrefugees.js
custom_css:
- 20151121syrianrefugees.css
- nv.d3.css

---

{% if page.custom_css %}
  {% for css_file in page.custom_css %}
  <link rel="stylesheet" href='/public/css/{{ css_file }}'></script>
  {% endfor %}
{% endif %}

There's been a lot of questions in the last week about the feasability of moving and processing 25,000 Syrian refugees by the end of the year. Admittedly, the Canadian government hasn't been the best at communicating the logistics of the operation, but thanks to a leaked document titled ["Operation Syrian Refugees" ](http://news.nationalpost.com/news/canada/500k-federal-ad-campaign-to-tout-refugee-plan-as-a-national-project-document-reveals), we can start to piece together the details.

One of the questions that seems to come up a lot is "how could we possibly move 25,000 people across the world and through our airports in such a short period of time?" Well, the numbers turn out to be pretty simple.

For starters, the Operation Syrian Refugees document mentions:

<blockquote>"The strategic plan envisages 5-6,000 refugees being airlifted from Amman, Jordan, every week, between Dec. 1-31. The plan suggests 900 passengers a day will arrive on three flights to Montreal and Toronto."</blockquote>

The flight path between Amman and Toronto (the further of the two) is about 9,400 kilometres, as shown below:

![The flight path from Amman, Jordan to Toronto, Canada.](/images/201511/refugeeflightpath.png)
<span class="imagecaption"><strong>The flight path from Amman, Jordan to Toronto, Canada.</strong> Image courtesy of Google Earth.</span>

Since their goal is to fly 900 people on 3 planes, they'll need a plane that can seat 300, and it turns out there are a number of those, one being the Boeing 767. As a bonus, it has [a flight range of 7,130 to 11,825 km](https://en.wikipedia.org/wiki/Boeing_767), so it could potentially even do the trip in a single flight (not that it would _have_ to, but it could).

![Boeing 767](/images/201511/boeing767.jpg)
<span class="imagecaption"><strong>The Boeing 767.</strong> Creative Commons Attribution-Share Alike 2.0 Generic license. [Source](https://commons.wikimedia.org/wiki/File:Delta_Air_Lines_B767-332_N130DL.jpg)</span>

So to recap: 300 people per flight, 3 flights a day, and 31 days in December. That's 27,900 people, which even gives the plan a bit of wiggle room.

Once the passengers arrive in either Montreal or Toronto, the question becomes how much of an additional burden is that on those that have to process them as they arrive? Well let's assume the worst case scenario of when all 3 planes have to arrive at the same airport. According to statistics released on [Montreal's](http://www.admtl.com/en/adm/medias/statistic) and [Toronto's](http://www.torontopearson.com/en/gtaa/statistics/#) airports websites, on average in each day of December last year Montreal deplaned and processed 14,062 international passengers, and Toronto 34,270. The below figure shows the additional load under the worst case scenario mentioned:

<div id="chart1">
    <svg></svg>
</div>

Of course this is one of the peak travel seasons, so there will be days with a lot more traffic than this, but presumably the airports have the infrastructure and human resource capacity to handle the the holiday season, and an extra 900 people per day would not represent a huge burden.

Finally, the refugees will then be moved to temporary lodgings in Ontario and Quebec "within four or five hours of Toronto and Montreal, most likely on military bases", according to the National Post article.

There are other logistics involved beyond what's been covered here, such as managing the movement of the people to the bases and their care while there, but looking at the first leg of the journey, this is certainly not an overwhelming number of people to process when broken down day-by-day.


{% if page.custom_js %}
  {% for js_file in page.custom_js %}
  <script src='/public/js/{{ js_file }}' type="text/javascript"></script>
  {% endfor %}
{% endif %}

__

_Ryan Brideau_
