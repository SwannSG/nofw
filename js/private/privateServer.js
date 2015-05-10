/**
 * Created by swannsg on 2015/05/01.
 */


// s for server interaction
p.s = (function () {




    return {
        getRest:    getRest,
        getForm:    getForm,
        postForm:   postForm,
        getSubMenus:getSubMenus,
        getNavs:    getNavs
    };

    function postForm(formData) {
        log('postJson');
        formData = JSON.stringify( formData );
        var rspMsg = '';
        var rspOk = '';
        var ajaxObj = {
            type: "POST",
            url: '/v1.0/post/form',
            data: formData,
            success: ASYN_success,
            error: ASYN_error,
            complete: ASYN_complete,
            dataType: 'json',
            crossDomain: true,
            contentType: 'application/json'     // required
        }
        $.ajax(ajaxObj);

        function ASYN_success(rspData) {
            log('ASYN_success');
            // success or failure at server level
            rspMsg = rspData['rspMsg'];
            rspOk = rspData['rspOk'];
            log('ASYN_success end');

        }

        function ASYN_error(xhr, status, errorThrown) {
            log('ASYN_error');
            // definite failure and have no rspMsg
            rspMsg = status.toUpperCase()  + ' ' + errorThrown;
            rspOk = false;
            log('ASYN_error end');
        }

        function ASYN_complete(xhr, status) {
            // function will always run, failure or success
            log('ASYN_complete');
            if (rspOk) {
                p.a.formPostOk(rspMsg);
            }
            else {
                p.a.formPostFail(rspMsg);
            }
        }
    }

    //called from href="javascript:getRest('get string ....)"
    function getRest(getURL) {
        //rest call to server
        jQuery.get(getURL, function (data) {
            p.m.paintLeftMenu(data);
        });
    }


    function getForm(getURL) {
        jQuery.get(getURL, function (data) {
            p.m.paintForm(data);
        });
    }

    function getSubMenus(mainMenu) {
        var rspOk;
        var rspMsg;
        var getURL = '/v1.0/getSubMenus?mainMenu=' + mainMenu;
        //jQuery.get(getURL, function (data) {
        //    console.log(data);
        //});
        jQuery.get(getURL)
            .done(ASYN_done)
            .fail(ASYN_fail)
            .always(ASYN_always)

        function ASYN_done() {
            rspOk = true;
        }
        function ASYN_fail() {
            rspMsg = status.toUpperCase()  + ' ' + errorThrown;
            rspOk = false
        }
        function ASYN_always(rspData) {
            if (rspOk) {
                p.a.getSubMenusOk(rspData);
            }
            else {
                p.a.getSubMenusFail(rspMsg);
            }
        }
    }

    // menu data for LHS
    function getNavs(getURL) {
        var rspOk;
        var rspMsg;
        jQuery.get(getURL)
            .done(ASYN_done)
            .fail(ASYN_fail)
            .always(ASYN_always)

        function ASYN_done() {
            rspOk = true;
        }
        function ASYN_fail() {
            rspMsg = status.toUpperCase()  + ' ' + errorThrown;
            rspOk = false
        }
        function ASYN_always(rspData) {
            if (rspOk) {
                p.a.getNavsOk(rspData);
            }
            else {
                p.a.getNavsFail(rspMsg);
            }
        }
    }
})();

