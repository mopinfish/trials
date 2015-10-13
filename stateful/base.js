var Class = function (parent) {
    var klass = function () {
        this.init.apply(this, arguments);
    };
    klass.prototype.init = function () {};

    // klassのプロトタイプを変更する
    if (parent) {
        var subclass = function () {};
        subclass.prototype = parent.prototype;
        klass.prototype = new subclass();
    }

    // ショートカット
    klass.fn = klass.prototype;
    klass.fn.parent = klass;
    klass._super = klass.__proto__;

    /* include/extend のコード... */

    return klass;
};
exports.Class = Class;
