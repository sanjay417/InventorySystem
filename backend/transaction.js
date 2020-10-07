const express = require("express");
const app = express();
const redis = require('redis');
const port = 3003;

const KafkaProducer = require('./Kafka/KafkaProducer.js');

const producer = new KafkaProducer('myTopic');

const { MongoClient, ObjectID } = require("mongodb");
const url = process.env.MONGO_HOST || 'mongodb://localhost:27017';

const dbName = "Mocha";
const client = new MongoClient(url);
const client_transaction = redis.createClient({ host: process.env.REDIS_HOST || 'localhost' });

app.use(express.json()); // this is a middleware

//apis
/*

  POST:
  "/api/transaction" - To record a transaction/purchase

*/

client.connect((err) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // console.log("Connected successfully to server");
  const db = client.db(dbName);

app.post('/api/transaction', (req,res) => {

    let username = req.body.username;
    let items = req.body.itemId;
    let item_name = req.body.itemName;
    let price = req.body.price;
    let params = {};
  
    let date = new Date();
    // let transactionId = _id;
    params.price = price;
    params.date = date.toLocaleString();

    let result = {}
        // records the transaction
        
     db.collection("TransCollection")
        .insert({
          items: items,
          itemName: item_name,
          buyer: username,
          price: price,
          purchaseDate: date.toLocaleString(),
        })
        .then((doc) => {
          params.transactionId = doc._id;
          result["transaction"] = {valid: true, result: doc,};
      
      
          /** Updates the buyer user in purchase history */
        db.collection("UserCollection")
        .findOneAndUpdate(
          {
            userId: username,
          },
          {
            $push: { items: items },  // yet to verify
          }
        )
        .then((doc) => {
          // params.user = doc.firstName;
          // params.email = doc.email;
          // console.log(doc);
          result["buyer"] = { valid: doc };
      
        console.log("items: ",items);
      
            /** Item's salescount is increased */
        db.collection("ItemCollection")
        .findOneAndUpdate(
          {
            itemId: items,
          },
          {
            $inc: { salesCount: 1, quantity : -1 },
          }
        )
        .then((doc) => {
          console.log("Here:",doc.value);
          params.item = doc.value.itemDetails.itemName;
          result["transaction"] = { valid: doc };
          console.log("params: ",params.item);
          
          if(doc.value.quantity <= 1)
          {
            db.collection("ItemCollection")
              .findOneAndUpdate({itemId: items,}, { $set : {forSale: false} })
              .then((doc) => console.log(doc))
              .catch((e) => console.log(e));
          }

        // client_transaction.subscribe('transactionChannel');
       let messageObj = 
       {
          type: 'UPDATE_MESSAGE',
          notificationMessage: `The item ${params.item} has been purchased!`
      }
    client_transaction.publish('transactionChannel', JSON.stringify(messageObj));

    console.log('Pushing new item to queue');
    producer.send(params);
    res.send(result);
  })
  .catch((e) => {
    console.log(e);
    res.send("Error ", e);
  });

  })
  .catch((e) => {
    console.log(e);
    res.send("Error ", e);
  });

  })
  .catch((e) => {
    console.log(e);
    res.send("Error", e);
  });

});
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
