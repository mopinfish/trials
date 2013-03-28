(function (name, module, definition) {
    module[name] = definition();
})('hogehoe', globalModule, function () {
    var Klass = function () {
    };
});
/**
 * definition root object
 */
(function (name, global, definition) {
    global['globalModule'] = global[name] = definition();
})('Mopin', this, function () {
    return {
        name: 'Mopin',
        version: '0.1',
        include: function (obj) {
            var key;
            for (key in obj) {
                if (obj.hasOwnProperty(key)) {
                    this[key] = obj[key];
                }
            }

        }
    };

});

/**
 * definition Class Constructor
 */
(function (name, module, definition) {
    module[name] = definition();
})('define', globalModule, function () {
    var Class = function () {
        var Klass = function () {
            this.init.apply(this, arguments);
        };

        Klass.prototype.init = function () {};

        // shortcut to prototype.
        Klass.fn = Klass.prototype;

        // shortcut to self.
        Klass.fn.parent = klass;

        // add class property method
        Klass.extend = function (obj) {

        return Klass;
    };
    return Class;
});
