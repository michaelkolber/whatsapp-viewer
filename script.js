$(function(){

var switched = 0;

$('#switchButton').click(function() {
    if(switched === 0) {
        $('.away').attr('class', 'message actuallyhome');
        $('.home').attr('class', 'message actuallyaway');
        switched = 1;
        console.log(switched);
    }
    else if(switched == 1) {
        $('.actuallyhome').attr('class', 'message away');
        $('.actuallyaway').attr('class', 'message home');
        switched = 0;
        console.log(switched);
    }
});

});