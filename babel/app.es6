import express from 'express';
let app = express();

class Animal {
  constructor(name) {
    this.name = name;
  }
  say() {
    console.log('Hello! My name is ' + this.name);
  }
}

var animal = new Animal('noboru');
animal.say();
