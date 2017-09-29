'use strict';

var DAYS_IN_YEAR = 360;
var HOURS_IN_DAY = 24;
var MINUTES_IN_HOUR = 60;
var SECONDS_IN_MINUTE = 60;
var SECONDS_IN_HOUR = MINUTES_IN_HOUR * SECONDS_IN_MINUTE;
var SECONDS_IN_DAY = HOURS_IN_DAY * SECONDS_IN_HOUR;
var SECONDS_IN_YEAR = DAYS_IN_YEAR * SECONDS_IN_DAY;
var weapon = {};

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function pickOne(list) {
        return list[getRandomInt(0,list.length)]
}

function makeATreasure() {
    var magicList = ['Quest Orb', 'Orb', 'Wand', 'Tome', 'Rod', 'Puppy Foot', 'Boots', 'Staff', 'Ring', 'Belt'];
    var magicOf = ['Wonder', 'Stroking', 'Smiting', 'Flying', 'Water Breathing', 'Smiling', 'Jumping', 'Running', 'Swimming', 'Pooping', 'Leaving', 'Flames', 'Ice', 'the Wind'];
    var magicAdj = ['Wonderful', 'Lucky', 'Glittey', 'Glowing', 'Exquisite', 'Glimmering', 'Shimmering', 'Humming', 'Other-worldly', 'Rainbow-infused'];
    var itemList = ['knapsack', 'stick', 'rock', 'walking stick', 'lump of coal', 'peppermill', 'pouch', 'marble'];
    var itemAdj = ['snotty', 'clean', 'dirty', 'muddy', 'new', 'used', 'unused', 'worn', 'old', 'ancient', 'vintage', 'antique'];
    var weaponAdj = itemAdj.concat(['blood encrusted', 'brain encrusted', 'bloody', 'bile coated']);
    var metalWeaponAdj = weaponAdj.concat(['rusty', 'corroded', 'polished', 'dull', 'dented', 'bent']);
    var bladeAdj = metalWeaponAdj.concat(['sharp', 'dull', 'serrated']);
    var bladeItemList = ['butter knife', 'knife', 'stilleto', 'dagger', 'dirk', 'shortsword', 'longsword', 'epee', 'saber', 'katana', 'broadsword', 'bastard sword', 'butterfly knife', 'rapier'];
    var weaponMaterial = ['bronze', 'iron', 'steel'];

    var pick = getRandomInt(0,3);
    if (pick == 0) return pickOne(bladeAdj) + ' ' + pickOne(bladeItemList)
        else if (pick == 1) return pickOne(magicAdj) + ' ' + pickOne(magicList) + ' of ' + pickOne(magicOf)
            else if (pick == 2) {
                var weapon = new Weapon(pickOne(bladeAdj), getRandomInt(0,9), pickOne(weaponMaterial), pickOne(bladeItemList), pickOne(magicOf));
                return weapon.describe();
            }
            else return pickOne(itemAdj) + ' ' + pickOne(itemList);
}

function Button(parent, id, text, active, action) {
    var myButton = document.createElement('button');
    myButton.innerHTML = text;
    myButton.id = id;
    myButton.type = 'button';

    document.getElementById(parent).appendChild(myButton);
    //document.getElementById(parent).appendChild(document.createElement('br'));

    if (active) {
        myButton.addEventListener('click', action);
    }
}

function Weapon(condition, quality, material, kind, modifier) {
    var magicList = ['Quest Orb', 'Orb', 'Wand', 'Tome', 'Rod', 'Puppy Foot', 'Boots', 'Staff', 'Ring', 'Belt'];
    var magicOf = ['Wonder', 'Stroking', 'Smiting', 'Flying', 'Water Breathing', 'Smiling', 'Jumping', 'Running', 'Swimming', 'Pooping', 'Leaving', 'Flames', 'Ice', 'the Wind'];
    var magicAdj = ['Wonderful', 'Lucky', 'Glittey', 'Glowing', 'Exquisite', 'Glimmering', 'Shimmering', 'Humming', 'Other-worldly', 'Rainbow-infused'];
    var itemList = ['knapsack', 'stick', 'rock', 'walking stick', 'lump of coal', 'peppermill', 'pouch', 'marble'];
    var itemAdj = ['snotty', 'clean', 'dirty', 'muddy', 'new', 'used', 'unused', 'worn', 'old', 'ancient', 'vintage', 'antique'];
    var weaponAdj = itemAdj.concat(['blood encrusted', 'brain encrusted', 'bloody', 'bile coated']);
    var metalWeaponAdj = weaponAdj.concat(['rusty', 'corroded', 'polished', 'dull', 'dented', 'bent']);
    var bladeAdj = metalWeaponAdj.concat(['sharp', 'dull', 'serrated']);
    var bladeItemList = ['butter knife', 'knife', 'stilleto', 'dagger', 'dirk', 'shortsword', 'longsword', 'epee', 'saber', 'katana', 'broadsword', 'bastard sword', 'butterfly knife', 'rapier'];
    var weaponMaterial = ['bronze', 'iron', 'steel'];

    if (condition===undefined) {
        this.condition = pickOne(bladeAdj);
        this.quality = pickOne(getRandomInt(0,9));
        this.material = pickOne(weaponMaterial);
        this.kind = pickOne(bladeItemList);
        this.modifier = pickOne(magicOf);
    }
    else {
        this.condition = condition;
        this.quality = quality;
        this.material = material;
        this.kind = kind;
        this.modifier = modifier;
    }
        switch (this.quality) {
            case 0:
                this.qualityAdj = 'junk';
                break;
            case 1:
                this.qualityAdj = 'crappy';
                break;
            case 2:
                this.qualityAdj = 'boring';
                break;
            default:
                this.qualityAdj = '';
                break;
            case 7:
                this.qualityAdj = 'quality';
                break;
            case 8:
                this.qualityAdj = 'excellent';
                break;
            case 9:
                this.qualityAdj = 'masterwork';
        }
}

Weapon.prototype.describe = function() {
    return this.condition + ', ' + this.qualityAdj + (this.qualityAdj == '' ? '' : ', ') + this.material + ' ' + this.kind + ' of ' + this.modifier;
}

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
    for (var i = this.eventList.length - 1; i >= 0; i--) {
        if (now >= this.eventList[i][1]) {
            this.eventList[i][2]();
            this.eventList.splice(i,1);
        }
    };
}

Timer.prototype.addEvent = function(name, ticks, call) {
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

function Player(vitals, gold, inventory, skills) {
    this.gold = gold;
    this.vitals = vitals;
    this.inventory = inventory;
    this.skills = skills;
}

Player.prototype.haveABirthday = function() {
    yourDiary.addEntry('Happy Birthday!');
    this.addXp(10);
    this.vitals.age += 1;
    timer.addEvent('Birthday', SECONDS_IN_YEAR, function() {you.haveABirthday();});
}

Player.prototype.isAlive = function() {
    return (this.vitals.health >= 0)
}

Player.prototype.adjHealth = function(amount){
    this.vitals.health += amount;
    if (this.vitals.health > this.vitals.healthMax) { this.vitals.health = this.vitals.healthMax; }
    if (!this.isAlive()) { this.death(); }
}

Player.prototype.addXp = function(amount) {
    this.skills.xp += amount;
}

Player.prototype.death = function() {
    document.getElementById('quest').innerHTML = 'Dead';
    yourDiary.addEntry('You are dead. ')
}

Player.prototype.nextLevel = function() {
    if (this.isAlive()) {
        var raise = Math.round(Math.log(this.skills.xp));
        this.vitals.healthMax += raise;
        this.adjHealth(this.vitals.healthMax);
        yourDiary.addEntry('Level UP! Max Health increases by ' + raise + ' and full heal!');
    }
}

function Container(contents) {
    this.contents = contents;
}

Container.prototype.show = function() {
    var hist = {};
    var result = '';
    var key = '';
    this.contents.forEach(function (a) {if (a in hist) hist[a] ++; else hist[a] = 1; } );
    for(key in hist) {
        result += '<br />' + (hist[key]==1?'a':hist[key]) + ' ' + key + ', ';
    }
    return result.slice(0,-2);
}

function Diary(contents) {
    this.contents = contents;
}

Diary.prototype.addEntry = function(text) {
    this.contents.unshift(text);
}

Diary.prototype.show = function() {
    var result = '';
    this.contents.forEach(function (a) { result += (a + '<br/>'); } )
    return result;
}

function Stat(id, prefix, suffix, valueFunction) {
    this.valueFunction = valueFunction;
    this.id = id;
    this.prefix = prefix;
    this.suffix = suffix;

    var mySpan = document.createElement("span");
    mySpan.id=id;
    mySpan.innerHTML = this.text;

    document.getElementById("top_left2").appendChild(mySpan);
}

Stat.prototype.toString = function() {
    return this.prefix + this.valueFunction() + this.suffix;
}

Stat.prototype.update = function() {
    document.getElementById(this.id).innerHTML = this.toString();
}

function clickQuest() {
    if (you.isAlive()) {
        var pay = Math.round(Math.log(you.skills.xp + 1) + 1);
        you.gold += pay;
        you.adjHealth(-10);
        you.addXp(1);
        you.job = false;
        var treasure = new Weapon().describe();
        you.inventory.unshift(treasure);
        yourDiary.addEntry('You complete your quest, finding ' + pay + ' gold nugs and the ' + treasure + '.');
        tickTock(SECONDS_IN_DAY);
    }
    else {
      yourDiary.addEntry('You are too dead to go on a quest.');
    }
}

function clickJob() {
    if (you.isAlive() && you.vitals.drunk < 1) {
            var pay = Math.round(Math.log(you.skills.working + 1) + 1);
            yourDiary.addEntry('You find some work and earn ' + pay + ' gold coins.');
            you.gold += pay;
            you.skills.working += 8;
            tickTock(8 * SECONDS_IN_HOUR);
    }
    else if (!you.isAlive()) {
      yourDiary.addEntry('You are too dead to go to work.');
    }
    else if (you.vitals.drunk >= 1) {
      yourDiary.addEntry('You are too drunk to work.');
    }
}

function clickDrink() {
    if (you.isAlive()) {
        if (you.gold >= 2) {
            you.gold -= 2;
            you.adjHealth(2);
            you.job = false;
            you.vitals.drunk += 4500;
            you.vitals.bladder += 12;
            yourDiary.addEntry('You buy and drink a beer!');
            document.getElementById('job').innerHTML = 'Drunk';
        }
    }
}

function clickCoffee() {
    if (you.isAlive()) {
        if (you.gold >= 1) {
            you.gold -= 1;
            yourDiary.addEntry('You drink some coffee. You feel pumped up!');
            you.vitals.caffeine += 100;
            you.vitals.bladder += 5;
            you.adjHealth(1);
        }
    }
}

function clickSleep() {
    if (you.isAlive()) {
        if (you.vitals.sleeping) {
            clickWake();
        }
        else {
            you.vitals.sleeping = true;
            document.getElementById('sleep').innerHTML = 'Wake up';
            yourDiary.addEntry('You go to sleep!');
            timer.addEvent('Wake', SECONDS_IN_HOUR * 8, function () { clickWake() });
        }
    }
}

function clickWake() {
    if (you.isAlive()) {
        if (you.vitals.sleeping) {
            you.vitals.sleeping = false;
            document.getElementById('sleep').innerHTML = 'Sleep';
            yourDiary.addEntry('You wake up refreshed');
        }
    }
}

function clickWield() {
    weapon = this;
    console.log(weapon);
}

function clickPiss() {
    you.vitals.bladder = 0;
}

function clickSave() {
    var save = {
        you : you,
        yourDiary : yourDiary,
        timer : timer,
        xpIncrement : xpIncrement
    }
    localStorage.setItem('save',JSON.stringify(save));
    console.log('game saved');
}

function clickLoad() {
    var savegame = JSON.parse(localStorage.getItem('save'));
    if (typeof savegame.you !== 'undefined') you = new Player(savegame.you.vitals, savegame.you.gold, savegame.you.inventory, savegame.you.skills);
    yourBag = new Container(you.inventory);
    xpIncrement = savegame.xpIncrement;
    if (typeof savegame.yourDiary !== 'undefined') yourDiary.contents =  savegame.yourDiary.contents; //new Diary(savegame.yourDiary.contents);
    if (typeof savegame.timer !== 'undefined') timer.ticks = savegame.timer.ticks;
    if (you.vitals.drunk <= 1)
        { document.getElementById('job').innerHTML = 'Day Labor'; }
    else
        { document.getElementById('job').innerHTML = 'Drunk'; }
    if (you.isAlive())
        { document.getElementById('quest').innerHTML = 'Quest'; }
    else
        { document.getElementById('quest').innerHTML = 'Dead'; }
}

function autoSave() {
    clickSave();
    timer.addEvent('Save', SECONDS_IN_DAY * 7, function () { autoSave(); });
}
var you = new Player({healthMax: 60, health: 60, bladder: 0, age: 18, caffeine: 0, drunk: 0, sleeping: false}, 0, ['rags', 'stick', 'rock'], {working: 0, xp: 0});
var xpIncrement = 10;
var yourDiary = new Diary(['You are alive. ']);
var timer = new Timer(0, 666, []);

timer.addEvent('Save', SECONDS_IN_DAY * 7, function () { autoSave(); });
timer.addEvent('Birthday', getRandomInt(0,DAYS_IN_YEAR) * SECONDS_IN_DAY, function() { you.haveABirthday(); });

new Button('top_middle', 'quest', 'Go on a Quest', true, clickQuest);
new Button('top_middle', 'job', 'Get a Job', true, clickJob);
new Button('top_middle', 'sleep', 'Sleep', true, clickSleep);
new Button('top_middle', 'drink', 'Buy beer', true, clickDrink);
new Button('top_middle', 'coffee', 'Buy coffee', true, clickCoffee);
new Button('top_middle', 'urinate', 'Urinate', true, clickPiss);

new Button('top_left1', 'save', 'Save', true, clickSave);
new Button('top_left1', 'load', 'Load', true, clickLoad);
new Button('top_left2', 'speed_slow', 'Slow', true, function () { timer.speed = 1; });
new Button('top_left2', 'speed_medium', 'Medium', true, function () { timer.speed = SECONDS_IN_MINUTE; });
new Button('top_left2', 'speed_fast', 'Fast', true, function () { timer.speed = SECONDS_IN_HOUR; });

var stats = [];
stats.unshift(new Stat('time', '<br/>Time: ', ' on ', function() {return timer.showTime(); } ));
stats.unshift(new Stat('date', 'Date: ', '<br/>', function() { return timer.showDate(); } ));
stats.unshift(new Stat('bladder', '<br/>Bladder: ', '% full<br/>', function() { return you.vitals.bladder; } ));
stats.unshift(new Stat('health', 'Health: ', '/', function() { return you.vitals.health.toFixed(1); } ));
stats.unshift(new Stat('healthMax', '', '<br/>', function() { return you.vitals.healthMax; } ));
stats.unshift(new Stat('caffeine', 'Caffeine: ', ' mg<br/>', function() { return you.vitals.caffeine.toFixed(1) ; } ));
stats.unshift(new Stat('skillWork', 'Work Skill: ', '<br/>', function () { return you.skills.working.toFixed(1); } ));
stats.unshift(new Stat('gold', 'Gold: ', '<br/>', function () { return you.gold.toFixed(0); } ));
stats.unshift(new Stat('xp', 'XP: ', '<br/>', function() { return you.skills.xp; } ));
stats.unshift(new Stat('age', 'Age: ', '<br/>', function() { return you.vitals.age; }));
stats.unshift(new Stat('weapon', 'Weapon: ', '<br/>', function() { } ));

var yourBag = new Container(you.inventory);

function tickTock(number) {
    timer.passes(number);
    if (you.isAlive()) {
        if (you.vitals.sleeping) {
            you.adjHealth(8*number/(SECONDS_IN_DAY));
        }
        else {
            you.adjHealth(4*number/(SECONDS_IN_DAY));
        }
        if (you.vitals.caffeine >= 0.1) {
            you.vitals.caffeine = you.vitals.caffeine * Math.pow(0.5, (number/(5*SECONDS_IN_HOUR)));
        }
        else {
            you.vitals.caffeine = 0;
        }
        if (you.skills.xp > xpIncrement) {
            you.nextLevel();
            xpIncrement *= 2;
        }
        if (you.vitals.drunk <= 1) {
            document.getElementById('job').innerHTML = 'Day Labor';
        }
        if (you.vitals.drunk > 0) {
            you.vitals.drunk -= number;
            if (you.vitals.drunk < 0) you.vitals.drunk = 0;
        }
        if (you.vitals.bladder >= 100) {
            yourDiary.addEntry('You pee your pants.');
            you.vitals.bladder = 0;
        }
    }

    document.getElementById('inventory').innerHTML = yourBag.show();
    document.getElementById('diary').innerHTML = yourDiary.show();
    stats.forEach(function (a) {a.update();});
}

window.setInterval(function () {
    tickTock(timer.speed);
}, 500);
