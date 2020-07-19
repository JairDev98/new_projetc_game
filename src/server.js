const express = require("express")
const server = express()

//PEGAR O BANCO DE DADOS
const db = require("./database/db.js")

server.use(express.static("public"))

//HABILITAR USO DO REQ BODY PARA SER USADO PARA PERSISTIR DADOS NO BD
server.use(express.urlencoded({ extended: true }))

const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

server.get("/", (req, res) => {
    return res.render("index.html")
})

server.get("/create", (req, res) => {
    //query strings da url -- os nomes que aparecem quando se envia
    //console.log(req.query)
    return res.render("create.html")
})

server.post("/save_store", (req, res) => {
    //INSERIR DADOS NO BANCO DE DADOS
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

    const values = [
        req.body.name,
        req.body.image,
        req.body.street,
        req.body.state,
        req.body.city,
        req.body.cep,
        req.body.point,
        req.body.hour_ini,
        req.body.hour_fin,
        req.body.site,
        req.body.email,
        req.body.whats
    ]

    function afterInsertData(err) {
        if (err) {
            return console.log(err)
            return res.send("ERRO NO CADASTRO!!")
        }

        console.log("Cadastrado com Sucesso")
        console.log(this)

        //DEPOIS DE EFETUADA A OPERAÇÃO DE CADASTRO É EFETUADO RELOAD PARA A PROPRIA PAGINA DE CADASTRO
        return res.render("create.html", { saved: true })
    }
    db.run(query, values, afterInsertData)
})

server.get("/result", (req, res) => {

    const search = req.query.search

    if (search == "") {
        //pesquisa vazia
        //COMO ELE ENCONTRA ESSE RETURN A FUNÇÃO ACABA AQUI E ELE NÃO CONTINUA EXECUTANDO O RESTANTE DO CÓDIGO
        return res.render("result.html", { total: 0 })
    }

    //pegar os dados do banco de dados
    db.all(`SELECT * FROM stores WHERE city LIKE '%${search}%'`, function (err, rows) {
        if (err) {
            return console.log(err)
        }

        const total = rows.length

        //mostrar a pagina html com os dados do banco de dados
        return res.render("result.html", { places: rows, total: total })
    })
})

server.listen(3000)