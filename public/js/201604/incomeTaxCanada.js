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
var rankingCb = function(data, tabletop) {
  // See ranking.js
  ranking.visualize(tabletop.sheets("Ranking"));
};
var flatTaxCb = function(data, tabletop) {
  // See flattax.js
  flatTax.visualize(tabletop.sheets("FlatTax"));
};
var bracketCreepCb = function(data, tabletop) {
  // See bracketCreep.js
  bracketCreep.visualize(tabletop.sheets("BracketCreep"));
};
var hiddenTaxesCb = function(data, tabletop) {
  // See hiddenTaxes.js
  hiddenTaxes.visualize(tabletop.sheets("HiddenTaxes"));
};
var taxDiffCb = function(data, tabletop) {
  // See taxDiff.js
  taxDiff.visualize(tabletop.sheets("TaxDiff"));
};

var init = function() {
  Tabletop.init( { key: spreadsheetUrl,
                   callback: rankingCb,
                   wanted: [
                    "Ranking"],
                   parseNumbers: true,
                   prettyColumnNames: false
                 } );
  Tabletop.init( { key: spreadsheetUrl,
                   callback: flatTaxCb,
                   wanted: [
                    "FlatTax"],
                   parseNumbers: true,
                   prettyColumnNames: false
                 } );
  Tabletop.init( { key: spreadsheetUrl,
                   callback: bracketCreepCb,
                   wanted: [
                    "BracketCreep"],
                   parseNumbers: true,
                   prettyColumnNames: false
                 } );
  Tabletop.init( { key: spreadsheetUrl,
                   callback: hiddenTaxesCb,
                   wanted: [
                    "HiddenTaxes"],
                   parseNumbers: true,
                   prettyColumnNames: false
                 } );
  Tabletop.init( { key: spreadsheetUrl,
                   callback: taxDiffCb,
                   wanted: [
                    "TaxDiff"],
                   parseNumbers: true,
                   prettyColumnNames: false
                 } );
};

$(init());

}(window.incomeTaxCanada = window.incomeTaxCanada || {}));
