(function (name, module, definition) {
    var module = module || this;
    module[name] = definition();
})('hogehoe', this, function () {
    var Klass = function () {
    };
    return 'mogemoge';
});

(function (name, module, definition) {
    var module = module || this;
    module[name] = definition();
})('Mopin', this, function () {
    return {};
});

/**
 * Class
 *
 * @param Function Inheritance 継承するコンストラクタ
 * @return Function klass クラス定義コンストラクタ
 */
(function (name, module, definition) {
    var module = module || this;
    module[name] = definition();
})('Class', Mopin, function () {
    var Class = function (Inheritance) {
        var klass = function () {
                this.init.apply(this, arguments);
            };

        // 継承の実現
        if (typeof Inheritance === 'function') {
            klass.prototype = createObject(Inheritance.prototype);
            // 継承元クラスのプロパティにアクセスするためのショートカット
            klass.prototype._super = createObject(Inheritance.prototype);
        }

        // 初期化メソッド
        if (!klass.prototype.init) { 
            klass.prototype.init = function () {};
        }

        // プロトタイプにアクセスするためのショートカット
        klass.fn = klass.prototype;
        // クラスにアクセスするためのショートカット
        klass.fn._parent = klass;

        // クラスプロパティ追加メソッド
        klass.extend = function (obj) {
            var extended = obj.extended,
                prop;
            for (prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    klass[prop] = obj[prop];
                }
            }
            if (typeof extended === 'function') {
                extended(klass);
            }
            return this;
        };

        // インスタンスプロパティ追加メソッド
        klass.include = function (obj) {
            var included = obj.extended,
                prop;
            for (prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    klass.fn[prop] = obj[prop];
                }
            }
            if (typeof included === 'function') {
                included(klass);
            }
            return this;
        }

        return klass;
    };

    function createObject(obj) {
        if (Object.create) {
            return Object.create(obj);
        }
   
        if (arguments.length > 1) {
            throw new Error('Object.create implementation only accepts the first parameter.');
        }
        function F() {}
        F.prototype = obj;
        return new F();
    }

    return Class;
});

(function (global, doc, $) {

    var Class = function () {
    };
}(this, document, jQuery));
