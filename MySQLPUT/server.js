const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const fs = require('fs');
// ?1

app.use(express.urlencoded({extended: true}));
app.use(express.json());

let movies = [{id: 1, title: 'hi', rating: 'T'}];

// ?2

// ?3

app.listen(PORT, () => console.log(`Server listening on PORT: ${PORT}`));

app.get('/', function(req, res){
    copyMoviesFromDB();
    displayIndexHtml(function(err, indexHtml){
        if (err) throw err;
        res.status(200).end(indexHtml);
    });

});

// ?4

function copyMoviesFromDB(){
    connection.query('SELECT * FROM movies', function(err, result){
        if (err) throw err;
        movies = result;
    });
}

function displayIndexHtml(callback){
    fs.readFile(`${__dirname}/index.html`, 'utf-8', function(err, data){
        if (err) callback(err, undefined);
        callback(undefined, data.replace('{{{_movies}}}', createMoviesHtml())) 
    });
}

// ?5

function createMoviesHtml(){
    let moviesHtmlArry = movies.map(movie => `<li>${movie.id}. ${movie.title} | rating: ${movie.rating}</li>`);
    return moviesHtmlArry.join('');
}