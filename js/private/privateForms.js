/**
 * Created by swannsg on 2015/05/03.
 */

p.f = (function () {

    return {
        isFormValid:    isFormValid,
        createFormData: createFormData
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
        console.log(formOks);
        console.log(formOks.indexOf(false));
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
        console.log(formData);
    }
})();