---
layout: post
title: The Small Towns and Deserts of Canada
---

I grew up in a small town in northern New Brunswick, have always had an affinity for 'medium sized' cities over big cities, and spend a lot of time thinking about what makes areas with high population density different from places like the Maritimes with so few people. When I came across [Nathan Yau's line maps about food deserts](http://flowingdata.com/2013/08/27/in-search-of-food-deserts/), I wondered if the same approach could be generalized for any country, and at any scale.

I managed to create this (click any image to see a huge PDF) by pulling tens-of-thousands of data points from Google Places:

[![image](https://31.media.tumblr.com/0e15e99c28471ef2fe34c7b3d74c62e3/tumblr_inline_my88q9SONl1rfk13c.png)](http://www.ryanbrideau.com/dataviz/deserts/CanadaHospitals.pdf)

Well...that's interesting. But what is it? Well that this map shows you is how far you'd have to travel to a hospital if you found yourself at the end of any of those lines and in trouble - the black dots being a hospital or medical clinic. Unfortunately, this doesn't really make any sense, because how often would you find yourself in the remote parts of NWT?

Given that fact, I set about modifying the script so that instead of doing a scan every 30km across the country in a grid, it would load a list of every small town in Canada ([thank you Geocoder.ca](http://geocoder.ca/?freedata=1)). Essentially, this says "if you grew up in town x, how close were you to medical care if you needed it?":

[![image](https://31.media.tumblr.com/37322584ec1774c78834aba123ea9e4f/tumblr_inline_my890dTlEQ1rfk13c.png)](http://www.ryanbrideau.com/dataviz/deserts/CanadaHospitalsCity.pdf)

I have to admit I was pretty shocked when I saw this. Though there's lots of talk about doctor shortages - and for good reason - with a few exceptions in the north, there's pretty much a medical clinic close by if you ever need it. I went a step further and did a town-by-town analysis for New Brunswick as well:

[![image](https://31.media.tumblr.com/9ca42a1cdca25c3742e53f5eaa121b85/tumblr_inline_my894nVaF21rfk13c.png)](http://www.ryanbrideau.com/dataviz/deserts/NBHospitalCity.pdf)

This of course doesn't tell the whole picture, like if the right kind of doctor is at the right place when you need them, but this general approach could make for an interesting way to present data if more time/care was taken to look at a very specific case.

Now what about other things, like cultural attractions? For example, I had never been exposed to art growing up in my home town. As it turns out, there was good reason for it:&nbsp;[![image](https://31.media.tumblr.com/9ac3c49dbd391bd5262ff63067100ba1/tumblr_inline_my89d6h36C1rfk13c.png)](http://www.ryanbrideau.com/dataviz/deserts/NBArtGalleriesCity.pdf)

All those red lines pointing toward Miramichi mean that I was essentially in a complete art desert for most of my life. Contrast this to someone from southern Ontario where they practically have art farms:

[![image](https://31.media.tumblr.com/cd3832fd5f26262848fdd2d0ce7a79e4/tumblr_inline_my89g4DuAo1rfk13c.png)](www.ryanbrideau.com/dataviz/deserts/CanadaArtGalleriesCity.pdf)

Small-town Saskatchewan, Alberta and Manitoba, as it turns out, aren't in a much better situation than NB:

[![image](https://31.media.tumblr.com/61c9f8fbdccee11368c943f7eb610445/tumblr_inline_my89k2y26E1rfk13c.png)](CanadaArtGalleriesCity)

My next approach was to see if I could get this to work on a very small scale - the size of a city like Fredericton. Initial attempts to use a uniform grid to scan the city and draw lines to the nearest locations didn't work out because they simply didn't make much sense at that scale (nobody lives in O'Dell park, so what does it matter how far it is from a grocery store?). So this time, I modified the script to read in the coordinate for every building in NB, filtering it for buildings in the city. My first graph shows the 'as the crow flies' distance from places to the nearest grocery store, giving a feel for how much car travel is required just for daily errands:

[![image](https://31.media.tumblr.com/2ad3204c1299cadc67052605205681b1/tumblr_inline_my89scM5Hi1rfk13c.png)](www.ryanbrideau.com/dataviz/deserts/FrederictonGroceryByBuilding.pdf)

I wasn't very happy with how this one turned out however, as a quick scan found a couple of suspect points from my Google Places API grab. Some of those black dots don't correspond to places where a person could actually get groceries. At the small scale, you really are at the whims of the quality of data Google has. It would also be better to do this by driving distance vs. a straight-line, and maybe I'll try that in the future.

To try something a bit different, I grabbed the recycling bin locations from [Fredericton's open data catalogue](http://www.fredericton.ca/en/citygovernment/Catalogue.asp)&nbsp;(this one had a whopping 4 data points) and did a similar analysis showing how far most homes and buildings are from the bin locations:

[![image](https://31.media.tumblr.com/2ed391e044e153f7f9a1cc4038c42b7a/tumblr_inline_my89zd0DIK1rfk13c.png)](www.ryanbrideau.com/dataviz/deserts/FrederictonRecyclingByBuilding.pdf)

Now before you jump on me, I know that many places have pickup. But [if you happen to be living in an apartment or multi-family dwelling](http://www.fredericton.ca/en/environment/whyrecycle.asp) (two places inhabited more often than not by people with lesser means) and have ever tried to go to one of these things, maybe this can shed a light on why they are always such a mess:

![image](https://31.media.tumblr.com/456449f9aff3e14e54ae6b3163923403/tumblr_inline_my8akaZbqv1rfk13c.jpg)

There's lots more than can be done using this approach, and I'd love to hear people's ideas. I've put all of the code up on GitHub, though it might be a bit hairy to go through since it's in a bunch of different files:&nbsp;[https://github.com/Brideau/LonelyPlaces/](https://github.com/Brideau/LonelyPlaces/)

Enjoy!