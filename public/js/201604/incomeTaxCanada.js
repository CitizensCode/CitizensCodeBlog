(function(incomeTaxCanada, undefined){

/* To get jshint off my case */
/* globals ranking: true, flatTax: true */

// The configuration for the Kodoma tooltips
var ccTheme =
{
  frame: {
    'padding': '4px',
    'background': 'rgba(103, 103, 103, 1)',
    'font-family': '"Anonymous Pro", Arial, sans-serif',
    'border': 'none',
    'color': 'white',
    'border-radius': '4px',
    'font-size': '15px',
    'box-shadow': 'none'
  },
  title: {
    'font-size': '20px',
    'text-align': 'center',
    'font-weight': 'bold',
    'padding': '4px'
  },
  itemTitle: {
    'text-align': 'right',
    'color': 'rgb(220,200,120)'
  },
  itemValue: {
    'padding': '1px 2px 1px 10px',
    'color': 'rgb(234, 224, 184)'},
  options: null
};
d3.kodama.themeRegistry('ccTheme', ccTheme);

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
