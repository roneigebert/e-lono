var app = angular.module('adminApp', ['ngRoute']);

config = [
	{
		template: 'templates/admin/pedidos.html',
		controller: 'pedidosController',
		nome: 'Pedidos',
		url: '/pedidos'
	},
	{
		template: 'templates/admin/produtos.html',
		controller: 'produtosController',
		nome: 'Produtos',
		url: '/produtos'
	}
]

app.config(['$routeProvider', function($routeProvider) {
	config.forEach(function(e) {
		$routeProvider.when(e.url, {
	        templateUrl: e.template,
	        controller: e.controller
		})
	})
	$routeProvider.otherwise({
    	redirectTo: '/pedidos'
    })
 }])
 
app.controller('adminController', function($scope) {
	$scope.templates = config
	
	$scope.changeTemplate = function(template) {
		$scope.current_template = template.replace('#', '')	
	}
	
	$scope.changeTemplate( document.location.hash || '/pedidos' ) 
})