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
    var file = $('#fileSelector')[0].files[0];
    var reader = new FileReader();
    reader.readAsText(file);
    var fileContents;
    reader.addEventListener("loadend", function() {
        fileContents = reader.result;
    });
    $.ajax({
        url: 'https://meb6vjwdn2.execute-api.us-east-1.amazonaws.com/newstage/WhatsAppFileManager',
        data: fileContents,
        type: 'POST',
        processData: false,
        contentType: false,
        success: function(response) {
            $('#chatbox').html(response);
            console.log("Success");
        },
        error: function(error) {
            console.log("Error:", error);
        }
    });
}
