# makes form html artifat from TDL dict
# first check for valid tdl
# second make the html artifact
# write html artifact to disk
#
# tdls container for tdl
#   tdl = tdls[key]
#       tdl.formID
#       tdl.category        [cat 1 | cat 2]
#       tdl.navigation      LHS link
#       tdl.description     Detailed description in msg area
#       tdl.capture     [ (captureTuple_1),...., (captureTuple_n) ]
#           order captureTuples is order of display
#   captureTuple
#       fieldname       derive formLabel, formFieldID
#       helpText        directly used for input text
#       mandatory       field must be captured by user
#       fieldType
#           date        always mandatory, form text input
#           financial   always mandatory, form text input
#           number      ???
#           text        mandatory or optional, form text input
#           textbox     mandatory or optional, form textbox
#       errorMsg        error message to display if field completed incorrectly

import globalConfig
import pickle
import readTDL



#MANDATORY = ['MANDATORY', 'OPTIONAL', '*']    
#FORMAT = ['FINANCE', 'DATE', 'TEXT', 'NUMBER', 'TEXTBOX']

MANDATORY = globalConfig.MANDATORY
FORMAT = globalConfig.FORMAT

# directory for pickle artifacts
dirPickle = globalConfig.dirPickle

# directory for form html artifacts
dirForms = globalConfig.dirForms


# *********************************************shared functions**************************************************************
def captureTupleNames(t):
    if len(t) == 5:
        captureName, captureDescription, captureMandatory, captureType, captureErrorMsg = t[0].strip(), t[1].strip(), t[2].strip(), t[3].strip(), t[4].strip()
        return captureName, captureDescription, captureMandatory, captureType,captureErrorMsg
    else:
        print 'Error - incorrect tuple length for captureTupleNames'
# ********************************************end shared gunctions***********************************************************
        

# *******************************************assemble form html artifact*******************************************************
def assembleForm(tdl):
    s0 = formStart(tdl.formID, getFieldNameList(tdl))
    formGroups = []
    for captureTuple in tdl.capture:
        captureName, captureDescription, captureMandatory, captureType,captureErrorMsg = captureTupleNames(captureTuple)
        formGroups.append(formGroup(captureName, boolMandatory(captureMandatory), captureType, captureDescription, captureErrorMsg)) 
    result = s0
    for each in formGroups:
        result = """%s%s""" % (result, each)
    s1 = formEnd()
    result = """%s%s""" % (result, s1)
    return result                                

def formStart(formID, fieldNameList):
    s0 = '<form class="form-horizontal" id="form-%s" method="#" onsubmit="p.e.onFormSubmit(event,[' % formID
    s1 = ''
    first = True
    for field in fieldNameList:
        if first:
            first = False
            s1 = "%s'%s'" % (s1, field) 
        else:
            s1 = "%s, '%s'" % (s1, field)
    s2 = '])">'
    return '''%s%s%s\n''' % (s0, s1, s2)


def getFieldNameList(tdl):
    fieldNameList = []
    for each in tdl.capture:
        fieldNameList.append(each[0])
    return fieldNameList

def formGroup(fieldName, mandatory, formatType, helpText, errorMsg):
    """
        str fieldName, bool mandatory, str formatType, str helpText, str errorMsg
    """
    print mandatory, formatType
    inputID = formatInputID(fieldName)
    inputLabel = formatInputLabel(fieldName, mandatory)
    inputType = getInputType(formatType)
    inputFormatClass = getFormatClass(formatType, mandatory)
    if inputType == 'textbox':
        s0 = '\t<div class="form-group">\n'
        s1 = """\t\t<label for="%s" class="col-sm-2 control-label">%s</label>\n""" % (inputID, inputLabel) 
        s2 = '\t\t<div class="col-sm-10">\n'
        s3 = """\t\t\t<textarea  rows="3"\n\t\t\t\t id="%s"\n\t\t\t\t class="form-control%s"\n\t\t\t\t title="%s"\n\t\t\t\t errorMsg="%s\n\t\t\t\t"onblur="p.e.onExitField(event)" onkeyup="p.e.onKeyUp(event)"></textarea>\n""" % (inputID, inputFormatClass, helpText, errorMsg) 
        s4 = """\t\t\t<em id="%s-error"></em>\n""" %  (inputID)
        s5 = """\t\t</div>\n"""
        s6 = """\t</div>\n"""
    else:
        s0 = '\t<div class="form-group">\n'
        s1 = """\t\t<label for="%s" class="col-sm-2 control-label">%s</label>\n""" % (inputID, inputLabel) 
        s2 = '\t\t<div class="col-sm-10">\n'
        s3 = """\t\t\t<input  type="%s"\n\t\t\t\t id="%s"\n\t\t\t\t class="form-control%s"\n\t\t\t\t title="%s"\n\t\t\t\t errorMsg="%s\n\t\t\t\t"onblur="p.e.onExitField(event)" onkeyup="p.e.onKeyUp(event)">\n""" % (inputType, inputID, inputFormatClass, helpText, errorMsg) 
        s4 = """\t\t\t<em id="%s-error"></em>\n""" %  (inputID)
        s5 = """\t\t</div>\n"""
        s6 = """\t</div>\n"""
    return '%s%s%s%s%s%s%s' %(s0, s1, s2, s3, s4, s5, s6) 

def boolMandatory(string):
    if string.upper().strip() == 'MANDATORY':
        return True
    else:
        return False

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

def getInputType(formatType):
    print formatType
    formatType = formatType.upper()
    print formatType
    if formatType == 'NUMBER':
        return 'number'
    elif formatType == 'TEXTBOX':
        return 'textbox'
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
    elif (formatType == 'TEXT' or formatType == 'TEXTBOX')  and mandatory:
        return ' must-have-text'
    elif formatType == 'TEXT' and not mandatory:
        return ''
    elif formatType == 'NUMBER':
        return ''

def formEnd():
    s0 = """\t<div class="form-group">\n"""
    s1 = """\t\t<div class="col-sm-offset-2 col-sm-10">\n"""
    s2 = """\t\t\t<button type="submit" class="btn btn-default">Submit</button>\n"""
    s3 = """\t\t\t<button type="cancel" class="btn btn-default">Cancel</button>\n"""
    s4 = """<\t\t/div>\n"""
    s5 = """\t</div>\n"""
    s6 = """</form>\n"""
    return '%s%s%s%s%s%s%s' %(s0, s1, s2, s3, s4, s5, s6)

# *******************************************end assemble form html artifact*************************************************

# *******************************************check if tdl is valid***********************************************************
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
    captureName, captureDescription, captureMandatory, captureType,captureErrorMsg = captureTupleNames(t)
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
    if len([x for x in captureNames if captureNames.count(x) >= 2]) > 0:
        return False
    else:
        return True

# *******************************************end check if tdl is valid********************************************************


# *******************************************create form html artifacts*******************************************************
fp = open('%s/tdls.pkl' % dirPickle, 'rb')
tdls = pickle.load(fp)
for each in tdls:
    tdl = tdls[each]
    if isTdlValid(tdl):
        # carry on
        formHTML = assembleForm(tdl)
        fp = open('%s/form_%s.html' % (dirForms, tdl.formID), 'w')
        fp.write(formHTML)
        fp.close
    else:
        print 'tdl %s invalid' % (each)
# *******************************************end create form html artifacts**************************************************






