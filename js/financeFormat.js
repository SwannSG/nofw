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
 *   element below form with error must have have id "some-id-error" where "some-id" is the id of the text box
*/

var myApp = {};


myApp.mod = (function() {

    var financeFormat = financeFormat;

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
            delLastKeystroke(targetID, fieldValue)
        }
    }
})();
