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
    m = re.match(r'^([0-9][0-9,]+.[0-9]{2})$',s)
    if m:
        return True
    else:
        False

    
def getFinanceValue(s):
    # return foating point number from financial-format string 
    s = s.replace(',', '')
    return float(s)


