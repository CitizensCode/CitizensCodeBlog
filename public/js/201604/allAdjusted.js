(function(allAdjusted, undefined){

allAdjusted.visualize = function(sheet) {

  // Get the data from the Google sheet
  var rawData = sheet.elements;

  // Get the list of provinces
  var provinces = _.uniq(
    _.map(rawData, function(each) {
      return each.province;
    })
  );

  var processedData = _.map(provinces, function(prov) {
    return {"province": prov};
  });

  // This will be use to plot the lines
  processedData = _.map(processedData, function(provObj) {
    var prov = provObj.province;
    provObj.values = _.where(
      rawData, {"province" : prov}
    );
    provObj.values = _.filter(provObj.values,
      function(data) {
        return data.incomeadjusted <= 500000;
      });
    return provObj;
  });

  // This will be used for the Kodoma tooltips. They need to be in a specific format.
  var kodomoData = rawData.map(function(data) {
    return {
      incomeadjusted: data.incomeadjusted,
      effectiveincometax: data.effectiveincometax,
      title: data.province + " 2016",
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
  var chart = new d3Kit.Skeleton('#allAdjusted', DEFAULT_OPTIONS);

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

  var cleanString = function(toClean) {
    return String(toClean).toLowerCase().replace(/\s+/g, '');
  };

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
    y.domain([0, 50])
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
      .attr('class', function(d) {
        return 'line '  + cleanString(d.province);
      })
      .attr('id', function(d) {
        // Add a class for formatting each
        return "all-" + cleanString(d.province);
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
        .data(kodomoData);

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

  chart
    .autoResize(true)
    .autoResizeToAspectRatio(1.5)
    .on('resize', visualize)
    .on('data', visualize)
    .data(processedData);

  console.log("Sheet");
  console.log(sheet);
  console.log("Processed Data");
  console.log(processedData);
};

}(window.allAdjusted = window.allAdjusted || {}));
