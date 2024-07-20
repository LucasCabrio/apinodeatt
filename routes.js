const express = require('express'); //importando express

const path = require('path'); //importando path
//O path retorna o caminho de forma dinamica 

const router = express.Router()
// Isso permite que a gente crie diferentes URLs e ENDPOINTs para que o frontend possa fazer chamadas

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + '/src/pages/home.html'))
});


const clienteController = require ('./clienteController');
//CHAMANDO O ARQUIVO QUE CONTROLA O CLIENTE
const loginController= require ('./loginController');


//ROTAS PARA CLIENTES


router.get ('/clientes',loginController.autenticarToken,clienteController.listarClientes);

router.get ('/clientes/:cpf',loginController.autenticarToken,clienteController.buscarCliente);

// POST: Aceita criar algum objeto do servidor.
router.post('/clientes',clienteController.adicionarCliente);

// PUT: aceita substituir algum objeto do servidor.
// PATCH: Aceita alterar algum objeto do servidor.
router.patch ('/clientes/:cpf',loginController.autenticarToken,clienteController.atualizarCliente);

//DELETE: informa por meio da URL o objeto a ser deletado.
router.delete ('/clientes/:cpf',loginController.autenticarToken,clienteController.deletarCliente);

// ROTAS PARA LOGIN


router.post ('/login', loginController.loginCliente);

const produtoController = require ('./produtoController');
// PRODUTO

// ROTAS PARA PRODUTO 
router.get ('/produto', produtoController.listarProdutos);

router.get ('/produto/:id_produto', produtoController.buscarProduto);

router.get('/produto/nome/:nome_produto',produtoController.buscarProdutoNome);

router.get('/produto/medida/:medida',produtoController.buscarProdutoMedida);

router.post('/produto',produtoController.adicionarProduto);

router.patch ('/produto/:id_produto',produtoController.atualizarProduto);

router.delete ('/produto/:id_produto',produtoController.deletarProduto);



const pedidoController = require ('./pedidoController');
// PEDIDO

// ROTAS PARA PEDIDO
router.get ('/pedido',loginController.autenticarToken, pedidoController.listarPedidos);

router.get ('/pedido/:id_pedido', loginController.autenticarToken,pedidoController.buscarPedido);

router.get('/pedido/cpf/:cpf',loginController.autenticarToken,pedidoController.buscarPedidoCpf);

router.post('/pedido', loginController.autenticarToken,pedidoController.adicionarPedido);

router.patch ('/pedido/:id_pedido',loginController.autenticarToken,pedidoController.atualizarPedido);

router.delete ('/pedido/:id_pedido',loginController.autenticarToken,pedidoController.deletarPedido);


const carrinhoController = require ('./carrinhoController');
// CARRINHO

// ROTAS PARA CARRINHO
router.get ('/carrinho', carrinhoController.listarCarrinho);

router.get ('/carrinho/:id_carrinho', carrinhoController.buscarCarrinho);

router.get('/carrinho/valor/:valor_parcial',carrinhoController.buscarcarrinhoValor);

router.post('/carrinho', carrinhoController.adicionarCarrinho);

router.patch ('/carrinho/:id_carrinho',carrinhoController.atualizarCarrinho);

router.delete ('/carrinho/:id_carrinho',carrinhoController.deletarCarrinho);

const fornecedorController = require ('./fornecedorController');
// FORNECEDOR

// ROTAS PARA FORNECEDOR
router.get ('/fornecedor',loginController.autenticarToken, fornecedorController.listarFornecedor);

router.get ('/fornecedor/:id_fornecedor', loginController.autenticarToken,fornecedorController.buscarFornecedor);

router.get('/fornecedor/nome/:nome_empresa',loginController.autenticarToken,fornecedorController.buscarFornecedorNome);

router.post('/fornecedor',loginController.autenticarToken, fornecedorController.adicionarFornecedor);

router.patch ('/fornecedor/:id_fornecedor', loginController.autenticarToken,fornecedorController.atualizarFornecedor);

router.delete ('/fornecedor/:id_fornecedor',loginController.autenticarToken, fornecedorController.deletarFornecedor);

const forneceController = require ('./forneceController');
//CHAMANDO O ARQUIVO QUE CONTROLA O FORNECE


//ROTAS PARA FORNECE


router.get ('/fornece',forneceController.listarFornece);



module.exports = router; 