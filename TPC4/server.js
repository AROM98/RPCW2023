var http = require('http')
var axios = require('axios')
var templates = require('./templates')
var static = require('./static.js')
const { parse } = require('querystring');


// Funções auxilidares
function geraIds(tarefas){
    var id = 0
    tarefas.forEach(t =>{
        x = parseInt(t.id)
        //console.log("X === "+ x)
        if (x > id){
            id = x
        }
    })
    return id + 1
}

// Aux function to process body

function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}


// Server creation

var Server = http.createServer(function (req, res) {
    // Logger: what was requested and when it was requested
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // Handling request
    if(static.staticResource(req)){
        static.serveStaticResource(req, res)
    }
    else{
        switch(req.method){
            case "GET":
                // GET /tarefas
                if((req.url == "/") || (req.url == "/tarefas")){
                    axios.get("http://localhost:3000/tarefas")
                        .then(response => {
                            tarefas = response.data
                            var next_id = geraIds(tarefas)
                            // Add code to render page with the student's list
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(templates.geraHomepage(tarefas, d, next_id))
                            res.end()
                        })
                        .catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Não foi possível obter a lista de tarefas..."+ erro)
                            res.end()
                        })
                }
                else if(/\/tarefas\/[0-9]+\/editar/.test(req.url)){
                    var idTarefa = req.url.split("/")[2]
                    console.log("idTarefa =====" + idTarefa)
                    axios.get("http://localhost:3000/tarefas?id=" + idTarefa)
                        .then( response => {
                            var a = response.data
                            
                            // Add code to render page with the student record
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(g = templates.geraPagEdit(a[0], d))
                            res.end()
                        })
                        .catch(function(erro){
                            console.log("DEU MERDA 1")
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Não foi possível efectua a edição..."+ erro)
                            res.end()
                        })
                }
                else if(/\/tarefas\/[0-9]+\/apagar/.test(req.url)){
                    var idTarefa = req.url.split("/")[2]
                    axios.get("http://localhost:3000/tarefas?id=" + idTarefa)
                        .then( response => {
                            var a = response.data
                            // Add code to render page with the student record
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(templates.geraPagDelete(a[0], d))
                            res.end()
                    })
                }
                else if(/\/tarefas\/[0-9]+\/concluir/.test(req.url)){
                    var idTarefa = req.url.split("/")[2]
                    axios.get("http://localhost:3000/tarefas?id=" + idTarefa)
                        .then( response => {
                            var a = response.data
                            // change the status of the task to concluido
                            a[0].estado = "concluido"
                            // update the task
                            axios.put("http://localhost:3000/tarefas/" + idTarefa, a[0])
                            .then( resp => {
                                // redirect to homepage
                                res.writeHead(302, {'Location': 'http://localhost:7777/'})
                                res.end()
                            })
                            .catch(function(erro){
                                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                res.write("<p>Não foi possível efectua a edição..."+ erro)
                                res.end()
                            })
                    })
                }
                else{
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    res.write("<p>" + req.method + " " + req.url + " não suportado neste serviço.</p>")
                    res.end()
                }
                break
                
            case "POST":
                if(req.url == '/tarefas'){
                    collectRequestBodyData(req, resultado =>{
                        console.log('POST de Tarefa:' + JSON.stringify(resultado))
                        axios.post("http://localhost:3000/tarefas",  resultado)
                        .then( resp => {

                            // redirect to homepage
                            res.writeHead(302, {'Location': 'http://localhost:7777/'})
                            res.end()
                            
                            //var next_id = geraIds(tarefas)
                            // Add code to render page with the student record
                            //res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            //res.write(templates.geraHomepage(tarefas, d, next_id))
                            //res.end()
                        })
                        .catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write('<p>Erro no POST: ' + erro + '</p>')
                            res.end()
                        })
                    })
                }
                else if(req.url == '/tarefas/editar'){
                    collectRequestBodyData(req, resultado =>{
                        console.log('PUT de Tarefa:' + JSON.stringify(resultado))
                        axios.put("http://localhost:3000/tarefas/"+resultado.id,  resultado)
                        .then( resp => {
                            var next_id = geraIds(tarefas)
                            res.writeHead(302, {'Location': 'http://localhost:7777/'})
                            res.end()
                            // Add code to render page with the student record
                            //res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            //res.write(templates.geraHomepage(tarefas, d, next_id))
                            //res.end()
                        })
                        .catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write('<p>Erro no POST: ' + erro + '</p>')
                            res.end()
                        })
                    })
                }
                else if(req.url == '/tarefas/apagar'){
                    collectRequestBodyData(req, resultado =>{
                        console.log('DELETE de Tarefa:' + JSON.stringify(resultado))
                        axios.delete("http://localhost:3000/tarefas/"+resultado.id,  resultado)
                        .then( resp => {
                            res.writeHead(302, {'Location': 'http://localhost:7777/'})
                            res.end()
                            // Add code to render page with the student record
                            //res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            //res.write(templates.geraDeleteConfirm(resp.data, d))
                            //res.end()
                        })
                        .catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write('<p>Erro no POST: ' + erro + '</p>')
                            res.end()
                        })
                    })
                }
                else{
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    // Replace this code with a POST request to the API server
                    res.write('<p>Recebi um POST não suportado</p>')
                    res.write('<p><a href="/">Voltar</a></p>')
                    res.end()

                }
                break

            default: 
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write("<p>" + req.method + " não suportado neste serviço.</p>")
                res.end()
        }
    }
    
})

Server.listen(7777, ()=>{
    console.log("Servidor à escuta na porta 7777...")
})