describe('Module', function() {

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
			expect(app.name).toBe('app');
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
			var singleton = { test : 'test' };
			app.inject('test' , singleton);
			expect(app._injector.get('test')).toBe(singleton);
		});

	});




	describe('link method', function() {
		var component, instance, element;

		beforeEach(function() {
			app = new Module('app');
			component = { link : function() {} };
			spyOn(component, 'link');
		});	



		it('should return instance of link', function() {
			instance = app.link(component, { name: 'test' });
			expect(instance instanceof component.link).toBe(true);
		});


		it('should call link with element ref passed into', function() {
			element = {}		
			instance = app.link(component, element);
			expect(component.link.calls.argsFor(0)[0]).toBe(element);
		});


		it('should pass element and additional dependnecies to link', function() {
			app.inject('d1', {name:'d1'});		
			app.inject('d2', {name:'d2'});
			app.inject('d3', {name:'d3'});
			app.inject('d4', {name:'d4'});
			instance = app.link({
				link : function(element, d1, d2, d3, d4) {
					expect([element, d1, d2, d3, d4])
						.toEqual([
		 					{name: 'DOM'},
		 					{name: 'd1'},
		 					{name: 'd2'},
		 					{name: 'd3'},
		 					{name: 'd4'},
					]);
				}
			}, {name: 'DOM'});
		});

	});


	describe('bootstrap method' , function() {


		beforeEach(function() {
			app = new Module('app');
			component = { link : function(element) {} };
			spyOn(component, 'link');
		});	

		it('should link a single #id component', function() {
			component.selector = '#test';
			app.component(component);
			app.bootstrap();
			expect(component.link.calls.argsFor(0)[0]).toBe(document.getElementById('test'));
		});


		it('should link a single .test component', function() {
			component.selector = '.test';
			app.component(component);
			app.bootstrap();
			expect(component.link.calls.argsFor(0)[0]).toBe(document.getElementById('test'));
		});

		it('should link two .test-multi components', function() {
			component.selector = '.test-multi';
			app.component(component);
			app.bootstrap();
			var elements = document.querySelectorAll(component.selector);
			expect(component.link.calls.argsFor(0)[0]).toBe(elements[0]);
			expect(component.link.calls.argsFor(1)[0]).toBe(elements[1]);
		});


		it('should link a single <test> tag component', function() {
			component.selector = 'test';
			app.component(component);
			app.bootstrap();
			var elements = document.getElementsByTagName(component.selector);
			expect(component.link.calls.argsFor(0)[0]).toBe(elements[0]);
		});


		it('should link multiple <test-multiple> tag component', function() {
			component.selector = 'test-multiple';
			app.component(component);
			app.bootstrap();
			var elements = document.getElementsByTagName(component.selector);
			expect(component.link.calls.argsFor(0)[0]).toBe(elements[0]);
			expect(component.link.calls.argsFor(1)[0]).toBe(elements[1]);
		});


		it('should add component instances to instances pool of component definition', function() {
			component.selector = 'test-multiple';
			app.component(component);
			app.bootstrap();
			expect(app._components['_'+component.selector].instances.length).toBe(2);
		});


	});
	

	describe('run method', function(){
		var runner;
		beforeEach(function() {
			app = new Module('app');
			runner = {
				f1 : function() {},
				f2 : function() {}
			};
			spyOn(runner, 'f1');
			spyOn(runner, 'f2');
		});	
	

		it('should call f1 when bootstrapped', function() {
			app.run(runner.f1);
			app.bootstrap();
			expect(runner.f1.calls.count()).toBe(1);
		});


		it('should call f1 and f2 when bootstrapped', function() {
			app.run(runner.f1);
			app.run(runner.f2);
			app.bootstrap();
			expect(runner.f1.calls.count()).toBe(1);
			expect(runner.f2.calls.count()).toBe(1);
		});

	});



});