FROM node:10-alpine

WORKDIR /main
COPY ./frontend/public /main/public
COPY ./frontend/src /main/src
COPY ./frontend/package.json /main
COPY ./frontend/package-lock.json /main

COPY ./backend/frontend.js /main/server/frontend.js

RUN npm install
RUN npm run build

EXPOSE 3000

CMD ["node", "server/frontend.js"]