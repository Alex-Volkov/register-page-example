/**
 * Created by Aleksandr Volkov on 05/07/16.
 */
angular.module('viventor')
	.controller('mainController', mainController);
function mainController(fieldsData) {
	this.canBeSubmitted = false;
	this.selectedAccountName = null;
	this.checkFields = false;
	this.passwordsToCompare = {
		pass: null,
		passRepeat: null
	};
	this.fields = fieldsData;
	// for email validation
	this.onMailValidate = function (data) {
		if (!!data && data.value) {
			var mailReg = /.+@.+/ig;
			this.fields[data.fieldName].isValid = !!data.value.match(mailReg);
		}
		if(!!data && !!data.allowEmptyData && !data.value){
			this.fields[data.fieldName].isValid = false;
		}
	};

	// for passwords validation
	this.onPassValidate = function (data) {
		if (!!data && data.value) {
			var mainPattern = /[A-Za-z0-9]/ig;
			var specialPatt = /[^A-Za-z0-9]/ig;

			this.passwordsToCompare[data.fieldName] = data.value;
			this.fields[data.fieldName].isValid = true;
			// password should be more that 7 characters in length
			if (data.value.length < 7) {
				this.fields[data.fieldName].errorMessage = 'min password length is 7 characters';
				this.fields[data.fieldName].isValid = false;
				return false;
			}
			// password needs to have a number, letter and special character
			if (!data.value.match(mainPattern) || !data.value.match(specialPatt)) {
				this.fields[data.fieldName].errorMessage = 'it needs to have a number, letter and special character';
				this.fields[data.fieldName].isValid = false;
				return false;
			}
			// passwords should be equal
			if (!!this.passwordsToCompare.pass && !!this.passwordsToCompare.passRepeat) {
				if (this.passwordsToCompare.pass == this.passwordsToCompare.passRepeat) {
					console.log('equals');
					this.fields.pass.notEqual = false;
					this.fields.passRepeat.notEqual = false;
					this.fields.pass.isValid = true;
					this.fields.passRepeat.isValid = true;
				} else {
					console.log('not equals');
					this.fields.pass.notEqual = true;
					this.fields.passRepeat.notEqual = true;
					this.fields.pass.isValid = false;
					this.fields.passRepeat.isValid = false;
					return false;
				}
			}
		}
	};

	// for names validation
	this.onNamesValidation = function (data) {
		if (!!data && !!data.value) {
			this.fields[data.fieldName].isValid = (!!data.value && data.value.length >= 2);
		}
	};

	// dni validation
	this.onDniValidation = function (data) {
		if (!!data && !!data.value) {
			// in this case the DNI format suppose to be equal to 99999999-A and NIE A9999999-A
			var dniRegex = /[0-9]{8}-[A-Z]/ig;
			var nieRegex = /[A-Z][0-9]{7}-[A-Z]/ig;
			var matchDni = data.value.toUpperCase().match(dniRegex);
			var matchNie = data.value.toUpperCase().match(nieRegex);
			this.fields[data.fieldName].isValid = ((!!matchDni && (matchDni[0] == data.value.toUpperCase())) || (!!matchNie && matchNie[0] == data.value.toUpperCase()));
		}
	};
	// phone
	this.onPhoneValidation = function (data) {
		// we presume that phone is just nine digits with or without spaces or dashes 111 111 111
		if (!!data && !!data.value) {
			var phoneRegex = /\d{9}/ig;
			var cleanedNumber = data.value.replace(/\s+/ig, '').replace(/-+/ig, '');
			var numberToCompare = cleanedNumber.match(phoneRegex);
			this.fields[data.fieldName].isValid = (!!numberToCompare && numberToCompare[0] == cleanedNumber);
		}
	};
	// account selecting
	this.accountSelect = function(){
		this.fields.account.isValid = true;
	};
	this.onSelectChange = function(fieldName){
		this.fields[fieldName].isValid = this.fields[fieldName].fieldValue != '';
	};
	this.checkRequiredFields = function(){
		var canBeSubmitted = true;
		var result = {};
		for(var key in this.fields){
			// console.log(this.fields[key].isValid);
			if(this.fields[key].required && this.fields[key].isValid){
				result[key] = this.fields[key].fieldValue;
				if(typeof this.fields[key].fieldValue =='object'){
					// for selects
					result[key] =  this.fields[key].fieldValue.key;
				}
			}else{
				if(this.fields[key].required){
					canBeSubmitted = false;
				}
			}
		}
		this.canBeSubmitted = canBeSubmitted;
		console.log(result);
	}.bind(this);

	this.onCbChange = function(){
		this.fields.accepted.isValid = this.fields.accepted.fieldValue;
	};

	this.submit = function () {
		this.checkFields = true;
		this.checkRequiredFields();
		return false;
	}.bind(this)
}