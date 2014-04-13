module.exports = function TimesRequest(from, to, date){
  var self = this;
  
  self.from =from;
  self.to = to;
  self.date = date;
  
  self.createRequest = function(){
    return {
      REQ0JourneyStopsN: -1,
      REQ0JourneyStopsS0A: 255,
      REQ0JourneyStopsS0G: self.from,
      REQ0JourneyStopsZ0A: 255,
      REQ0JourneyStopsZ0G: self.to,
      REQ0JourneyDateDay: date.getDate(),
      REQ0JourneyDateMonth: date.getMonth()+1,
      REQ0JourneyDateYear: date.getFullYear(),
      REQ0JourneyTimeHour: date.getHours(),
      REQ0JourneyTimeMinutes: date.getMinutes(),
      start: 'Verbindung suchen'
	};
  }
};
