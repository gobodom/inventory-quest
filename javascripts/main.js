'use strict';

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

function Button(parent, id, text, active, action, activeCondition) {
    this.myButton = document.createElement('button');
    this.myButton.innerHTML = text;
    this.myButton.id = id;
    this.myButton.type = 'button';
    this.parent = parent;
    this.activeCondition = activeCondition;

    document.getElementById(parent).appendChild(this.myButton);
    //document.getElementById(parent).appendChild(document.createElement('br'));

    if (active) {
        this.myButton.addEventListener('click', action);
    }
}

Button.prototype.deactivate = function() {
    document.getElementById(this.myButton.id).disabled = true;
}

Button.prototype.activate = function() {
    document.getElementById(this.myButton.id).disabled = false;
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

function Player(vitals, gold, skills) {
    this.gold = gold;
    this.vitals = vitals;
    this.skills = skills;
}

Player.prototype.haveABirthday = function() {
    yourDiary.addEntry('Happy Birthday!');
    this.addXp(10);
    this.vitals.age += 1;
    timer.addEvent('Birthday', SECONDS_IN_YEAR, function() {you.haveABirthday();});
}

Player.prototype.isAlive = function() {
    return (you.vitals.health >= 0);
}

Player.prototype.isAwake = function() {
    return (you.vitals.cognizance === 'awake');
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
    you.vitals.cognizance = 'dead';
    you.checkBladder();
    yourDiary.addEntry('You have died. Refresh page to start over, or press load to load from last save.')
    questButton.deactivate();
}

Player.prototype.nextLevel = function() {
    if (this.isAlive()) {
        var raise = Math.round(Math.log(this.skills.xp));
        this.vitals.healthMax += raise;
        this.adjHealth(this.vitals.healthMax);
        yourDiary.addEntry('Level UP! Max Health increases by ' + raise + ' and full heal!');
    }
}

Player.prototype.piss = function() {
    if (you.vitals.bladder > 0) {
        you.vitals.bladder = 0;
        if (you.isAlive()) {
            if (you.isAwake()) yourDiary.addEntry('You take a piss.')
            else yourDiary.addEntry('You wet the bed.');
        }
    }
    else yourDiary.addEntry('You don\'t need to go right now.')
}

Player.prototype.sleep = function () {
    if (you.isAlive()) {
        if (you.vitals.cognizance === 'asleep') {
            you.wakeUp();
        }
        else {
            you.vitals.cognizance = 'asleep';
            document.getElementById('sleep').innerHTML = 'Wake up';
            questButton.deactivate();
            yourDiary.addEntry('You go to sleep!');
            timer.addEvent('Wake', SECONDS_IN_HOUR * 8, function () { you.wakeUp() });
        }
    }
}

Player.prototype.wakeUp = function () {
    if (you.isAlive()) {
        if (you.vitals.cognizance === 'asleep') {
            you.vitals.cognizance = 'awake';
            document.getElementById('sleep').innerHTML = 'Sleep';
            questButton.activate();
            yourDiary.addEntry('You wake up refreshed');
        }
    }
}

Player.prototype.checkBladder = function() {
    var awake = you.vitals.cognizance === 'awake';
    var asleep = you.vitals.cognizance === 'asleep';
    var dead = you.vitals.cognizance === 'dead';
    var drunk = you.vitals.drunk > 4500;
    if (awake && !drunk && you.vitals.bladder > 100) {
        yourDiary.addEntry('You wet your pants.');
        you.vitals.bladder = 0;
    }
    else if (awake && drunk && you.vitals.bladder > 90) {
        yourDiary.addEntry('You drunkenly piss yourself.');
        you.vitals.bladder = 0;
    }
    else if (asleep && !drunk && you.vitals.bladder > 95) {
        yourDiary.addEntry('You wake up wetting the bed.');
        you.vitals.bladder = 0;
        you.wakeUp();
    }
    else if (asleep && drunk && you.vitals.bladder > 85) {
        yourDiary.addEntry('You piss the bed while passed out drunk.');
        you.vitals.bladder = 0;
    }
    else if (dead) {
        yourDiary.addEntry('You void your loins, as the dead are wont to do.');
        you.vitals.bladder = 0;
    }
}

Player.prototype.checkSelf = function(number) {
    if (you.isAlive()) {
        if (you.vitals.cognizance === 'asleep') {
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
        you.checkBladder();
    }
}

function Container(contents) {
    this.contents = contents;
}

Container.prototype.deposit = function(item) {
    this.contents.unshift(item);
}

Container.prototype.show = function() {
    var hist = {};
    var result = '';
    var key = '';
    this.contents.forEach(function (a) {if (a.describe() in hist) hist[a] ++; else hist[a.describe()] = 1; } );
    for(key in hist) {
        result += '<div id=\'' + key + hist[key] + '\'>' + (hist[key]==1?'a':hist[key]) + ' ' + key + '</div>';
    }
    return result;
}

Container.prototype.list = function() {
    var result = [];
    this.contents.forEach(function (a) {result.unshift(a.describe())} )
    return result;
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
    if (you.vitals.cognizance === 'awake') {
        var pay = Math.round(Math.log(you.skills.xp + 1) + 1);
        you.gold += pay;
        you.adjHealth(-10);
        you.addXp(1);
        you.job = false;
        if (you.isAlive()) {
            var treasure = new Weapon();
            yourBag.deposit(treasure);
            yourDiary.addEntry('You complete your quest, finding ' + pay + ' gold nugs and the ' + treasure.describe() + '.');
        }
        tickTock(SECONDS_IN_DAY);
    }
    else if (you.vitals.cognizance === 'asleep') {
        yourDiary.addEntry('You are sleeping.')
    }
    else if (you.vitals.cognizance === 'dead') {
        yourDiary.addEntry('You are too dead to go on a quest.');
    }
}

function clickJob() {
    if (you.vitals.cognizance === 'awake' && you.vitals.drunk < 1) {
            var pay = Math.round(Math.log(you.skills.working + 1) + 1);
            yourDiary.addEntry('You find some work and earn ' + pay + ' gold coins.');
            you.gold += pay;
            you.skills.working += 8;
            tickTock(8 * SECONDS_IN_HOUR);
    }
    else if (you.vitals.cognizance === 'dead') {
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

function clickSave() {
    var save = {
        you : you,
        yourDiary : yourDiary,
        timer : timer,
        xpIncrement : xpIncrement,
        yourBag : yourBag.list()
    }
    localStorage.setItem('save',JSON.stringify(save));
    console.log('game saved');
}

function clickLoad() {
    var savegame = JSON.parse(localStorage.getItem('save'));
    if (typeof savegame.you !== 'undefined') you = new Player(savegame.you.vitals, savegame.you.gold, savegame.you.skills);
    if (typeof savegame.yourBag !== 'undefined') {
        yourBag = new Container([]);
        var each = '';
        for (each in savegame.yourBag) {
            yourBag.deposit(new Weapon(each.condition, each.quality, each.material, each.kind, each.modifier));
        }
    }
    if (typeof savegame.xpIncrement !== 'undefined') xpIncrement = savegame.xpIncrement;
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
    //auto-save once a week game-time, until dead
    if (you.isAlive()) {
        clickSave();
        timer.addEvent('Save', SECONDS_IN_DAY * 7, function () { autoSave(); });
    }
}

var you = new Player({healthMax: 60, health: 60, bladder: 0, age: 18, caffeine: 0, drunk: 0, cognizance: 'awake'}, 0, {working: 0, xp: 0});
var xpIncrement = 10;
var yourDiary = new Diary(['You are alive. ']);
var timer = new Timer(0, 666, []);

timer.addEvent('Save', SECONDS_IN_DAY * 7, function () { autoSave(); });
timer.addEvent('Birthday', getRandomInt(0, DAYS_IN_YEAR) * SECONDS_IN_DAY, function() { you.haveABirthday(); });

var buttons = [];
buttons.unshift(new Button('top_middle', 'quest', 'Go on a Quest', true, clickQuest, you.isAwake));
buttons.unshift(new Button('top_middle', 'job', 'Get a Job', true, clickJob, you.isAwake));
buttons.unshift(new Button('top_middle', 'sleep', 'Sleep', true, you.sleep, you.isAlive));
buttons.unshift(new Button('top_middle', 'drink', 'Buy beer', true, clickDrink, you.isAwake));
buttons.unshift(new Button('top_middle', 'coffee', 'Buy coffee', true, clickCoffee, you.isAwake));
buttons.unshift(new Button('top_middle', 'urinate', 'Urinate', true, you.piss, you.isAlive));
var questButton = buttons[0];
var pissButton = buttons[5];

buttons.unshift(new Button('top_left1', 'save', 'Save', true, clickSave, you.isAlive));
buttons.unshift(new Button('top_left1', 'load', 'Load', true, clickLoad, function() {return true; } ));
buttons.unshift(new Button('top_left2', 'speed_slow', 'Slow', true, function () { timer.speed = 1; }, function() {return true; } ));
buttons.unshift(new Button('top_left2', 'speed_medium', 'Medium', true, function () { timer.speed = SECONDS_IN_MINUTE; }, function () {return true;} ));
buttons.unshift(new Button('top_left2', 'speed_fast', 'Fast', true, function () { timer.speed = SECONDS_IN_HOUR; }, function () {return true;} ));

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

var yourBag = new Container([]);

function tickTock(number) {
    timer.passes(number);
    you.checkSelf(number);

    document.getElementById('inventory').innerHTML = yourBag.show();
    document.getElementById('diary').innerHTML = yourDiary.show();
    stats.forEach(function (a) {a.update();});
    buttons.forEach(function (a) {if (a.activeCondition()) a.activate(); else a.deactivate();})
}

window.setInterval(function () {
    tickTock(timer.speed);
}, 500);
