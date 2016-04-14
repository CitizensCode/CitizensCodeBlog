(function(flatTax, undefined){

flatTax.visualize = function(sheet) {

  // Chart options
  var DEFAULT_OPTIONS = {
    margin: {top: 0, right: 0, bottom: 0, left: 0}
  };

  var chart = new d3Kit.Skeleton(
    '#flattax', DEFAULT_OPTIONS)
    .autoResize('both')
    .resizeToFitContainer('full');

  var layers = chart.getLayerOrganizer();
  layers.create(
    ['content',
     'x-axis',
     'y-axis']
   );

  var rect  = chart.getRootG()
    .append('rect')
    .style('fill', '#eee');

  var circle = chart.getRootG()
    .append('circle')
    .attr('fill', 'red');

  chart.on('resize', function() {
    var width = chart.getInnerWidth();
    var height = chart.getInnerHeight();

    rect.transition()
      .duration(1000)
      .attr('width', width)
      .attr('height', height);

    circle.transition()
      .duration(1000)
      .attr('cx', width / 2)
      .attr('cy', height / 2)
      .attr('r', 3/5/2 * chart.height());
  });

  var data = sheet.elements;
  console.log(data);
};

}(window.flatTax = window.flatTax || {}));
