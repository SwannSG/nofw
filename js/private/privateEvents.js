/**
 * Created by swannsg on 2015/05/01.
 */
// $.ui.keyCode

// e for events
p.e = (function () {

    // made public
    return {
        onKeyUp:     onKeyUp,
        onExitField: onExitField,
        onFormSubmit:onFormSubmit,
        onclickMainMenu: onclickMainMenu,
        onclickGetNavs:  onclickGetNavs,
        onclickGetNavHelp: onclickGetNavHelp,
        onclickGetForm: onclickGetForm
    };

    function onclickGetNavHelp(index) {
        if (index === p.g.navsIndex) {
            $('#top-msg').text('');
            p.g.navsIndex = -1;
        }
        else {
            p.g.navsIndex = index;
            $('#top-msg').text(p.g.navsMenuData.navs[index].desc);
        }
    }

    function onclickGetForm(formID) {
        p.s.getForm(formID);
    }

    function onclickMainMenu(event) {
        var mainMenu = event.target.text;
        // get subMenus
        p.s.getSubMenus(mainMenu);
    }

    function onclickGetNavs(event, getURL) {
        // get Navs
        event.preventDefault();
        p.s.getNavs(getURL);
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
        log('onFormSubmit');
        var targetID = '#' + event.target.id;
        p.f.doFormFlow(targetID);
    }

})();
