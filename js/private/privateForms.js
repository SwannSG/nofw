/**
 * Created by swannsg on 2015/05/03.
 */

p.f = (function () {

    return {
        isFormValid:    isFormValid,
        createFormData: createFormData,
        doFormFlow:     doFormFlow
    }


    function ASYN_clearTopMsg() {
        $('#top-msg').text('');
    }


    function doFormFlow(targetID) {
        log('doFormFlow');
        var fieldIDs;
        fieldIDs = __getFormFieldIDs(targetID);
        var formData;
        if ( isFormValid(fieldIDs) ) {
            // form data is good
            formData = createFormData(targetID, fieldIDs);
            p.s.postForm(formData);
        }
        else {
            // form data is bad
            log('form data is bad');
            $('#top-msg').css('color', 'red');
            $('#top-msg').text('Please correct form and re-submit');
            setTimeout(ASYN_clearTopMsg, 3000);
        }
    }


    function __getFormFieldIDs(targetID) {
        log('getFormFieldIDs');
        var formFieldIDs = [];
        var fields;
        var length;
        var prevLength = 0;
        // input
        fields = $(targetID + ' input');
        length = fields.length;
        for (i=0; i < length; i++) {
            formFieldIDs[i] = fields[i].getAttribute('id');
        }
        prevLength = prevLength + length;

        // textarea
        fields = $(targetID + ' textarea');
        length = fields.length;
        for (i=0; i<length; i++) {
            formFieldIDs[i + prevLength] = fields[i].getAttribute('id');
        }
        prevLength = prevLength + length;

        return formFieldIDs;
    }


    function isFormValid(fieldIDs) {
        var formOks = new Array(fieldIDs.length);
        var formOk = false;
        for (var i = 0; i < fieldIDs.length; i++) {
            var targetID = '#' + fieldIDs[i];
            var fieldValue = $(targetID).val();
            if ( $(targetID).hasClass('finance-format') ){
                // finance-format
                formOk = p.v.onExitFinanceFormat(targetID, fieldValue );
            }
            else if ( $(targetID).hasClass('fast-date') ) {
                // fast-date
                formOk = p.v.onExitFastDate(targetID, fieldValue);
            }
            else if ( $(targetID).hasClass('must-have-text') ) {
                // must have text in input text box
                formOk = p.v.onExitMustHaveText(targetID, fieldValue);
            }
            else {
                formOk = true
            }
            formOks[i] = formOk;
        }
        if (formOks.indexOf(false) === -1) {
            return true;
        }
        else {
            return false;
        }
    }

    function createFormData(targetID, fieldIDs) {
        var formData = {formID: targetID};
        for (var i = 0; i < fieldIDs.length; i++) {
            var targetID = '#' + fieldIDs[i];
            var fieldValue = $(targetID).val();
            formData[fieldIDs[i]] = fieldValue;
        }
        return formData;
    }
})();