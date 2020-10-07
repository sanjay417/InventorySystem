FROM node:10-alpine

WORKDIR /main
COPY ./backend/db.js /main
COPY ./backend/package.json /main
COPY ./backend/package-lock.json /main

RUN npm install

EXPOSE 7000

CMD ["node", "db.js"]