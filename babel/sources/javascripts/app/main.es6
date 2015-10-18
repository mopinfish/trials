class Person {
  constructor(name) {
    this.name = name;
  }
  say() {
    console.log('hello! ' + this.name);
  }
}

var taro = new Person('taro');
taro.say();
