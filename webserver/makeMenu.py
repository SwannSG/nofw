import globalConfig
import globalFunctions
import globalClasses
import isTdlValid

if __name__ == "__main__":
    mainMenuKeys = globalConfig.MAIN_MENU
    formMenus = globalClasses.menuStuff()
    tdls = globalFunctions.loadTDLS()
    for each in tdls:
        tdl = tdls[each]
        if isTdlValid.isTdlValid(tdl):
            mainMenu = tdl.category[0]
            subMenu = tdl.category[1]
            formNavigation = tdl.navigation
            formDescription = tdl.description
            formID = tdl.formID
            formMenus.addItem(mainMenu, subMenu, formDescription, formID, formNavigation)
        else:
            print 'formMenus invalid tdl: %s' % tdl
    globalFunctions.dumpFormMenus(formMenus)

