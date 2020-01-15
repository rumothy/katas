const express = require('express');
const app = express();
const expbhs = require('express-handlebars');

const PORT = process.env.PORT || 8080;

app.engine('handlebars', expbhs({defaultLayout: "mainLayout"}));
app.set('view engine', 'handlebars');

app.get("/", function(req, res){
    res.render('indexView');
});

let dbItems = [
    { id: 1, name: 'item 1'},
    { id: 2, name: 'item 2'},
    { id: 3, name: 'item 3'},
];

app.get("/items", function(req, res){
    res.render('itemsView',{ 
        items: dbItems
    });
});

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));