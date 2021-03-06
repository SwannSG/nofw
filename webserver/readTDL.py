# read TDL text format and create tdl object
import globalConfig
import globalFunctions
import globalClasses


# collection of tdl objects
tdls = {}
 

def getNextFormID(d):
    keys = d.keys()
    if (keys):
        keys.sort()
        return keys[-1] + 1
    else:
        # no formIDs yet
        return 1


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

if __name__ == "__main__":

    # read a tdl text file
    state = '?'
    sep = '|'
    fp = globalFunctions.getTdlTxtFp()
    for line in fp:
        line = line.strip()
        if len(line) == 0:
            # ignore the line
            continue
        if line == 'START':
            state = 'start'
        elif line == 'CATEGORY':
            state = 'category'
            continue
        elif line == 'DESCRIPTION':
            state = 'description'
            continue
        elif line == 'NAVIGATION':
            state = 'navigation'
            continue
        elif line == 'CAPTURE':
            state = 'capture'
            continue
        elif line == 'BACKEND':
            state = 'backend'
            continue
        elif line == 'END':
            state = 'end'
        if state == 'start':
            category = []
            description = ''
            navigation = ''
            capture = []
        elif state == 'category':
            # do some validation here
            tpl = line.split(sep)
            for each in tpl:
                category.append(each.strip())
        elif state == 'description':
            description = '%s%s' % (description, line)
        elif state == 'navigation':
            navigation = line
        elif state == 'capture':
            tpl = line.split(sep)
            temp = []
            for each in tpl:
                temp.append(each.strip())
            capture.append(tuple(temp))
        elif state == 'end':
            o = globalClasses.tdl(getNextFormID(tdls),
                    category,
                    description,
                    navigation,
                    capture)
            tdls[o.formID] = o

    globalFunctions.closeTdlTxtFp(fp)
    globalFunctions.dumpTDLS(tdls)


    


