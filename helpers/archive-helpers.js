var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../web/archives/sites'),
  'list' : path.join(__dirname, '../web/archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

exports.readListOfUrls = function(callback){
  fs.readFile(exports.paths['list'], 'utf8', function(err, data){
    if(err) throw err;

    data = data.split("\n");

    _.each(data, function(url){
      if(url.length > 0) callback(url);
    });

    var file = fs.openSync(exports.paths['list'], "w");
    fs.closeSync(file);
  });
};

exports.addUrlToArchive = function(url, html){
  fs.writeFile(exports.paths['archivedSites'] + '/' + url + '.html', html, function(e){
    if(e) console.log('file not written', e);
    else console.log('file was written');
  });
};

exports.addUrlToList = function(url){
  fs.appendFile(exports.paths['list'], url + '\n');
};


exports.isURLArchived = function(url, callback){

  fs.readdir(exports.paths['archivedSites'], function(err, files){
    _.each(files, function(element, index){

      if( url + '.html' === element ){
        callback(false, path.join(exports.paths['archivedSites'], element));
      }

    });
    callback('file does not exist');
    exports.addUrlToList(url);
  });
};

exports.downloadUrls = function(url, callback){
  http.get('http://' + url, function(res){
    var data = '';
    res.setEncoding('utf8');

    res.on('data', function(chunk){
      data += chunk;
    });

    res.on('error', function(e){
      console.log('error', e);
    });

    res.on('end', function(){
      callback(url, data);
    })
  });

};
