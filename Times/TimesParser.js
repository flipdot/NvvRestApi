var cheerio = require('cheerio');

module.exports = function(html){
  var self = this;
  
  self.html = html;
  
  self.getTimes = function(){
    var $ = cheerio.load(self.html);
	
	var tableBody = $("#HFSResult > table");
	
	function getDeparture(rowId){
	  var rowStringId = "#trOverviewC0-"+rowId;
	  var planed = tableBody
	    .children(rowStringId)
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
	    departure: {
		  hour: hour,
		  minute: minute
		}
	  }
	}

	var departures = [];
	var i = 0;
	var current;
	while(current = getDeparture(i)){
	  departures.push(current);
	  i++;
	}
	
	return departures;
  };
}