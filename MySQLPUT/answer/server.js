const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const fs = require('fs');
// ?1
const mysql = require('mysql'); 

app.use(express.urlencoded({extended: true}));
app.use(express.json());

let movies = [{id: 1, title: 'hi', rating: 'T'}];

// ?2
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'admin',
    database: 'moviesDB'
});

// ?3
connection.connect(function(err){
    if (err) throw err;
    console.log(`Connected as id ${connection.threadId}`);
});

app.listen(PORT, () => console.log(`Server listening on PORT: ${PORT}`));

app.get('/', function(req, res){
    copyMoviesFromDB();
    displayIndexHtml(function(err, indexHtml){
        if (err) throw err;
        res.status(200).end(indexHtml);
    });

});

// ?4
app.put('/api/movies/:id', function(req, res){
    let movie = movies.find(x => x.id === parseInt(req.params.id));
    if (movie === undefined) throw `error: movie id ${parseInt(req.params.id)} undefined.`;
    movie.rating = req.body.rating;

    updateMovieInDB(movie);
    copyMoviesFromDB();

    displayIndexHtml(function(err, indexHtml){
        if (err) throw err;
        res.status(200).end(indexHtml);
    });
});

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
function updateMovieInDB(movie){
    connection.query('UPDATE movies SET rating = ? WHERE id = ?', [movie.rating, movie.id], function(err, result){
        if (err) throw err;
        else if (result.affectedRows === 0) throw 'error: result.affectedRows === 0'
        
        console.log(`${movie.title} rating changed to ${movie.rating}`);
    });
}

function createMoviesHtml(){
    let moviesHtmlArry = movies.map(movie => `<li>${movie.id}. ${movie.title} | rating: ${movie.rating}</li>`);
    return moviesHtmlArry.join('');
}