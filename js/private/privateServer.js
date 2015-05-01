/**
 * Created by swannsg on 2015/05/01.
 */


// s for server interaction
p.s = (function () {

    return {
        getRest: getRest,
        getForm: getForm
    };


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

})();

