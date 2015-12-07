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

app.factory('promocaoService', function($http, config, $filter){
    return {
    	get: function(get_url) {
    		return $http.get(get_url)
		},
    	findAtivas: function() {
    		return $http.get( config.baseUrl + '/promocoes/search/findByValidadeAfter?validade=' + $filter('date')(new Date(),'yyyyMMdd') )
    	}
    }
})

app.factory('itensService', function($http, config){
    return {
    	get: function(get_url){
			return $http.get(get_url)
		},
    	add: function(item) {
			return $http.post(config.baseUrl + '/itens/', item)
		}
    }
})

app.factory('pedidoService', function($http, config){
    return {
    	getOrCreate: function( callback ) {
			$http.get(config.baseUrl + '/pedidos/search/findByStatusPedido?statusPedido=CARRINHO').success(function(data) {
				if ( data._embedded.pedidos.length == 0 )
					$http.post(config.baseUrl + '/pedidos/', {
						statusPedido: 'CARRINHO'
					}).success(function(pedidoData) {
						callback(pedidoData)
					})
				else
					callback( data._embedded.pedidos[0] )
			})
		},
		alterar: function(pedido) {
			return $http.put(pedido._links.self.href, pedido)
		}
    }
})

app.factory('produtoService', function($http, config){
    return {
    	find: function() {
			return $http.get(config.baseUrl + '/produtos/')
		},
		get: function(get_url){
			return $http.get(get_url)
		}
    }
})

app.controller('indexController', function($scope) {
	$scope.templates = config
	
	$scope.changeTemplate = function(template) {
		$scope.current_template = template.replace('#', '')	
	}
	
	$scope.changeTemplate( document.location.hash || '/produtos' ) 
})
