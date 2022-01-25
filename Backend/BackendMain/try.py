import pymongo
import gridfs
import cv2
import matplotlib.pyplot as plt
import matplotlib.image as mpimg
import numpy as np
from PIL import Image

import cv2
  
# path
"""
uri = "mongodb+srv://zinasktest.uxarp.mongodb.net/myFirstDatabase?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority"
client = pymongo.MongoClient(uri,
                    tls=True,
                    tlsCertificateKeyFile='Backend/BackendMain/X509-cert-7626596970333998897.pem')

db = client['imageList']
collection = db['images1']
fs = gridfs.GridFS(db)


image = cv2.imread('Backend/BackendMain/blade.jpg')
cv2.imshow('image', image) 
imageString = image.tobytes()

# store the image
imageID = fs.put(imageString, encoding='utf-8')

# create our image meta data
meta = {
    'name': 'testerimage0',
    'images': [
        {
            'imageID': imageID,
            'shape': image.shape,
            'dtype': str(image.dtype)
        }
    ]
}

"""

"""

# insert the meta data
collection.insert_one(meta)




image = collection.find_one({'name': 'myTestSet'})['images'][0]

# get the image from gridfs
gOut = fs.get(image['imageID'])

# convert bytes to ndarray
newimg = np.frombuffer(gOut.read(), dtype=np.uint8)

# reshape to match the image size
newimg = np.reshape(newimg, image['shape'])
cv2.imshow('image', newimg) 

"""