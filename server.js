const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const app = express();
const models = require("./models")

app.engine('mustache',mustacheExpress());
app.set('views','./public');
app.set('view engine', 'mustache');
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: false})); 
app.use(express.static('./public'));

app.get("/", function (req, res) {
  models.todo.findAll().then(function (row){
    res.render('index', {todos: row})
  .catch(function(err){
        res.status(500).send(err);
    });
})})

app.post("/", function (req, res) {
  if (req.body.task){
    var task = models.todo.build({task:req.body.task});
    task.save().then(function(savedTask){
        res.redirect('/');
    }).catch(function(err){
        res.status(500).send(err);
    });
  } else if (req.body.del){
    var tasknum = req.body.del;
    console.log(tasknum);
    models.todo.destroy({where: {task:tasknum}}).then(
    function(){
      res.redirect('/');
    }).catch(function(err){
  res.status(500).send(err);
});
  } else {
    var obj = req.body.mark;
    models.todo.update({complete:true, updatedAt:Date()}, {where: {task:obj}}).then(function (task){
      res.redirect('/');
    }).catch(function(err){
        res.status(500).send(err);
    });
  }
});

app.listen(3000);
