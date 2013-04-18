(function (name, module, definition) {
    var module = module || this;
    module[name] = definition();
})('hogehoe', this, function () {
    var Klass = function () {
    };
    return 'mogemoge';
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
        extend: function (obj) {
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
    var module = module || this;
    module[name] = definition();
})('classify', globalModule, function () {
    var Class = function (fn) {
        var Klass = function () {
            fn.apply(this, arguments);
        };

        // shortcut to prototype.
        Klass.fn = Klass.prototype;

        // shortcut to self.
        Klass.fn.parent = Klass;

        // add class property
        Klass.extend = function (obj) {
            merge(obj, this);
            return this;
        };

        // add instance property
        Klass.include = function (obj) {
            merge(obj, this.fn);
            return this;
        };

        return Klass;
    };

    function merge(properties, context) {
        var key;
        for (key in properties) {
            if (properties.hasOwnProperty(key)) {
                context[key] = properties[key];
            }
        }
    }
    return Class;
});

/**
 * definition Inherit Constructor
 */
(function (name, module, definition) {
    var module = module || this;
    module[name] = definition();
})('inherit', globalModule, function () {
    var arrayProto = Array.prototype,
        slice = arrayProto.slice;

    var Inheritence = function (Parent, fn) {
        var Child = function () {
            var args = slice.call(arguments);
            (fn && typeof fn === 'function') ? fn.apply(this, args) : Parent.apply(this, args);
        }

        merge(Parent, Child);
        Child.prototype = createObject(Parent.prototype);
        Child.prototype.constructor = Parent;
        Child.prototype._uber = (function () {
            return function () {
                var args = slice.call(arguments);
                return Parent.apply(this, args);
            };
        }());

        // call Parent static method
        Child.callUber = function () {
            var args = slice.call(arguments),
                method = args.pop();
            return method && Parent[method] && Parent[method].apply(Child, args);
        };

        // call Parent instance method
        Child.prototype.callUber = function () {
            var args = slice.call(arguments),
                method = args.pop();
            return method && Parent.prototype[method] && Parent.prototype[method].apply(this, args);
        };

        return Child;
    }

    function merge(properties, context) {
        var key;
        for (key in properties) {
            if (properties.hasOwnProperty(key)) {
                context[key] = properties[key];
            }
        }
    }

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

    return Inheritence;
});


/*
 * definition Namespace Constructor
 */
(function (name, module, definition) {
    var module = module || this;
    module[name] = definition();
})('namespace', globalModule, function () {
  var arrayProto = Array.prototype
    , slice = arrayProto.slice
    , global = this
    , local = {}
    ;

  function Namespace(namespaceStr, context) {
    var spaces = namespaceStr.split('.')
      , name = spaces.pop()
      , context = context || global
      ;

    this.namespace = local.createNamespace(spaces, context);
    this.name = name;
  }

  Namespace.create = function () {
    var namespace = createObject(Namespace.prototype)
      , args = slice.call(arguments)
      ;

    Namespace.apply(namespace, args);
    return namespace;
  };

  Namespace.prototype.means = function (entity) {
    var namespace = this.namespace
      , name = this.name
      ;
    namespace[name] = entity;
  };

  local.createNamespace = function (spaces, context) {
    var space
      , i
      , l
      ;

    for (i = 0, l = spaces.length; i < l; i++) {
      space = spaces[i];
      if (isPrimitive(context[space])) {
        throw new Error('namespace ' + spaces.join('.') + ' already exist and '+ space +' is primitive');
      }
      context[space] = (context[space] == null) ? {} : context[space];
      context = context[space];
    }

    return context;
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

  function isPrimitive(value) {
    var result
      ;

    switch(typeof value) {
      case 'string':
      case 'number':
      case 'boolean':
        result = true;
        break;
      default:
        result = false;
    }

    return result;
  }

  return Namespace;
});

/**
 * definition Define Constructor
 */
(function (name, module, definition) {
    var module = module || this;
    module[name] = definition();
})('define', globalModule, function () {
    var arrayProto = Array.prototype,
        slice = arrayProto.slice,
        module = globalModule || this,
        createClass = module['classify'],
        createInheritence = module['inherit'],
        createNamespace = module.namespace.create;

    var Define = function (initialize) {
        var Klass = function () {
            var args = slice.call(arguments);
            initialize.apply(this, args);
        };
        var wrapper = function () {
            var args = slice.call(arguments);
            function Entity() {
                Klass.apply(this, args);
            }
            Entity.prototype = Klass.prototype;
            this.__entity__ = new Entity();
            initialize.apply(this, args);
        };

        var Def = function () {
            this.init = initialize;
            this.ns = null;
            this.uber = null;
            this.privateApis = null;
            this.publicApis = null;
            this.Implement = this.createImplement();

            return this;
        };

        // 名前空間の定義
        Def.prototype.release = function (namespaceStr) {
            this.ns = createNamespace(namespaceStr);
            this.exportImplement();
            return this;
        };
        // エイリアス
        Def.prototype.as = Def.prototype.release;

        // 継承機能の実現
        Def.prototype.inherit = function (Parent) {
            this.uber = Parent;
            this.exportImplement();
            return this;
        };

        // プライベートメソッドの設定
        Def.prototype.privates = function (apis) {
            this.privateApis = apis;
            this.exportImplement();
            return this;
        };

        // パブリックメソッドの設定
        Def.prototype.provides = function (apis) {
            this.publicApis = apis;
            this.exportImplement();
            return this;
        };

        // 実装の作成
        Def.prototype.createImplement = function () {
            var key, Implement;

            Implement = (this.uber) ? createInheritence(this.uber, wrapper) : createClass(wrapper);

            if (this.privateApis) {
                merge(this.privateApis, Klass.prototype);
            }

            if (this.publicApis) {
                for(key in this.publicApis) {
                    if (typeof this.publicApis[key] === 'function') {
                        Klass.prototype[key] = this.publicApis[key];
                        Implement.prototype[key] = (function (key, method) {
                            return function () {
                                var args = slice.call(arguments);
                                this.__entity__[key] = method;
                                return this.__entity__[key].apply(this.__entity__, args);
                            };
                        }(key, this.publicApis[key]));
                    } else {
                        Implement.prototype[key] = this.publicApis[key];
                    }
                }
            }
            return Implement;
        };

        // 名前空間へのエキスポート
        Def.prototype.exportImplement = function () {
            if (this.ns) {
                this.ns.means(this.createImplement());
            }
            return this;
        };

        return new Def();
    };

    function merge(properties, context) {
        var key;
        for (key in properties) {
            if (properties.hasOwnProperty(key)) {
                context[key] = properties[key];
            }
        }
    }

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


    return Define;
});
