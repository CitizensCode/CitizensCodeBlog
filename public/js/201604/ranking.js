(function(ranking, undefined){

  /* To get jshint off my case */
  /* globals incomeTaxCanada: true, d3help: true */

ranking.visualize = function(sheet) {

  // Get the data from the Google sheet
  var rawData = sheet.elements;

  var processedData = d3help.sheetToObj(rawData, "province", {key: "income", value: 500000});

  // Chart options
  var DEFAULT_OPTIONS = {
    margin: {top: 60, right: 60, bottom: 90, left: 60},
    initialWidth: 'auto'
  };
  // Set up the d3Kit chart skeleton. We add more properties to it later once we've defined some other functions.
  var chart = new d3Kit.Skeleton('#ranking', DEFAULT_OPTIONS);

  // Create some layers to organize the visualization
  var layers = chart.getLayerOrganizer();
  layers.create(
    ['content',
     'x-axis',
     'y-axis',
     'voronoi']
   );

  var width = chart.getInnerWidth();
  var height = chart.getInnerHeight();

  // Scales for the margin sizes and axis-label placement
  var maxWidthApprox = 750;
  var minWidthApprox = 320;
  var xAxisScale = d3.scale.pow()
    .exponent(0.5)
    .domain([minWidthApprox, maxWidthApprox])
    .range([0,15]);
  var yAxisScale = d3.scale.pow()
    .exponent(0.5)
    .domain([minWidthApprox, maxWidthApprox])
    .range([0,10]);

  chart.margin({
    top: 10, // Selected by trial and error
    right: 20, // Same
    bottom: 60 + yAxisScale(width),
    left: 40 + xAxisScale(width)
  }, true); // Do not dispatch the resize event

  // The above impacted the width and height, so we grab the new values here
  width = chart.getInnerWidth();
  height = chart.getInnerHeight();

  // Scales for the data
  var margins = chart.margin();
  var x = d3.scale.log()
    .range([0, width]);
  var y = d3.scale.linear()
    .range([height, 0]);

  var xAxis = d3.svg.axis()
    .scale(x)
    .orient('bottom')
    .tickSize(-height * 1.1)
    .ticks(11, function(d) {
      return "$" + String(d / 1000);
    });

  var yAxis = d3.svg.axis()
    .scale(y)
    .orient('left');

  // X-Axis Label
  layers.get('x-axis')
    .append("text")
    .attr("class", "x label")
    .attr("text-anchor", "middle")
    .attr("x", width / 2)
    .attr("y", 40 + yAxisScale(width))
    .text("Income (Thousands, 2016 Dollars)");

  // Y-Axis Labels
  layers.get('y-axis')
    .append("text")
    .attr("class", "y label most")
    .attr("text-anchor", "middle")
    .attr("y", -40 - xAxisScale(width))
    .attr("x", height * -0.07 )
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text("Most Tax");
  layers.get('y-axis')
    .append("text")
    .attr("class", "y label least")
    .attr("text-anchor", "middle")
    .attr("y", -40 - xAxisScale(width))
    .attr("x", height * -0.9 )
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text("Least Tax");
  layers.get('y-axis')
    .append("text")
    .attr("class", "y label ranking")
    .attr("text-anchor", "middle")
    .attr("y", -60 - xAxisScale(width))
    .attr("x", height / -2)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text("Provincial Ranking");

  var lineGen = d3.svg.line()
    .x(function(d) { return x(d.income); })
    .y(function(d) { return y(d.rankatincome); });

  // The main visualization function. Debounce keeps it from rendering too many times per second during updates.
  var visualize = d3Kit.helper.debounce(function(){
    if(!chart.hasData()) {
      // If for some reason the chart doesn't have data, remove all the visual elements
      d3Kit.helper.removeAllChildren(layers.get('content'));
    }

    // Grab them in case they've changed
    width = chart.getInnerWidth();
    height = chart.getInnerHeight();
    chart.margin({
      top: 20,
      right: 20,
      bottom: 60 + yAxisScale(width),
      left: 40 + xAxisScale(width)
    }, true);
    // Get the new values
    width = chart.getInnerWidth();
    height = chart.getInnerHeight();

    var data = chart.data();
    x.domain([10000, 500000]) // $10k - $500k
      .range([0, width]);
    y.domain([13, 1]) // # Rank 1-13
      .range([height, 0]);

    // Re-scale the x-axis
    xAxis.tickSize(-height * 1.02);

    layers.get('x-axis')
      .attr('transform', 'translate(0,' + height * 1.02 + ')')
        .call(xAxis)
      .selectAll(".tick text")
        .attr("y", -4)
        .attr("x", 0)
        .style("transform", "rotate(-45deg)")
        .style("text-anchor", "end");
    layers.get('y-axis')
      .call(yAxis);

    // Draw the lines
    var selection = layers.get('content')
      .selectAll('.province-group')
        .data(data, function(d) {
          return d.province;
        });

    // Update anything that already exists to make it responsive
    selection.select('path')
      .attr("d", function(d) {
        return lineGen(d.values);
      });

    selection.select('text')
      .datum(function(d) {
        return {
          name: d.province,
          value: d.values[d.values.length - 1]};
      })
      .attr("transform", function(d) {
        return "translate(" + (width + 3) + "," + y(d.value.rankatincome) + ")";
      });

    // Enter new objects if they don't exist. Groups are used to group the line and the associated province initials
    var enterGroup = selection.enter().append("g")
        .attr("class", "province-group");

    enterGroup.append('path')
        .attr('class', function(d) {
          return 'line '  + d3help.cleanString(d.province);
        })
        .attr('id', function(d) {
          // Add a class for formatting each
          return "ranking-" + d3help.cleanString(d.province);
        })
        .attr("d", function(d) {
          d.line = this;
          return lineGen(d.values);
        });

    enterGroup.append("text")
      .datum(function(d) {
        return {
          name: d.province,
          value: d.values[d.values.length - 1]};
      })
      .attr('class', function(d) {
        console.log(d);
        return d3help.cleanString(d.name) + "-text";
      })
      .attr("text-anchor", "start")
      .attr("dy", "5")
      .attr("transform", function(d) {
        return "translate(" + (width + 3) + "," + y(d.value.rankatincome) + ")";
      })
      .text(function(d) {
        // provinceLookup is in incomeTaxCanada.js
        var provAbbv = incomeTaxCanada.provinceLookup[d.name];
        return provAbbv.toUpperCase();
      });

    // X-Axis Label
    layers.get('x-axis')
      .select('.x')
      .attr("x", width / 2)
      .attr("y", 40 + yAxisScale(width));

    // Y-Axis Labels
    layers.get('y-axis')
      .select('.most')
      .attr("y", -40 - xAxisScale(width))
      .attr("x", height * -0.07 );
    layers.get('y-axis')
      .select('.least')
      .attr("y", -40 - xAxisScale(width))
      .attr("x", height * -0.92 );
    layers.get('y-axis')
      .select('.ranking')
      .attr("y", -40 - xAxisScale(width))
      .attr("x", height / -2);

    ///// Add the voronoi layer

    // Set up the voronoi generator
    var voronoi = d3.geom.voronoi()
      .x(function(d) {
        return x(d.income);
      })
      .y(function(d) {
        return y(d.rankatincome);
      })
      .clipExtent([
        [-margins.left, -margins.top],
        [width + margins.right, height + margins.bottom]
      ]);

    // This configures the hover tip
    var focus = layers.get('voronoi')
      .append("g")
      .attr("transform", "translate(-9000,-9000)")
      .attr("class", "tt-box");

    focus.append("circle")
      .attr('class', 'tooltip tt-circle')
      .attr("r", 6);

    focus.append("text")
      .attr('class', 'tooltip tt-title')
      .attr("y", -40);

    focus.append("text")
      .attr('class', 'tooltip tt-valueA')
      .attr("y", -25);

    focus.append("text")
      .attr('class', 'tooltip tt-valueB')
      .attr("y", -10);

    // First set up some mouse functions
    var mouseover = function(d) {
      // Make the line turn black
      d3.select(d.parentObj.line)
        .classed("line-hover", true);
      // Append a line over top of all the other lines
      d.parentObj.line.parentNode.appendChild(d.parentObj.line);
      // Move the label and text into view and change the label
      focus.attr("transform", "translate(" + x(d.income) + "," + y(d.rankatincome) + ")");

      // Update the tooltip
      focus.select(".tt-title")
        .text(d.parentObj.province);
      focus.select(".tt-valueA")
        .text("Income Tax: " + d.effectiveincometax + "%");
      focus.select(".tt-valueB")
      .text("Income: $" + d.income);
    };

    var mouseout = function(d) {
      d3.select(d.parentObj.line).classed("line-hover", false);
      focus.attr("transform", "translate(-9000, -9000)");
    };

    var voronoiGroup = layers.get('voronoi')
      .selectAll("path")
      .data(voronoi(
        d3.nest()
        // Group the data by its x/y coords
        .key(function(d) {
          return x(d.income) + "," + y(d.rankatincome);
        })
        // Return the first value if there's multiple. This is necessary for the voronoi function to work properly
        .rollup(function(v) {
          return v[0];
        })
        // Flatten the data out so you can feed it into the nest function. This grabs all the xy values from each separate line's array of objects, and merges them into one giant array of objects.
        .entries(
          d3.merge(data.map(
            function(d) {
              return d.values;
            }
          ))
        )
        // Turn the result of the above into an array of objects that can be fed to the voronoi generator
        .map(function(d) {
          return d.values;
        })
      ));

    voronoiGroup.attr("d", function(d) {
        return "M" + d.join("L") + "Z";
      })
      .datum(function(d) {
        return d.point;
      });

    voronoiGroup.enter().append("path")
      // Draw the polygon (invisibly) by joining the points together with a path
      .attr("d", function(d) {
        return "M" + d.join("L") + "Z";
      })
      // Assign the polygon the data from the point it surrounds
      .datum(function(d) {
        return d.point;
      })
      .on("mouseover", mouseover)
      .on("mouseout", mouseout);

  }, 10); // Debounce at 10 milliseconds

  chart
    .autoResize(true)
    .autoResizeToAspectRatio(1.5)
    .on('resize', visualize)
    .on('data', visualize)
    .data(processedData);

};

}(window.ranking = window.ranking || {}));
