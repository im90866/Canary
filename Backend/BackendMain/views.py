from django.shortcuts import render
from django.http import HttpResponse
import pymongo

# Create your views here.
def getBack(request):
    uri = "mongodb+srv://zinasktest.uxarp.mongodb.net/myFirstDatabase?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority"
    client = pymongo.MongoClient(uri,
                        tls=True,
                        tlsCertificateKeyFile='Backend/BackendMain/X509-cert-7626596970333998897.pem')

    db = client['testDB']
    collection = db['testCol']

    s = ""

    for x in collection.find():
        s += str(x)

    return HttpResponse(s)
