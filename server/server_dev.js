var path = require('path');
var bodyParser = require('body-parser');
var mongodb = require('mongodb');
var express = require("express");

var MongoClient = mongodb.MongoClient;
var ObjectId = mongodb.ObjectId;
var url = "mongodb://192.168.200.1:27017/";

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

    MongoClient.connect(url,function (err,db) {
        if(err){
            console.log(err);
        }else{
            var dbo = db.db("happyday");
            dbo.collection("user").findOne({username: username, password:password},{},function (err,doc) {
                if(err){
                    throw err;
                }else{
                    if(doc==null){
                        retData.isSuccess=false;
                        retData.message="用户名或者密码错误";
                    }else{
                        retData.isSuccess=true;
                        retData.content={id:doc._id.toString()};
                    }
                    res.end(JSON.stringify(retData));
                }
            });
        }
    })
})

app.get('/getUserInfo',function (req,res) {
    var retData = {
        isSuccess:false,
        message:'',
        content:null
    }

    var id = req.query.id;
    id = ObjectId(id)


    MongoClient.connect(url,function (err,db) {
        if(err){
            console.log(err);
        }else{
            var dbo = db.db("happyday");
            dbo.collection("user").findOne({_id: id},{},function (err,doc) {
                if(err){
                    throw err;
                }else{
                    if(doc==null){
                        retData.isSuccess=false;
                        retData.message="无此用户";
                    }else{
                        retData.isSuccess=true;
                        retData.content=doc;
                    }
                    res.end(JSON.stringify(retData));
                }
            });
        }
    })

})


app.listen(80);