var archive = require('../helpers/archive-helpers.js');
var http = require('http');
console.log('cronjobed');

var archiveUpdater = function(){
  archive.readListOfUrls(function(url){
    archive.downloadUrls(url, function(html){
      archive.addUrlToArchive(html);
    });
  });
}();
