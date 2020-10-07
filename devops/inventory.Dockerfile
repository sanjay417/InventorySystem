FROM node:10-alpine

WORKDIR /main
COPY ./backend/inventory.js /main
COPY ./backend/package.json /main
COPY ./backend/package-lock.json /main

RUN npm install

EXPOSE 3004

CMD ["node", "inventory.js"]