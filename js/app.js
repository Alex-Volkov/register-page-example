/**
 * Created by Aleksandr Volkov on 05/07/16.
 */
angular
	.module('viventor', [
		'ngRoute'
	])
	.config(
		['$locationProvider', '$routeProvider',
		function ($locationProvider, $routeProvider) {
			$routeProvider
				.when('/', {
					templateUrl: 'js/main/main.html',
					controller: 'mainController',
					controllerAs: 'ctrl',
					resolve: {
						fieldsData: function (fieldsDataService) {
							return fieldsDataService
						}
					}
				})
				.otherwise({
					redirectTo: '/'
				});
			$locationProvider.html5Mode(true);
		}]);
