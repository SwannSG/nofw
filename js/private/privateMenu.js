/**
 * Created by swannsg on 2015/05/01.
 */


p.m = (function () {

    return {
        paintLeftMenu: paintLeftMenu,
        paintForm:     paintForm
    };



    function paintLeftMenu(menuItems) {
        //delete existing menu items
        $(".left-pane").empty();
        //insert into DOM
        for (var i = 0; i < menuItems.length; i++) {
            //add the elements
            var partial = '<a href="javascript:p.s.getForm(' + "'" + menuItems[i].href + "'" + ')">' + menuItems[i].text + '</a></br>';
            $(".left-pane").append(partial);
        }
    }

    function paintForm(data) {
        $("#center-pane").empty();
        $("#center-pane").append(jQuery.parseJSON(data).form);
    }

})();