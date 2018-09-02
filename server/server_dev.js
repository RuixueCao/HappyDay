var path = require('path');
var bodyParser = require('body-parser');
var express = require("express");


var app = express();
app.use(express.static('../app'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.get('/',function (req,res) {
    res.sendFile(path.resolve("../app/login.html"));
})

app.get('/main',function (req,res) {
    res.sendFile(path.resolve("../app/main.html"));
})

app.post('/login',function (req,res) {
    var retData = {
        isSuccess:false,
        message:'',
        content:null
    }

    var username = req.body.username;
    var password = req.body.password;

    if(username=="wang7liang" && password=="123456"){
        retData.isSuccess=true;
        retData.content={id:1,username:username,password:password};
    }else{
        retData.isSuccess=false;
        retData.message="用户名或者密码错误";
    }
    res.end(JSON.stringify(retData));
})

app.get('/getUserInfo',function (req,res) {
    var retData = {
        isSuccess:false,
        message:'',
        content:null
    }

    var id = req.query.id;

    if(id=="1"){
        retData.isSuccess=true;
        retData.content={id:1,name:"王琪亮",sex:"男"};
    }else{
        retData.isSuccess=false;
        retData.message="无此用户";
    }
    res.end(JSON.stringify(retData));
})


app.listen(80);