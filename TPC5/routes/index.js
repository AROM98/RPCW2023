var express = require('express');
var router = express.Router();
var Tarefa = require('../controllers/tarefa')

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

/* GET home page. */
router.get('/', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Tarefa.listTarefas()
    .then(tarefas => {
      console.log(tarefas)
      var next_id = geraIds(tarefas)
      res.render('index', { tarefas: tarefas, d: data, next_id: next_id })
    })
    .catch(erro => {
      res.render('error', {error: erro})
    })
});

router.post('/tarefas', function(req, res){
  Tarefa.addTarefa(req.body)
    .then(dados => {
      res.redirect('/')
    })
    .catch(erro => {
      res.render('error', {error: erro})
    })
})

router.post('/tarefas/editar', function(req, res){
  Tarefa.editTarefa(req.body)
    .then(dados => {
      res.redirect('/')
    })
    .catch(erro => {
      res.render('error', {error: erro})
    })
})

router.get('/tarefas/:id/concluir', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Tarefa.getTarefa(req.params.id)
    .then(tarefa => {
      console.log(tarefa)
      tarefa[0].estado = "concluido"
      Tarefa.editTarefa(tarefa[0])
        .then(tarefa => {
          res.redirect('/')
        })
        .catch(erro => {
          res.render('error', {error: erro})
        })
    })
    .catch(erro => {
      res.render('error', {error: erro})
    })
});

router.get('/tarefas/:id/editar', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Tarefa.getTarefa(req.params.id)
    .then(tarefa => {
      console.log(tarefa)
      res.render('editar', { tarefa: tarefa[0], d: data })
    })
    .catch(erro => {
      res.render('error', {error: erro})
    })
});

router.get('/tarefas/:id/apagar', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  Tarefa.deleteTarefa(req.params.id)
    .then(tarefa => {
      res.redirect('/')
    })
    .catch(erro => {
      res.render('error', {error: erro})
    })
});



module.exports = router;
