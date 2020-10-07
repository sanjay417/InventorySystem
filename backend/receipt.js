const KafkaConsumer = require('./Kafka/KafkaConsumer');
const consumer = new KafkaConsumer(['myTopic', 'myOtherTopic']);

const nodemailer = require('nodemailer');
const fromEmail = 'csc667.867@gmail.com';
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: fromEmail,
    pass: process.env.PASSWD, // DO NOT COMMIT THIS
  },
});


consumer.on('message', (message) => {
  console.log('New item has been read');

  params = message.value;

    // All receipt logic

    const mailOptions = {
from: fromEmail,
to: params.email,
subject: 'Purchase Status with MochaBay e-commerce website',
text: `Hi ${params.user}!
      
  The transaction is successful!

  Transaction Details:
  
  Transaction id : ${params.transactionId}
  Item: ${params.item}
  Price: ${params.price}
  Purchase date: ${params.date}
      
Thank you for shopping with us!`,
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

});

consumer.connect();