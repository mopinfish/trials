module.exports = {
  default: {
    list: ["babel", "browserify", "watch"]
  },
  watch: {
    './app.es6': ['babel']
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
