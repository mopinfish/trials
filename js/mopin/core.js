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
})('class', globalModule, function () {
    var Class = function (f) {
        var Klass = f || function () {
            this.init.apply(this, arguments);
        };

        Klass.prototype.init = function () {
        };

        // shortcut to prototype.
        Klass.fn = Klass.prototype;

        // shortcut to self.
        Klass.fn.parent = Klass;

        // add class property
        Klass.extend = function (obj) {
            merge(obj, Klass);
            return this;
        };

        // add instance property
        Klass.include = function (obj) {
            merge(obj, Klass.fn);
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
})('inheritence', globalModule, function () {
    var arrayProto = Array.prototype,
        slice = arrayProto.slice;

    var Inheritence = function (Parent) {
        var local = {};
        local._uber = createObject(Parent);

        var Child = function () {
            var args = slice.call(arguments);
            Parent.apply(this, args);
        }

        merge(Parent, Child);
        Child.prototype = createObject(Parent.prototype);
        Child.prototype.constructor = Parent;

        Child.prototype.callUber = function () {
            var args = slice.call(arguments),
                method = args.pop();
            local._uber[method].apply(this.Child, args);
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
        createClass = module['class'],
        createInheritence = module['inheritence'],
        createNamespace = module.namespace.create;

    var Define = function (implement) {

        var Def = function () {
            this.implement = implement;
            this.klass = createClass;
            this.ns = null;

            return this;
        };

        Def.prototype.getImplement = function () {
            if (typeof this.implement === 'function') {
                return createClass(this.implement);
            }
            return this.implement;
        };

        Def.prototype.release = function (namespaceStr) {
            this.ns = createNamespace(namespaceStr);
            this.ns.means(this.implement);
            return this;
        };
        Def.prototype.as = Def.prototype.release;

        Def.prototype.inherits = function (Parent) {
            var Child = createInheritence(Parent);
            //this.implement = Child.include(this.implement);
            console.log(Child);
            console.dir(Child);
            console.dir(this.implement);
        };
        Def.prototype.provides = function () {
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
