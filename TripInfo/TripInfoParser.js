var cheerio = require('cheerio');

module.exports = function (html) {
  var self = this;

  self.html = html;

  var $ = cheerio.load(self.html);

  self.getFrom = function() {
    return $('#HFS_from').attr('value');
  };

  self.getTo = function() {
    return $('#HFS_to').attr('value');
  };

  self.getTimes = function () {


    var tableBody = $("#HFSResult > table");

    function getDeparture(row) {
      var planed = row
        .children(".time")
        .children("div")
        .children(".planed");
      var planedString = planed.text();
      var departureRegex = /(\d{2}):(\d{2}) ab/;
      var match = departureRegex.exec(planedString);

      if (!match) {
        return;
      }

      var hour = parseInt(match[1]);
      var minute = parseInt(match[2]);

      return {
        hour: hour,
        minute: minute
      }
    }

    function getLines(row) {
      var linesImageElements = row.children(".products");

      var i = 0;
      var current;
      var lineNames = [];
      while (current = linesImageElements.children(i)) {
        var lineName = current.attr("alt");
        if (!lineName) break;
        lineNames.push(lineName);
        i++;
      }

      return lineNames;
    }

    function getDuration(row) {
      debugger;
      var durationElm = row.children(".duration");
      var durationText = durationElm.text();

      var durationRegex = /(\d{1,2}):(\d{2})/;
      var match = durationRegex.exec(durationText);

      if (!match) {
        return;
      }

      var hours = match[1];
      var minutes = match[2];

      return {
        hours: hours,
        minutes: minutes
      }
    }

    function getSwitchingCount(row) {
      var changesElm = row.children(".changes");
      var changesText = changesElm.text();
      return parseInt(changesText);
    }

    function getTripInfo(rowId) {
      var rowStringId = "#trOverviewC0-" + rowId;
      var row = tableBody.children(rowStringId);

      var departure = getDeparture(row);
      var lines = getLines(row);
      var duration = getDuration(row);
      var switchingCount = getSwitchingCount(row);

      if (!departure || !lines || !duration || switchingCount < 0) {
        return;
      }

      return {
        departure: departure,
        lines: lines,
        duration: duration,
        switchingCount: switchingCount
      }
    }

    var trips = [];
    var i = 0;
    var current;
    while (current = getTripInfo(i)) {
      trips.push(current);
      i++;
    }

    return trips;
  };
};