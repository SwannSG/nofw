import globalConfig
import pickle
import readTDL
import isTdlValid 

mainMenuKeys = globalConfig.MAIN_MENU
dirPickle = globalConfig.dirPickle


class menuStuff():

    def __init__(self):
        self.formMenus = {}

    def addItem(self, mainMenu, subMenu, description):
        if self.formMenus.has_key(mainMenu):
            d1 = self.formMenus[mainMenu]
            if d1.has_key(subMenu):
                # add new description to existing mainMenu and subMenu 
                # check for duplicate description !!!
                try:
                    d1[subMenu].index(description)
                    d1[subMenu].append(description)
                    self.formMenus[mainMenu] = d1
                except:
                    print 'menuStuff: duplicate description for %s %s' % (mainMenu, subMenu) 
            else:
                # add new subMenu to existing mainMenu 
                d1[subMenu] = [description]
                self.formMenus[mainMenu] = d1
        else:
            # add new mainMenu
            self.formMenus[mainMenu] = {subMenu: [description]}
            

formMenus = menuStuff()
fp = open('%s/tdls.pkl' % dirPickle, 'rb')
tdls = pickle.load(fp)
for each in tdls:
    print each
    tdl = tdls[each]
    if isTdlValid.isTdlValid(tdl):
        mainMenu = tdl.category[0]
        subMenu = tdl.category[1]
        formDescription = tdl.description
        formMenus.addItem(mainMenu, subMenu, formDescription)
    else:
        print 'invalid'
        
