/**
 * Created by swannsg on 2015/04/30.
 */
//<input  type="text"
//id="amount"
//class="form-control finance-format"
//title="Amount including VAT"
//required
//errorMsg="Requires a positive amount"
//onblur="onExitField(event)" onkeyup="onKeyUp(event)">
//<em id="amount-error"></em>

/**
 * input text box
 *
 * id="some-id"
 *
 * class="finance-format"
 *
 * events
 *   onblur="onExitField(event)" onkeyup="onKeyUp(event)"
 *
 * error
 *   errorMsg="whatever error message you want"
 *   element below    return {
        financeFormat: financeFormat
    };
    return {
        financeFormat: financeFormat
    };
 form with error must have have id "some-id-error" where "some-id" is the id of the text box
*/

// v for validation
p.v = (function () {

    // made public
    return {
        financeFormat:       financeFormat,
        onExitFinanceFormat: onExitFinanceFormat,
        delLastKeystroke:    delLastKeystroke,
        zeroLengthField:     zeroLengthField
    };


    function financeFormat(targetID, inputKey, fieldValue) {
        console.log('financeFormat');
        //valid input
        if (inputKey == '.' || $.isNumeric(inputKey)) {
            // split on decimal point
            var split = fieldValue.split('.');
            if (split.length == 2) {
                if (split[1].length > 2) {
                    delLastKeystroke(targetID, fieldValue);
                }
            }
            else {
                // first remove commas from string
                fieldValue = fieldValue.replace(/\,/g, '')
                $(targetID).val(fieldValue.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,"));
            }
        }
        else {
            delLastKeystroke(targetID, fieldValue);
        }
    }


    function onExitFinanceFormat(targetID, fieldValue) {
        // adjust decimal as required
        console.log('onExitFormat');
        if (zeroLengthField(fieldValue)) {
            // invalid field
            var errorMsg = $(targetID).attr('errorMsg');
            var errorID = targetID + '-error';
            $(errorID).text(errorMsg);
            // put focus back on targetID
            $(targetID).focus();
            setTimeout(ASYN_clearErrorMsg, 2000);

            function ASYN_clearErrorMsg() {
                $(errorID).text('');
            }
            return;
        }
        var split = fieldValue.split('.');
        if (split.length == 2) {
            if (split[1].length == 0) {
                $(targetID).val(fieldValue + '00');
            }
            else if (split[1].length == 1) {
                $(targetID).val(fieldValue + '0');
            }
        }
        else {
            // add decimal
            $(targetID).val(fieldValue + '.00');
        }
    }

    function fastDate(targetID, inputKey, fieldValue) {
        console.log('financeFormat');
        //valid input
        var dateLength = fieldValue.length;
        var status = False; // date string is illegal
        var lastPos = 0;
        var mm = ''; // month mm
        if (inputKey == '.' || inputKey == ' ' || inputKey == '/' || inputKey == '-') {
            // change to common delimiter '/'
            inputKey = '/';
            fieldValue = fieldValue.slice(0, -1) + '/'
            // check if valid date string as it is built up
            var adjacentChar = fieldValue.slice(dateLength - 2, -1);
            if (adjacentChar == '/') {
                // illegal, cannot have '//'
                delLastKeystroke(targetID, fieldValue);
                return;
            }
            lastPos = fieldValue.lastIndexOf('/');
            if (lastPos == 1 || lastPos == 2 || lastPos == 3 || lastPos == 4 || lastPos == 5) {
                // positions were '/' may appear
                status = True;
            }
            if ( fieldValue.split('/') > 4) {
                // may not have more than two '/' in field value
                status = False;
            }
            if (!status) {
                // illegal position for '/'
                delLastKeystroke(targetID, fieldValue);

            }
            return;
        }
        else if ($.isNumeric(inputKey)) {
            // numeric
            // check if valid date string as it is built up
            status = False;
            if (dateLength == 2) {
                // dd case
                if (parseInt(fieldValue) > 0 && parseInt(fieldValue) < 32) {
                    // 1 - 31
                    status = True;
                }
            }
            else if (dateLength == 4) {
                // mm case
                // get everything after '/'
                status = legalPartMonth(fieldValue);
            }
            else if (dateLength == 5) {
                if ( fieldValue.split('/') == 3) {
                    status = legalPartMonth(fieldValue);
                }
                else {
                    // start of year
                }
            }


        }
        else {
             // illegal keystroke
            delLastKeystroke(targetID, fieldValue);
        }
    }


    function legalPartMonth(fieldValue) {
        // returns True if valid month

        if (fieldValue.length < 3 || fieldValue.length > 5) {
            console.log('legalPartMonth error');
            return False;
        }
        var month = fieldValue.slice( fieldValue.lastIndexOf('/') + 1);
        if (month.length == 2) {
            if ( parseInt(month) > 0 && parseInt(month) <= 12 ) {
                return True;
            }
            else {return False;}
        }
        else if (month.length == 1) {
            return True;
        }
        else { return False; }
    }








    function delLastKeystroke(targetID, fieldValue) {
        fieldValue = fieldValue.slice(0, -1);
        $(targetID).val(fieldValue);
    }

    function zeroLengthField(fieldValue) {
        if (fieldValue.length == 0) {
            return true;
        }
        else {
            return false
        }
    }

})();
