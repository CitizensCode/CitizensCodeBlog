(function(flatTax, undefined){

flatTax.visualize = function(sheet) {

  // Get the data from the Google sheet
  var rawData = sheet.elements;
  var processedData = [
    {"year": 2005, "values": []},
    {"year": 2016, "values": []},
  ];
  processedData[0].values = _.where(rawData, {year: 2005});
  processedData[0].values = _.filter(processedData[0].values, function(data) {
    return data.incomeadjusted <= 500000;
  });
  processedData[1].values = _.where(rawData, {year: 2016});

  // Chart options
  var DEFAULT_OPTIONS = {
    margin: {top: 60, right: 60, bottom: 60, left: 60},
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
    .attr("x", width / 2 * 1.1)
    .attr("y", 45)
    .text("Income (2016 Dollars)");

  // X-Axis Label
  layers.get('y-axis')
    .append("text")
    .attr("class", "y label")
    .attr("text-anchor", "middle")
    .attr("y", -55)
    .attr("x", height / 2 * -1)
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

    width = chart.getInnerWidth();
    height = chart.getInnerHeight();

    var data = chart.data();
    x.domain([0, 500000])
      .range([0, width]);
    y.domain([0, 13])
      .range([height, 0]);

    layers.get('x-axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis);
    layers.get('y-axis')
      .call(yAxis);

    var selection = layers.get('content')
      .selectAll('.line')
      .data(data);

    selection.exit().remove();

    selection.enter()
      .append('path')
      .attr('class', 'line')
      .attr('id', function(d) {
        // Add a class for formatting each
        return "flat-" + String(d.year);
      })
      .attr("d", function(d) {
          return lineGen(d.values);
      });

    selection.attr("d", function(d) {
          return lineGen(d.values);
      });

    // X-Axis Label
    layers.get('x-axis')
      .select('.x')
      .attr("x", width / 2 * 1.1);

    // X-Axis Label
    layers.get('y-axis')
      .select('.y')
      .attr("x", height / 2 * -1);

  }, 10); // Debounce at 10 milliseconds

  // Line labels
  layers.get('content')
   .append("text")
    .attr("dy", "-3")
    .attr("class", "curve-text")
   .append("textPath")
    .attr("class", "flat-2016-label")
    .attr("xlink:href", "#flat-2016")
    .attr("startOffset", "45%")
    .text("Alberta 2016 (New Tax Brackets Starting at $125,000)");

  chart
    .autoResize(true)
    .autoResizeToAspectRatio(1.5)
    .on('resize', visualize)
    .on('data', visualize)
    .data(processedData);
    // .resizeToFitContainer('full')

  // For reference
  console.log(sheet);
  console.log(processedData);
};

}(window.flatTax = window.flatTax || {}));
