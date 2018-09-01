var http = require("http");
var express = require("express");
var fs = require("fs");
var url = require("url");

http.createServer(function (request,response) {

    var pathname = url.parse(request.url).pathname;

    var data;
    if(pathname=='/main'){
        data = fs.readFileSync('../app/main.html');
    }else{
        data = fs.readFileSync('../app/login.html');
    }
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write(data.toString())
    response.end();
}).listen(80);
