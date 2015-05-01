/**
 * Created by swannsg on 2015/05/01.
 */

// e for events
p.e = (function () {

    // made public
    return {
        onKeyUp:     onKeyUp,
        onExitField: onExitField,
    };

    function onKeyUp(event) {
        console.log('event: onKeyUp');
        var targetID = '#' + event.target.id;
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





})();
