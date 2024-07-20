const db = require('./db');

const Joi = require('joi');

const forneceSchema = Joi.object({
    id_fornece: Joi.string().required(),
    id_fornecedor: Joi.string().required(),
    id_produto: Joi.string().required(),
});

exports.listarFornece = (req, res) => {
    db.query('SELECT * FROM fornece', (err, result) => {
        if (err) {
            console.error('Erro ao buscar fornece:', err);
            res.status(500).json({ error: 'Erro interno no servidor' });
            return;
        }
        res.json(result);
    });
};