$('#UI > button:nth-child(15)').click((event) => {
    event.preventDefault()

    // $.get('list', {
    // }, (data) => {
    //   $('#ajax-output').html(data)
    // })
    $.get('fileUpload', {
    }, (data) => {
      $('#ajax-output').html(data)
    })

    // $.ajax({
    //     url: '/fileUpload',
    //     success: (data)=>{
    //         $('ajax-output').html(data);
    //     }
    // });
})
