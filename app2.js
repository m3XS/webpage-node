var formidable = require('formidable');
var http = require('http');
var fs = require('fs');
const {exec} = require("child_process");

var port = 8080;
var hostname = "192.168.10.66";

const server = http.createServer(function (req, res) {
    if (req.url == '/openfolder') {
        const { exec } = require("child_process");

        exec("open ./", (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
        });
    } else {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('<form action="openfolder" method="post" enctype="multipart/form-data">');
        res.write('<input type="submit" name="filetoupload">Open Finder Folder<br>');
        res.write('</form>');
        return res.end();
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
