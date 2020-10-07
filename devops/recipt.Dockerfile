FROM node:10-alpine

WORKDIR /main
COPY ./backend/receipt.js /main
COPY ./backend/Kafka/KafkaConsumer.js /main/Kafka/
COPY ./backend/package.json /main
COPY ./backend/package-lock.json /main

RUN npm install

CMD ["node", "receipt.js"]  