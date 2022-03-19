class WebSocketService {
    static instance = null;
    callbacks = {};

    static getInstance() {
      if (!WebSocketService.instance) {
        WebSocketService.instance = new WebSocketService();
      }
      return WebSocketService.instance;
    }
  
    constructor() {
      this.socketRef = null;
    }
  
    connect(setUpdater) {
      //const path = config.API_PATH;
      this.socketRef = new WebSocket('ws://localhost:8000/ws/');
      this.socketRef.onopen = () => {
        console.log('WebSocket open');
      };

      this.socketRef.onmessage = e => {
        let info = JSON.parse(e.data)
        console.log(info)

        setUpdater(info)
      };
  
      this.socketRef.onerror = e => {
        console.log(e);
      };
      this.socketRef.onclose = () => {
        console.log("WebSocket closed let's reopen");
        this.connect();
      };
    }

    sendToChat(message, chatID, otherID) {
        try{
            this.socketRef.send(JSON.stringify({
                'send_to_chat': true,
                'userID': getCookie('userID'),
                'otherID': otherID,
                'username': getCookie('username'),
                'message': message,
                'chatID': chatID
            }));
        } catch(e){
            console.log('could not connect to the websockets')
        }
    }
  
    socketNewMessage(data) {
        console.log(data)
      const parsedData = JSON.parse(data);
      const command = parsedData.command;
      if (Object.keys(this.callbacks).length === 0) {
        return;
      }
      if (command === 'messages') {
        this.callbacks[command](parsedData.messages);
      }
      if (command === 'new_message') {
        this.callbacks[command](parsedData.message);
      }
    }
  
    initChatUser(username) {
      this.sendMessage({ command: 'init_chat', username: username });
    }
  
    fetchMessages(username) {
      this.sendMessage({ command: 'fetch_messages', username: username });
    }
  
    newChatMessage(message) {
      this.sendMessage({ command: 'new_message', from: message.from, text: message.text }); 
    }
  
    addCallbacks(messagesCallback, newMessageCallback) {
      this.callbacks['messages'] = messagesCallback;
      this.callbacks['new_message'] = newMessageCallback;
    }
    
    sendMessage(data) {
      try {
        this.socketRef.send(JSON.stringify({ ...data }));
      }
      catch(err) {
        console.log(err.message);
      }  
    }
  
    state() {
      return this.socketRef.readyState;
    }
  
     waitForSocketConnection(callback){
      const socket = this.socketRef;
      const recursion = this.waitForSocketConnection;
      setTimeout(
        function () {
          if (socket.readyState === 1) {
            console.log("Connection is made")
            if(callback != null){
              callback();
            }
            return;
  
          } else {
            console.log("wait for connection...")
            recursion(callback);
          }
        }, 1); // wait 5 milisecond for the connection...
    }
  
  }
  
  function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }
  

  const WebSocketInstance = WebSocketService.getInstance();

  export default WebSocketInstance;
