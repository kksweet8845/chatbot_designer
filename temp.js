const express = require('express')
const formidable = require('formidable')
const app = express()
const port = 8787

var http = require('http');
var fs = require('fs');
var QAJson = './public/uploaded/QA.json'
var obj = require(QAJson)
var dic = []
var bidic = []
var scoreboard = []
var Qdic = []

app.listen(port)
app.use(express.static(__dirname + '/public'))


function bigram_formation(){
    console.log('bigraming')
    count = 0
    flag = 0
    for(var keys in obj){
        //keys : obj[keys]
        if(flag == 0){
            //Q
            bidic.push([])
            for(var i = 0; i<obj[keys].length-1; i++){
                if(i==0){
                    tempS = obj[keys][i] + obj[keys][i+1]
                    bidic[count].push(tempS)
                }
                else{
                    tempS = obj[keys][i] + obj[keys][i+1]
                    bidic[count].push(tempS)

                }
            }
            dic[count] = obj[keys]
            flag = 1
            scoreboard.push(0)
        }
        else{
            //A
            flag = 0
            count++
        }
    }
    console.log('=========================')
    console.log(dic)

    console.log('=========================')
    console.log(bidic)

    console.log('Score : ' + scoreboard)
}

function question_bigram(string){
    Qdic = []
    for(var i = 0; i<string.length-1; i++){
        tempS = string[i] + string[i+1]
        Qdic.push(tempS)
    }
    console.log(Qdic)
}

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

app.get('/ask',function(req,res){
    Q = req.query.userQ
    question_bigram(Q)
    for(var i = 0; i < Qdic.length; i++){

    }
})
