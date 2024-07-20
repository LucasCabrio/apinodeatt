const db = require('./db');

const Joi = require('joi');

const carrinhoSchema = Joi.object({
    qtde_itens: Joi.string().required(),
    valor_parcial: Joi.string().required(),
    id_produto: Joi.string().required(),
    id_pedido: Joi.string().required(),
    cep: Joi.string().required(),
});

exports.listarCarrinho = (req, res) => {
    db.query('SELECT * FROM carrinho', (err, result) => {
        if (err) {
            console.error('Erro ao buscar carrinho:', err);
            res.status(500).json({ error: 'Erro interno no servidor' });
            return;
        }
        res.json(result);
    });
};

exports.buscarCarrinho = (req, res) => {
    const { id_carrinho } = req.params; //req.params acessa os parametros


    db.query('SELECT * FROM carrinho WHERE id_carrinho = ?', id_carrinho, (err, result) => {
        if (err) {
            console.error('Erro ao buscar carrinho:', err);
            res.status(500).json({ error: 'Erro interno no servidor' });
            return;
        };
        if (result.length === 0) {
            res.status(404).json({ error: 'Carrinho não encontrado' });
            return;
        }

        res.json(result[0]); //RETORNA O PRIMEIRO PRODUTO ENCONTRADO
    });
};

exports.buscarcarrinhoValor = (req, res) => {
    const { valor_parcial} = req.params; //req.params acessa os parametros

    db.query('SELECT * FROM carrinho WHERE valor_parcial =?', [`${valor_parcial}%`], (err, result) => {

        if (err) {
            console.error('Erro ao buscar carrinho:', err);
            res.status(500).json({ error: 'Erro interno no servidor' });
            return;
        }
        if (result.length === 0) {
            res.status(404).json({ error: 'Carrinho não encontrado' });
            return;
        }

        res.json(result); //RETORNA O PRIMEIRO PRODUTO ENCONTRADO
    });
};



exports.atualizarCarrinho = (req, res) => { //token
    const { id_carrinho } = req.params;
    const { qtde_itens,valor_parcial,id_produto, id_pedido,  cep } = req.body;
    

    const { error } = carrinhoSchema.validate({qtde_itens,valor_parcial,id_produto, id_pedido,  cep })

    if (error) {
        res.status(400).json({ error: 'Dados do produto inválidos' });
        return;
    }

    const carrinhoAtualizado = {
        qtde_itens,
        valor_parcial,
        id_produto, 
        id_pedido,  
        cep
    };

    db.query('UPDATE carrinho SET ? WHERE id_carrinho = ?', [carrinhoAtualizado, id_carrinho], (err, result) => {
        if (err) {
            console.error('Erro ao atualizar carrinho:', err);
            res.status(500).json({ error: 'Erro interno no servidor' });
            return;
        }
        res.json({ message: 'Carrinho atualizado com sucesso' });
    });
};

exports.deletarCarrinho = (req, res) => { //token
    const { id_carrinho } = req.params;

    db.query('DELETE FROM carrinho WHERE id_carrinho = ?', id_carrinho, (err, result) => {
        if (err) {
            console.error('Erro ao deletar carrinho:', err);
            res.status(500).json({ error: 'Erro interno no servidor' });
            return;
        }
        res.json({ message: 'Carrinho deletado com sucesso' });
    });
};

exports.adicionarCarrinho = (req, res) => { //token
    const { qtde_itens,valor_parcial,id_produto, id_pedido,  cep } = req.body;

    const { error } = carrinhoSchema.validate({ qtde_itens,valor_parcial,id_produto, id_pedido,  cep });

    if (error) {
        res.status(400).json({ error: 'Dados do carrinho inválidos' });
        return;
    }

    const novoCarrinho = {
        qtde_itens,
        valor_parcial,
        id_produto,
         id_pedido,  
         cep
    };
    db.query('INSERT INTO carrinho SET ?', novoCarrinho, (err, result) => {
        if (err) {
            console.error('Erro ao adicionar carrinho:', err);
            res.status(500).json({ error: 'Erro interno no servidor' });
            return;
        }
        res.json({ message: 'Carrinho adicionado com sucesso' });
    });

};