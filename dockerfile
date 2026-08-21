FROM node:24-alpine

WORKDIR /app

COPY package*.json ./

RUN addgroup -S nonroot \
    && adduser -S nonroot -G nonroot

USER nonroot

COPY . .

EXPOSE 4000

CMD ["npm", "start"]
