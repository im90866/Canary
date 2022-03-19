returnChatList = [{'s':1, 'n':3},{'s':5, 'n':6},{'s':4, 'n':3},{'s':12, 'n':2}]

for x in range(len(returnChatList)):
    returnChatList[x] = (returnChatList[x])['n']

print(returnChatList)