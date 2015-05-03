/**
 * Created by swannsg on 2015/05/01.
 */
// $.ui.keyCode

// e for events
p.e = (function () {

    var keycode = {
        8:   'BACKSPACE',
        188: 'COMMA',
        46:  'DELETE',
        40:  'DOWN',
        35:  'END',
        13:  'ENTER',
        27:  'ESCAPE',
        36:  'HOME',
        37:  'LEFT',
        34:  'PAGE_DOWN',
        33:  'PAGE_UP',
        190: 'PERIOD',
        39:  'RIGHT',
        32:  'SPACE',
        9:   'TAB',
        38:  'UP'
    };

    // made public
    return {
        onKeyUp:     onKeyUp,
        onExitField: onExitField
    };

    function noActionKey(reKeyCodes, lastKey) {
        // pass regular expression of key codes
        if ( reKeyCodes.test(lastKey.toString())) {
            // keys to ignore, do nothing
            return true;
        }
        else { return false; }
    }


    function onKeyUp(event) {
        console.log('event: onKeyUp');
        if ( noActionKey(/^37$|^39$/, event.which) ) {
            // LEFT and RIGHT arrow keys
            return;
        }
        var targetID = '#' + event.target.id;
        // block certain event keys, left and right arrow
        // add class selector here
        if ( $(targetID).hasClass('finance-format') ){
            // finance-format
            var fieldValue = $(targetID).val();
            var inputKey = fieldValue.slice(-1);
            p.v.financeFormat(targetID, inputKey, fieldValue);
        }
        else if ( $(targetID).hasClass('fast-date') ) {
            // fast-date
            var fieldValue = $(targetID).val();
            var inputKey = fieldValue.slice(-1);
            p.v.fastDate(targetID, inputKey, fieldValue);
        }
    }

    function onExitField(event) {
        console.log('event: onExitField');
        var targetID = '#' + event.target.id;
        // add class selectors here
        if ( $(targetID).hasClass('finance-format') ){
            // finance-format
            var fieldValue = $(targetID).val();
            p.v.onExitFinanceFormat(targetID, fieldValue);
        }
        else if ( $(targetID).hasClass('fast-date') ) {
            // fast-date
            var fieldValue = $(targetID).val();
            p.v.onExitFastDate(targetID, fieldValue);
        }
    }

    //var keyname = {
    //    BACKSPACE: 8,
    //    COMMA: 188,
    //    DELETE: 46,
    //    DOWN: 40,
    //    END: 35,
    //    ENTER: 13,
    //    ESCAPE: 27,
    //    HOME: 36,
    //    LEFT: 37,
    //    PAGE_DOWN: 34,
    //    PAGE_UP: 33,
    //    PERIOD: 190,
    //    RIGHT: 39,
    //    SPACE: 32,
    //    TAB: 9,
    //    UP: 38
    //};


})();
