var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelp = require('./http-helpers.js');
var fs = require('fs');


var serving = {
    'index.html': './public/index.html',
    'loading.html': './public/loading.html'
  };

var routes = {
  'POST': function(req, res) {
    var url = '';

    req.on('data', function(chunk){
      url += chunk;
    });

    req.on('error', function(e){
      res.writeHead(404, httpHelp.headers);
      res.end();
    });

    req.on('end', function(){
      url = url.slice(4);

      archive.isURLArchived(url, function(err, path){
        path = path || serving['loading.html'];
        httpHelp.serveAssets(res, path);
      });
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
  routes[req.method](req, res);
};
