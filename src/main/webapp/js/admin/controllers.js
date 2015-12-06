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
	
	$scope.is_new = function() {
		return $scope.form_element._links == undefined
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
		if ( $scope.is_new() )
			$scope.form_element.disponivel = true
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

app.controller('promocoesController', function($scope, promocaoService, produtoService) {
	
	$scope.onLoadListagem = function() {
		$scope.lista.forEach(function(element) {
			produtoService.get( element._links.produto.href ).success(function(produto) {
				element.produto = produto
			})
		})
	}
	
	$scope.onLoadCadastro = function() {
		produtoService.find().success( $scope.onLoadProdutos )
		if ( $scope.is_new() )
			$scope.form_element.todosProdutos = false
		else
			$scope.form_element.validade = $scope.form_element.validade.substr(0, 10)
	}
	
	$scope.onLoadProdutos = function(data) {
		var produtos = data._embedded[produtoService.elements_name]
		if ( $scope.form_element._links && !$scope.form_element.todosProdutos )
			promocaoService.get( $scope.form_element._links.produto.href ).success(function(produtoData) {
				$scope.form_element.produto = produtoData._links.self.href
				$scope.produtos = produtos
			})
		else
			$scope.produtos = produtos
	}
	
	basic_controller($scope, promocaoService, 'promocoes')
	
})

app.controller('categoriasController', function($scope, categoriaService) {
	
	basic_controller($scope, categoriaService, 'categorias')
	
})