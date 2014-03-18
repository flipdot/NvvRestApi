var request = require('request');
var express = require('express');

var TimesRequest = require(__dirname+"/Times/TimesRequest.js");

var app = express();

app.get('/Times', function(req, res){
  var nvvReq = new TimesRequest("Kassel Am Stern", "Wolfhagen Bahnhof", new Date()).createRequest();
  request.post('http://auskunft.nvv.de/nvv/bin/jp/query.exe/dn?L=vs_rmv.vs_nvv&', {form:nvvReq}, function(err, webRes, body){
    res.send(body);
  });
});

app.listen(3000);

