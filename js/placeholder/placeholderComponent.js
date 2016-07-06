/**
 * Created by Aleksandr Volkov on 05/07/16.
 */

angular.module('viventor')
	.component('placeholder', {
		templateUrl: 'js/placeholder/placeholder.html',
		bindings: {
			fieldData: '<',
			onValidate: '&'
		},
		controller: placeholder
	});
function placeholder($scope, $element) {

	// we need to hide our custom placeholder in case of autocomplete
	var autocompleteWatch = $scope.$watch(function () {
		// if(!!this.checkData){
		// }
		this.onValidation.call(this, true);
		this.changePlaceholderState();
	}.bind(this));

	// we need to hide span with placeholder and asterisk on click
	this.spanHandler = function () {
		this.placeholderClicked = true;
		$element.find('input')[0].focus();
	};

	// if there is nothing in the model we will return our custom placeholder
	this.onBlur = function () {
		this.readyForValidation = !(this.fieldValue && !this.fieldValue.length || !this.fieldValue);
		this.changePlaceholderState.call(this);
		this.onValidation.call(this);
	}.bind(this);

	this.onValidation = function(allowEmptyData){
		this.fieldData.fieldValue = this.fieldValue;
		var data = {
			fieldName: this.fieldData.name,
			value: this.fieldValue
		};
		if(!!allowEmptyData){
			data.allowEmptyData = true
		}
		this.onValidate({
			data: data
		});
	};
	
	this.changePlaceholderState = function () {
		this.placeholderClicked = !(this.fieldValue && !this.fieldValue.length || !this.fieldValue);
	}.bind(this);

	this.onChange = function () {
		if (this.fieldData.name == 'pass' || this.fieldData.name == 'passRepeat') {
			this.onValidation.call(this);
		}
	}.bind(this);

	$scope.$on('$destroy', function () {
		autocompleteWatch();
	})
}

