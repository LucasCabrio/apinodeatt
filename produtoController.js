const db = require('./db');

const Joi = require('joi');

const produtoSchema = Joi.object({
    nome_produto: Joi.string().required(),
    descricao: Joi.string().required(),
    valor: Joi.number().required(),
    imagem: Joi.string().required(),
    medida: Joi.string().required(),
});

exports.listarProdutos = (req, res) => {
    db.query('SELECT * FROM produto', (err, result) => {
        if (err) {
            console.error('Erro ao buscar produtos:', err);
            res.status(500).json({ error: 'Erro interno no servidor' });
            return;
        }
        res.json(result);
    });
};


exports.buscarProduto = (req, res) => {
    const { id_produto } = req.params; //req.params acessa os parametros


    db.query('SELECT * FROM produto WHERE id_produto = ?', id_produto, (err, result) => {
        if (err) {
            console.error('Erro ao buscar produtos:', err);
            res.status(500).json({ error: 'Erro interno no servidor' });
            return;
        };
        if (result.length === 0) {
            res.status(404).json({ error: 'Produto não encontrado' });
            return;
        }

        res.json(result[0]); //RETORNA O PRIMEIRO PRODUTO ENCONTRADO
    });
};


exports.adicionarProduto = (req, res) => { //token
    const { nome_produto, descricao, valor, imagem, medida } = req.body;

    const { error } = produtoSchema.validate({ nome_produto, descricao, valor, imagem, medida });

    if (error) {
        res.status(400).json({ error: 'Dados do produto inválidos' });
        return;
    }

    const novoProduto = {
        nome_produto,
        descricao,
        valor,
        imagem,
        medida
    };
    db.query('INSERT INTO produto SET ?', novoProduto, (err, result) => {
        if (err) {
            console.error('Erro ao adicionar produto:', err);
            res.status(500).json({ error: 'Erro interno no servidor' });
            return;
        }
        res.json({ message: 'Produto adicionado com sucesso' });
    });

};

exports.atualizarProduto = (req, res) => { //token
    const { id_produto } = req.params;
    const { nome_produto, descricao, valor, imagem, medida } = req.body;

    const { error } = produtoSchema.validate({ nome_produto, descricao, valor, imagem, medida })

    if (error) {
        res.status(400).json({ error: 'Dados do produto inválidos' });
        return;
    }

    const produtoAtualizado = {
        nome_produto,
        descricao,
        valor,
        imagem,
        medida
    };

    db.query('UPDATE produto SET ? WHERE id_produto = ?', [produtoAtualizado, id_produto], (err, result) => {
        if (err) {
            console.error('Erro ao atualizar produto:', err);
            res.status(500).json({ error: 'Erro interno no servidor' });
            return;
        }
        res.json({ message: 'Produto atualizado com sucesso' });
    });
};

exports.deletarProduto = (req, res) => { //token
    const { id_produto } = req.params;

    db.query('DELETE FROM produto WHERE id_produto = ?', id_produto, (err, result) => {
        if (err) {
            console.error('Erro ao deletar produto:', err);
            res.status(500).json({ error: 'Erro interno no servidor' });
            return;
        }
        res.json({ message: 'Produto deletado com sucesso' });
    });
};

exports.buscarProdutoNome = (req, res) => {
    const { nome_produto } = req.params; //req.params acessa os parametros

    db.query('SELECT * FROM produto WHERE nome_produto LIKE?', [`${nome_produto}%`], (err, result) => {

        if (err) {
            console.error('Erro ao buscar produto:', err);
            res.status(500).json({ error: 'Erro interno no servidor' });
            return;
        }
        if (result.length === 0) {
            res.status(404).json({ error: 'Produto não encontrado' });
            return;
        }

        res.json(result); //RETORNA O PRIMEIRO PRODUTO ENCONTRADO
    });
};

exports.buscarProdutoMedida = (req, res) => {
    const { medida } = req.params; //req.params acessa os parametros

    db.query('SELECT * FROM produto WHERE medida LIKE?', [`${medida}%`], (err, result) => {

        if (err) {
            console.error('Erro ao buscar produto:', err);
            res.status(500).json({ error: 'Erro interno no servidor' });
            return;
        }
        if (result.length === 0) {
            res.status(404).json({ error: 'Produto não encontrado' });
            return;
        }

        res.json(result); //RETORNA O PRIMEIRO PRODUTO ENCONTRADO
    });
};