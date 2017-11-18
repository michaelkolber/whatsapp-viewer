var names = [];

$(function(){

    var sender = 0;
    var num_senders = parseInt($('num_of_participants').attr('class'));

    if (num_senders = 1) {
        $('#chatname').text('Chat with ' += )
    }

    $('#switchButton').click(function() {
        $('.sender').removeClass('sender');

        if (sender == num_senders) {
            sender = 0;
        } else {
            sender++;
        }

        $('.'.concat(sender)).addClass('sender');
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
        $.ajax({
            url: 'https://meb6vjwdn2.execute-api.us-east-1.amazonaws.com/newstage/WhatsAppFileManager',
            data: fileContents,
            type: 'POST',
            processData: false,
            contentType: false,
            success: function(response) {
                names = response["names"];
                $('#chatname').html(names[0]);
                $('#chatbox').html(response["chat"]);
                closeUploadBox();
                $('#uploadbutton').html('<i class="fa fa-upload" aria-hidden="true"></i> Upload');
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
        data: JSON.stringify("loadsamplefile"),
        type: 'POST',
        success: function(response) {
            names = response["names"];
            $('#chatname').html(names[0]);
            $('#chatbox').html(response["chat"]);
            closeUploadBox();
            $('#samplebutton').html('<i class="fa fa-file-text" aria-hidden="true"></i> Load Sample File');
        },
        error: function(error) {
            console.log("Error:", error);
            $('#samplebutton').html('<i class="fa fa-file-text" aria-hidden="true"></i> Load Sample File');
        },
        contentType: "application/json",
        dataType: 'json'
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
