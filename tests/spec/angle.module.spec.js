describe('module', function() {

	var app;

	describe('constructor', function() {

		it('should create new injector instance', function() {
			app = new Module('app');
			expect(app._injector).toBeDefined();
		});

		it('should create components pool object', function() {
			app = new Module('app');
			expect(app._components).toBeDefined();
		});

		it('should create set name to constructor argument', function() {
			app = new Module('app');
			expect(app._name).toBe('app');
		});

		it('should throw error if no name argument is passed', function() {
			expect(function() {
				app = new Module();
			}).toThrow(new Error('Module :: constructor - Missing name argument'));
		});

		it('should throw error if argument is not a string', function() {
			expect(function() {
				app = new Module({});
			}).toThrow(new Error('Module :: constructor - Argument must be a string'));
		});

	});


	describe('component method', function() {

		var selector = '#test';

		beforeEach(function() {
			app = new Module('app');
		});	

		it('should add component' , function() {
			
			app.component({ 
				selector : selector,
				link : function() {}
			});
			expect(app._components['_'+selector]).toBeDefined();
		});


		it('should throw error if no selector passed' , function() {
			expect(function() {
				app.component({ 
					link : function() {}
				});
			}).toThrow(new Error('Module :: component - Component needs selector property'));
		});


		it('should throw error if no link method passed' , function() {
			expect(function() {
				app.component({ 
					selector : selector
				});
			}).toThrow(new Error('Module :: component - Component needs link method'));
		});


		it('should throw error if component already defined' , function() {
			app.component({
				selector : selector,
				link : function() {}
			})		
			expect(function() {
				app.component({
					selector : selector,
					link : function() {}
				});
			}).toThrow(new Error('Module :: component - ' + selector + ' already defined'));
		});
	});



	describe('inject method', function() {

		it('should inject singleton into module injector', function() {

			app = new Module('a');
			app = new Module('b');

			app.inject('test' , { test : 'test' });

			expect(app._injector.get('test')).toEqual({ test : 'test' });

		})

	});

});