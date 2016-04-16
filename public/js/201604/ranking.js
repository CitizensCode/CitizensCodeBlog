(function(ranking, undefined){

  /* To get jshint off my case */
  /* globals incomeTaxCanada: true */

ranking.data = [];
ranking.processed = null;

ranking.visualize = function(sheet) {

  // Get the data from the Google sheet
  var rawData = sheet.elements;

  ranking.data = rawData; // Testing

  // Get the list of provinces
  var provinces = _.uniq(
    _.map(rawData, function(each) {
      return each.province;
    })
  );

  var processedData = _.map(provinces, function(prov) {
    return {"province": prov};
  });

  // Used to plot the lines
  processedData = _.map(processedData, function(provObj) {
    var prov = provObj.province;
    provObj.values = _.where(
      rawData, {"province" : prov}
    );
    return provObj;
  });

  // Chart options
  var DEFAULT_OPTIONS = {
    margin: {top: 60, right: 60, bottom: 60, left: 60},
    initialWidth: 'auto'
  };
  // Set up the d3Kit chart skeleton. We add more properties to it later once we've defined some other functions.
  var chart = new d3Kit.Skeleton('#ranking', DEFAULT_OPTIONS);

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
    bottom: 40 + yAxisScale(width),
    left: 40 + xAxisScale(width)
  }, true); // Do not dispatch the resize event

  // The above impacted the width and height, so we grab the new values here
  width = chart.getInnerWidth();
  height = chart.getInnerHeight();

  // Scales for the data
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
    .attr("y", 25 + yAxisScale(width))
    .text("Income (Thousands, 2016 Dollars)");

  // Y-Axis Labels
  layers.get('y-axis')
    .append("text")
    .attr("class", "y label most")
    .attr("text-anchor", "middle")
    .attr("y", -40 - xAxisScale(width))
    .attr("x", height * 0.1 )
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

  var lineGen = d3.svg.line()
    .x(function(d) { return x(d.income); })
    .y(function(d) { return y(d.rankatincome); });

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
      top: 20,
      right: 20,
      bottom: 40 + yAxisScale(width),
      left: 40 + xAxisScale(width)
    }, true);
    // Get the new values
    width = chart.getInnerWidth();
    height = chart.getInnerHeight();

    var data = chart.data();
    x.domain([10000, 500000])
      .range([0, width]);
    y.domain([13, 1])
      .range([height, 0]);

    layers.get('x-axis')
      .attr('transform', 'translate(0,' + height * 1.02 + ')')
      .call(xAxis);
    layers.get('y-axis')
      .call(yAxis);

    // Draw the lines
    var selection = layers.get('content')
      .selectAll('.province-group')
        .data(data);

    // Update everything if it exists
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

    // Enter new objects if they don't exist
    var enterGroup = selection.enter().append("g")
        .attr("class", "province-group");

    enterGroup.append('path')
        .attr('class', function(d) {
          return 'line '  + cleanString(d.province);
        })
        .attr('id', function(d) {
          // Add a class for formatting each
          return "ranking-" + cleanString(d.province);
        })
        .attr("d", function(d) {
          return lineGen(d.values);
        });

    enterGroup.append("text")
      .datum(function(d) {
        return {
          name: d.province,
          value: d.values[d.values.length - 1]};
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
      .attr("y", 25 + yAxisScale(width));

    // Y-Axis Labels
    layers.get('y-axis')
      .select('.most')
      .attr("y", -40 - xAxisScale(width))
      .attr("x", height * -0.1 );
    layers.get('y-axis')
      .select('.least')
      .attr("y", -40 - xAxisScale(width))
      .attr("x", height * -0.9 );

  }, 10); // Debounce at 10 milliseconds

  chart
    .autoResize(true)
    .autoResizeToAspectRatio(1.5)
    .on('resize', visualize)
    .on('data', visualize)
    .data(processedData);

  // For reference
  console.log("Sheet");
  console.log(sheet);
  console.log("Processed Data");
  console.log(processedData);
};

}(window.ranking = window.ranking || {}));
