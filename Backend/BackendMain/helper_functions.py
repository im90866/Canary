import pymongo

# Helper functions
def getClient():
    uri = "mongodb+srv://zinasktest.uxarp.mongodb.net/myFirstDatabase?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority"
    client = pymongo.MongoClient(uri,
                        tls=True,
                        tlsCertificateKeyFile='Backend/BackendMain/X509-cert-7626596970333998897.pem')
    return client

def ifExists(value, identity):
    db = getClient()['mainDB']
    collection = db['userInfo']

    for x in collection.find():
        print(x[identity])
        print(x['password'])
        if x[identity] == value:
            return True
    return False