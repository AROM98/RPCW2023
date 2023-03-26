var axios = require('axios')
var Pessoa = require('../models/pessoa')

// Pessoa list
module.exports.list = () => {
    return Pessoa.find().sort({nome: 1})
    .then(docs => { 
        return docs
    })
    .catch(err => {
        return err
    })
}

module.exports.getPessoa = id => {
    return Pessoa.findOne({id: id})
    .then(docs => {
        return docs
    })
    .catch(err => {
        return err
    })
}

module.exports.addPessoa = p => {
    return Pessoa.create(p) /// insertOne
    .then(resposta => {
        return resposta
    })
    .catch(erro => {
        return erro
    })  
}

module.exports.updatePessoa = p => {
    return Pessoa.updateOne({id: p.id}, p)
    .then(resposta => {
        return resposta
    })
    .catch(erro => {
        return erro
    })
}

module.exports.deletePessoa = id => {
    return Pessoa.deleteOne({id: id})
    .then(resposta => {
        return resposta
    })
    .catch(erro => {
        return erro
    })
}