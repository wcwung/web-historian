var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelp = require('./http-helpers.js');
var fs = require('fs');
// require more modules/folders here!

var serving = {
    'index.html': './public/index.html',
    'loading.html': './public/loading.html'
  };

var restful = {
  'POST': function(req, res) {
    var url = '';
    req.on('data', function(chunk){
      url += chunk;
      // Check archive and pass a call back to it.
        // Serve the data it returns from the callback
      // httpHelp.serveAssets(res, serving['loading.html'] /*, callback*/);
    });
    req.on('error', function(e){
      console.log('there was an error:', e.message);
      res.writeHead(404, httpHelp.headers);
      res.end();
    });
    req.on('end', function(){
      url = url.slice(4);
      // res.writeHead(200, httpHelp.headers);
      // res.end();
    });
  },
  'GET': function(req, res) {
    httpHelp.serveAssets(res, serving['index.html'] /*, callback*/);
  },
  'OPTIONS': function(req, res) {
    res.writeHead(200, httpHelp.headers);
    res.end();
  }
}

exports.handleRequest = function (req, res) {
  console.log("Current request method:", req.method);
  restful[req.method](req, res);

};
