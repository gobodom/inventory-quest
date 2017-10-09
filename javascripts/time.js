var DAYS_IN_YEAR = 360;
var HOURS_IN_DAY = 24;
var MINUTES_IN_HOUR = 60;
var SECONDS_IN_MINUTE = 60;
var SECONDS_IN_HOUR = MINUTES_IN_HOUR * SECONDS_IN_MINUTE;
var SECONDS_IN_DAY = HOURS_IN_DAY * SECONDS_IN_HOUR;
var SECONDS_IN_YEAR = DAYS_IN_YEAR * SECONDS_IN_DAY;

function Timer(ticks, startYear, eventList) {
    this.ticks = ticks;
    this.startYear = startYear;
    this.eventList = eventList;
    this.speed = 1;
}

Timer.prototype.year = function() {
    return Math.floor(this.ticks / SECONDS_IN_YEAR ) + this.startYear;
}

Timer.prototype.day = function() {
    return Math.floor(this.ticks / SECONDS_IN_DAY) % DAYS_IN_YEAR + 1;
}

Timer.prototype.hour = function() {
    return (this.ticks / SECONDS_IN_HOUR).toFixed() % HOURS_IN_DAY;
}

Timer.prototype.minute = function() {
    return (this.ticks / SECONDS_IN_MINUTE).toFixed() % MINUTES_IN_HOUR;
}

Timer.prototype.second = function() {
    return (this.ticks % SECONDS_IN_MINUTE);
}

Timer.prototype.passes = function(amount) {
    this.ticks += amount;
    var now = this.ticks;
    //check if any scheduled events occur during the passage of time
    for (var i = this.eventList.length - 1; i >= 0; i--) {
        if (now >= this.eventList[i][1]) {
            this.eventList[i][2]();
            this.eventList.splice(i,1);
        }
    };
}

Timer.prototype.addEvent = function(name, ticks, call) {
    //schedule the event function [call] to occur in [ticks] ticks.
    this.eventList.push([name, this.ticks+ticks, call]);
}

Timer.prototype.showTime = function() {
    function pad(num) {
        return ("0"+num).slice(-2);
    }
    return pad(this.hour()) + ':' + pad(this.minute()) + '.' + pad(this.second());
}

Timer.prototype.showDate = function() {
    return 'Day ' + this.day() + ' of Year ' + this.year();
}
