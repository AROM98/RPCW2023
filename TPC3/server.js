// pessoas_server.js
// RPCW2023: 2023-02-27
// by arom

var http = require('http');
var url = require('url');
var axios = require('axios');
var mypages = require('./mypages.js');


http.createServer(function (req, res) {
    var d = new Date()//.toISOString.substring(0, 16)
    console.log(req.method + " " + req.url + " " + d);
    var dicURL = url.parse(req.url, true)
    var segments = dicURL.pathname.split('/');
    //console.log(segments);

    if ('/' + segments[1] == '/') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8'});
        res.end(mypages.paginaInicial());
    
    }
    else if ('/' + segments[1] == '/listar_pessoas') {
        axios.get("http://localhost:3000/pessoas?_sort=nome&_order=asc")
            .then(function (resp) {
                var pessoas = resp.data;
                let pessoasOrdenadas = pessoas.sort( 
                    (p1, p2) => (p1.nome > p2.nome) ? 1 : -1
                    // function(p1, p2){ return (p1.nome > p2.nome) ? -1 : 1}
                )
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8'});
                res.end(mypages.listaPessoas(pessoas));
            })
            .catch(function (error) {
                console.log("Erro axios: " + error);
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8'});
                res.end("Erro axios: " + error);
            })
    }
    else if ('/' + segments[1] == '/listar_sexo') {

        //check if segments has 3 element
        if (segments.length == 3) {
            axios.get("http://localhost:3000/pessoas?sexo=" + segments[2])
                .then(function (resp) {
                    var pessoas = resp.data;
                    let pessoasOrdenadas = pessoas.sort( 
                        (p1, p2) => (p1.nome > p2.nome) ? 1 : -1
                        // function(p1, p2){ return (p1.nome > p2.nome) ? -1 : 1}
                    )
                    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8'});
                    res.end(mypages.listaPessoas(pessoasOrdenadas));
                })
                .catch(function (error) {
                    console.log("Erro axios: " + error);
                    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8'});
                    res.end("Erro axios: " + error);
            })
        }
        else{
            axios.get("http://localhost:3000/pessoas")
            .then(function (resp) {
                var pessoas = resp.data;
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8'});
                res.end(mypages.listaSexo(pessoas));
            })
            .catch(function (error) {
                console.log("Erro axios: " + error);
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8'});
                res.end("Erro axios: " + error);
            })
        }
    }
    else if ('/' + segments[1] == '/listar_desporto') {
        //check if segments has 3 element
        if (segments.length == 3) {
            axios.get("http://localhost:3000/pessoas?q=" + segments[2])
                .then(function (resp) {
                    var pessoas = resp.data;
                    let pessoasOrdenadas = pessoas.sort( 
                        (p1, p2) => (p1.nome > p2.nome) ? 1 : -1
                        // function(p1, p2){ return (p1.nome > p2.nome) ? -1 : 1}
                    )
                    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8'});
                    res.end(mypages.listaPessoas(pessoasOrdenadas));
                })
                .catch(function (error) {
                    console.log("Erro axios: " + error);
                    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8'});
                    res.end("Erro axios: " + error);
            })
        }
        else{
            axios.get("http://localhost:3000/pessoas")
            .then(function (resp) {
                var pessoas = resp.data;
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8'});
                res.end(mypages.listaDesporto(pessoas));
            })
            .catch(function (error) {
                console.log("Erro axios: " + error);
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8'});
                res.end("Erro axios: " + error);
            })
        }
    }
    else if ('/' + segments[1] == '/listar_top10') {
        //check if segments has 3 element
        if (segments.length == 3) {
            axios.get("http://localhost:3000/pessoas?=profissao" + segments[2])
                .then(function (resp) {
                    var pessoas = resp.data;
                    let pessoasOrdenadas = pessoas.sort( 
                        (p1, p2) => (p1.nome > p2.nome) ? 1 : -1
                        // function(p1, p2){ return (p1.nome > p2.nome) ? -1 : 1}
                    )
                    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8'});
                    res.end(mypages.listaPessoas(pessoasOrdenadas));
                })
                .catch(function (error) {
                    console.log("Erro axios: " + error);
                    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8'});
                    res.end("Erro axios: " + error);
            })
        }
        else{
            axios.get("http://localhost:3000/pessoas")
            .then(function (resp) {
                var pessoas = resp.data;
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8'});
                res.end(mypages.listaTop10(pessoas));
            })
            .catch(function (error) {
                console.log("Erro axios: " + error);
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8'});
                res.end("Erro axios: " + error);
            })
        }
    }
    else if ('/' + segments[1] == '/pessoa') {
        axios.get("http://localhost:3000/pessoas?id=" + segments[2])
            .then(function (resp) {
                var pessoa = resp.data;
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8'});
                res.end(JSON.stringify(pessoa));
            })
            .catch(function (error) {
                console.log("Erro axios: " + error);
                res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8'});
                res.end("Erro axios: " + error);
            })
    }
    else{
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8'});
        res.end("Erro: Operação não suportada");
    }
}).listen(7777)

console.log('Servidor à escuta na porta 7777...');
