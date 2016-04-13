(function(incomeTaxRank, undefined){

var spreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1EFBsT2vTy_93-tnTHvjcYrZrw6ZqLb9Pfoi8M_FjQ4Y/pubhtml?gid=1013792991&single=true';

window.onload = function() { init(); };

function init() {
  Tabletop.init( { key: spreadsheetUrl,
                   callback: showInfo,
                   simpleSheet: true } );
}

function showInfo(data, tabletop) {
  console.log(data);
}

}(window.incomeTaxRank = window.incomeTaxRank || {}));
