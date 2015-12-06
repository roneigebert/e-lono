function basic_controller($scope, service) {
	
	$scope.listagem = function() {
		$scope.view_atual = 'loading'
		service.find().success(function(data) {
			$scope.onLoadSuccessfully( data._embedded[service.elements_name] )
		})
	}
	
	$scope.onLoadSuccessfully = function(lista) {
		$scope.view_atual = 'listagem'
		$scope.lista = lista
		call( $scope.onLoadListagem )
	}
	
	$scope.cadastro = function(element) {
		$scope.view_atual = 'cadastro'
		$scope.form_element = element || {}
		call( $scope.onLoadCadastro )
	}
	
	$scope.salvar = function() {
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

app.controller('produtosController', function($scope, produtoService, categoriaService) {

	$scope.onLoadCadastro = function() {
		categoriaService.find().success( $scope.onLoadCategorias )
	}
	
	$scope.onLoadCategorias = function(data) {
		var categorias = data._embedded[categoriaService.elements_name]
		if ( $scope.form_element._links )
			categoriaService.get( $scope.form_element._links.categoria.href ).success(function(categoriaData) {
				$scope.form_element.categoria = categoriaData._links.self.href
				$scope.categorias = categorias
			})
		else
			$scope.categorias = categorias
	}
	
	basic_controller($scope, produtoService, 'produtos')
	
})

app.controller('categoriasController', function($scope, categoriaService) {
	
	basic_controller($scope, categoriaService, 'categorias')
	
})

app.controller('imagensController', function($scope, $http, config) {
	
	$scope.listaImagem=[]
	
	var getImagem = function () {
		$scope.view_atual = 'loading'
		$http.get(config.baseUrlImagem).success(function (data) {
			$scope.listaImagem = data
			$scope.view_atual = 'listagem'
	})};
	
	$scope.cadastroImagem = function(){
		$scope.view_atual = 'cadastro'
	};
	
	$scope.salvarImagem = function(element){
		console.log(element)
	};
	
	$scope.listagem = function(){
		getImagem()
	};
	
	var inserirImagem = function (imagem) {
		$scope.view_atual = 'loading'
		$http.get(config.baseUrlImagem).success(function (data) {
			$scope.listaImagem = data
			$scope.view_atual = 'listagem'
	})};
	
	getImagem();
})