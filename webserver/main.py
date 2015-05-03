from bottle import route, run, static_file, debug, template, request, response
from json import dumps



@route('/index', method='GET')
def home():
    return static_file('index.html', root='/home/swannsg/development/nofw/html')
 
@route('/v1.0/menu/expense', method='GET')
def menu_expense():
    leftMenuItems = []
    menuItem = {'text': 'Entertainment',
                'href': '/v1.0/form01'}
    leftMenuItems.append(menuItem)
    menuItem = {'text': 'Entertainment Other',
                'href': '/v1.0/form02'}
    response.content_type = 'application/json'
    leftMenuItems.append(menuItem)
    return dumps(leftMenuItems)

@route('/v1.0/form01', method='GET')
def form01():
    # get fragment
    fp = open('/home/swannsg/development/nofw/html/forms/form01.html')
    result = ''
    for line in fp:
        result = result + line
    return dumps({'form':result})    

#--static components
@route('/home/swannsg/development/UAS/bower_components/bootstrap/dist/css/<filename>')
def static01(filename):
    print 'static01'
    return static_file(filename,
                       root='/home/swannsg/development/UAS/bower_components/bootstrap/dist/css')

@route('/home/swannsg/development/UAS/bower_components/bootstrap/dist/js/<filename>')
def static02(filename):
    print 'static02'
    return static_file(filename,
                       root='/home/swannsg/development/UAS/bower_components/bootstrap/dist/js')

@route('/home/swannsg/development/UAS/bower_components/jquery/dist/<filename>')
def static03(filename):
    print 'static03'
    return static_file(filename,
                       root='/home/swannsg/development/UAS/bower_components/jquery/dist')


@route('/home/swannsg/development/UAS/bower_components/angular/<filename>')
def static04(filename):
    print 'static04'
    return static_file(filename,
                       root='/home/swannsg/development/UAS/bower_components/angular')

@route('/home/swannsg/development/UAS/bower_components/html5shiv/dist/<filename>')
def static05(filename):
    print 'static05'
    return static_file(filename,
                       root='/home/swannsg/development/UAS/bower_components/html5shiv/dist')

@route('/home/swannsg/development/UAS/bower_components/respond/dest/<filename>')
def static06(filename):
    print 'static06'
    return static_file(filename,
                       root='/home/swannsg/development/UAS/bower_components/respond/dest')

@route('/home/swannsg/development/UAS/js/controllers/<filename>')
def static07(filename):
    print 'static07'
    return static_file(filename,
                       root='/home/swannsg/development/UAS/js/controllers')

@route('/home/swannsg/development/nofw/js/<filename>')
def static08(filename):
    print 'static08'
    return static_file(filename,
                       root='/home/swannsg/development/nofw/js')

@route('/home/swannsg/development/nofw/js/library/<filename>')
def static09(filename):
    print 'static09'
    return static_file(filename,
                       root='/home/swannsg/development/nofw/js/library')

@route('/home/swannsg/development/nofw/css/<filename>')
def static10(filename):
    print 'static10'
    return static_file(filename,
                       root='/home/swannsg/development/nofw/css')

@route('/home/swannsg/development/nofw/js/private/<filename>')
def static11(filename):
    return static_file(filename,
                       root='/home/swannsg/development/nofw/js/private')

@route('/home/swannsg/development/UAS/bower_components/jqueryui/<filename>')
def static12(filename):
    print filename
    return static_file(filename,
                       root='/home/swannsg/development/UAS/bower_components/jqueryui')


run(reloader=True)    
run(host='localhost', port=8080, debug=True)

