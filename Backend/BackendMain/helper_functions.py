from PIL import Image
from io import BytesIO

import base64
import pymongo
import re
import datetime

client = pymongo.MongoClient("mongodb+srv://User1:password1234@zinasktest.uxarp.mongodb.net/mainDB?retryWrites=true&w=majority", 
        serverSelectionTimeoutMS=5000, maxPoolSize = 1000)

# Helper functions
def getClient():
    try:
        pymongo.MongoClient.admin.command('ping')
    except:
        print("Server not available")
    
    return client

# Checks if a value is there in a given collection
# For eg: value = 'Jason', identity = 'username', col = 'userInfo'
def ifExists(value, identity, col):
    db = getClient()['mainDB']
    collection = db[col]
    
    for x in collection.find({}):
        if x[identity] == value:
            return True
    return False

# ifExists with an extra parameter which should be true for it to be true
def ifExistsExtra(value, identity, sec_value, sec_identity, col):
    db = getClient()['mainDB']
    collection = db[col]

    for x in collection.find():
        if x[identity] == value and x[sec_identity] == sec_value:
            return True
    return False

    #item['type'] == 'folder')

def searchTree(curFolder, goalFolder):
    if not len(curFolder) > 0:
        return False
    elif not next((item for item in curFolder if item["type"] == 'folder'), False):
        return False
    else:
        result = next((item for item in curFolder if item["projectName"] == goalFolder), False)

    for dict in curFolder:
        if dict["projectName"] == goalFolder and dict["type"] == 'folder':
            return dict

def resizeImage(imageVal, basewidth):
    imageVal = imageVal.read().decode('utf-8')

    # Get the base64 image tag
    imageTag = re.search('^data:image/.+;base64,', imageVal).group(0)

    # Remove the base64 image tag
    image_data = re.sub('^data:image/.+;base64,', '', imageVal)

    # Get image type
    imageFormat = re.search('/.+;', imageTag).group(0).replace('/', '').replace(';', '').upper()

    # Decodes the base64 image and creates a PIL image
    im = Image.open(BytesIO(base64.b64decode(image_data)))
    
    if(basewidth <= im.size[0]):
        wpercent = (basewidth/float(im.size[0]))
        hsize = int((float(im.size[1])*float(wpercent)))
        im = im.resize((basewidth,hsize), Image.ANTIALIAS)

    # Convert the PIL image to bytes so it can be converted to base64 again
    bytes = BytesIO()
    im.save(bytes, format=imageFormat)
    bytes = bytes.getvalue()

    # Converted to base64 and tag is added at the start
    imageVal = imageTag + base64.b64encode(bytes).decode('utf-8') 

    return imageVal

def humanize_date_difference(now, otherdate=None, offset=None):
    if otherdate:
        dt = now - otherdate
        offset = dt.seconds + (dt.days * 60*60*24)
    if offset:
        delta_s = offset % 60
        offset /= 60
        delta_m = offset % 60
        offset /= 60
        delta_h = offset % 24
        offset /= 24
        delta_d = offset
    else:
        raise ValueError("Must supply otherdate or offset (from now)")

    if delta_d >= 1:
        date = now + datetime.timedelta(days=-delta_d, hours=-delta_h, minutes=-delta_m)
        return "%dd ago" % (delta_d)
    if delta_h >= 1:
        return "%dh ago" % (delta_h)
    if delta_m >= 1:
        return "%dm ago" % (delta_m)
    else:
        return "%ds ago" % delta_s

    print(datetime.datetime.now(), "and", datetime.datetime.now() + datetime.timedelta(days=-3))
    print(humanize_date_difference(datetime.datetime.now(), datetime.datetime.now() + datetime.timedelta(seconds=-10)))

          