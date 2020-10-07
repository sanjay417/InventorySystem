FROM node:10-alpine

WORKDIR /main
COPY ./backend/auth.js /main
COPY ./backend/package.json /main
COPY ./backend/package-lock.json /main

RUN npm install

EXPOSE 3001


CMD ["node", "auth.js"]