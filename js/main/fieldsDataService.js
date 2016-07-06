/**
 * Created by Aleksandr Volkov on 06/07/16.
 */
angular.module('viventor')
	.factory('fieldsDataService', ['$q', function ($q) {
		return $q(function (resolve, fail) {
				resolve(
					{
						email: {
							caption: 'Correo electronico',
							type: 'text',
							required: true,
							errorMessage: 'Incorrect e-mail format',
							name: 'email'
						},
						pass: {
							caption: 'Contraseña',
							type: 'password',
							required: true,
							placeholderUp: true,
							name: 'pass',
							errorMessage: 'Passwords are not the same'
						},
						passRepeat: {
							caption: 'Repita la contraseña',
							type: 'password',
							required: true,
							placeholderUp: true,
							name: 'passRepeat'
						},
						name: {
							caption: 'Nombre',
							type: 'text',
							required: true,
							name: 'name',
							errorMessage: 'the name should be at least 2 letters long'
						},
						secondName: {
							caption: 'Apellidos',
							type: 'text',
							required: true,
							name: 'secondName',
							errorMessage: 'the second name should be at least 2 letters long'
						},
						dni: {
							caption: 'DNI',
							type: 'text',
							required: true,
							name: 'dni',
							errorMessage: 'the format of DNI/NIE is invalid'
						},
						phone: {
							caption: 'Telefono',
							type: 'tel',
							required: true,
							errorMessage: 'phone number format is incorrect',
							name: 'phone'
						},
						address: {
							caption: 'Direccion',
							type: 'tel',
							required: true,
							errorMessage: 'the address is incorrect',
							name: 'address'
						},
						city: {caption: 'Cuidad', type: 'text', required: false},
						country: {
							caption: 'Pais', type: 'text', required: true,
							name: 'country',
							options: [
								{caption: 'USA', key: 'us'},
								{caption: 'Russia', key: 'ru'},
								{caption: 'Spain', key: 'es'},
								{caption: 'Italy', key: 'it'}
							]
						},
						language: {
							caption: 'Idioma', type: 'text', required: true,
							name: 'language',
							options: [
								{caption: 'EN', key: 'en'},
								{caption: 'RU', key: 'ru'},
								{caption: 'ES', key: 'es'},
								{caption: 'IT', key: 'it'}
							]
						},
						account: {caption: '', type: 'radio', required: false},
						accepted: {caption: '', type: 'checkbox', required: true}
					}
				)
			}
		)
	}]);