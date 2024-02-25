FROM node:21

WORKDIR /usr/src/server

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 8000

CMD ["npm", "run", "dev"]
