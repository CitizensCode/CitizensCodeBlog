(function(incomeTaxCanada, undefined){

/* To get jshint off my case */
/* globals ranking: true, flatTax: true, allAdjusted: true, bracketCreep: true, hiddenTaxes: true, taxDiff: true */

incomeTaxCanada.provinceLookup = {
  "Alberta": "ab",
  "British Columbia": "bc",
  "Manitoba": "mb",
  "New Brunswick": "nb",
  "Newfoundland and Labrador": "nl",
  "Northwest Territories": "nt",
  "Nova Scotia": "ns",
  "Nunavut": "nu",
  "Ontario": "on",
  "Prince Edward Island": "pe",
  "Quebec": "qc",
  "Saskatchewan": "sk",
  "Yukon": "yt"
};

var spreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1EFBsT2vTy_93-tnTHvjcYrZrw6ZqLb9Pfoi8M_FjQ4Y/pubhtml';

// This takes each set of data and passes it to the appropriate functions to be visualized
var visualizeData = function(data, tabletop) {
  // See ranking.js
  ranking.visualize(tabletop.sheets("Ranking"));
  // See flattax.js
  flatTax.visualize(tabletop.sheets("FlatTax"));
  // See bracketCreep.js
  bracketCreep.visualize(tabletop.sheets("BracketCreep"));
  // See hiddenTaxes.js
  hiddenTaxes.visualize(tabletop.sheets("HiddenTaxes"));
  // See hiddenTaxes.js
  taxDiff.visualize(tabletop.sheets("TaxDiff"));
};

var init = function() {
  Tabletop.init( { key: spreadsheetUrl,
                   callback: visualizeData,
  // Grab the spreadsheet sheets we want
                   wanted: [
                    "Ranking",
                    "FlatTax",
                    "BracketCreep",
                    "HiddenTaxes",
                    "TaxDiff"],
                   parseNumbers: true,
                   prettyColumnNames: false
                 } );
};

$(init());

}(window.incomeTaxCanada = window.incomeTaxCanada || {}));
