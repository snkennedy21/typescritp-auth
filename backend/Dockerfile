FROM node:21

WORKDIR /usr/src/backend

COPY package*.json ./

RUN npm cache clean --force && npm install --verbose

COPY . .

RUN npx prisma generate --schema=./prisma/schema.prisma

EXPOSE 8000

CMD ["npm", "run", "dev"]
