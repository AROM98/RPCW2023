var express = require('express');
var router = express.Router();
var Pessoa = require('../controllers/pessoa')

/* GET home page. */
router.get('/', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Pessoa.list()
    .then(pessoas => {
      res.render('index', { slist: pessoas, d: data });
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção da lista de alunos"})
    })
});

/* GET Student Form. */
router.get('/pessoas/registo', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  res.render('addPessoaForm', {d: data})
});

/* GET Student page. */
router.get('/pessoas/:idPessoa', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Pessoa.getPessoa(req.params.idPessoa)
    .then(pessoa => {
      res.render('pessoa', { a: pessoa, d: data });
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção do registo de aluno"})
    })
});

/* GET Student Update Form. */
router.get('/pessoas/edit/:idPessoa', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Pessoa.getPessoa(req.params.idPessoa)
    .then(pessoa => {
      res.render('updatePessoaForm', {a: pessoa, d: data})
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção do registo de aluno"})
    })
});

/* GET Student Delete Form. */
router.get('/pessoas/delete/:idPessoa', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Pessoa.getPessoa(req.params.idPessoa)
    .then(pessoa => {
      res.render('deletePessoaForm', {a: pessoa, d: data})
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção do registo de aluno"})
    })
});

/* GET Delete Confirmation */
router.get('/pessoas/delete/:idPessoa/confirm', (req,res)=>{
  Pessoa.deletePessoa(req.params.idPessoa)
    .then(resposta => {
      res.redirect('/')
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na obtenção do registo de aluno"})
    })
})

// POST Student Form Data
router.post('/pessoa/registo', (req,res) => {
  var data = new Date().toISOString().substring(0, 16)
  Pessoa.addPessoa(req.body)
    .then(pessoa => {
      res.render('addPessoaConfirm', {a: pessoa})
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro no armazenamento do registo de aluno"})
    })
})

// POST Student Update Form
router.post('/pessoas/edit', (req,res) => {
  var data = new Date().toISOString().substring(0, 16)
  Pessoa.updatePessoa(req.body)
    .then(pessoa => {
      res.render('updatePessoaConfirm', {a: pessoa})
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Erro na alteração do registo de aluno"})
    })
})

module.exports = router;
