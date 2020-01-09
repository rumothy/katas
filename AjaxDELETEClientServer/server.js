const express = require("express");
const fs = require("fs");
const tagBuilder = require("tag-builder");
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({extended: true}));
app.use(express.json());

let items = [
    { id: 1, name: "please!"},
    { id: 2, name: "nooo!"},
    { id: 3, name: "ahhhhh!"},
];

app.get("/", function(req, res){
    sendIndexHtml(res);
});

app.delete("/api/items/:id", function(req, res){
    items = items.filter(item => item.id !== parseInt(req.params.id));
    sendIndexHtml(res);
});

function sendIndexHtml(res){
    fs.readFile(`${__dirname}/index.html`, "utf-8", function(err, data){
        if (err) throw err;
        res.end(data.replace("{{{_items}}}", createItemsHtml()));
    });
}

function createItemsHtml(){
    let arry = items.map(item => createItemHtml(item));
    return arry.join('');
}

function createItemHtml(item){
    let li = tagBuilder.create('li');
    let p = tagBuilder.create('p').text(`${item.id}. ${item.name}`);
    let button = tagBuilder.create('button')
        .attr({"data-itemid": item.id.toString()})
        .addClass("btnDelete")
        .text("delete?");
    p.appendHtml(button);
    li.appendHtml(p);
    return li.toString();
}

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));