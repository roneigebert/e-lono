var app = angular.module('adminApp', ['ngRoute', '720kb.datepicker']);

app.directive('ngReallyClick', [function() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.bind('click', function($event) {
            	$event.stopPropagation()
            	if (attrs.ngReallyMessage)
            		swal({   
	            			title: attrs.ngReallyMessage,  
	            			text: "Não será possível desfazer esta operação!",   
	            			type: "warning",
	            			showCancelButton: true,   
	            			confirmButtonColor: "#DD6B55",
	            			confirmButtonText: "Confirmar",
	            			cancelButtonText: "Cancelar",
	            			closeOnConfirm: true 
            			}, 
            			function(){
            				scope.$apply(attrs.ngReallyClick) 
            			}
            		)
            });
        }
    }
}])

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
	},
	{
		template: 'templates/admin/promocoes.html',
		controller: 'promocoesController',
		nome: 'Promoções',
		url: '/promocoes'
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

app.factory('categoriaService', function($http, config){
    return basic_crud( $http, config.baseUrl + '/categorias/', 'categorias' )
})

app.factory('produtoService', function($http, config){
    return basic_crud( $http, config.baseUrl + '/produtos/', 'produtos' )
})

app.factory('promocaoService', function($http, config){
    return basic_crud( $http, config.baseUrl + '/promocoes/', 'promocoes' )
})

app.factory('pedidoService', function($http, config){
	return basic_crud( $http, config.baseUrl + '/pedidos/', 'pedidos' )
})

app.factory('itemService', function($http, config){
	return basic_crud( $http, config.baseUrl + '/itens/', 'itens' )
})

app.service('imagemService', function ($http, config) {
    return {
		upload: function(file){
		    var formData = new FormData()
		    formData.append('file', file)
		    return $http.post(config.imageUploadUrl, formData, {
		        transformRequest: angular.identity,
		        headers: {'Content-Type': undefined}
		    })
		},
		getByName: function(name) {
			return $http.get(config.baseUrl + '/imagens/search/findByName?name=' + name)
		}
    }
})

app.controller('adminController', function($scope) {
	$scope.templates = config
	
	$scope.changeTemplate = function(template) {
		$scope.current_template = template.replace('#', '')	
	}
	
	$scope.changeTemplate( document.location.hash || '/pedidos' ) 
})
