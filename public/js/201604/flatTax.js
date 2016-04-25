(function(flatTax, undefined){

flatTax.visualize = function(sheet) {

  // Get the data from the Google sheet
  var rawData = sheet.elements;

  // This will be use to plot the lines
  var processedData = [
    {"year": 2005, "values": []},
    {"year": 2016, "values": []},
  ];
  processedData[0].values = _.where(rawData, {year: 2005});
  processedData[0].values = _.filter(processedData[0].values, function(data) {
    return data.incomeadjusted <= 500000;
  });
  processedData[1].values = _.where(rawData, {year: 2016});

  // This will be used for the Kodoma tooltips. They need to be in a specific format.
  var kodamaData = rawData.map(function(data) {
    return {
      incomeadjusted: data.incomeadjusted,
      effectiveincometax: data.effectiveincometax,
      title: "Alberta " + data.year,
      items: [
        {title: "Income", value: data.incomeadjusted},
        {title: "Effective Tax", value: data.effectiveincometax}
      ],
      distance: 10,
      theme: 'ccTheme'
    };
  });

  // Chart options
  var DEFAULT_OPTIONS = {
    margin: {top: 60, right: 60, bottom: 90, left: 60},
    initialWidth: 'auto'
  };
  // Set up the d3Kit chart skeleton. We add more properties to it later once we've defined some other functions.
  var chart = new d3Kit.Skeleton('#flattax', DEFAULT_OPTIONS);

  // Create some layers to organize the visualization
  var layers = chart.getLayerOrganizer();
  layers.create(
    ['content',
     'x-axis',
     'y-axis']
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
  var x = d3.scale.linear()
    .range([0, width]);
  var y = d3.scale.linear()
    .range([height, 0]);

  var xAxis = d3.svg.axis()
    .scale(x)
    .orient('bottom')
    .tickFormat(d3.format("$s"));
  var yAxis = d3.svg.axis()
    .scale(y)
    .orient('left')
    .tickFormat(function(d) {
      return parseInt(d, 10) + "%";
    });

  // X-Axis Label
  layers.get('x-axis')
    .append("text")
    .attr("class", "x label")
    .attr("text-anchor", "middle")
    .attr("x", width / 2)
    .attr("y", 40 + yAxisScale(width))
    .text("Income (2016 Dollars)");

  // Y-Axis Label
  layers.get('y-axis')
    .append("text")
    .attr("class", "y label")
    .attr("text-anchor", "middle")
    .attr("y", -40 - xAxisScale(width))
    .attr("x", height / -2 )
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text("Effective Income Tax");

  var lineGen = d3.svg.line()
    .x(function(d) { return x(d.incomeadjusted); })
    .y(function(d) { return y(d.effectiveincometax); });

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
      top: 10,
      right: 20,
      bottom: 60 + yAxisScale(width),
      left: 40 + xAxisScale(width)
    }, true);
    // Get the new values
    width = chart.getInnerWidth();
    height = chart.getInnerHeight();

    var data = chart.data();
    x.domain([0, 500000])
      .range([0, width]);
    y.domain([0, 13])
      .range([height, 0]);

    layers.get('x-axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis)
    .selectAll(".tick text")
      .attr("y", 0)
      .attr("x", -4)
      .style("transform", "rotate(-45deg)")
      .style("text-anchor", "end");
    layers.get('y-axis')
      .call(yAxis);

    // Draw the lines
    var selection = layers.get('content')
      .selectAll('.line')
      .data(data);

    selection.enter()
      .append('path')
      .attr('class', 'line')
      .attr('id', function(d) {
        // Add a class for formatting each
        return "flat-" + String(d.year);
      })
      .transition()
      .attr("d", function(d) {
        return lineGen(d.values);
      });

    selection.transition()
      .attr("d", function(d) {
        return lineGen(d.values);
      });

    // Add some invisible points for the tooltips
    selection = layers.get('content')
        .selectAll('.tooltip-point')
        // Use the raw data since it isn't nested. Easier to work with.
        .data(kodamaData);

    selection.enter()
      .append('circle')
      .attr('class', 'tooltip-point')
      .attr('id', function() {
        return _.uniqueId("flat-");
      })
      .attr("r", 6)
      .attr("stroke", "black")
      .attr("stroke-width", "1")
      .attr("fill", "white")
      .attr("cx", function(d) { return x(d.incomeadjusted); })
      .attr("cy", function(d) { return y(d.effectiveincometax); })
      .call(d3.kodama.tooltip());

    selection.attr("cx", function(d) {
        return x(d.incomeadjusted);
      })
      .attr("cy", function(d) {
        return y(d.effectiveincometax);
      });

    $('#flattax circle').on('mouseover', function(obj) {
      // Make the circle show up
      var currId = "#" + obj.currentTarget.id;
      $(currId).css("opacity", 0.75);

      // Make the line get thicker
      var data = obj.currentTarget.__data__;
      var title = data.title;
      var year = title.split(" ")[1];
      var id = "#flat-" + year;
      $(id).css("stroke-width", 3);
    });
    $('#flattax circle').on('mouseout', function(obj) {
      var currId = "#" + obj.currentTarget.id;
      $(currId).css("opacity", 0);

      var data = obj.currentTarget.__data__;
      var title = data.title;
      var year = title.split(" ")[1];
      var id = "#flat-" + year;
      $(id).css("stroke-width", 1.5);
    });

    // X-Axis Label
    layers.get('x-axis')
      .select('.x')
      .attr("x", width / 2)
      .attr("y", 50 + yAxisScale(width));

    // Y-Axis Label
    layers.get('y-axis')
      .select('.y')
      .attr("y", -40 - xAxisScale(width))
      .attr("x", height / -2 );

  }, 10); // Debounce at 10 milliseconds

  // Line labels
  layers.get('content')
   .append("text")
    .attr("dy", "-3")
    .attr("class", "curve-text")
   .append("textPath")
    .attr("class", "flat-2016-label")
    .attr("xlink:href", "#flat-2016")
    .attr("startOffset", "60%")
    .text("Alberta 2016 (New Tax Brackets)");

  layers.get('content')
   .append("text")
    .attr("dy", "-3")
    .attr("class", "curve-text")
   .append("textPath")
    .attr("class", "flat-2005-label")
    .attr("xlink:href", "#flat-2005")
    .attr("startOffset", "60%")
    .text("Alberta 2005 (Flat 10% Tax)");

  chart
    .autoResize(true)
    .autoResizeToAspectRatio(1.5)
    .on('resize', visualize)
    .on('data', visualize)
    .data(processedData);

};

}(window.flatTax = window.flatTax || {}));
