/**
 * Created by Aleksandr Volkov on 06/07/16.
 */
angular.module('viventor')
	.component('selectComponent', {
		templateUrl: 'js/select/select.html',
		bindings: {
			fieldData: '<',
			onValidate: '&',
			checkData: '<'
		},
		controller: selectController
	});

function selectController() {
	this.onChange = function(){
		this.fieldData.isValid = true;

	}.bind(this)
}