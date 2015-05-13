# validation rules
import re
import datetime
import globalFunctions

def isDate(s):
    # expect dd/mm/yyyy
    # return True if date valid
    m = re.match(r'^([0-9]{1,2})?\/([0-9]{1,2})?\/(19|20)([0-9]{2})$',s)
    day = int(m.group(1))
    month = int(m.group(2))
    year = int('%s%s' % (m.group(3), m.group(4)))
    if m:
        try:
            datetime.date(year, month, day)
            return True
        except:
            return False
    else:
        return False

def getDate(s):
    # expect dd/mm/yyyy
    # returns date object 
    m = re.match(r'^([0-9]{1,2})?\/([0-9]{1,2})?\/(19|20)([0-9]{2})$',s)
    day = int(m.group(1))
    month = int(m.group(2))
    year = int('%s%s' % (m.group(3), m.group(4)))
    return datetime(year, month, day)

def isFinanceValue(s):
    # check finance-format string for correctness
    # need correct regex expression
    # n,nnn,nnn.nn
    m = re.match(r'^[1-9]{1}[0-9]{0,2}.[0-9]{2}$|^0.[0-9]{2}$|^[1-9]{1}(,[0-9]{3})+.[0-9]{2}$',s)
    if m:
        return True
    else:
        return False

   
def getFinanceValue(s):
    # return foating point number from financial-format string
    # s includes , and decimal point .
    s = s.replace(',', '')
    return float(s)

def isMustHaveText(s):
    if len(s.strip()) > 0:
        return True
    else:
        return False


def areInputFieldsValid(capture_ss, data):
    # capture_ss: described in tdl, has form (True, inputType)
    # data: JSON data sent to server from client
    # returns boolean
    for fieldID in capture_ss:
        mandatory = capture_ss[fieldID][0]
        inputType = capture_ss[fieldID][1]
        if inputType.upper() == 'FINANCE':
            if not isFinanceValue(data[fieldID]):
                print 'fieldID: %s FINANCE fails' % fieldID
                return False
        elif inputType.upper() == 'DATE':
            if not isDate(data[fieldID]):
                print 'fieldID: %s DATE fails value %s' % (fieldID, data[fieldID])
                return False
        elif inputType.upper() == 'TEXT' and mandatory:
            if not isMustHaveText(data[fieldID]):
                print 'fieldID: %s TEXT fails' % fieldID
                return False
        elif inputType.upper() == 'TEXTBOX' and mandatory:
            if not isMustHaveText(data[fieldID]):
                print 'fieldID: %s TEXTBOX fails' % fieldID
                return False
    return True


def getFinanceNumericValue(s):
    s = s.replace(',', '')
    return float(s)

def getDateValue(s):
    day, month, year = s.split('/')
    return datetime.date(int(year), int(month), int(day))

def getFieldValues(capture_ss, data):
    print 'getFieldValues'
    fieldValues = {}
    for fieldID in capture_ss:
        print fieldID
        inputType = capture_ss[fieldID][1]
        print inputType
        if inputType.upper() == 'FINANCE':
            fieldValues[fieldID] = getFinanceNumericValue(data[fieldID])
        elif inputType.upper() == 'DATE':
            fieldValues[fieldID] = getDateValue(data[fieldID])
        elif inputType.upper() == 'TEXT':
            fieldValues[fieldID] = data[fieldID]
        elif inputType.upper() == 'TEXTBOX':
            fieldValues[fieldID] = data[fieldID]
    print 'fieldValues'
    print fieldValues
    return fieldValues
