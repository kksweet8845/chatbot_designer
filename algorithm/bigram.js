var fs = require('fs');
var readline = require('readline');
var bigram = {
  schema: {
    conversations: [],
    biSets:[]
  },

  conversation: {
    Q:'',
    A:''
  },
  biUnit:[],
  schemaFormation: (obj,callback)=>{
      //console.log('bigraming');
      for(var i=0;i<obj.conversations.length;i++){
          let unit = [];
          for(var j =0;j<obj.conversations[i].Q.length-1;j++){
            let tempS ='';
            tempS = obj.conversations[i].Q[j] + obj.conversations[i].Q[j+1];
            unit.push(tempS);
          }
          obj.biSets.push(unit);
      }

      callback(obj);
  },

  qFormation:(string,callback)=>{
    let Qdic = [];
    for(var i=0;i<string.length-1;i++){
      let tempS = string[i] + string[i+1];
      Qdic.push(tempS);
    }
    callback(Qdic);
  },

  txtToJson:(path,callback)=>{
    var count = 0;
    var flag = 0;
    var obj = {
      conversations:[],
      biSets:[]
    };    
    var unit = {Q:'',A:''};    
      //console.log('begin txtToJson');
       const rl = readline.createInterface({
        input: fs.createReadStream(path),
        crlDelay: Infinity
       });
       var i=0;
       rl.on('line',(line)=>{
          if(i%2 == 0){
           // console.log('In Q');
            unit.Q = line;
          }
          if(i%2 == 1){
           // console.log('In A');
            unit.A = line;
            obj.conversations.push(unit);
            unit = {Q:'',A:''};
           // console.log(obj);
          }
         // console.log(unit);
          i++;
       }).on('close',()=>{
         //console.log(obj);
          callback(obj);
       });

   },

  evalQuery: (quest,obj,callback)=>{
    bigram.qFormation(quest,(Qdic)=>{
        let scoreboard = [];
        for(var i=0;i<obj.biSets.length;i++){
          scoreboard.push(0);
        }
        for(i=0;i<Qdic.length;i++){
          for(var j = 0;j<obj.biSets.length;j++){
            if(obj.biSets[j].includes(Qdic[i])){
              scoreboard[j]++;
            }
          }
        }
        for(i=0;i<obj.biSets.length;i++){
          scoreboard[i] = scoreboard[i]/obj.biSets[i].length;
        }

        var max_index = -1;
        var max_val = -1;

        for(i=0;i<obj.biSets.length;i++){
          if(scoreboard[i] != 0 && scoreboard[i] > max_val){
            max_val = scoreboard[i];
            max_index = i;
          }
        }
        if(max_index == -1){
          var err = '我不懂你在說什麼?'; 
        }
        callback(err,max_index);
    });
  }


  
}



module.exports = bigram;

