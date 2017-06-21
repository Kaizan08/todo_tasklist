const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const app = express();


app.engine('mustache',mustacheExpress());
app.set('views','./public');
app.set('view engine', 'mustache');
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: false})); 
app.use(express.static('./public'));
var todos = [{"task":"Do dishes", "complete":false},{"task":"Mow lawn", "complete":false},{"task":"Wash Car", "complete":true}];

app.get("/", function (req, res) {
  console.log(todos.sort(compare));
  res.render('index', { todos: todos });
});

app.post("/", function (req, res) {
  var newObj = { "task":req.body.task, "complete": false}
  todos.push(newObj);
  res.redirect('/');
});

//sorts the array
function compare(a, b) {
  // Use toUpperCase() to ignore character casing
  const arrayA = a.complete;
  const arrayB = b.complete;

  let comparison = 0;
  if (arrayA > arrayB) {
    comparison = 1;
  } else if (arrayA < arrayB) {
    comparison = -1;
  }
  return comparison;
}

app.listen(3000);