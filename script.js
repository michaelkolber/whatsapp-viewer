$(function(){

var switched = 0;
var names = [];

$('#switchButton').click(function() {
    if(switched === 0) {
        $('.away').attr('class', 'message actuallyhome');
        $('.home').attr('class', 'message actuallyaway');
        $('#chatname')html("Chat with " + names[1]);
        switched = 1;
        console.log(switched);
    }
    else if(switched == 1) {
        $('.actuallyhome').attr('class', 'message away');
        $('.actuallyaway').attr('class', 'message home');
        $('#chatname')html("Chat with " + names[0]);
        switched = 0;
        console.log(switched);
    }
});


$('button').click(submitForm);

});

function submitForm() {
    var file = $('#fileSelector')[0].files[0];
    var reader = new FileReader();
    reader.readAsText(file);
    var fileContents;
    reader.addEventListener("loadend", function() {
        fileContents = JSON.stringify(reader.result);
        console.log(fileContents);
        $.ajax({
            url: 'https://meb6vjwdn2.execute-api.us-east-1.amazonaws.com/newstage/WhatsAppFileManager',
            data: fileContents,
            type: 'POST',
            processData: false,
            contentType: false,
            success: function(response) {
                names = response["names"];
                $('#chatname')html("Chat with " + names[0]);
                $('#chatbox').html(response["chat"]);
                console.log("Success! Response: ", response);
            },
            error: function(error) {
                console.log("Error:", error);
            }
        });
    });
}
