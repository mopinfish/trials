(function () {
    var Person = Mopin.Class();
    Person.extend({
        sayClass: function () {
            return 'this is Person';
        }
    }).include({
        init: function (name) {
            this.name = name;
        },
        sayHello: function () {
            return 'My name is ' + this.name;
        }
    });
    var taro = new Person('taro');
    var Student = Mopin.Class(Person);
    Student.include({
        init: function () {
            this._super.init.apply(this, arguments);
        }
    });
    var jiro = new Student('jiro');
    console.log(jiro.sayHello());
}());
