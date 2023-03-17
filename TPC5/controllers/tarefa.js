var axios = require('axios')

//retorna a lista de todas tarefas
module.exports.listTarefas = () => {
    return axios.get('http://localhost:3000/tarefas')
        .then(resposta => {
            return resposta.data
        })
        .catch(erro => {
            return erro
        })
}

//retorna a tarefa com o id passado como parâmetro
module.exports.getTarefa = id => {
    return axios.get('http://localhost:3000/tarefas?id=' + id)
        .then(resposta => {
            return resposta.data
        })
        .catch(erro => {
            return erro
        }
    )
}

//edita a tarefa com o id passado como parâmetro
module.exports.editTarefa = tarefa => {
    return axios.put('http://localhost:3000/tarefas/' + tarefa.id, tarefa)
        .then(resposta => {
            return resposta.data
        })
        .catch(erro => {
            return erro
        })
}

//adiciona uma nova tarefa
module.exports.addTarefa = tarefa => {
    return axios.post('http://localhost:3000/tarefas/', tarefa)
        .then(resposta => {
            return resposta.data
        })
        .catch(erro => {
            return erro
        })
}

//apaga a tarefa com o id passado como parâmetro
module.exports.deleteTarefa = id => {
    return axios.delete('http://localhost:3000/tarefas/' + id)
        .then(resposta => {
            return resposta.data
        })
        .catch(erro => {
            return erro
        }      
    )
}




