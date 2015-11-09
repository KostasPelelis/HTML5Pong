document.body.onkeydown = function( e ) {
    var keys = {
        83: 'down1',
        87: 'up1',
        40: 'down2',
        38: 'up2'
    };
    if ( typeof keys[ e.keyCode ] != 'undefined' ) {
        keyPress( keys[ e.keyCode ] );
    }
};
