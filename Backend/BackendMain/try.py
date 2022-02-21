
from re import search


blaise = [
    {
        'type' : 'folder',
        'name' : 'jas',
        'folders' : [ 
            {
                'type' : 'folder',
                'name' : 'class',
                'folders' : [
                    {
                        'type' : 'file',
                        'name' : 'bawad'
                    }
                ]
            },
            {
                'type' : 'folder',
                'name' : 'blass',
                'folders' : [
                    {
                        'type' : 'folder',
                        'name' : 'sad',
                        'folders' : [
                            {
                                'type' : 'file',
                                'name' : 'sadv'
                            }
                        ]
                    },
                    {
                        'type' : 'folder',
                        'name' : 'sadss',
                        'folders' : [
                            {
                                'type' : 'file',
                                'name' : 'sadw'
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        'type' : 'folder',
        'name' : 'mann',
        'folders' : [
            {
                'type' : 'folder',
                'name' : 'jogn',
                'folders' : [
                    {
                        'type' : 'folder',
                        'name' : 'pello',
                        'folders' : [
                            {
                                'type' : 'file',
                                'name' : 'casm'
                            }
                        ]
                    },
                    {
                        'type' : 'folder',
                        'name' : 'boil',
                        'folders' : [
                            {
                                'type' : 'file',
                                'name' : 'daete'
                            }
                        ]
                    }
                ]
            }
        ]
        
    }
]

def searchTree(curFolder, goalFolder):
    if not len(curFolder) > 0:
        return {}
    elif not next((item for item in curFolder if item["type"] == 'folder'), False):
        return {}
    else:
        for x in curFolder:
            if x['name'] == goalFolder:
                return x

        totalVal = {}
        for x in curFolder:
            totalVal = dict(list(totalVal.items()) + list(searchTree(x['folders'], goalFolder).items()))
        return totalVal


def search_dictionaries(key, value, list_of_dictionaries):
    return len([element for element in list_of_dictionaries if element[key] == value]) > 0

print(searchTree(blaise, 'blaSss'))