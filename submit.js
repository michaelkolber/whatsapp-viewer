$(function() {
    $('button').click(submitForm);
    $("input").keypress(function(event) {
        if (event.which == 13) {
            event.preventDefault();
            submitForm();
        }
    });
});

function submitForm() {
        //var file = $('input').val();
        //$('button').html("Uploading...")
        //var files = $('#file-select').files;
        var formData = new FormData();
        $.ajax({
            url: 'https://meb6vjwdn2.execute-api.us-east-1.amazonaws.com/newstage/WhatsAppFileManager',
            data: '"' + $('#namebox').val() + '"',
            type: 'POST',
            success: function(response) {
                $('#chatname').html(response);
                console.log(response);
            },
            error: function(error) {
                console.log("Error:" + error);
            }
        });
    }
