# makes form from TDL
import pickle
import readTDL

# fieldNameList may not have duplicate fieldnames

def getInputType(formatType):
    formatType = formatType.upper()
    if formatType == NUMBER:
        return 'number'
    else:
        return 'text'

def getFormatClass(formatType, mandatory):
    """
        returns validation/format class for input element
        pass str formatType, bool mandatory 
            formatType options
                'finance', 'date', 'text', 'number' 
    """

    formatType = formatType.upper()
    if formatType == 'FINANCE':
        return ' finance-format'
    elif formatType == 'DATE':
        return ' fast-date'
    elif formatType == 'TEXT' and mandatory:
        return ' must-have-text'
    elif formatType == 'TEXT' and not mandatory:
        return ''
    elif formatType == 'NUMBER':
        return ''
    

def formatInputID(fieldName):
    fieldName = fieldName.lower()
    fieldName = fieldName.replace(' ', '-')
    return fieldName

def formatInputLabel(fieldName, mandatory):    
    # field name as defined in tdl is the label
    if mandatory:
         return fieldName + '<em>*</em>'
    else:
        return fieldName


def formStart(formID, fieldNameList):
    s0 = '<form class="form-horizontal" id="form-%s" method="#" onsubmit="p.e.onFormSubmit(event,[' % formID
    s1 = ''
    first = True
    for field in fieldNameList:
        if first:
            s1 = "%s'%s'" % (s1, field) 
        else:
            s1 = "%s, '%s'" % (s1, field)
    s2 = '])">'
    return '''%s%s%s''' % (s0, s1, s2)

def formGroup(fieldName, mandatory, formatType, helpText, errorMsg):
    """
        str fieldName, bool mandatory, str formatType, str helpText, str errorMsg
    """
    inputID = formatInputID(fieldName)
    inputLabel = formatInputLabel(fieldName, mandatory)
    inputType = getInputType(formatType)
    inputFormatClass = getFormatClass(formatType, mandatory) 
    s0 = '<div class="form-group">'
    s1 = """<label for="%s" class="col-sm-2 control-label">%s</label>""" % (inputID, inputLabel) 
    s2 = '<div class="col-sm-10">'
    s3 = """<input  type="%s" id="%s" class="form-control%s" title="%s" errorMsg="%s"
                    onblur="p.e.onExitField(event)" onkeyup="p.e.onKeyUp(event)">""" % (inputType, inputID, inputFormatClass, helpText, errorMsg) 
    s4 = """<em id="amount-error"></em>""" %  ('%s-error' % inputID)
    s5 = """</div>"""
    s6 = """</div>"""
    return '%s%s%s%s%s%s%s' %(s01, s1, s2, s3, s4, s5, s6,s7) 


def hasUniqueCaptureNames(capture):
    captureNames = []
    for each in capture:
        captureNames.append(each[0])
    if len([x for x in captureNames if captureNames.count(x) >= 2]) >= 0:
        return False
    else:
        return True

def isCaptureTupleValid(t):
    if len(t) <> 5:
        return False
    MANDATORY = ['MANDATORY', 'OPTIONAL']    
    FORMAT = ['FINANCIAL', 'DATE', 'TEXT', 'NUMBER']
    captureName = t[0].strip()
    captureDescription = t[1].strip()
    captureMandatory = t[2].strip()
    captureFormat = t[3].strip()
    captureErrorMsg = t[4].strip()
    if len(captureName) == 0:
        return False
    if len(captureDescription) == 0:
        return False
    if captureMandatory.upper() not in MANDATORY:
        return False  
    if captureFormat.upper() not in FORMAT:
        return False  
    if len(captureErrorMsg) == 0:
        return False
    return True

def isTdlValid(tdl):
    errors = []
    if len(tdl.description) == 0:
        errors.append('description: length zero') 
    if len(tdl.category) == 0:
        # we can do a more extensive category check 
        errors.append('category: length zero')
    if len(tdl.capture) == 0:
        errors.append('capture: length zero')
    if not hasUniqueCaptureNames(tdl.capture):
        errors.append('capture: duplicate field names')
    for index, each in enumerate(tdl.capture):
        if not isCaptureTupleValid(each):
            errors.append('captureTuple: %s' % index)
    if errors:
        return False
    else:
        return True
    

fp = open('/home/swannsg/development/nofw/tdl/tdls.pkl', 'rb')
tdls = pickle.load(fp)
for each in tdls:
    tdl = tdls[each]
    if isTdlValid(tdl):
        # carry on
        print 'tdl %s valid' % (each)
    else:
        print 'tdl %s invalid' % (each)
        






