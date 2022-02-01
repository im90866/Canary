import pymongo

# Helper functions
def getClient():
    uri = "mongodb+srv://zinasktest.uxarp.mongodb.net/myFirstDatabase?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority"
    client = pymongo.MongoClient("mongodb+srv://User2:password1234@zinasktest.uxarp.mongodb.net/mainDB?retryWrites=true&w=majority")
    return client

# Checks if a value is there in a given collection
# For eg: value = 'Jason', identity = 'username', col = 'userInfo'
def ifExists(value, identity, col):
    db = getClient()['mainDB']
    collection = db[col]
    
    for x in collection.find():
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