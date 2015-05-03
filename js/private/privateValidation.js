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
        zeroLengthField:     zeroLengthField,
        fastDate:            fastDate,
        onExitFastDate:      onExitFastDate,
        mustHaveText:        mustHaveText,
        onExitMustHaveText:  onExitMustHaveText
    };


    function mustHaveText(targetID, inputKey, fieldValue) {
        return;
    }

    function onExitMustHaveText(targetID, fieldValue) {
        var errorID;
        if (zeroLengthField(fieldValue)) {
            // invalid field
            errorID = doErrorMsg(targetID);
            setTimeout(ASYN_clearErrorMsg, 2000);
            return;
        }

        function ASYN_clearErrorMsg() {
            $(errorID).text('');
        }
    }

    function financeFormat(targetID, inputKey, fieldValue) {
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
        var errorID;
        if (zeroLengthField(fieldValue)) {
            // invalid field
            errorID = doErrorMsg(targetID);
            setTimeout(ASYN_clearErrorMsg, 2000);
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

        function ASYN_clearErrorMsg() {
            $(errorID).text('');
        }
    }


    function onExitFastDate(targetID, fieldValue) {
         // check the date is valid
        var reResult;
        var day;
        var month;
        var year;
        var errorID;
        if (zeroLengthField(fieldValue)) {
            // invalid field
            errorID = doErrorMsg(targetID, 'error 1');
            setTimeout(ASYN_clearErrorMsg, 2000);
            return;
        }
        else {
            // check date format
            reResult = /^([0-9]{1,2})?\/([0-9]{1,2})?\/(19|20)([0-9]{2})$/.exec(fieldValue);
            if ( !hasValue(reResult) ) {
                errorID = doErrorMsg(targetID, 'error 2');
                setTimeout(ASYN_clearErrorMsg, 2000);
                return;
            }
            // check date is an actual real date in the calender
            day = reResult[1];
            month = reResult[2];
            year = reResult[3];
            if ( isValidDate(day, month, year)) {
                return;
            }
            else {
                errorID = doErrorMsg(targetID, 'error3');
                setTimeout(ASYN_clearErrorMsg, 2000);
                return;
            }
        }

        function ASYN_clearErrorMsg() {
            $(errorID).text('');
        }
    }

    function fastDate(targetID, inputKey, fieldValue) {
        //valid input
        var autoYearAdd = false;
        var autoYearLength = 0;
        if (inputKey == '.' || inputKey == ' ' || inputKey == '/' || inputKey == '-') {
            // change to common delimiter '/'
            inputKey = '/';
            fieldValue = fieldValue.slice(0, -1) + '/';

        }
        else if (inputKey == '+') {
            // auto ccyy addition
            autoYearAdd = true;
            if (fieldValue.slice(-2, -1) === '/') {
                fieldValue = fieldValue.slice(0, -1) + (new Date).getFullYear().toString();
                autoyearLength = 4;
            }
            else {
                fieldValue = fieldValue.slice(0, -1) + '/' + (new Date).getFullYear().toString();
                autoYearLength = 5;
            }
            fieldLength = fieldValue.length
        }
        else if ($.isNumeric(inputKey)) {
            // do nothing
        }
        else {
            // illegal keystroke
            delLastKeystroke(targetID, fieldValue);
            return;
        }

        if (dateTypingOk(fieldValue)) {
            $(targetID).val(fieldValue);
        }
        else {
            // date str is not ok
            if (autoYearAdd) {
                fieldValue = fieldValue.slice(0, -autoYearLength);
                $(targetID).val(fieldValue);
            }
            else {
                delLastKeystroke(targetID, fieldValue);
            }
        }
        return;
    }


    function dateTypingOk(str) {
        // pass date str, tests date while typing
        var reResult;
        var dayOk = false;
        var monthOk = false;
        var yearOk = false;
        var res = [/^([0-9]{1,2})$/,                                        // n or nn but not nnn....
            /^([0-9]{1,2})?\/$/,                                    // n/ or nn/
            /^([0-9]{1,2})?\/([0-9]{1,2})$/,                         // n/n or nn/n or n/nn or nn/nn
            /^([0-9]{1,2})?\/([0-9]{1,2})?\/$/,                      // n/n/ or nn/n/ or n/nn/ or nn/nn/
            /^([0-9]{1,2})?\/([0-9]{1,2})?\/([0-9]{1,4})$/];         // n/n/n...  or nn/n/n... or n/nn/n... or nn/nn/n...

//                   /^([0-9]{1,2})?\/([0-9]{1,2})?\/(19|20)([0-9]{2})$/];   // n/n/nnnn  or nn/n/nnnn or n/nn/nnnn or nn/nn/nnnn

        for (var i = 0; i < res.length; i++) {
            reResult = res[i].exec(str);
            if (hasValue(reResult)) {
                if (i === 0) {
                    // check valid day as you type
                    dayOk = /^[1-9]$|^0[1-9]$|^1[0-9]$|^2[0-9]$|^3[0-1]$/.test(reResult[1]);
                    return dayOk;
                }
                else if (i === 1) {
                    dayOk = /^[1-9]$|^0[1-9]$|^1[0-9]$|^2[0-9]$|^3[0-1]$/.test(reResult[1]);
                    if (dayOk) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                else if (i === 2) {
                    dayOk = /^[1-9]$|^0[1-9]$|^1[0-9]$|^2[0-9]$|^3[0-1]$/.test(reResult[1]);
                    monthOk = /^[1-9]$|^0[1-9]$|^1[1-2]$/.test(reResult[2]);
                    if (dayOk && monthOk) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                else if (i === 3) {
                    dayOk = /^[1-9]$|^0[1-9]$|^1[0-9]$|^2[0-9]$|^3[0-1]$/.test(reResult[1]);
                    monthOk = /^[1-9]$|^0[1-9]$|^1[1-2]$/.test(reResult[2]);
                    if (dayOk && monthOk) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                else if (i === 4) {
                    dayOk = /^[1-9]$|^0[1-9]$|^1[0-9]$|^2[0-9]$|^3[0-1]$/.test(reResult[1]);
                    monthOk = /^[1-9]$|^0[1-9]$|^1[1-2]$/.test(reResult[2]);
                    yearOk = /^1$|^19$|^19[0-9]$|^19[0-9][0-9]$|^2$|^20$|^20[0-9]$|^20[0-9][0-9]$/.test(reResult[3]);
                    if (dayOk && monthOk && yearOk) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                else if (i === 5) {
                    dayOk = /^[1-9]$|^0[1-9]$|^1[0-9]$|^2[0-9]$|^3[0-1]$/.test(reResult[1]);
                    monthOk = /^[1-9]$|^0[1-9]$|^1[1-2]$/.test(reResult[2]);
                    yearOk = /^1$|^19$|^19[0-9]$|^19[0-9][0-9]$|^2$|^20$|^20[0-9]$|^20[0-9][0-9]$/.test(reResult[3]);
                    if (dayOk && monthOk && yearOk) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                else {
                    // no match
                }
            }
        }
        return false;
    }

    function delLastKeystroke(targetID, fieldValue) {
        fieldValue = fieldValue.slice(0, -1);
        $(targetID).val(fieldValue);
    }

    function zeroLengthField(fieldValue) {
        console.log('zeroLengthField')
        if (fieldValue.length == 0) {
            return true;
        }
        else {
            return false
        }
    }

    function doErrorMsg(targetID, optionalErrorMsg) {
        if ( hasValue(optionalErrorMsg) ) {
            var errorMsg = optionalErrorMsg;
        }
        else {
            var errorMsg = $(targetID).attr('errorMsg');
        }
        var errorID = targetID + '-error';
        $(errorID).text(errorMsg);
        // put focus back on targetID
        //$(targetID).focus();
        return errorID;
    }


    // must go to general code section later
    function hasValue(o) {
        if (o === null  || o === undefined) {
            return false;
        }
        else { return true;}
    }


    // must go to general code section later
    function isValidDate(day, month, year) {
        // day, month, year as string or integer, returns true or false
        day = parseInt(day);
        month = parseInt(month);
        year = parseInt(year);
        var maxDays = 0;
        var daysInMonth = {
            1: 31,
            2: 28,
            3: 31,
            4: 30,
            5: 31,
            6: 30,
            7: 31,
            8: 31,
            9: 30,
            10:31,
            11:30,
            12:31
        };
        maxDays = daysInMonth[month];
        if (month === 2 && isLeapYear(year)) {
            if (day > 29) {
                return false;
            }
        }
        else {
            if ( day > maxDays) {
                return false;
            }
            else {
                return true;
            }
        }
    }

    // must go to general code section later
    function isLeapYear(year) {
        year = parseInt(year);
        if ( year % 100 === 0) {
            return false;
        }
        else if ( year % 400 === 0) {
            return true;
        }
        else if ( year % 4 === 0) {
            return true;
        }
        else {
            return false;
        }
    }
})();
