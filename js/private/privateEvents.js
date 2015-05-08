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
        onExitField: onExitField,
        onFormSubmit:onFormSubmit,
        AJAXcall:   AJAXcall,
        onclickMainMenu: onclickMainMenu,
        onclickGetNavs:  onclickGetNavs
    };


    function onclickMainMenu(event) {
        var mainMenu = event.target.text;
        // get subMenus
        p.s.getSubMenus(mainMenu);
    }

    function onclickGetNavs(event, getURL) {
        // get Navs
        event.preventDefault();
        console.log('onclickGetNavs');
        p.s.getNavs(getURL);
    }

    function AJAXcall() {
        log('AJAXcall');
        p.s.postForm({1:1});
    }

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
        var fieldValue = $(targetID).val();
        var inputKey = fieldValue.slice(-1);
        if ( $(targetID).hasClass('finance-format') ){
            // finance-format
            p.v.financeFormat(targetID, inputKey, fieldValue);
        }
        else if ( $(targetID).hasClass('fast-date') ) {
            // fast-date
            p.v.fastDate(targetID, inputKey, fieldValue);
        }
        //else if ( $(targetID).hasClass('must-have-text') ) {
        //    // must have text in input text box
        //    p.v.mustHaveText(targetID, inputKey, fieldValue);
        //}
        return;
    }

    function onExitField(event) {
        console.log('event: onExitField');
        var targetID = '#' + event.target.id;
        var fieldValue = $(targetID).val();
        // add class selectors here
        if ( $(targetID).hasClass('finance-format') ){
            // finance-format
            p.v.onExitFinanceFormat(targetID, fieldValue);
        }
        else if ( $(targetID).hasClass('fast-date') ) {
            // fast-date
            p.v.onExitFastDate(targetID, fieldValue);
        }
        else if ( $(targetID).hasClass('must-have-text') ) {
            // must have text in input text box
            p.v.onExitMustHaveText(targetID, fieldValue);
        }
    }


    function onFormSubmit(event, fieldIDs) {
        // event.preventDefault() MUST BE thee first line
        event.preventDefault();
        console.log('onFormSubmit');
        var targetID = '#' + event.target.id;
        p.f.doFormFlow(targetID, fieldIDs)
        //var formIsValid = p.f.isFormValid(fieldIDs);
        //if (formIsValid) {
        //    // AJAX submit
        //    p.f.createFormData(targetID, fieldIDs);
        //}
        //else {
        //    // de we need to do anything
        //}

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
