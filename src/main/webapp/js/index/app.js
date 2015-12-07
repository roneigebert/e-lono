var app = angular.module('indexApp', ['ngRoute']);

config = [
	{
		template: 'templates/index/produtos.html',
		controller: 'produtosController',
		nome: 'Produtos',
		url: '/produtos'
	},
	{
		template: 'templates/index/carrinho.html',
		controller: 'carrinhoController',
		nome: 'Carrinho',
		url: '/carrinho'
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
    	redirectTo: '/produtos'
    })
}])

function basic_crud($http, url, elements_name) {
	return  {
    	find: function() {
			return $http.get(url)
		},
		get: function(get_url){
			return $http.get(get_url)
		},
		save: function(object) {
			var method = object._links ? $http.put : $http.post
			var save_url = object._links ? object._links.self.href : url
			return method(save_url, object)
		},
		remove: function(object) {
			return $http.delete(object._links.self.href)
		},
		elements_name: elements_name
    }
}

app.factory('promocaoService', function($http, config){
    var crud = basic_crud( $http, config.baseUrl + '/promocoes/', 'promocoes' )
    crud.findAtivas = function() {
		return this.find()
	}
    return crud
})

app.factory('produtoService', function($http, config){
    return basic_crud( $http, config.baseUrl + '/produtos/', 'produtos' )
})

app.controller('indexController', function($scope) {
	$scope.templates = config
	
	$scope.changeTemplate = function(template) {
		$scope.current_template = template.replace('#', '')	
	}
	
	$scope.changeTemplate( document.location.hash || '/produtos' ) 
})
