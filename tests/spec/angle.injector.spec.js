
describe('Injector', function() {

	var injector;

	beforeEach(function() {
		injector = new Injector();
	});



	describe('constructor', function() {

		it('should construct in purged state', function() {
			 expect(Object.keys(injector._pool).length).toBe(0);
		});

	});


	describe('add', function() {

		it('should add singleton to object pool', function() {
			injector.add('TEST', { test: 'works' });
			expect(injector._pool['TEST'].test).toBe('works'); 
		});

		it('should throw error if key already used', function() {
			injector.add('TEST', { test: 'works' });
			expect(function() {
				injector.add('TEST', { test: 'works' });
			}).toThrow(new Error('Injector :: add - Key TEST already in use for ' + injector._pool['TEST'])); 
		});

	});


	describe('get', function() {
		
		it('should retrieve singleton by key', function() {
			injector.add('TEST', { test: 'works' });
			expect(injector.get('TEST').test).toBe('works'); 
		});

		it('should throw error if key is not set', function() {
			expect(function() {
				injector.get('TEST');
			}).toThrow(new Error('Injector :: get - Missing dependency for : TEST' ));
		})

	});


	describe('remove', function() {

		it('should remove singleton by key', function() {
			injector.add('TEST', { test: 'works' });
			injector.remove('TEST');
			expect(function() {
				injector.get('TEST');
			}).toThrow(new Error('Injector :: get - Missing dependency for : TEST' ));
		});

	});


	describe('removeAll', function() {

		it('should remove all objects', function() {
			injector.add('TEST', { test: 'works' });
			injector.add('TEST2', { test: 'works' });
			injector.add('TEST3', { test: 'works' });
			injector.removeAll();
			expect(function() {
				injector.get('TEST2');
			}).toThrow(new Error('Injector :: get - Missing dependency for : TEST2' ));
		});

	});


	describe('getParamNames', function() {



		it('should return array of paramater names as strings', function() {
			var params = Injector.getParamNames(function(P1
				//// 
				, P2, P3) {/// njknkjndksjds
			});
			expect(params).toEqual(['P1', 'P2', 'P3']);
		});

		it('should return empty array if no arguments', function() {
			expect(Injector.getParamNames(function() {})).toEqual([]);
		});

	})	

});
