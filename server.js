// configurando o servidor

const express = require("express")
const server= express()


// configurar para usar arquivos extras

server.use(express.static('public'))

// configurando a template engine

const nunjuncks = require("nunjucks")
nunjuncks.configure("./",{
    express: server,
    noCache: true,
})


// lista de doadores


const donors =[
    {
        name: "Matheus Maues" ,
        blood: "B+"
    },
    {
        name: "Matheus " ,
        blood: "B+"
    },
    {
        name: "Matheus Costa" ,
        blood: "B+"
    },
    {
        name: "Matheus Silva" ,
        blood: "B+"
    }
]

// configurar a apresentacao da página

server.get("/", function(req, res){
    return res.render("index.html", {donors})
})


server.post("/", function(req, res){
//pegar os dados do formulário

})

// ligar o servidor e permitir o acesso na porta 3000
server.listen(3000, function(){
    console.log("iniciei o server =)")
})