$(function() {
    $('button').click(function() {
        //var file = $('input').val();
        //$('button').html("Uploading...")
        //var files = $('#file-select').files;
        var formData = new FormData();
        $.ajax({
            url: 'https://meb6vjwdn2.execute-api.us-east-1.amazonaws.com/newstage/WhatsAppFileManager',
            data: $('{"name":' + $('form') + '}').serialize(),
            type: 'POST',
            success: function(response) {
                $('#chatname').html(response);
            },
            error: function(error) {
                console.log("Error:" + error);
            }
        });
    });
});
