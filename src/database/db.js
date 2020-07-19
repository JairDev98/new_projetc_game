//Importar dependencia sqlite 3
//mesmo nome que foi usado pra instalar essa dependencia no npm

const e = require("express")

//verbose = mensagens no terminal
const sqlite3 = require("sqlite3").verbose()

//criando esse objeto de banco de dados neste endereço
const db = new sqlite3.Database("./src/database/database.db")

//esta linha é para se usar o banco de dados no server.js
//ela permite usar o require no arquivo server.js
module.exports = db

//utilizar esse objeto para as operações
//funcção anonima

/*
db.serialize(()=>{
    //CRIAÇÃO DA TABELA E SEUS ATRIBUTOS
        db.run(`
            CREATE TABLE IF NOT EXISTS stores(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT,
                image TEXT,
                street TEXT,
                state TEXT,
                city TEXT,
                cep TEXT,
                point TEXT,
                hour_ini TEXT,
                hour_fin TEXT,
                site TEXT,
                email TEXT,
                whats TEXT
            );
        `)
    //INSERÇÃO DOS DADOS NA TABELA CRIADA
    const query = `
    INSERT INTO stores(
        name,
        image,
        street,
        state,
        city,
        cep,
        point,
        hour_ini,
        hour_fin,
        site,
        email,
        whats
    ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?);
`
    
    const values = []

    function afterInsertData(err){
        if(err){
            return console.log(err)
        }

        console.log("Cadastrado com Sucesso")
        console.log(this)
    }

    //AQUI A FUNÇÃO CALLBACK FOI CHAMADA COMO PARAMENTRO
    //não colocar () depois de afterInsertData por que senão ela vai ser executada imediatamente
    //LINHA QUE EFETUA O REGISTRO
    db.run(query, values, afterInsertData)


    //CONSULTA DE DADOS
    db.all(`SELECT * FROM stores`, function(err,rows){
        if(err){
            return console.log(err)
        }

        console.log("Aqui estão os seus registros")
        console.log(rows)
    })


    //EXCLUSÃO DE ITENS DO BANCO DE DADOS
    db.run(`DELETE FROM stores`, function(err){
        if(err){
            return console.log(err)
        }
        console.log("Registros Deletados")
    })
    
})*/