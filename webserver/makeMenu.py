import globalConfig
import pickle
import readTDL
import isTdlValid 

mainMenuKeys = globalConfig.MAIN_MENU
dirPickle = globalConfig.dirPickle


class menuStuff():

    def __init__(self):
        self.formMenus = {}

    def addItem(self, mainMenu, subMenu, formDescription, formID, formNavigation):
        if self.formMenus.has_key(mainMenu):
            d1 = self.formMenus[mainMenu]
            if d1.has_key(subMenu):
                # add new description to existing mainMenu and subMenu 
                # check for duplicate description !!!
                try:
                    d1[subMenu].index( (formNavigation, formDescription, formID) )
                    # tuple is found and must not be duplicated
                    print 'Error formMenus.formID: %s duplicate' % formID 
                except:
                    # tuple not found and needs to be added
                    d1[subMenu].append( (formNavigation, formDescription, formID) )
                    # sort on formNavigation in tuple
                    d1[subMenu] = sorted(d1[subMenu], key=lambda x: x[0])
                    self.formMenus[mainMenu] = d1
            else:
                # add new subMenu to existing mainMenu 
                d1[subMenu] = [ (formNavigation, formDescription, formID) ]
                self.formMenus[mainMenu] = d1
        else:
            # add new mainMenu
            self.formMenus[mainMenu] = {subMenu: [ (formNavigation, formDescription, formID) ]}
            
    def getSubMenus(self, mainMenu):
        # pass mainMenu
        # returns { mainMenu: mainMenu,
        #           subMenus: [subMenu1, ........, subMenuN]} 
        if self.formMenus.has_key(mainMenu):
            d1 = self.formMenus[mainMenu]
            subMenus = d1.keys()
            subMenus.sort()
            return { 'mainMenu': mainMenu,
                     'subMenus': subMenus  } 
        else:
            return { 'mainMenu': mainMenu,
                     'subMenus': []  } 

    def getNavs(self, mainMenu, subMenu):
        # pass mainMenu, subMenu
        # returns { mainMenu: mainMenu,
        #           subMenu:  subMenu,
        #           navigation: [subMenu1: (formId1, formDescription1),
        #
        #                        subMenuN: (formIdN, formDescriptionN)]
        if self.formMenus.has_key(mainMenu):
            d1 = self.formMenus[mainMenu]
            if d1.has_key(subMenu):
                result = []
                navs = d1[subMenu]
                for each in navs:
                    temp_d = {'nav': each[0],
                              'desc': each[1],
                              'formID': each[2]}
                    result.append(temp_d)    
                return {'mainMenu': mainMenu,
                        'subMenu': subMenu,
                        'navs': result}
            else:
                return False
        else:
            return False
            



formMenus = menuStuff()
fp = open('%s/tdls.pkl' % dirPickle, 'rb')
tdls = pickle.load(fp)
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
fp.close()
fp = open('%s/formMenus.pkl' % dirPickle, 'wb')
pickle.dump(formMenus, fp)
fp.close()
        
#d = formMenus.getSubMenus('Expense')
#n = formMenus.getNavs('Expense', 'Entertainment')
