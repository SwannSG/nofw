/**
 * Created by swannsg on 2015/05/05.
 */
// called after AJAX callback function 'complete'

p.a = (function() {


    return {
        formPostOk:     formPostOk,
        formPostFail:   formPostFail,
        getSubMenusFail:getSubMenusFail,
        getSubMenusOk:  getSubMenusOk,
        getNavsOk:      getNavsOk,
        getNavsFail:    getNavsFail
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

    function getSubMenusOk(rspData) {
        p.m.paintSubMenu(rspData);
    }

    function getSubMenusFail(rspMsg) {
        $("#top-msg").text(rspMsg);
        $("#top-msg").css( "color", "red" );
    }

    function getNavsOk(rspData) {
        p.g.navsMenuData = jQuery.parseJSON(rspData)
        // transfer to m
        p.m.paintNavs();
    }

    function getNavsFail(rspData) {
    $("#top-msg").text(rspMsg);
    $("#top-msg").css( "color", "red" );
    }

})();