var http = require("http");
var express = require("express");
var fs = require("fs");
var url = require("url");
var querystring = require('querystring');
var ejs = require('ejs');


http.createServer(function (request,response) {
    var up = url.parse(request.url);
    var pathname = up.pathname;

    var data = '';
    if(pathname=='/login'){
        var retData = {
            isSuccess:false,
            message:'',
            content:null
        }
        request.on("data",function (chunk) {
            data += chunk;
        })
        request.on("end",function () {
            var username = JSON.parse(data).username;
            var password = JSON.parse(data).password;

            if(username=="wang7liang" && password=="123456"){
                retData.isSuccess=true;
                retData.content={id:1,username:username,password:password};
            }else{
                retData.isSuccess=false;
                retData.message="用户名或者密码错误";
            }
            response.writeHead(200, {'Content-Type': 'text/plain'});
            response.end(JSON.stringify(retData));
        })
    }else if(pathname=='/getUserInfo'){
        var id = querystring.parse(up.query).id

        var retData = {
            isSuccess:false,
            message:'',
            content:null
        }
        request.on("data",function (chunk) {
            data += chunk;
        })
        request.on("end",function () {

            if(id=="1"){
                retData.isSuccess=true;
                retData.content={id:1,name:"王琪亮",sex:"男"};
            }else{
                retData.isSuccess=false;
                retData.message="无此用户";
            }
            response.writeHead(200, {'Content-Type': 'text/plain'});
            response.end(JSON.stringify(retData));
        })

    }else if(pathname=='/main'){
        var id = querystring.parse(up.query).id

        data = fs.readFileSync('../app/main.html').toString();

        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(data);
        response.end();

    }else if(pathname=='/detail'){
        var name = querystring.parse(up.query).name
        var sex = querystring.parse(up.query).sex
        data = fs.readFileSync('../app/detail.ejs').toString();
        ejs.renderFile('../app/detail.ejs',{name:name,sex:sex},function (err,str) {
            data = str;
        })
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(data);
        response.end();
    }else{
        data = fs.readFileSync('../app/login.html').toString();
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(data);
        response.end();
    }

}).listen(80);
