
exports.geraHomepage = function ( tarefas, d, next_id){

    let pagHTML = `
    <html>
        <head>
            <title>Registo de Tarefas</title>
            <meta charset="utf-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
            <style>
* {
  box-sizing: border-box;
}

.row {
  margin-left:-5px;
  margin-right:-5px;
}
  
.column {
  float: left;
  width: 50%;
  padding: 5px;
}

/* Clearfix (clear floats) */
.row::after {
  content: "";
  clear: both;
  display: table;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  border: 1px solid #ddd;
}

th, td {
  text-align: left;
  padding: 16px;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

/* Responsive layout - makes the two columns stack on top of each other instead of next to each other on screens that are smaller than 600 px */
@media screen and (max-width: 600px) {
  .column {
    width: 100%;
  }
}
</style>
        </head>
        <body>
        
            <div class="w3-container w3-teal">
                <h2>Registo de Tarefa</h2>
            </div>
            <form class="w3-container" action="/tarefas" method="POST">
                <input type="hidden" name="id" value="${next_id}">
                <label class="w3-text-teal"><b> Autor </b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="autor">
          
                <label class="w3-text-teal"><b> Data Limite </b></label>
                <input class="w3-input w3-border w3-light-grey" type="date" name="datafinal">
                <label class="w3-text-teal"><b> Descrição </b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="descricao">
                <label class="w3-text-teal"><b> Tipo de tarefa </b></label>
                <select class="w3-select w3-border w3-light-grey" name="tipo">
                    <option value="" disabled selected> Escolha o tipo </option>
                    <option value="Emprego"> Emprego </option>
                    <option value="Pessoal"> Pessoal </option>
                    <option value="Casa"> Casa </option>
                    <option value="Familia"> Familia </option>
                </select>
                
                <input type="hidden" name="estado" value = "por fazer">
          
                <input class="w3-btn w3-blue-grey" type="submit" value="Registar"/>
                <input class="w3-btn w3-blue-grey" type="reset" value="Limpar"/> 
            </form>`

            pagHTML += `
            <div class="row">
            <div class="column">
            <h3><b>Tarefas por fazer: </b></h3>
            <table class="w3-table w3-bordered">
                <tr class="w3-red">
                    <th>Autor</th>
                    <th>Data Limite</th>
                    <th>Descrição</th>
                    <th>Tipo</th>
                    <th>Estado</th>
                    <th>Editar</th>
                </tr>
                `
    tarefas.forEach(t => {
        if(t.estado != "concluido"){
            console.log("VOU POR === "+ t.id)
            console.log("INFO === "+ t.estado)
            pagHTML += `
            <tr>
                <td>${t.autor}</td>
                <td>${t.datafinal}</td>
                <td>${t.descricao}</td>
                <td>${t.tipo}</td>
                <td>${t.estado}</td>
                <td>
                    <a href="/tarefas/${t.id}/concluir/"> [Concluir] </a>
                    <a href="/tarefas/${t.id}/editar/"> [Editar] </a>
                    <a href="/tarefas/${t.id}/apagar/"> [Apagar] </a>
                </td>
            </tr>`
        }
        else{
            console.log("NAO VOU POR === "+ t.id)
        }
    });
    pagHTML += `</table>
    </div> `

    


    pagHTML += `
            <div class="column">
            <h3><b>Tarefas concluidas:</b></h3>
            <table class="w3-table w3-bordered">
                <tr class="w3-green">
                    <th>Autor</th>
                    <th>Data Limite</th>
                    <th>Descrição</th>
                    <th>Tipo</th>
                    <th>Estado</th>
                    <th>Apagar</th>
                </tr>
                `
    tarefas.forEach(t => {
        if(t.estado == "concluido"){
            pagHTML += `
            <tr>
                <td>${t.autor}</td>
                <td>${t.datafinal}</td>
                <td>${t.descricao}</td>
                <td>${t.tipo}</td>
                <td>${t.estado}</td>
                <td> 
                    <a href="/tarefas/${t.id}/editar/"> [Editar] </a> 
                    <a href="/tarefas/${t.id}/apagar/"> [Apagar] </a> 
                </td>
            </tr>`
        }
    });
    pagHTML += `</table>
    </div> 
    </div>`


   pagHTML +=`       <footer class="w3-container w3-teal">
                <address>Gerado por A84347 @ RPCW2023 em ${d}</address>
            </footer>
        </body>
    </html>
    `
    return pagHTML
}


exports.geraPostConfirm = function( tarefa, d ){
    return `
    <html>
        <head>
            <title> POST receipt tarefa com id=${tarefa.id}</title>
            <meta charset="utf-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
        </head>
        <body>
        <div class="w3-card-4">
                <header class="w3-container w3-teal">
                    <h1> Tarefa com id=${tarefa.id} inserida com sucesso!</h1>
                </header>
            <div class="w3-container">
                <p><a href="/"> [HOME]</a></p>
            </div>
            <footer class="w3-container w3-teal">
                <address>Gerado por A84347 @ RPCW2023 em ${d}</address>
            </footer>
        </body>
    </html>
    `
}


exports.geraPagEdit = function(tarefa, d){
    var pagHTML = `
    <html>
        <head>
            <title> Editar tarefa com id=${tarefa.id}</title>
            <meta charset="utf-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
        </head>
        <body>
        <div class="w3-card-4">
                <header class="w3-container w3-teal">
                    <h1> Editar tarefa com id=${tarefa.id} </h1>
                </header>
            <div class="w3-container">
            <form class="w3-container" action="/tarefas/editar" method="POST">
            <input type="hidden" name="id" value="${tarefa.id}">
            <label class="w3-text-teal"><b> Autor </b></label>
            <input class="w3-input w3-border w3-light-grey" type="text" name="autor" value="${tarefa.autor}">
      
            <label class="w3-text-teal"><b> Data </b></label>
            <input class="w3-input w3-border w3-light-grey" type="date" name="datafinal" value="${tarefa.datafinal}">
            <label class="w3-text-teal"><b> Descrição </b></label>
            <input class="w3-input w3-border w3-light-grey" type="text" name="descricao" value="${tarefa.descricao}">
            <label class="w3-text-teal"><b> Tipo de tarefa </b></label>
            <select class="w3-select w3-border w3-light-grey" name="tipo" value="${tarefa.tipo}">
                <option value="Emprego"> Emprego </option>
                <option value="Pessoal"> Pessoal </option>
                <option value="Casa"> Casa </option>
                <option value="Familia"> Familia </option>
            </select>
            
            <br>
            <label class="w3-text-teal"><b> Estado </b></label> <br>
            <input class="w3-radio" type="radio" name="estado" value="por fazer" checked>
            <label>Por fazer</label>
            <input class="w3-radio" type="radio" name="estado" value="concluido">
            <label>Concluido</label>
            <br>
            <br>
            <input class="w3-btn w3-blue-grey" type="submit" value="Submeter edição"/>
            <input class="w3-btn w3-blue-grey" type="reset" value="Limpar"/> 
            <a href="/" class="w3-button w3-blue-grey"> [Cancelar] </a>
        </form>
            </div>
            <footer class="w3-container w3-teal">
                <address>Gerado por A84347 @ RPCW2023 em ${d}</address>
            </footer>
        </body>
    </html>`
    return pagHTML
}

exports.geraPagDelete = function(tarefa, d){
    var pagHTML = `
    <html>
        <head>
            <title> Apagar tarefa com id=${tarefa.id}</title>
            <meta charset="utf-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
        </head>
        <body>
        <div class="w3-card-4">
                <header class="w3-container w3-teal">
                    <h1> Apagar tarefa com id=${tarefa.id} </h1>
                </header>
            <div class="w3-container">
            <form class="w3-container" action="/tarefas/apagar" method="POST">
            <input type="hidden" name="id" value="${tarefa.id}">
            <input class="w3-btn w3-blue-grey" type="submit" value="Apagar Tarefa"/>
            <a href="/" class="w3-button w3-black"> [Cancelar] </a>
        </form>
            </div>
            <footer class="w3-container w3-teal">
                <address>Gerado por A84347 @ RPCW2023 em ${d}</address>
            </footer>
        </body>
    </html>`
    return pagHTML
}


exports.geraPutConfirm = function( tarefa, d ){
    return `
    <html>
        <head>
            <title> PUT receipt tarefa com id=${tarefa.id}</title>
            <meta charset="utf-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
        </head>
        <body>
        <div class="w3-card-4">
                <header class="w3-container w3-teal">
                    <h1> Tarefa com id=${tarefa.id} editada com sucesso!</h1>
                </header>
            <div class="w3-container">
                <p><a href="/"> [HOME]</a></p>
            </div>
            <footer class="w3-container w3-teal">
                <address>Gerado por A84347 @ RPCW2023 em ${d}</address>
            </footer>
        </body>
    </html>
    `
}

exports.geraDeleteConfirm = function( tarefa, d ){
    return `
    <html>
        <head>
            <title> DELETE receipt</title>
            <meta charset="utf-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
        </head>
        <body>
        <div class="w3-card-4">
                <header class="w3-container w3-teal">
                    <h1> Tarefa eliminda com sucesso!</h1>
                </header>
            <div class="w3-container">
                <p><a href="/"> [HOME]</a></p>
            </div>
            <footer class="w3-container w3-teal">
                <address>Gerado por A84347 @ RPCW2023 em ${d}</address>
            </footer>
        </body>
    </html>
    `
}