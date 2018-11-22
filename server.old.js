const express = require('express')
const formidable = require('formidable')
const app = express()
const port = 11352

var http = require('http');
var fs = require('fs');
//var QAJson = './public/uploaded/QA.json'
//var obj = require(QAJson)
var dic = []
var bidic = []
var scoreboard = []
var Adic = []
var Qdic = []

app.listen(port)
app.use(express.static(__dirname + '/public'))


/*function bigram_formation(){
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
            console.log(obj[keys])
            Adic.push(obj[keys])
            count++
        }
    }
    console.log('Q =========================')
    console.log(dic)

    console.log('A =========================')
    console.log(Adic)

    console.log('Q bigram =========================')
    console.log(bidic)

}

function question_bigram(string){
    Qdic = []
    for(var i = 0; i<string.length-1; i++){
        tempS = string[i] + string[i+1]
        Qdic.push(tempS)
    }
    console.log('User bigram =========================')
    console.log(Qdic)
}*/

app.post('/list', function(req, res){
    try {
        console.log('Updating QA.json')
        var form = new formidable.IncomingForm();
        form.uploadDir = __dirname;
        form.parse(req,(err,fields,files)=>{
          var oldPath = files.fileUpload.path;
          var newPath = __dirname + '/uploaded/QA.txt';
          fs.rename(oldPath,newPath,(err)=>{
            if(err) throw err;
          });
        });

        var data = fs.readFileSync('./uploaded/QA.txt', 'utf8');
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

    for(var i = 0; i<scoreboard.length; i++){
        scoreboard[i] = 0
    }

    for(var i = 0; i < Qdic.length; i++){
        for(var j = 0; j< bidic.length; j++){
            if(bidic[j].includes(Qdic[i])){
                scoreboard[j]++
            }
        }
    }

    for(var i = 0; i<scoreboard.length; i++){
        scoreboard[i] = scoreboard[i]/bidic[i].length
    }

    var highest_flag = -1
    var highest_val = -1

    for(var i = 0; i<scoreboard.length; i++){
        if(scoreboard[i] != 0 && scoreboard[i] > highest_val){
            highest_val = scoreboard[i]
            highest_flag = i
        }
    }
    console.log('Result Score : ' + scoreboard)

    if(highest_flag == -1){
        res.send('Cannot find fitting answer for your question')
    }
    else{
        res.send(Adic[highest_flag])
    }

})
