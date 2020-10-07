const WebSocket = require('ws');
const options = {port: 3002};
const redis = require('redis');
const client = redis.createClient({ host: process.env.REDIS_HOST || 'localhost' });


const client_transaction = redis.createClient({ host: process.env.REDIS_HOST || 'localhost' });

const wss = new WebSocket.Server(options);



wss.on('connection' , (ws) => {
    
    ws.on('message', (message) => {
        const msgObj = JSON.parse(message);
        console.log(msgObj);
        ws.id = msgObj.id;
        // client.incr(msgObj.id);
        let itemCount;

        client.incr(ws.id, (err, cachedValue) => {

            if(err) {
              console.log(err);
            }
            console.log(cachedValue);
            itemCount = cachedValue;
        
        console.log(itemCount);
        switch(msgObj.type){
            case 'CONNECT':
                // client.incr(msgObj.id);
                updateItemViewerCount(msgObj.id, itemCount);
                break;
            case 'DISCONNECT':
                // client.decr(msgObj.id);
                updateItemViewerCount(msgObj.id, itemCount-1);
                break;
            default:
                console.log('Message Type not Supported');
        }

        });
    });

    ws.on('close', (e) => {
        if(ws.id){
        client.decr(ws.id, (err, cachedValue) => {

            if(err) {
              console.log(err);
            }
            console.log(cachedValue);
        updateItemViewerCount(ws.id, cachedValue);
        });
    }
    });

    ws.on('error', (e) => {});

});

client_transaction.on('message', (channel, message) => {
    console.log("Message: ",message);
    // broadcastMessage(message);
    console.log(JSON.parse(message));    
    wss.clients.forEach((client) => {
                client.send(message);
            
        });

});

client_transaction.subscribe('transactionChannel');
const broadcastMessage = (message) => {
    console.log(JSON.parse(message));    
    wss.clients.forEach((client) => {
                client.send((message));
            
        });
    };

const updateItemViewerCount = (itemId, itemCount) => {
    broadcastMessage(JSON.stringify({
        type: 'UPDATE_VIEW_COUNT',
        id: itemId,
        count: itemCount,
    }))
}