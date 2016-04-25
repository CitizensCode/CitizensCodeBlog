(function(d3help, undefined){

  d3help.sheetToObj = function(rawData, keyName, filterData) {
    // Get the unique list of keys
    var keys = _.uniq(
      _.map(rawData, function(each) {
        return each[keyName];
      })
    );

    // Initialize an array of objects, where each object has a key and an unpopulated value
    var processedData = _.map(keys, function(value) {
      var obj = {};
      obj[keyName] = value;
      obj.values = null;
      return obj;
    });

    _.map(processedData, function(obj) {
      // Filter the raw data to get data only belonging to the object key. Assign an array of those objects to the values key.
      var name = obj.province;
      var whereSearch = {};
      whereSearch[keyName] = name;
      obj.values = _.where(
        rawData, whereSearch
      );
      // Get rid of any values over 500000 since that's as far as the chart needs to go
      obj.values = _.filter(obj.values,
        function(data) {
          return data[filterData.key] <= filterData.value;
        });
      // Values contains an array of objects. Each object contains the value for a point (these were already assigned to
      // them during the data loading process), plus a reference back to the parent object. This is for the voronoi-based legend.
      obj.values = obj.values.map(function(value) {
        value[keyName] = obj;
        return value;
      });
      return obj;
    });

    return processedData;
  };

}(window.d3help = window.d3help || {}));
