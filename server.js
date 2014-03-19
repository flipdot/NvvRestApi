var request = require('request');
var express = require('express');

var TimesRequest = require(__dirname+"/TripInfo/TripInfoRequest.js");
var TimesParser = require(__dirname+"/TripInfo/TripInfoParser.js");

var app = express();

app.get('/Trips', function(req, res){
  
  var startString = req.query.start;
  if(!startString) startString = new Date().valueOf();
  
  var startsInt = parseInt(startString);
  
  var from = req.query.from;
  var to = req.query.to;
  
  if(isNaN(startsInt) || !from || !to) {
    res.send({error: "Invalid parameters!"});
	return;
  }
  
  var start = new Date(startsInt);
  
  var nvvReq = new TimesRequest(from, to, start).createRequest();
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

