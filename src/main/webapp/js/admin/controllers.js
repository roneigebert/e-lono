function basic_controller($scope, service) {
	
	$scope.listagem = function() {
		$scope.view_atual = 'loading'
		setTimeout(function() {
			service.find().success(function(data) {
				$scope.onLoadListagem( data._embedded[service.elements_name] )
			})
		}, 500)
	}
	
	$scope.onLoadListagem = function(lista) {
		$scope.view_atual = 'listagem'
		$scope.lista = lista
	}
	
	$scope.cadastro = function(element) {
		$scope.view_atual = 'cadastro'
		$scope.form_element = element || {}
	}
	
	$scope.salvar = function() {
		console.log( service.save )
		service.save( $scope.form_element ).success(function() {
			$scope.listagem()
		})
	}
	
	$scope.remove = function(index, element){
		service.remove(element).success(function() {
			$scope.lista.splice( index, 1 )
		})
	}
	
	$scope.listagem()
}

app.controller('pedidosController', function($scope) {

})

app.controller('produtosController', function($scope) {

})

app.controller('categoriasController', function($scope, categoriaService) {
	
	basic_controller($scope, categoriaService, 'categorias')
	
})