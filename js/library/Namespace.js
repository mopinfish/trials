(function (name, global, definition) {
  if (typeof module !== 'undefined') {
    module.exports = definition();
  } else if (typeof require !== 'undefined' && typeof require.amd === 'object') {
    define(definition);
  } else {
    global[name] = definition();
  }
})('Namespace', this, function () {
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
