---
layout: post
title: Line Graphs and Parallel Processing in R
---

![Fredricton Property Value Line Plot](http://i.imgur.com/xWCF5jN.png)

A few months ago I came across one of the most beautiful visualizations I have ever seen: [James Cheshire's Population Lines Print](http://spatial.ly/2013/09/population-lines/). What I love about it is that, in the absence of any traditional map features, the outlines of countries and continents are immediately apparent. And as long as you are familiar with what the land masses of the globe look like, you know exactly what the plot is without even needing to be told. Another interesting feature is that the peaks also give information about both the population _and_ and the density: the area under the graph represents the total population, while the higher the peak, the more dense it is. (Hence the huge peak of Tokyo, and the low, wide peak of Mexico City.)

When I first saw the post, I went to this blog to see how he pulled it off. Unfortunately, there weren't any details. So, I had to figure it out myself.

Well, I think I got it! I'll show you a few of the plots first, and then describe the process below.

Using the same [NASA SEDAC data that James used](http://sedac.ciesin.columbia.edu/data/set/gpw-v3-population-count), here is the plot, produced entirely using R (click for higher resolution):

[![World Population Line Plot](http://i.imgur.com/SnWymMz.png)](http://i.imgur.com/A8FlGkz.png)

And, for my fellow New Brunswickers, here's the same dataset of NB properties I plotted a while ago, plotted again using a line graph:

[![New Brunswick Property Locations](http://i.imgur.com/0R4daMp.png)](http://i.imgur.com/8yUtXIu.png)

And finally, here is the property value data from my last post for Fredericton. Note that, as mentioned above, unless you're familiar with the geography of the area, it may not be directly apparent what you're looking at here. For those that are, you can immediately spot the river flowing through the middle of town with the tributaries flowing in:

[![Fredericton Property Values](http://i.imgur.com/O1eIg5u.png)](http://i.imgur.com/6TDo0Sf.png)

These maps aren't the most practical ways of plotting data into a third dimension since you can't really 'dive deeper' into them to get more detail, but they are certainly one of the most beautiful I've seen.

### So, how was it done?

_**EDIT:** I've updated the below instructions since this was originally published to provide an alternative to using QGIS (thanks [@Zecca_Lehn](https://twitter.com/zecca_lehn) for pointing out I could do this in R itself). I also improved the performance about 3x by replacing my data frames with data tables._

Well, like everything else I do on here, I wanted to accomplish this using only freely available software. In this case, I used a combination of R, QGIS and Libre Office (the latter two being optional). The work was divided into three main pieces:

1.  Extract the data from NASA's data set.
2.  Crunch the data to prepare it for plotting.
3.  Actually do the plotting.

All the code for processing and plotting is available here: [GeospatialLineGraphs](https://github.com/Brideau/GeospatialLineGraphs).

#### Extracting the Data

James originally used NASA's population density data from the year 2000. Though the outcome should be the same, I decided to use the [raw population data available here](http://sedac.ciesin.columbia.edu/data/set/gpw-v3-population-count). On that page, go to download, select the format as ".ascii", the resolution as 1/2°, and the year as 2000.

Once you've downloaded it, you can do either of the following to get the data into a workable form:

_Using R_

1.  Put the file glp00ag30.asc into a folder called DataSets in your working directory
2.  Run [this part of the R script](https://github.com/Brideau/GeospatialLineGraphs/blob/master/01GenerateData.R#L21) which uses the 'raster' package to turn it into a set of points. The rest of the script is described in the next section.

_Using QGIS_

1.  Import the data into QGIS
2.  Go to Raster > Conversion > Polygonize (Raster to Vector), and check the "Add to map" box
3.  Select that layer, and go to Vector > Geometry Tools > Polygon Centroids and follow the menu items, making sure to check "Add result to canvas". This will generate another layer with point data from your polygon data.
4.  Right click the points layer, and save it as a CSV file. It should automatically export the X & Y coordinates.
5.  Finally, load the data with [this part of the script](https://github.com/Brideau/GeospatialLineGraphs/blob/master/01GenerateData.R#L29) and make sure to comment out the part above that uses the 'raster' function mentioned above.

There, you data is ready to be crunched.

#### Processing the Data to be Plotted

Next, you have to take this data and turn it into something that can be plotted. The code to do this is available here: [Geospatial Line Graphs - Generate Data](https://github.com/Brideau/GeospatialLineGraphs/blob/master/01GenerateData.R).

The basic idea behind what this does is this:

1.  First, find the boundaries of the plot to know the start and end latitude and longitudes you want to plot over.
2.  Using the start and end latitudes, create 200 evenly spaces points of latitude - one for each line that will be plotted.
3. For each point of latitude, draw a square with sides equal to the gaps between the points of latitude. Calculate the total of whatever data you're interested in inside that square.
4.  Move the square over an amount of longitude equal to the width of the square, and repeat the above calculation.
5. Do this until you've calculated everything, and output it all to a CSV file.

Now, when you're dealing with 500,000+ pieces of data, this can take a while if you're not taking advantage of your hardware's capabilities. In the case of the NB data, it originally took 2 hours to crunch on my 2.3 GHz i7, which has 4 cores (8 virtual), but only one was being used.

Luckily, R now has the ability to do parallel processing to take full advantage of multi-core CPUs. Marcus over at R-bloggers has [a great tutorial on how to do this in R](http://www.r-bloggers.com/a-brief-foray-into-parallel-processing-with-r/) if you want to have a look. Furthermore, using data tables instead of data frames can also improve performance by, in my experience, about a factor of 3 for this computation. Using both of these together got the time to process from 2 hours to about 2 minutes for both the NB and world population data set.

#### Plotting the Data

To plot the data, I wrote [this script](https://github.com/Brideau/GeospatialLineGraphs/blob/master/02PlotData.R) which does the following:

1.  Load the data you want to plot, and pad the top and bottom to give it a border (padding the left and right is most easily done in a spreadsheet by adding rows of 0's to the top and bottom).
2.  Find the maximum value in all of the data, and select a factor that will be used to scale the line heights to fit the plot (this is done through trial and error).
3.  Starting at the top, grab a row's data, smooth it with a spline, and plot a white polygon at the appropriate height.
4. Outline the top of the polygon with a gray line.
5. Plot black line segments over the gray line if the values are over a certain threshold.
6. Repeat for the rest of the rows, moving down the plot area as you go so that the lower polygons overlap the upper ones.

#### That's It!

There you have it - that's all there is to these beautiful line plots. If you love the world map, go buy it from James here to support the work he does: [Population Lines](http://spatial.ly/2013/09/population-lines/). And as always, if you have any questions, ask away below or send me an e-mail.

-Ryan