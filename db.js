/* Configuração do banco de dados*/

const mysql = require ('mysql'); //importando mysql

//configurando uma conexao com o banco

const db = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'octopus_style'
}); //preencher de acordo com o seu banco de dados

//Testar conexão com o MYSQL
db.connect ((err) => {
    if(err){
        console.error("Erro ao conectar ao MySQL",err);
    }
    else{
        console.log("Conectado ao MySQL");
    }
});

module.exports = db;

// AQUI DECLARAMOS QUE ESTA CONTRUCAO SERA UM MODULO E QUE IREMOS EXPORTAR PARA SER USADO. SEQUIER INDEX.