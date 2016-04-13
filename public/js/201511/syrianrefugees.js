var airportData = [
    {key: "2014 Daily Arriving International Travellers",
     values: [
     {
        "label": "Montreal",
        "value": 14062
     },
     {
        "label": "Toronto",
        "value": 34270
     }
     ]},
     {key: "Additional Syrian Refugees",
     values: [
     {
        "label": "Montreal",
        "value": 900
     },
     {
        "label": "Toronto",
        "value": 900
     }
     ]}
];

var chart;
nv.addGraph(function(){
    chart = nv.models.multiBarHorizontalChart()
            .x(function(d) { return d.label; })
            .y(function(d) { return d.value; })
            .barColor(d3.scale.category10().range())
            .duration(250)
            .stacked(true)
            .showControls(false)
            .showValues(true)
            .forceY([0, 35500]);
    chart.yAxis.tickFormat(d3.format(',d'));
    chart.yAxis.axisLabel('Average Number of International Passengers Processed Per Day');

    d3.select('#chart1 svg')
        .datum(airportData)
        .call(chart);

    nv.utils.windowResize(chart.update);

    return chart;
});
