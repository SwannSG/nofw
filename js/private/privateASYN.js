/**
 * Created by swannsg on 2015/05/05.
 */
// called after AJAX callback function 'complete'

p.a = (function() {


    return {
        formPostOk:     formPostOk,
        formPostFail:   formPostFail
    };


    function formPostOk(rspMsg){
        $("#top-msg").text(rspMsg);
        $("#top-msg").css( "color", "black" );
        // clear (or new form)
        $("#center-pane").empty();
    }

    function formPostFail(rspMsg){
        $("#top-msg").text(rspMsg);
        $("#top-msg").css( "color", "red" );
        // leave form in place
    }

})();