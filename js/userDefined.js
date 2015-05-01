/**
 * Created by swannsg on 2015/04/27.
 */

// execute form validation
//<form name="myForm" action="demo_form.asp" onsubmit="return validateForm()" method="post">


//called from href="javascript:getRest('get string ....)"
function getRest(getURL) {
    //rest call to server
    jQuery.get(getURL, function (data) {
        paintLeftMenu(data);
    });
}

function paintLeftMenu(menuItems) {
    //delete existing menu items
    $(".left-pane").empty();
    //insert into DOM
    for(var i = 0; i < menuItems.length; i++){
        //add the elements
        var partial = '<a href="javascript:getForm(' + "'" + menuItems[i].href + "'" + ')">' + menuItems[i].text + '</a></br>';
        $(".left-pane").append(partial);
    }
}

function getForm(getURL) {
    jQuery.get(getURL, function (data) {
        paintForm(data);
    });
}

function paintForm(data) {
    $("#center-pane").empty();
    $("#center-pane").append(jQuery.parseJSON(data).form);
}


// events
function onKeyUp(event) {
    console.log('event: onKeyUp');
    var targetID = '#' + event.target.id;
    // add class selector here
    if ( $(targetID).hasClass('finance-format') ){
        // finance-format
        var fieldValue = $(targetID).val();
        var inputKey = fieldValue.slice(-1);
        financeFormat(targetID, inputKey, fieldValue);
    }
}

function onExitField(event) {
    console.log('event: onExitField');
    var targetID = '#' + event.target.id;
    // add class selectors here
    if ( $(targetID).hasClass('finance-format') ){
        // finance-format
        var fieldValue = $(targetID).val();
        onExitFinanceFormat(targetID, fieldValue);
    }
}
// end events

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

function delLastKeystroke(targetID, fieldValue) {
    fieldValue = fieldValue.slice(0, -1);
    $(targetID).val(fieldValue);
}

function zeroLengthField(fieldValue) {
    if (fieldValue.length == 0) {
        return true;}
    else {return false}
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
        setTimeout(clearErrorMsg, 2000);

        function clearErrorMsg() {
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


