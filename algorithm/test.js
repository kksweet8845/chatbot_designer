const bigram = require('./bigram_mongo');
const fs = require('fs');

//var bigramObj = JSON.parse(bigram.txtToJson(fs.readFileSync('./qa','utf8')));

var data = fs.readFileSync('./qa','utf8');
var bigramObj ;
bigram.txtToJson('./qa',(obj)=>{
      bigramObj = obj;
      bigram.schemaFormation(bigramObj,(obj)=>{
      
        console.log('Q&A');
        console.log(obj.conversations);
        console.log('=================');
        console.log('Bigram result');
        console.log(obj.biSets);
        console.log('=================');
      });
});
