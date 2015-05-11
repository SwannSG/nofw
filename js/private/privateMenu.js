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
        $('#top-sub-menu').empty();
    }

    function paintSubMenu(data) {
        //  paint sub menus in top pain below mainMenu
        data = jQuery.parseJSON(data);
        var r='';
        var lenSubMenus = data.subMenus.length;
        clearSubMenu();
        for (var i = 0; i < lenSubMenus; i++) {
            //var a = '<a onclick="p.e.onclickGetNavs()" href="/v1.0/getNavs?mainMenu=' +data.mainMenu+ '&subMenu=' +data.subMenus[i] + '">' + data.subMenus[i] + '</a>'
            r = r.concat('<li style="margin-left: 25px;">',
                         '<a onclick="p.e.onclickGetNavs(',
                         'event, \'/v1.0/getNavs?mainMenu=',
                         data.mainMenu,
                         '&subMenu=',
                         data.subMenus[i],
                         '\')" href="">',
                         data.subMenus[i],
                         '</a>',
                        '</li>');
        }
        $('#top-sub-menu').append(r);
    }


    function clearLHS() {
        $("#lhs-main-menu").empty();
        $("#lhs-sub-menu").empty();
        $("#lhs-navs").empty();
    }

    // paints left column
    function paintNavs() {
    // data is loaded in p.g.navsMenuData
        var element;
        clearLHS();
        p.g.navsIndex = -1;
        // mainMenu value
        $("#lhs-main-menu").text(p.g.navsMenuData.mainMenu);
        // subMenu value
        $("#lhs-sub-menu").text(p.g.navsMenuData.subMenu);

        // navs table
        element = '<table>';
        for (var i = 0; i < p.g.navsMenuData.navs.length; i++ ) {
            element = element.concat(
                '<tr>',
                '<td class="col-lg-10 text-center">',
                __makeNavAnchor(p.g.navsMenuData.navs[i].formID, p.g.navsMenuData.navs[i].nav),
                '</td>',
                '<td class="col-lg-1 text-right">',
                __makeNavHelp(i),
                '</td>',
                '</tr>'
            );
        }
        element = element.concat(
            '</table>'
        )
        $("#lhs-navs").append(element);
    }

    function __makeNavAnchor(formID, nav) {
        return '<a href="#" onclick="p.e.onclickGetForm(' + formID + ')">' + nav + '</a>';
    }

    function __makeNavHelp(index) {
        return '<a class="glyphicon glyphicon-question-sign" href="#" onclick="p.e.onclickGetNavHelp(' + index + ')"></a>';
    }
})();