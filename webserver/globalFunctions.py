import pickle
import globalConfig

# *********************************************standalone shared functions**************************************************************
def captureTupleNames(t):
    if len(t) == 5:
        captureName, captureDescription, captureMandatory, captureType, captureErrorMsg = t[0].strip(), t[1].strip(), t[2].strip(), t[3].strip(), t[4].strip()
        return captureName, captureDescription, captureMandatory, captureType,captureErrorMsg
    else:
        print 'Error - incorrect tuple length for captureTupleNames'


def formatInputID(fieldName):
    fieldName = fieldName.lower()
    fieldName = fieldName.replace(' ', '-')
    return fieldName

def boolMandatory(string):
    if string.upper().strip() == 'MANDATORY':
        return True
    else:
        return False
# *****************************************end standalone shared functions****************************************************



# ****************************************shared functions with other library dependence**************************************
def loadFormMenus():
    fp = open('%s/formMenus.pkl' % globalConfig.dirForms, 'rb')
    formMenus = pickle.load(fp)
    fp.close()
    return formMenus

def dumpFormMenus(pklObject):
    fp = open('%s/formMenus.pkl' % globalConfig.dirForms, 'wb')
    pickle.dump(pklObject, fp)
    fp.close()

def loadTDLS():
    fp = open('%s/tdls.pkl' % globalConfig.dirPickle, 'rb')
    tdls = pickle.load(fp)
    fp.close()
    return tdls

def dumpTDLS(pklObject):
    fp = open('%s/tdls.pkl' % globalConfig.dirPickle, 'wb')
    pickle.dump(pklObject, fp)
    fp.close()


def getTdlTxtFp():
    fp = open('%s/tdl.txt' % globalConfig.dirTdlTxt)
    return fp

def closeTdlTxtFp(fp):
    fp.close()
# ***************************************end shared functions with other library dependence***********************************



