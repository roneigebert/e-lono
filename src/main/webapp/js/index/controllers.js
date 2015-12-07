app.controller('produtosController', function($scope, config, produtoService, promocaoService, itensService) {
	
	$scope.view_atual = 'loading'
	$scope.list_style = 'grid'
		
	$scope.listagem = function() {
		produtoService.find().success(function(data) {
			$scope.lista = data._embedded[produtoService.elements_name]
			$scope.carregarUrlImagens()
			$scope.view_atual = 'listagem'
			$scope.carregarPromocoes()
		})
	}
	
	$scope.carregarPromocoes = function() {
		$scope.promocoes = {}
		promocaoService.findAtivas().success(function(data) {
			var promocoes = data._embedded.promocoes
			promocoes.forEach(function(promocao) {
				if ( promocao.todosProdutos )
					$scope.promocao_geral = promocao
				else
					promocaoService.get( promocao._links.produto.href ).success(function(data) {
						$scope.atualizarPromocaoProduto( promocao, data )
					})
			})
		})
	}
	
	$scope.atualizarPromocaoProduto = function( promocao, produto ){
		for ( var i = 0; i < $scope.lista.length; i++) {
			var produtoLista = $scope.lista[i]
			if ( produtoLista._links.self.href == produto._links.self.href ){
				produtoLista.promocao = promocao
				break
			}
		}
	}
	
	
	$scope.mostrarPrudutos = function() {
		produtoService.find().success(function(data) {
			$scope.lista = data._embedded[produtoService.elements_name]
			$scope.carregarUrlImagens()
			$scope.view_atual = 'listagem'
		})
	}
	
	$scope.carregarUrlImagens = function() {
		$scope.lista.forEach(function(element) {
			produtoService.get(element._links.imagem.href).success(function(data) {
				var urlImagem = data._links.self.href
				var name = urlImagem.match( /.*\/(.*$)/ )[1]
				element.imagem_url = config.imageDownloadUrl + name
			})
		})
	}
	
	$scope.add = function( produto ){
		$scope.produto = produto
		$scope.form_element = {
				quantidade: 1,
				valor: produto.valor,
				produto: produto._links.self.href,
				pedido: null,
				valorDesconto: $scope.valorDesconto( produto )
		}
		console.log( $scope.form_element )
		$scope.view_atual = 'add_produto'
	}
	
	$scope.valorDesconto = function(produto) {
		var desconto = ( produto.promocao || $scope.promocao_geral || {valor: 0} ).valor
		return produto.valor * desconto / 100
	}
	
	$scope.salvar = function() {
		itensService.add( $scope.form_element ).success(function() {
			console.log( 'adicionou item' )
		})
	}
	
	$scope.listagem()
	
})

app.controller('carrinhoController', function($scope) {
	
	
	
})