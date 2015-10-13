var Class = require('./base.js').Class;

var Animal = new Class;
Animal.fn.walk = function () { console.log('tokotoko'); };

var Human = new Class(Animal);
Human.fn.init = function (name) {
    this.name = name;
};
Human.fn.speak = function () { console.log('hello') };

var Worker = new Class(Human);
Worker.fn.init = function (name, age) {
    Worker._super.init.apply(this, arguments);
    this.age = age;
};
Worker.fn.work = function () { console.log('I am working'); };
Worker.fn.greet = function () { console.log('I am ' + this.name + 'My age is ' + this.age); };

otsukano = new Worker('Noboru', 32);
otsukano.walk();
otsukano.speak();
otsukano.work();
otsukano.greet();

console.log(Worker.prototype.__proto__);
