$(function() {
    $('button').click(submitForm);
    /*$("input").keypress(function(event) {
        if (event.which == 13) {
            event.preventDefault();
            submitForm();
        }
    });*/
});

function submitForm() {
        var chatTranscript = $('form');
        var file = new FormData(chatTranscript);
        $.ajax({
            url: 'https://meb6vjwdn2.execute-api.us-east-1.amazonaws.com/newstage/WhatsAppFileManager',
            data: file,
            type: 'POST',
            processData: false,
            success: function(response) {
                $('#chatbox').html(response);
                console.log("Success");
            },
            error: function(error) {
                console.log("Error:", error);
            }
        });
    }
