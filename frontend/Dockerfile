FROM node:20-alpine

WORKDIR /usr/src/backend

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "npm", "run", "dev" ]