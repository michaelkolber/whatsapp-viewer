var names = [];

$(function(){

var switched = 0;

$('#switchButton').click(function() {
    if(switched === 0) {
        $('.away').attr('class', 'message actuallyhome');
        $('.home').attr('class', 'message actuallyaway');
        $('#chatname').html("Chat with " + names[1]);
        switched = 1;
    }
    else if(switched == 1) {
        $('.actuallyhome').attr('class', 'message away');
        $('.actuallyaway').attr('class', 'message home');
        $('#chatname').html("Chat with " + names[0]);
        switched = 0;
    }
});
    
$('#uploadNew').click(openUploadBox);
$('#closeuploadbox').click(closeUploadBox);


$('#uploadbutton').click(function() {
    if(!$("#fileSelector")[0].files[0]) {}
    else {uploadFile();}
});
    
$('#samplebutton').click(loadSampleFile);

});

function uploadFile() {
    $('#uploadbutton').html('<i class="fa fa-refresh fa-spin fa-fw"></i> Uploading...');
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
                $('#chatname').html("Chat with " + names[0]);
                $('#chatbox').html(response["chat"]);
                closeUploadBox();
                $('#samplebutton').html('<i class="fa fa-file-text" aria-hidden="true"></i> Load Sample File');
            },
            error: function(error) {
                console.log("Error:", error);
                $('#uploadbutton').html('<i class="fa fa-upload" aria-hidden="true"></i> Upload');
            }
        });
    });
}

function loadSampleFile() {
    $('#samplebutton').html('<i class="fa fa-refresh fa-spin fa-fw"></i> Loading...');
    $.ajax({
        url: 'https://meb6vjwdn2.execute-api.us-east-1.amazonaws.com/newstage/WhatsAppFileManager',
        data: "loadsamplefile",
        type: 'POST',
        processData: false,
        contentType: false,
        success: function(response) {
            names = response["names"];
            $('#chatname').html("Chat with " + names[0]);
            $('#chatbox').html(response["chat"]);
            closeUploadBox();
            $('#samplebutton').html('<i class="fa fa-file-text" aria-hidden="true"></i> Load Sample File');
        },
        error: function(error) {
            console.log("Error:", error);
            $('#samplebutton').html('<i class="fa fa-file-text" aria-hidden="true"></i> Load Sample File');
        }
    });
}

function closeUploadBox() {
    $('#shade').css({"display": "none"});
    $('#uploadboxcontainer').css({"display": "none"});
}

function openUploadBox() {
    $('#shade').css({"display": ""});
    $('#uploadboxcontainer').css({"display": ""});
}
