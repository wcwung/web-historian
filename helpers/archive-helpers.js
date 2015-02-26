var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

// Web Server & Background Worker
exports.readListOfUrls = function(){

};

// Web Server
exports.isUrlInList = function(){
};

// Web Server
exports.addUrlToList = function(url){
  fs.appendFile(exports.paths['list'], url + '\n');
};


// Web Server
exports.isURLArchived = function(url, callback){

  //Search archive directory for url
  fs.readdir(exports.paths['archivedSites'], function(err, files){
    _.each(files, function(element){

      if( url === element ){
        callback(false, path.join(exports.paths['archivedSites'], element));
      }

    });
    callback('file does not exist');
    exports.addUrlToList(url);
  });
};

// Worker
exports.downloadUrls = function(){
};
