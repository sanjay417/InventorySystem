FROM node:10-alpine

WORKDIR /main
COPY ./backend/transaction.js /main
COPY ./backend/Kafka/KafkaProducer.js /main/Kafka/
COPY ./backend/package.json /main
COPY ./backend/package-lock.json /main

RUN npm install

EXPOSE 3003

CMD ["node", "transaction.js"]