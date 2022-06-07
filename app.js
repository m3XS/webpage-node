var http = require('http');
var fs = require('fs');
const {exec} = require("child_process");

const hostname = '127.0.0.1';
const port = 8080;

const server = http.createServer((req, res) => {

    fs.readFile('./index.html', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.write("<h1>404 Page not found!</h1>");
            return res.end();
        }
        if (req.url == '/'){
            res.write(data);
            res.end();
        }
        if (req.url == '/db'){
            fs.readFile('./db.html', 'utf8', (err, data) => {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                var mysql = require('mysql');

                var con = mysql.createConnection({
                    host: "localhost",
                    user: "root",
                    password: "united231",
                    database: "classicmodels"
                });

                con.connect(function(err) {
                    if (err) throw err;
                    console.log("DB Connected!");
                    let test = con.query("SELECT * FROM customers", function (err, result, fields) {
                        if (err) throw err;
                        console.log(result);
                    });
                });

                console.log(data2);
                res.end();
            });
        }

    });
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});