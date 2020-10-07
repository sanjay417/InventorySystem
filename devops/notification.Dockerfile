FROM node:10-alpine

WORKDIR /main
COPY ./backend/notification.js /main
COPY ./backend/package.json /main
COPY ./backend/package-lock.json /main

RUN npm install

EXPOSE 3002

CMD ["node", "notification.js"]