/*
*	Author : patrick.wolleb@shmedia.co.uk
*/

var angle = (function() {
	var _modules = {};
	return {
		module : function(key) {
			return _modules[key] = _modules[key] || new Module(key);
		}
	}		
});


window.addEventListener('load', API.bootstrap);