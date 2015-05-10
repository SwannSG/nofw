/**
 * Created by swannsg on 2015/05/01.
 */


p.m = (function () {

    return {
        paintLeftMenu: paintLeftMenu,
        paintForm:     paintForm,
        paintSubMenu:  paintSubMenu,
        paintNavs:     paintNavs
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


    function clearSubMenu() {
        for (var i=0; i < 18; i++) {
            $('#sm' + i.toString()).empty();
        }
    }

    function paintSubMenu(data) {
        //  paint sub menus in top pain below mainMenu
        data = jQuery.parseJSON(data);
        var a;
        clearSubMenu();
        for (var i = 0; i < data.subMenus.length; i++) {
            a = '';
            //var a = '<a onclick="p.e.onclickGetNavs()" href="/v1.0/getNavs?mainMenu=' +data.mainMenu+ '&subMenu=' +data.subMenus[i] + '">' + data.subMenus[i] + '</a>'
            a = a.concat('<a onclick="p.e.onclickGetNavs(',
                         'event, \'/v1.0/getNavs?mainMenu=',
                         data.mainMenu,
                         '&subMenu=',
                         data.subMenus[i],
                         '\')" href="">',
                         data.subMenus[i],
                         '</a>')
            console.log(a);
            $('#sm' + i.toString()).append(a);
        }
    }

    // paints left column
    function paintNavs() {
    // data is loaded in p.g.navsMenuData
        $("#left-col").empty();
        var element;

        // mainMenu value
        element = '';
        element = element.concat(
            '<p id="left-col-main-menu">',
            p.g.navsMenuData.mainMenu,
            '</p>'
        );
        $("#left-col").append(element);
        $("#left-col-main-menu").css('margin', '0px 0px 0px 0px');
        $("#left-col-main-menu").css('padding', '4px 0px 0px 4px');

        // subMenu value
        element = '';
        element = element.concat(
            '<p id="left-col-sub-menu">',
            p.g.navsMenuData.subMenu,
            '</p>'
        );
        $("#left-col").append(element);
        $("#left-col-sub-menu").css('margin', '0px 0px 0px 0px');
        $("#left-col-sub-menu").css('padding', '4px 0px 0px 20px');


        element = '<table>';
        for (var i = 0; i < p.g.navsMenuData.navs.length; i++ ) {
            element = element.concat(
                '<tr>',
                '<td class="col-lg-10">',
                __makeNavAnchor(p.g.navsMenuData.navs[i].formID, p.g.navsMenuData.navs[i].nav),
                '</td>',
                '<td class="col-lg-11">',
                __makeNavHelp(i),
                '</td>',
                '</tr>'
            );
        }
        element = element.concat(
            '</table>'
        )
        $("#left-col").append(element);
    }

    function __makeNavAnchor(formID, nav) {
        return '<a href="#" onclick="p.e.onclickGetForm(' + formID + ')">' + nav + '</a>';
    }

    function __makeNavHelp(index) {
        return '<a class="glyphicon glyphicon-question-sign" href="#" onclick="p.e.onclickGetNavHelp(' + index + ')"></a>';
    }
})();