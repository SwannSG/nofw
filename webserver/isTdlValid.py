import pickle
import readTDL
import globalConfig
import sharedFunctions

MANDATORY = globalConfig.MANDATORY
FORMAT = globalConfig.FORMAT
MAIN_MENU = globalConfig.MAIN_MENU


# *******************************************check if tdl is valid***********************************************************
def isTdlValid(tdl):
    errors = []
    if len(tdl.description) == 0:
        errors.append('description: length zero') 
    if not isCategoryValid(tdl.category):
        errors.append('category: not correct')
    if not isNavigationValid(tdl.navigation):
        errors.append('navigation: not correct')
    if len(tdl.capture) == 0:
        errors.append('capture: length zero')
    if not hasUniqueCaptureNames(tdl.capture):
        errors.append('capture: duplicate field names')
    for index, each in enumerate(tdl.capture):
        if not isCaptureTupleValid(each):
            errors.append('captureTuple: %s' % index)
    if errors:
        for each in errors:
            print  each
        return False
    else:
        return True
    
def isCaptureTupleValid(t):
    # pass captureTuple
    # returns True (isValid) or False
    if len(t) <> 5:
        print 'captureTuple is not 5 elements'
        print t
        return False
    global MANDATORY    
    global FORMAT
    captureName, captureDescription, captureMandatory, captureType,captureErrorMsg = sharedFunctions.captureTupleNames(t)
    if len(captureName) == 0:
        print 'captureName error'
        return False
    if len(captureDescription) == 0:
        print 'capturerDescription error'
        return False
    if captureMandatory.upper() not in MANDATORY:
        print captureMandatory.upper()
        print 'captureMandatory errror'
        return False  
    if captureType.upper() not in FORMAT:
        print 'captureType error'
        return False  
    if len(captureErrorMsg) == 0:
        print 'captureErrorMsg error' 
        return False
    return True

def hasUniqueCaptureNames(capture):
    captureNames = []
    for each in capture:
        captureNames.append(each[0])
    #--check for duplicate in list capturNames    
    if len([x for x in captureNames if captureNames.count(x) >= 2]) > 0:
        return False
    else:
        return True

def isCategoryValid(tdlCategory):
    if len(tdlCategory) <> 2:
        return False
    else:
        mainCategory = tdlCategory[0]
        subCategory = tdlCategory[1]
        if mainCategory not in MAIN_MENU:
            print 'category: not in MAIN_MENU'
            return False
        if subCategory.strip() == 0:
            # can do more checking here
            print 'category: sub-category zero length'
            return False
        return True

def isNavigationValid(tdlNavigation):
    if len(tdlNavigation.strip()) == 0:
        print 'navigation: zero length'
        return False
    return True
    # test for duplicate navigation names for specific category
    # cannot do this here

# *******************************************end check if tdl is valid********************************************************


