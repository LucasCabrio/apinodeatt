const db = require ('./db');

const Joi = require ('joi');

const fornecedorSchema = Joi.object({
 telefone_fornecedor: Joi.string().required(),
nome_empresa: Joi.string().required()



});

exports.listarFornecedor = (req,res) => { //token
db.query('SELECT * FROM fornecedor', (err,result) =>{
 if(err){
    console.error ('Erro ao buscar fornecedor:',err);
    res.status (500).json ({error: 'Erro interno no servidor'});
    return;
 }
res.json(result);
});

};

exports.buscarFornecedor = (req, res) => { //token
    const { id_fornecedor } = req.params; //req.params acessa os parametros

    db.query('SELECT * FROM fornecedor WHERE id_fornecedor =?', id_fornecedor, (err, result) => {
        if (err) {
            console.error('Erro ao buscar fornecedor:',err);
            res.status(500).json ({error:'Erro interno no servidor'});
            return;
        };
        if (result.length === 0) {
            res.status(404).json({ error: 'Fornecedor não encontrado' });
            return;
        }

        res.json(result[0]); //RETORNA O PRIMEIRO FORNECEDOR ENCONTRADO

    });


};

exports.adicionarFornecedor = (req, res) => { //token
    const {telefone_fornecedor,nome_empresa, } = req.body;

    const { error } = fornecedorSchema.validate({ telefone_fornecedor, nome_empresa });

    if (error) {
        res.status(400).json({ error: 'Dados do fornecedor inválidos' });
        return;
    }

    const novoFornecedor = {
        telefone_fornecedor,
        nome_empresa
        
    };
    db.query('INSERT INTO fornecedor SET ?', novoFornecedor, (err, result) => {
        if (err) {
            console.error('Erro ao adicionar fornecedor:', err);
            res.status(500).json({ error: 'Erro interno no servidor' });
            return;
        }
        res.json({ message: 'Fornecedor adicionado com sucesso' });
    });

};

exports.atualizarFornecedor = (req, res) => { //token
    const { id_fornecedor } = req.params;
    const { telefone_fornecedor, nome_empresa  } = req.body;

    const { error } = fornecedorSchema.validate({ telefone_fornecedor, nome_empresa })

    if (error) {
        res.status(400).json({ error: 'Dados do fornecedor inválidos' });
        return;
    }

    const fornecedorAtualizado = {
        telefone_fornecedor,
        nome_empresa
    };

    db.query('UPDATE fornecedor SET ? WHERE id_fornecedor = ?', [fornecedorAtualizado, id_fornecedor], (err, result) => {
        if (err) {
            console.error('Erro ao atualizar fornecedor:', err);
            res.status(500).json({ error: 'Erro interno no servidor' });
            return;
        }
        res.json({ message: 'Fornecedor atualizado com sucesso' });
    });
};

exports.deletarFornecedor = (req, res) => { //token
    const { id_fornecedor } = req.params;

    db.query('DELETE FROM fornecedor WHERE id_fornecedor = ?', id_fornecedor, (err, result) => {
        if (err) {
            console.error('Erro ao deletar fornecedor:', err);
            res.status(500).json({ error: 'Erro interno no servidor' });
            return;
        }
        res.json({ message: 'Fornecedor deletado com sucesso' });
    });
};

exports.buscarFornecedorNome = (req, res) => { //token
    const { nome_empresa } = req.params; //req.params acessa os parametros

    db.query('SELECT * FROM fornecedor WHERE nome_empresa LIKE?', [`${nome_empresa}%`], (err, result) => {

        if (err) {
            console.error('Erro ao buscar fornecedor:', err);
            res.status(500).json({ error: 'Erro interno no servidor' });
            return;
        }
        if (result.length === 0) {
            res.status(404).json({ error: 'Fornecedor não encontrado' });
            return;
        }

        res.json(result); //RETORNA O PRIMEIRO FORNECEDOR ENCONTRADO
    });
};