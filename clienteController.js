const db = require('./db'); //IMPORTANDO O NOSSO MODULO DE CONEXAO COM O BANCO.

const Joi = require('joi');
// JOI - valida se esta estrutura de dados atende a uma validação criada no banco, impedindo que o erro passe por aqui e chegue até o banco.

const bcrypt = require('bcrypt');
const { Hash } = require('crypto');

// VALIDAÇÃO DOS DADOS 
const clienteSchema = Joi.object({
    cpf: Joi.string().length(11).required(),
    rg: Joi.string().length(10).required(),
    nome: Joi.string().required(),
    cidade: Joi.string().required(),
    endereco: Joi.string().required(),
    cep: Joi.number().required(),
    bairro: Joi.string().required(),
    complemento: Joi.string().required(),
    telefone: Joi.number().required(),
    email: Joi.string().email().required(),
    senha: Joi.string().min(6).required(),
});

// LISTAR TODOS OS CLIENTES 
// QUERRY ACESSA O OBJTO DE QUERSTRING DA REQUISIÇÃO

exports.listarClientes = (req, res) => { //token
    db.query('SELECT*FROM cliente', (err, result) => {
        if (err) {
            console.error('Erro ao buscar clientes:', err);
            res.status(500).json({ error: 'Erro interno no servidor' });
            return;
        }
        res.json(result);
    });
};

//BUSCAR UM UNICO CLIENTE POR CPF 
exports.buscarCliente = (req, res) => { //token
    const { cpf } = req.params; //req.params acessa os parametros


    db.query('SELECT * FROM cliente WHERE cpf = ?', cpf, (err, result) => {
        if (err) {
            console.error('Erro ao buscar clientes:', err);
            res.status(500).json({ error: 'Erro interno no servidor' });
            return;
        };
        if (result.length === 0) {
            res.status(404).json({ error: 'Cliente não encontrado' });
            return;
        };

        res.json(result[0]); //RETORNA O PRIMEIRO CLIENTE ENCONTRADO
    });
};

// Adicionar um novo cliente 
exports.adicionarCliente = (req, res) => {
    const { cpf,rg, nome,cidade, endereco, cep,bairro, complemento,  telefone, email, senha
    } = req.body; // req.body acessa objeto do corpo da requisição que foi recebido.

    const { error } = clienteSchema.validate({ cpf,rg, nome,cidade, endereco, cep,bairro, complemento, telefone, email, senha });
    // clienteschema aqui utilizamos o joi para verificar os dados recebidos e garantir a integridade para só depois adicionarmos ao banco de dados.


    if (error) {
        res.status(400).json({ error: 'Dados de cliente inválidos' });
        return;
    }

    bcrypt.hash(senha, 10, (err, hash) => {
        if (err) {
            console.error('Erro ao criptografar a senha:', err);
            res.status(500).json({ error: 'Erro interno no servidor' });
            return;
        }

        const novoCliente = {
            cpf,
            rg,
            nome,
            cidade,
            endereco,
            cep,
            bairro,
            complemento,
            cep,
            telefone,
            email,
            senha: hash
        };

        db.query('INSERT INTO cliente SET ?', novoCliente, (err, result) => {
            if (err) {
                console.error('Erro ao adicionar cliente:', err);
                res.status(500).json({ error: 'Erro interno no servidor' });
                return;
            }
            res.json({ message: 'Cliente adicionado com sucesso' });
        });
    });
};




// Atualizar cliente
exports.atualizarCliente = (req, res) => {
    const { cpf } = req.params; //Chave primaria (cpf)
    const { rg, nome,cidade, endereco, cep, bairro,complemento, telefone, email,senha } = req.body; //Corpo da atualização
 
    const { error } = clienteSchema.validate({cpf, rg, nome, cidade, endereco, cep, bairro, complemento, telefone, email, senha });
 
    if (error) {
        res.status(400).json({ error: 'Dados de cliente inválidos' });
        return;
    }
    bcrypt.hash(senha, 10, (err, hash) => {
        if (err) {
            console.error('Erro ao criptografar a senha:', err);
            res.status(500).json({ error: "Erro interno no servidor" })
            return;
        }
 
 
        const clienteAtualizado = {
            rg,
            nome,
            cidade,
            endereco,
            cep,
            bairro,
            complemento,
            telefone,
            email,
            senha: hash,//ATUALIZAR AQUI
        };
 
        db.query('UPDATE cliente SET ? WHERE cpf = ?', [clienteAtualizado, cpf], (err, result) => {
            if (err) {
                console.error('Error ao adicionar cliente:', err);
                res.status(500).json({ error: 'Erro interno do servidor' });
                return;
            };
            res.json({ message: 'Cliente atualizado com sucesso' });
        });
    }); //atualiza aq
};
// Deletar cliente 

exports.deletarCliente = (req, res) => { //token
    const { cpf } = req.params;

    db.query('DELETE FROM cliente WHERE cpf = ?', cpf, (err, result) => {
        if (err) {
            console.error('Erro ao deletar clientes:', err);
            res.status(500).json({ error: 'Erro interno no servidor' });
            return;
        };
        res.json({ message: 'Cliente deletado com sucesso' });
    });

};