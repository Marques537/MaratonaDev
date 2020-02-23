// configurando o servidor

const express = require("express")
const server= express()


// configurar para usar arquivos extras

server.use(express.static('public'))

//habilitar o body do formulario
server.use(express.urlencoded({extended: true}))

//configurar conexao com o banco de dados

const Pool = require('pg').Pool
const db = new Pool({
    user: 'postgres',
    password: 'postgre',
    host:'localhost',
    port: 5432,
    database: 'doe'
})

// configurando a template engine

const nunjuncks = require("nunjucks")
nunjuncks.configure("./",{
    express: server,
    noCache: true,
})

// configurar a apresentacao da página

server.get("/", function(req, res){
    
    db.query("SELECT * FROM donors", function(err, result){
        if(err) return res.send("Erro de banco de dados.")
        
        const donors = result.rows 
        return res.render("index.html", { donors })
    })
    
})


server.post("/", function(req, res){
//pegar os dados do formulário
    const name = req.body.name
    const email = req.body.email
    const blood = req.body.blood

    if(name == "" || email== "" || blood== ""){
        return res.send("Todos os campos são obrigatórios.")
    }

// coloco valores dentro do banco de dados 
    const query = `
        INSERT INTO donors("name","email","blood") 
        VALUES($1, $2, $3)`    
    
    const values = [name, email, blood]

    db.query(query, values, function(err){
        if (err) return res.send("erro no banco de dados.")
        console.log(err)
        return res.redirect("/")
    })

    
})

// ligar o servidor e permitir o acesso na porta 3000
server.listen(3000, function(){
    console.log("iniciei o server =)")
})