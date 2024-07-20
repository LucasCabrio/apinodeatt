const db = require('./db');

const Joi = require('joi');

const pedidoSchema = Joi.object({
    forma_pagto: Joi.string().required(),
    qtde_itens: Joi.number().required(),
    valor_total: Joi.number().required(),
    cpf: Joi.string().length(11).required(),
    entrega: Joi.string().required(),
    status_pedido: Joi.string().required(),

});

exports.listarPedidos = (req, res) => { //token
    db.query('SELECT * FROM pedido', (err, result) => {
        if (err) {
            console.error('Erro ao buscar pedido:', err);
            res.status(500).json({ error: 'Erro interno no servidor' });
            return;
        }
        res.json(result);
    });
};

exports.buscarPedido = (req, res) => { //token
    const { id_pedido } = req.params; //req.params acessa os parametros

    db.query('SELECT * FROM pedido WHERE id_pedido = ?', id_pedido, (err, result) => {
        if (err) {
            console.error('Erro ao buscar pedido:',err);
            res.status(500).json ({error:'Erro interno no servidor'});
            return;
        };
        if (result.length === 0) {
            res.status(404).json({ error: 'Pedido não encontrado' });
            return;
        }

        res.json(result[0]); //RETORNA O PRIMEIRO PEDIDO ENCONTRADO

    });


};

exports.adicionarPedido = (req, res) => { //token
    const { forma_pagto, qtde_itens, valor_total, cpf,entrega,status_pedido } = req.body;

    const { error } = pedidoSchema.validate({ forma_pagto, qtde_itens, valor_total,cpf, entrega,status_pedido });

    if (error) {
        res.status(400).json({ error: 'Dados do pedido inválidos' });
        return;
    }

    const novoPedido = {
        forma_pagto,
        qtde_itens,
        valor_total,
        cpf,
        entrega,
        status_pedido
    };
    db.query('INSERT INTO pedido SET ?', novoPedido, (err, result) => {
        if (err) {
            console.error('Erro ao adicionar pedido:', err);
            res.status(500).json({ error: 'Erro interno no servidor' });
            return;
        }
        res.json({ message: 'Pedido adicionado com sucesso' });
    });

};

exports.buscarPedidoCpf = (req, res) => { //token
const {cpf} = req.params; //req.params acessa os parametros

db.query('SELECT * FROM pedido WHERE cpf = ?', [cpf], (err,result) =>{

    if(err){
        console.error('Erro ao buscar pedido:',err);
        res.status(500).json({error: 'Erro interno no servidor'});
        return;
    }
    if(result.length===0){
        res.status(404).json({error:'Pedido não encontrado'});
        return;
    }

    res.json(result); //RETORNA O PRIMEIRO PEDIDO ENCONTRADO

});


};

exports.atualizarPedido = (req, res) => { //token
    const { id_pedido } = req.params;
    const { forma_pagto, qtde_itens, valor_total, cpf,entrega,status_pedido } = req.body;

    const { error } = pedidoSchema.validate({ forma_pagto, qtde_itens, valor_total,cpf, entrega,status_pedido });

    if (error) {
        res.status(400).json({ error: 'Dados do pedido inválidos' });
        return;
    }

    const pedidoAtualizado = {
        forma_pagto, 
        qtde_itens, 
        valor_total,
        cpf, 
        entrega,
        status_pedido
    };

    db.query('UPDATE pedido SET ? WHERE id_pedido = ?', [pedidoAtualizado, id_pedido], (err, result) => {
        if (err) {
            console.error('Erro ao atualizar pedido:', err);
            res.status(500).json({ error: 'Erro interno no servidor' });
            return;
        }
        res.json({ message: 'Pedido atualizado com sucesso' });
    });
};

exports.deletarPedido = (req, res) => { //token
    const { id_pedido } = req.params;

    db.query('DELETE FROM pedido WHERE id_pedido = ?', id_pedido, (err, result) => {
        if (err) {
            console.error('Erro ao deletar pedido:', err);
            res.status(500).json({ error: 'Erro interno no servidor' });
            return;
        }
        res.json({ message: 'Pedido deletado com sucesso' });
    });
};
