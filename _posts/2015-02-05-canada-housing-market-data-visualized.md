---
layout: post
title: Canada's Housing Market Visualized
---

A couple months ago I bumped into an old friend at a Christmas party and we got chatting about what we're working on these days. He mentioned that he's been looking after the technology at a Y-Combinator funded startup called [Priceonomics](http://priceonomics.com/) that crawls and gathers information available on the web. And as a side project, he'd been gathering the housing prices for a number of Canadian cities for the last 9 months or so. Of course, I asked if there was any chance I take a look at some of this data, and luckily, he obliged!

The data itself tracked individual house prices over time for each city, which opened up a number of possible ways to visualize it. My first attempt looked something like this (mouse over to zoom a bit):

#### Fredericton Property Prices Over Time

![Fredericton Property Prices](/images/201502/FrederictonPropertyPricesLines.png)

The idea here was to be able to watch the trajectory of home price over time. The trouble was, this worked OK (not great) for a city with 1,400 listings, but as soon as you got to 20,000 plus, it was just spagghetti.

Eventually, though, I setted on the following for a first iteration. While I have some ideas on how to visualize the housing trends _over time_ better, I think this one captures another interesting aspect of housing prices and time.

_The idea is this:_

 1. Take every listing a city had that we recorded over the last 9 months, and find out how long it was listed for.
 2. Sort all of the listings by the length of time listed.
 3. Draw a single horizontal line for every listing, starting with the ones listed the longest at the bottom and go up. Space them all evenly by 1 unit.
 4. Color those lines by the starting price, corresponding to the gradient as shown below, with values over $2,000,000 being shaded the darkest shade.

![Price Scale](/images/201502/PriceScale.png)

 What you end up with is this:

### Vancouver _(~15,000 Listings)_:

![Vancouver Property Prices](/images/201502/VancouverPropertyPrices.png)

Now what makes this interesting is when you compare it to other cities. For example, compare Vancouver above to Fredericton here:

### Fredericton _(~1,400 Listings)_:

![Fredericton Property Prices](/images/201502/FrederictonPropertyPrices.png)

A few things stick out to me right away:

 1. The overal color of the graph gives an indication of how expensive the real-estate market is in that city (the darker the more expensive).
 2. The slope of the graph gives you a good idea of how fast the houses are being bought (long thin graphs are packed with listings that enter and leave the market quickly)
 3. If you look at the top and bottom of the graph, and look at the bands of colors, you can see which kinds of houses sell quickly, and which stick around for a while.
 4. Fredericton's market is so slow that a big chunk of houses got truncated at the right and are still listed (hence the big flat end on the right).

And a few more for your viewing pleasure:

### Calgary _(~27,000 Listings)_:

![Calgary Property Prices](/images/201502/CalgaryPropertyPrices.png)

### Toronto _(~45,000 Listings)_:

![Toronto Property Prices](/images/201502/TorontoPropertyPrices.png)

### St. John's _(~2,600 Listings)_:

![St. John's Property Prices](/images/201502/StJohnsPropertyPrices.png)

### Ottawa _(~16,000 Listings)_:

![Ottawa Property Prices](/images/201502/OttawaPropertyPrices.png)

Now this approach isn't without its drawbacks. I could have used final price (though there is no guarantee the final listed price was the real final price), you can't see the trends over time, and there is an inherent bias in comparing stacked lines of 1,400 to 45,000, since the latter is much more squished and misses a lot of detail. I'll be trying my hand at a few other ways to looking at this data in the future to flush out other aspects of it, so stay tuned.

Also, ff you're interested in learning how to do this kind of visualization, enter your e-mail below - I'll be putting together a tutorial shortly that goes step-by-step and I'll send out an update when I do. (Don't worry, this won't be one of _those_ kinds of e-mail lists. You'll get max 1 - 2 messages a month and only when we have something worth sharing.)

__

_Created by Ryan Brideau & Brendan Wood_