/*
*	Author : patrick.wolleb@shmedia.co.uk
*/




var Module = function(name) {
	if(!name) {
		throw new Error('Module :: constructor - Missing name argument');
	} else if(typeof name !== 'string') {
		throw new Error('Module :: constructor - Argument must be a string');
	}
	this._name = name;
	this._injector = new Injector();
	this._components = {};
	this._runs = [function () { console.log('The Angle has landed.') }];
};


Module.prototype = {

	_link : function (component, element) {
		var dependencyKeys = Injector.getParamNames(component.link);
		var dependencies = [element];
		if(dependencyKeys.length > 1) {
			dependencyKeys.shift();
			
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
	},

	component : function(definition) {

		if(!definition.selector) {
			throw new Error('Module :: component - Component needs selector property');
		}

		if(!definition.link) {
			throw new Error('Module :: component - Component needs link method');
		}
		var id = ('_'+definition.selector);
		if(this._components[id]) {
			throw new Error('Module :: component - ' + definition.selector + ' already defined');
		}
		this._components[id] = definition;
	},

	inject : function(key, obj) {
		this._injector.add(key, obj);
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