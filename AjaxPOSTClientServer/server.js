const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const fs = require("fs");

app.use(express.urlencoded({extended: true}));
app.use(express.json());

let items = [
    {id: 1, name: "rbd"},
];

app.get("/", function(req, res){
    sendItemsHtml(res);
});

app.post("/api/items", function(req, res){
    let item = { id: items.length + 1, name: req.body.userInput };
    items.push(item);
    sendItemsHtml(res);
});


function sendItemsHtml(res){
    fs.readFile(`${__dirname}/index.html`, "utf-8", function(err, data){
        if (err) throw err;
        res.end(data.replace("{{{items}}}", createItemsHtml()));
    });
}

function createItemsHtml(){
    let itemsHtmlArry = items.map(x => `<li>${x.id}. ${x.name}</li>`);
    return itemsHtmlArry.join('');
}

app.listen(PORT, () => console.log(`Server listening on PORT: ${PORT}`));

