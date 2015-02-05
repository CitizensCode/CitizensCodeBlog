---
layout: post
title: Mapping New Brunswick With Only Properties
---

One of my first introductions to data analysis and visualization was [a map created by MIT student that plotted every citizen in the United States](http://www.fastcodesign.com/1671567/infographic-every-person-in-the-us-and-canada-on-one-crazy-zoomable-map#8). No other feature was present: no roads, no rivers - nothing but people - yet the contours of the country are immediately apparent. It's gorgeous, and is an impressive feat.

If you look up close, you see that the points are randomly scattered, but at a distance, you can't notice that fine of detail. It occurred to me that the same kind of macro-look could be accomplished with a simple plot of property geolocations. Luckily, GeoNB has exactly that dataset available: [http://www.snb.ca/geonb1/e/DC/catalogue-E.asp](http://www.snb.ca/geonb1/e/DC/catalogue-E.asp)

After that, it's as simple as using [open-source GIS software QGIS](http://qgis.org/en/site/), tweaking a few visual parameters, and you have an amazing black and white version of your own (for a larger look, see [http://www.ryanbrideau.com/dataviz/geo/NBHousingMap.png](http://www.ryanbrideau.com/dataviz/geo/NBHousingMap.png)).

![image](http://media.tumblr.com/4380b6f7780d14d259577b69e356c0cd/tumblr_inline_mxb1noAOHa1rfk13c.png)

_EDIT: Fun fact: creating this same plot for Nova Scotia (using about 560,000 data points) [would have cost me $8960](http://www.novascotia.ca/snsmr/pdf/GEO_INFO_RETAIL_PRICE_LIST.pdf)._