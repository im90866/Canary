import pymongo

client = pymongo.MongoClient("mongodb+srv://User1:password1234@zinasktest.uxarp.mongodb.net/mainDB?retryWrites=true&w=majority", 
        serverSelectionTimeoutMS=5000, maxPoolSize = 500)

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
    db = getClient()
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