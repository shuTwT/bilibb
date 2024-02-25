FROM node:20.10

WORKDIR /app

COPY package*.json ./

COPY prisma ./prisma/

COPY .env ./

COPY tsconfig.json ./

COPY public ./

COPY static ./

RUN npm install

RUN npx prisma generate

COPY lib /app

EXPOSE 3000

CMD ["tsx","./lib/app.ts"]