app.controller('produtosController', function($scope, config, produtoService, promocaoService, itensService, pedidoService) {
	
	$scope.list_style = 'grid'
		
	$scope.listagem = function() {
		$scope.view_atual = 'loading'
		produtoService.find().success(function(data) {
			$scope.lista = data._embedded.produtos
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
		pedidoService.getOrCreate( $scope.salvarItem )
	}
	
	$scope.salvarItem = function(pedido) {
		$scope.form_element.pedido = pedido._links.self.href
		itensService.add( $scope.form_element ).success(function() {
			$scope.listagem()
		})
	}
	
	$scope.listagem()
	
})

app.controller('carrinhoController', function($scope, pedidoService, itensService, produtoService ) {
	
	$scope.listagem = function() {
		$scope.view_atual = 'loading'
		pedidoService.getOrCreate( $scope.showPedido )
	}
	
	$scope.showPedido = function(pedido) {
		$scope.pedido = pedido
		itensService.get( pedido._links.itens.href ).success(function(data) {
			$scope.itens = data._embedded.itens
			$scope.buscarProdutos()
			$scope.view_atual = 'listagem'
		})
	}
	
	$scope.buscarProdutos = function() {
		$scope.itens.forEach(function(item) {
			produtoService.get( item._links.produto.href ).success(function(produto) {
				item.produto = produto
			})
		})
	}
	
	$scope.finalizarPedido = function() {
		$scope.alterarStatus('FINALIZADO', $scope.listagem)
	}
	
	$scope.cancelarPedido = function() {
		$scope.alterarStatus('CANCELADO', $scope.listagem)
	}
	
	$scope.alterarStatus = function(status, callback) {
		$scope.pedido.statusPedido = status
		pedidoService.alterar( $scope.pedido ).success(function() {
			callback()
		})
	}
	
	$scope.listagem()
	
})