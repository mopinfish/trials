/**
 * Mopin Module definition
 */
(function (name, global, definition) {
    if (typeof module !== 'undefined') {
        module.exports = definition();
    } else if (typeof require !== 'undefined' && typeof require.amd === 'object') {
        define(definition);
    } else {
        global['globalModule'] = global[name] = definition();
    }
})('Mopin', this, function () {
    return {
        name: 'Mopin'
    };
});
/**
 * namespace Method definition
 */
(function (name, module, definition) {
    module[name] = definition(module);
})('namespace', globalModule, function () {
    var module = globalModule || this;

    var Klass = function () {
            if (Klass.hasOwnProperty('init')) {
                Klass.prototype.init.apply(this, arguments);
            }
        };

    var Namespace = function (namespaceStr, context) {
        var context = context || module || this,
            hierarchies = namespaceStr.split('.');

        // 名前空間に対応するオブジェクトの作成
        if (hierarchies[0] === context.name) {
            hierarchies = hierarchies.slice(1);
        }
        for (i = 0, len = hierarchies.length; i < len; i++) {
            if (typeof context[hierarchies[i]] === "undefined") {
                // 名前空間の子孫にはインスタンスを格納する
                context[hierarchies[i]] = (i === len - 1) ? Klass : {};
            }
            context = context[hierarchies[i]];
        }
    };
    return Namespace;
});
console.log(Mopin.namespace('Mopin.app.hoge'));
console.log(Mopin);

/**
 * Base Class definition
 */
(function (name, global, definition) {
    if (typeof module !== 'undefined') {
        module.exports = definition();
    } else if (typeof require !== 'undefined' && typeof require.amd === 'object') {
        define(definition);
    } else {
        global[name] = definition();
    }
})('Base', globalModule, function () {
    // 基底クラス
    var Base = function () {};

    Base.prototype.init = function () {};

    /**
     * 要素のクラスを切り替える
     * @param target
     * @param {object} on オンの場合のデータ。内容は{className : クラス名, callback : コールバック関数}
     * @param {object} off オフの場合のデータ。内容は{className : クラス名, callback : コールバック関数}
     * @return
     */
    Base.prototype.toggleClass = function(element, on, off){
        var target = $(element);
        on = on ? on : {className: 'on'};
        off = off ? off : {className: 'off'};
        if(target.hasClass(off.className)) {
            target.removeClass(off.className).addClass(on.className);
            on.callback && on.callback.call(this, element);
        } else {
            target.removeClass(on.className).addClass(off.className);
            off.callback && off.callback.call(this, element);
        }
    };

    Base.prototype.getTouchEvent = function(evt) {
        return evt.originalEvent.touches ? evt.originalEvent.touches[0] : evt;
    };

    return Base;
});
(function ($, win) {
    /**
     * クラス作成メソッド
     * $.mhomes.createClass()を移植・修正したもの
     *
     * @param namespace string 名前空間
     * @param properties object インスタンスの実装
     * @param Base function 継承するコンストラクタ
     */
    Mopin.define = function (namespace, properties, Base) {
        var hierarchies = namespace.split('.'),
            Base = Base || Mopin.Base,
            F = function () {},
            parent = Mopin,
            i, len,
            Klass;

        // 一時コンストラクタ(Fによってprototypeの共有を切る)
        Klass = function () {
            // インスタンス生成時に呼び出されるメソッド
            if (Klass.prototype.hasOwnProperty('init')) {
                Klass.prototype.init.apply(this, arguments);
            }
        };
        F.prototype = Base.prototype,
        Klass.prototype = $.extend(new F(), properties);
        Klass.prototype._super = F.prototype;
        Klass.prototype.constructor = Klass;

        // 名前空間に対応するオブジェクトの作成
        if (hierarchies[0] === "Mopin") {
            hierarchies = hierarchies.slice(1);
        }
        for (i = 0, len = hierarchies.length; i < len; i++) {
            if (typeof parent[hierarchies[i]] === "undefined") {
                // 名前空間の子孫にはインスタンスを格納する
                parent[hierarchies[i]] = (i === len - 1) ? Klass : {};
            }
            parent = parent[hierarchies[i]];
        }
    };
})( jQuery, this );
