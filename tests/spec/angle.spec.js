describe('angle', function() {

	it('should be exported on global namespace', function() {
		expect(angle).toBeDefined();
	});



	describe('module method', function() {

		it('should return a new module', function() {
			var module = angle.module('test');
			expect(module.name).toBe('test')
		});

		it('should return a the same module instance when called mutiple times with same key', function() {
			var module = angle.module('test');
			var module2 = angle.module('test');
			expect(module).toBe(module2)
		});

	});



	describe('boot method', function() {

		var module, module2;

		beforeEach(function(){
			module = angle.module('test');
			module2 = angle.module('test2');
			spyOn(module, 'bootstrap');
			spyOn(module2, 'bootstrap');
		});

		it('should call bootstrap on all registered modules', function() {
			angle.boot();
			expect(module.bootstrap.calls.count()).toBe(1);
			expect(module2.bootstrap.calls.count()).toBe(1);
		});

	});

});