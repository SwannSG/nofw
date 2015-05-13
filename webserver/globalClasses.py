__author__ = 'swannsg'

# tdl object
class tdl():
    def __init__(self, formID, category, description, navigation, capture):
        self.formID = formID
        self.category = category
        self.description = description
        self.navigation = navigation
        self.capture = capture
        # capture server side
        self.capture_ss = {}

    def __repr__(self):
        return ('formID: %s | %s' % (self.formID, self.description))

# menu handler
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

