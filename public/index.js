

$('#UI > button:nth-child(3)').click((event) => {
    event.preventDefault()

    $.get('ask', {
        userQ: $('#user').val(),
    }, (data) => {
      $('#bot').html(data)
    })
})

$('#UI > button:nth-child(15)').click((event) => {
    event.preventDefault()

    $.get('list', {
    }, (data) => {
      $('#ajax-output').html(data)
    })
})
