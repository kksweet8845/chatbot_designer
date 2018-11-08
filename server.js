const express = require('express')
const formidable = require('formidable')
const app = express()
const port = 8787

var http = require('http');
var fs = require('fs');
var QAJson = './public/uploaded/QA.json'
var obj = require(QAJson)
var dic = [[]]


app.listen(port)
app.use(express.static(__dirname + '/public'))




function bigram_formation(){
    console.log('bigraming')
    count = 0
    flag = 0
    for(var keys in obj){
        //keys : obj[keys]
        if(flag == 0){
            // dic[count].push([])
            // for(var i = 0; i<obj[keys].length-1; i++){
            //     dic[count][i] = obj[keys][i] + obj[keys][i+1]
            // }
            dic[count] = obj[keys]
            flag = 1
        }
        else{
            flag = 0
            count++
        }
        console.log(obj[keys].length)
    }
    console.log(dic)
}

app.get('/fileUpload',function(req,res){
    var form = new formidable.IncomingForm();
    // console.log(form)

    console.log(form.parse(req))
    form.on('fileBegin', function (name, file){
        file.path = __dirname + '/storage/' + file.name;
        console.log('Uploaded ' + file.path)
    });

    form.on('file', function (name, file){
        console.log('Uploaded ' + file.name);
    });

    // form.parse(req,(err,fields,files)=>{
    //     console.log('123');
    //     console.log(files);
    //   var oldPath = files.fileUpload.path;
    //   console.log('456');
    //
    //   var newPath = __dirname + '/public/uploaded/testtestest';
    //   fs.rename(oldPath,newPath,(err)=>{
    //     if(err) throw err;
    //     console.log(newPath)
    //     res.send('<h1>File Uploaded<h1>');
    //   });
    // });
})

app.get('/list', function(req, res){
    try {
        console.log('Updating QA.json')
        var data = fs.readFileSync('./public/uploaded/QA.txt', 'utf8');
        // console.log(data.length)
        count = 0
        flag = 0
        for(var i = 0; i<data.length; i++){
            temp = ""
            if(flag == 0){
                flag = 1
                while(data[i] != '\n'){
                    temp = temp + data[i]
                    i++
                }
                obj['Q'+count] = temp
            }
            else{
                flag = 0
                while(data[i] != '\n'){
                    temp = temp + data[i]
                    i++
                }
                obj['A'+count] = temp
                count++
            }
        }
        var JSONstring = JSON.stringify(obj)
        fs.writeFileSync(QAJson, JSONstring, 'utf8');
        console.log('Upload success !')
        res.send('<h1>Json update success !!!</h1>')
    } catch(e) {
        console.log('Error:', e.stack);
    }
    bigram_formation();
})
