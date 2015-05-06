# validation rules
import re
from datetime import datetime

def isDate(s):
    # expect dd/mm/yyyy
    # return True if date valid
    m = re.match(r'^([0-9]{1,2})?\/([0-9]{1,2})?\/(19|20)([0-9]{2})$',s)
    day = int(m.group(1))
    month = int(m.group(2))
    year = int('%s%s' % (m.group(3), m.group(4)))
    if m:
        try:
            datetime(year, month, day)
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


#finTest = []
#finTest.append('0.23')
#finTest.append('01.23')
#finTest.append('11.23')
#finTest.append('1,01.23')
#finTest.append('1,001.23')
#finTest.append('1,000,001.23')



