angle.module('hello')

.inject('CONST', {
	greet : 'Hello World!'
})


.component({
	selector : '#hello',
	link: function(element, CONST) {
		element.innerHTML = CONST.greet;
	}
})


.run(function() {
	console.log('Angle - Hello World App');
})
