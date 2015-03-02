/*
*	Author : patrick.wolleb@shmedia.co.uk
*/


(function(ns) {

	// Extract function argument names for dependency injection
	var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
	var ARGUMENT_NAMES = /([^\s,]+)/g;
	function getParamNames(func) {
	  var fnStr = func.toString().replace(STRIP_COMMENTS, '');
	  var result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
	  if(result === null) {
	 		result = [];
	  }
	  return result;
	}

	ns.angle = (function() {

		var _components = {};
		var _runs;
		var _injector = (function() {
			var _pool = {}
			return {
				add : function(key, obj) {
					_pool[key] = obj;
				},
				get : function(key) {
					var obj = _pool[key];
					if(!obj) {
						throw new Error('angle error - mssing dependency: ' + key )
					}
					return obj;
				}
			}
		})()

		function link(component, element) {
			var dependencyKeys = getParamNames(component.link);
			if(dependencyKeys.length > 1) {
				dependencyKeys.shift();
				var dependencies = [element];
				dependencyKeys.forEach(function(dependency) {
					dependencies.push(_injector.get(dependency))
				});
			}			
			if(dependencies) {
				function F() {
		     	return component.link.apply(this, dependencies);
		    }
		    F.prototype = component.link.prototype;
		    return new F();
			} else {
				return new component.link(element);
			}
		}

		function construct(constructor, args) {
	    function F() {
	     	return constructor.apply(this, args);
	    }
	    F.prototype = constructor.prototype;
	    return new F();
		}

		var API = {

			component : function(definition) {
				var id = ('_'+definition.selector);
				if(_components[id]) {
					throw new Error('component ' + definition.selector + ' already defined');
				}
				_components[id] = definition;
			},

			inject : function(key, obj) {
				_injector.add(key, obj);
			},

			bootstrap : function() {
				var component;
				var slice = Array.prototype.slice;
				
				// Create instance from defined component classes
				for(var key in _components) {
					component = _components[key];
					switch(true) {
						case component.selector.substr(0,1) === '.' :
							component.instances = [];
							slice.call(document.querySelectorAll(component.selector)).forEach(function(item) {
								component.instances.push(link(component, item));
							});
						break  
						case component.selector.substr(0,1) === '#' :
							var element = document.getElementById(component.selector.substr(1));
							if(element) {
								component.instances = [link(component, element)];
							}
						break  
						default:
							component.instances = [];
							slice.call(document.getElementsByTagName(component.selector)).forEach(function(item) {
								component.instances.push(link(component, item));
							});
						break  
					}
					if(component.instances && component.instances.length === 0) {
						component.instances = null;			
					}
				}

				if(_runs) {
					_runs.forEach(function(callback) {
						callback.call();
					})	
				}
			},

			run : function(callback) {
				if(!_runs) {
					_runs = [];
				}
				_runs.push(callback);
			}

		};


		window.addEventListener('load', API.bootstrap);

		return API;

	})();

})(window);