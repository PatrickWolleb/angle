var Injector = function() {
	this.removeAll();
};

Injector.prototype = {

	add : function(key, obj) {
		if(!this._pool[key]) {
			this._pool[key] = obj;
		} else {
			throw new Error('Injector :: add - Key ' + key + ' already in use for ' + this._pool[key]);
		}
		
	},
	get : function(key) {
		var obj = this._pool[key];
		if(!obj) {
			throw new Error('Injector :: get - Missing dependency for : ' + key )
		}
		return obj;
	},

	removeAll : function() {
		this._pool = {};
	},

	remove : function(key) {
		if(typeof key === 'string') {
			delete this._pool[key];
		} else {
			throw new Error('Injector :: remove - Argument should be a string representing the key');	
		}
	}	
};




Injector._STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;		
Injector._ARGUMENT_NAMES = /([^\s,]+)/g;

Injector.getParamNames = function getParamNames(func) {
  var fnStr = func.toString().replace(Injector._STRIP_COMMENTS, '');
  var result = fnStr.slice(fnStr.indexOf('(')+1, fnStr.indexOf(')')).match(Injector._ARGUMENT_NAMES);
  if(result === null) {
 		result = [];
  }
  return result;
};	


module.exports = Injector;