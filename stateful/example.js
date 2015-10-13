var Class = require('./base.js').Class;

var Animal = new Class;
Animal.fn.walk = function () { console.log('tokotoko'); };

var Human = new Class(Animal);
Human.fn.init = function (name) {
    this.name = name;
};
Human.fn.speak = function () { console.log('hello') };

var Worker = new Class(Human);
Worker.fn.work = function () { console.log('I am working'); };
Worker.fn.greet = function () { console.log('I am ' + this.name); };

otsukano = new Worker('Noboru');
otsukano.walk();
otsukano.speak();
otsukano.work();
otsukano.greet();
