/*
*	Author : patrick.wolleb@shmedia.co.uk
*/

var angle = (function() {
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


