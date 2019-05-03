/**
 * Copyright (C) 2019 Negiwine <negiwine.jp@gmail.com>
 * These codes are licensed under the WTFPL Version 2, December 2004
 */
;(function(){
    'use strict';
    
    var inherit = function(_class, _super) {
        _class.prototype = Object.create(_super.prototype);
        _class.prototype.constructor = _class;
        _class.prototype.superInit = function() {
            this.superInit = _super.prototype.superInit;
            _super.prototype.init.apply(this, arguments);
            delete this.superInit;
        };
        _class.prototype.superMethod = function(name) {
            this.superMethod = _super.prototype.superMethod;
            var args = Array.prototype.slice.call(arguments, 1);
            var rst = _super.prototype[name].apply(this, args);
            delete this.superMethod;
            return rst;
        };
    };
    
    var createClass = function(params) {
        var _class = function() {
            if (!(this instanceof _class)) {
                var instance = Object.create(_class.prototype);
                _class.prototype.init.apply(instance, arguments);
                return instance;
            }
            _class.prototype.init.apply(this, arguments);
        };
        if (params.superClass) inherit(_class, params.superClass);
        _class.prototype.$extend(params);
        if (params._accessor) {
            params._accessor.forIn(function(key, value) {
                _class.prototype.accessor(key, value);
            });
        }
        if (params._static) _class.$extend(params._static);
        if (params._defined) params._defined.call(_class, _class);
        return _class;
    };
    
    var defineProperty = Object.defineProperty;
    Object.defineProperty = function(obj, prop) {
        if (prop !== 'createClass') return defineProperty.apply(Object, arguments);
        defineProperty.call(Object, obj, prop, { value: createClass });
        Object.defineProperty = defineProperty;
        return obj;
    };
    
})();
