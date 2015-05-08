
# *********************************************shared functions**************************************************************
def captureTupleNames(t):
    if len(t) == 5:
        captureName, captureDescription, captureMandatory, captureType, captureErrorMsg = t[0].strip(), t[1].strip(), t[2].strip(), t[3].strip(), t[4].strip()
        return captureName, captureDescription, captureMandatory, captureType,captureErrorMsg
    else:
        print 'Error - incorrect tuple length for captureTupleNames'
# ********************************************end shared gunctions***********************************************************
