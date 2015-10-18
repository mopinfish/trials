module.exports = {
  default: {
    list: ["babel", "browserify", "watch"]
  },
  watch: {
    './app.es6': ['babel'],
    "./routes/**/*.es6": ["babel"],
    "./models/**/*.es6": ["babel"],
    "./sources/javascripts/**/*.es6": ["browserify"]
  },
  browserify: {
    dest: "./public/javascripts/",
    options: {
      entries: "./sources/javascripts/app/main.js",
      debug: true
    },
    watchPath: "./sources/**/*.js"
  },
  babel: {
    src: './**/*.es6',
    dest: './'
  }
};
