var express = require('express');
var bigram = require('./algorithm/bigram');
var formidable = require('formidable');
var fs = require('fs');
var bigram = require('./algorithm/bigram');
var port = 12225;

var app = express();

app.use(express.static(__dirname +'/public'));


app.post('/server',(req,res)=>{
  var form = new formidable.IncomingForm();
  form.uploadDir = __dirname;
  form.parse(req,(err,fields,files)=>{
    var oldPath = files.fileUpload.path;
    var newPath = __dirname + '/uploaded/txtFile/'+files.fileUpload.name;
    fs.rename(oldPath,newPath,(err)=>{
      if(err)throw err;
      res.status(200).send(files.fileUpload.name);
      res.end();
      console.log(`${files.fileUpload.name} file uploaed into uploaded dir`);
      
      var bigramObj;
      bigram.txtToJson(newPath,(obj)=>{
          bigram.schemaFormation(obj,(obj)=>{
              var json = JSON.stringify(obj);
              var n = 
              fs.writeFile(__dirname+'/uploaded/jsonFile/QA.json',json,(err)=>{
                console.log('The file has been saved!');
              });
          });
      });
    });
  });
});

app.post('/ask',(req,res)=>{
  var form = new formidable.IncomingForm();
  form.parse(req,(err,fields,files)=>{
      var question = fields['userQ'];
      var obj = JSON.parse(fs.readFileSync(__dirname+'/uploaded/jsonFile/QA.json','utf8'));
      bigram.evalQuery(question,obj,(err,max_index)=>{
        if(err) return res.send(err);
          res.send(obj.conversations[max_index].A);
      });
  });
});


app.listen(port,()=>{
  console.log(`Listening on port: ${port}`);
});


