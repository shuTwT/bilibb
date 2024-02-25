FROM node:20-alpine

ENV APP_PATH=/node/app
ENV NODE_ENV=production
ENV DATABASE_URL="mysql://bilibb:Bilibb@123@172.29.106.253:3307/bilibb"
ENV ALLOW_TCP=false

WORKDIR $APP_PATH

COPY package*.json .

RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 3000

CMD ["npm","start" ]