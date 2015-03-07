describe('angle', function() {

	describe('component method', function() {

		beforeEach(angle.purge);

		var selector = '#test';

		it('should add component' , function() {
			
			angle.component({ 
				selector : selector,
				link : function() {}
			});
			expect(angle.getComponents()['_'+selector]).toBeDefined();
		});


		it('should throw error if no selector passed' , function() {
			expect(function() {
				angle.component({ 
					link : function() {}
				});
			}).toThrow(new Error('Angle :: Component needs selector property'));
		});


		it('should throw error if no link method passed' , function() {
			expect(function() {
				angle.component({ 
					selector : selector
				});
			}).toThrow(new Error('Angle :: Component needs link method'));
		});


		it('should throw error if component already defined' , function() {
			angle.component({
				selector : selector,
				link : function() {}
			})		
			expect(function() {
				angle.component({
					selector : selector,
					link : function() {}
				});
			}).toThrow(new Error('Angle :: Component ' + selector + ' already defined'));
		});
	});

});