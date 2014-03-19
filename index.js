var request = require('request');
var express = require('express');

var TimesRequest = require(__dirname+"/Times/TimesRequest.js");
var TimesParser = require(__dirname+"/Times/TimesParser.js");

var app = express();

app.get('/Times', function(req, res){
  
  var from = "Kassel Am Stern";
  var to = "Wolfhagen Bahnhof";

  var nvvReq = new TimesRequest(from, to, new Date()).createRequest();
  request.post('http://auskunft.nvv.de/nvv/bin/jp/query.exe/dn?L=vs_rmv.vs_nvv&', {form:nvvReq}, function(err, webRes, body){
    var timesParser = new TimesParser(body);
	var times = timesParser.getTimes();
	
	res.send({
	  from: from,
	  to: to,
	  times: times
	});
  });
});

app.listen(3000);

