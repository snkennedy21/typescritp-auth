FROM node:21

WORKDIR /usr/src/backend

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate --schema=./prisma/schema.prisma

EXPOSE 8000

CMD ["npm", "run", "dev"]
