var cheerio = require('cheerio');

module.exports = function(html){
  var self = this;
  
  self.html = html;
  
  self.getTimes = function(){
    var $ = cheerio.load(self.html);
	
	var tableBody = $("#HFSResult > table");
	
	function getDeparture(row) {
	  var planed = row
		.children(".time")
		.children("div")
		.children(".planed");
	  var planedString = planed.text();
	  var departureRegex = /(\d{2}):(\d{2}) ab/;
	  var match = departureRegex.exec(planedString);
	  
	  if(!match){
	    return;
	  }
	  
	  var hour = parseInt(match[1]);
	  var minute = parseInt(match[2]);
	  
	  return {
		hour: hour,
		minute: minute
	  }
	}
	
	function getTripInfo(rowId){
	  var rowStringId = "#trOverviewC0-"+rowId;
	  var row = tableBody.children(rowStringId);
	  
	  var departure = getDeparture(row);
	  if(!departure) {
	    return;
	  }
	  
	  return {
	    departure: departure
	  }
	}

	var trips = [];
	var i = 0;
	var current;
	while(current = getTripInfo(i)){
	  trips.push(current);
	  i++;
	}
	
	return trips;
  };
}