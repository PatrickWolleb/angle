(function(definition) { if (typeof exports === 'object') { module.exports = definition(); } else if (typeof define === 'function' && define.amd) { define([], definition); } else { definition(); } })(function() { return /*
*	Author : patrick.wolleb@shmedia.co.uk
*/

(function() {
	var _modules = {};

	var API =  {
		module : function(key) {
			return _modules[key] = _modules[key] || new Module(key);
		},

		boot : function() {
			Object.keys(_modules).forEach(function(key){ 
				_modules[key].bootstrap();
			});
		}
	};

	var autoBoot = window.ANGLE_AUTO_BOOT || true;
	if(autoBoot) {
		window.addEventListener('load', API.boot);			
	}
	
	return API;
	
})();


; });