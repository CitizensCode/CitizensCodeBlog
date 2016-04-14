(function(incomeTaxCanada, undefined){

/* To get jshint off my case */
/* globals ranking: true, flatTax: true */

var spreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1EFBsT2vTy_93-tnTHvjcYrZrw6ZqLb9Pfoi8M_FjQ4Y/pubhtml';

// This takes each set of data and passes it to the appropriate functions to be visualized
var visualizeData = function(data, tabletop) {
  // See ranking.js
  ranking.visualize(tabletop.sheets("Ranking"));
  // See flattax.js
  flatTax.visualize(tabletop.sheets("FlatTax"));
};

var init = function() {
  Tabletop.init( { key: spreadsheetUrl,
                   callback: visualizeData,
  // Grab the spreadsheet sheets we want
                   wanted: [
                     "Ranking",
                     "FlatTax"],
                   parseNumbers: true,
                   prettyColumnNames: false
                 } );
};

$(document).ready(function() {
  init();
});

}(window.incomeTaxCanada = window.incomeTaxCanada || {}));
