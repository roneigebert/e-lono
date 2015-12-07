app.controller('produtosController', function($scope, config, produtoService) {
	
	$scope.view_atual = 'loading'
	$scope.list_style = 'grid'
		
	$scope.onLoad = function() {
		produtoService.find().success(function(data) {
			$scope.lista = data._embedded.produtos
			$scope.carregarUrlImagens()
			$scope.view_atual = 'listagem'
		})
	}
	
	$scope.carregarUrlImagens = function() {
		$scope.lista.forEach(function(element) {
			produtoService.get(element._links.imagem.href).success(function(data) {
				var urlImagem = data._links.self.href
				var name = urlImagem.match( /.*\/(.*$)/ )[1]
				console.log( config.imageDownloadUrl + name )
				element.imagem_url = config.imageDownloadUrl + name
			})
		})
	}
	
	$scope.onLoad()
	
})

app.controller('carrinhoController', function($scope) {
	
})