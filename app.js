var http = require('http');
var fs = require('fs');

http.createServer((req, res) => {
    var url = req.url;

    if (url == "/") {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Sending sample response</title></head>');
        res.write('<body><form name="nameForm" action="/message" method="POST"><label for="name">name</label><input type="text" id="name" name="message" /><button type="submit">submit</button></form></body>');
        res.write('</html>');
        return res.end();//we should not be writing anything after res.end()
    }
    if (url == '/message' && req.method == "POST") {
        const body = [];
        req.on('data', (data) => {
            body.push(data);
        })

        return req.on('end', () => {
            var message = Buffer.concat(body).toString().split("=")[1];
            console.log(message);
            console.log('hello')
            // fs.writeFileSync('message.txt', message);
            fs.writeFile('message.txt', message, err => {
                if (err)
                    return res.writeHead(500, 'Internal error');
                res.writeHead(302, { "Location": "/" });
                return res.end();

            })

        });
    }
    else {
        // console.log(req.headers, req.url, req.method);
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>Sending sample response</title></head>');
        res.write('<body><b>Hello from the NodeJS server<b></body>');
        res.write('</html>');
        res.end();//we should not be writing anything after res.end()
    }



}).listen(9000, () => {
    console.log('listening at 9000');
})