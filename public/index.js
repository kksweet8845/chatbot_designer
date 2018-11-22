$(document).ready(function(){
  $('#UI > button').click((event)=>{
    event.preventDefault()
      $.post('ask',{
        userQ: $('#user').val(),
      },(data)=>{
        $('#bot').html(data);
      });
  });
  
  
  var form = document.forms.namedItem("fileInfo");
  form.addEventListener('submit',(ev)=>{
    var oOutput = $('#ajax-output');
    var oData = new FormData(form);

    var oReq = new XMLHttpRequest();
    oReq.open('POSt','/server',true);
    oReq.onload = (oEvent)=>{
      if(oReq.status == 200){
        oOutput.html('File Uploaded');
      }else{
        oOutput.html = "Errir" + oReq.status;
      }
    }
    oReq.send(oData);
    ev.preventDefault();
  
  });
  /*$('form').on('submit',function(ev){
    ev.preventDefault();
    var form = document.forms.namedItem("fileInfo");
    var oData = new FormData(form);
    const url = '/server';
    $.ajax({
      method: 'POST',
      contentType: 'multipart/form-data',
      url: url,
      data: oData,
      processData: false,
      success: ()=>{$('#ajax-output').html('File uploaded');}
    });
  });*/  
});

