describe('base test', function () {
    describe('classify', function () {
        var Person = Mopin.classify(function (name) {
            this.name = name;
        });
        var taro = new Person('taro');

        it('Class creates an Constructor', function () {
            var expect = 'function';
            var actual = typeof Person;
            assert.equal(expect, actual);
        });
        it('Constructor can make properties at first', function () {
            var expect = 'taro';
            var actual = taro.name;
            assert.equal(expect, actual);
        });
        it('extend method provides static method for Class', function () {
            Person.extend({
                staticMethod: function () {
                    return 'this is static method';
                }
            });
            var expect = 'this is static method';
            var actual = Person.staticMethod();
            assert.equal(expect, actual);
        });
        it('include method provides instance method for Instance', function () {
            Person.include({
                instanceMethod: function () {
                    return 'this is instance method';
                }
            });
            var expect = 'this is instance method';
            var actual = taro.instanceMethod();
            assert.equal(expect, actual);
        });

    });
    describe('Inherit', function () {
        var Person = Mopin.classify(function (name) {
            this.name = name;
        });
        Person.extend({
            getName: function () {
                return 'This is Person';
            }
        });
        Person.include({
            getName: function () {
                return this.name;
            }
        });
        var Student = Mopin.inherit(Person, function (name, id) {
            var args = Array.prototype.slice.call(arguments);
            Person.apply(this, args);
            this.id = id;
        });
        Student.extend({
            getName: function () {
                return 'This is Child Class';
            },
            uberGetName: function () {
                return this.callUber('getName');
            }
        });
        Student.include({
            getId: function () {
                return this.id;
            },
            say: function () {
                return this.callUber('getName') + ' ' + this.getId();
            }
        });
        var taro = new Person('taro');
        var jiro = new Student('jiro', 2924);

        it('if Inherits Parent Class, Child Class inherits Parent\'s properties and methods', function () {
            var expect = 'jiro';
            var actual = jiro.getName();
            assert.equal(expect, actual);

        });
        it('if same name method is given, extend method add new method for Class', function () {
            var expect = 'This is Child Class';
            var actual = Student.getName();
            assert.equal(expect, actual);
        });
        it('if new initialize method given, Child Class run new initialize method', function () {
            var expect = 2924;
            var actual = jiro.getId();
            assert.equal(expect, actual);
        });
        it('callUber() calls Parent static method', function () {
            var expect = 'This is Person';
            var actual = Student.uberGetName();
            assert.equal(expect, actual);
        });
        it('callUber() calls Parent instance method', function () {
            var expect = 'jiro 2924';
            var actual = jiro.say();
            assert.equal(expect, actual);
        });
    });
    describe('Def', function () {
        var Person = Mopin.classify(function (name) {
            this.name = name;
        });
        Person.extend({
            getName: function () {
                return 'This is Person';
            }
        });
        Person.include({
            getName: function () {
                return this.name;
            }
        });

        Mopin.define(function (name, id) {
            var args = Array.prototype.slice.call(arguments);
            this._uber && this._uber.apply(this, args);
            this.id = id;
        }).as('Mopin.module.Student').provides({
            say: function () {
                return this.getName + ' ' + this.getId();
            }
        }).inherit(Person).privates({
            getId: function () {
                return this.id;
            }
        });

        var goro = new Mopin.module.Student('goro', 2924);
console.log(goro);
console.log(goro.say());

        describe('def', function () {
        });
        describe('inherit', function () {
        });
        describe('release', function () {
        });
        describe('provides', function () {
        });
        describe('privates', function () {
/*
            var expected = 'goro 2924';
            var actual = goro.say();
            assert.equal(expect, actual);
*/
        });
    });
});


