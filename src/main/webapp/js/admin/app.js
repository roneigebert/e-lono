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
	},
	{
		template: 'templates/admin/categorias.html',
		controller: 'categoriasController',
		nome: 'Categorias',
		url: '/categorias'
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

function basic_crud($http, url, elements_name) {
	return {
    	find: function() {
			return $http.get(url)
		},
		save: function(object) {
			var method = object._links ? $http.put : $http.post
			var save_url = object._links ? object._links.self.href : url
			return method(save_url, object)
		}
		elements_name: elements_name
    }
}

app.factory('categoriaService', function($http){
    return basic_crud( $http, '/categorias', 'categorias' )
})

app.controller('adminController', function($scope) {
	$scope.templates = config
	
	$scope.changeTemplate = function(template) {
		$scope.current_template = template.replace('#', '')	
	}
	
	$scope.changeTemplate( document.location.hash || '/pedidos' ) 
})