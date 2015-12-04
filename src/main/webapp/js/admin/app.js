var app = angular.module('adminApp', ['ngRoute']);

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
		save: function(object) {
			var method = object._links ? $http.put : $http.post
			var save_url = object._links ? object._links.self.href : url
			return method(save_url, object)
		},
		remove: function(object) {
			console.log( object._links.self.href )
			return $http.delete(object._links.self.href)
		},
		elements_name: elements_name
    }
}

app.factory('categoriaService', function($http){
    return basic_crud( $http, 'http://localhost:8080/categorias/', 'categorias' )
})

app.controller('adminController', function($scope) {
	$scope.templates = config
	
	$scope.changeTemplate = function(template) {
		$scope.current_template = template.replace('#', '')	
	}
	
	$scope.changeTemplate( document.location.hash || '/pedidos' ) 
})