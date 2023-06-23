FROM node:20.3.1-alpine

RUN mkdir /app

WORKDIR /app

RUN apk --no-cache add git python3 automake make g++

ADD package.json /app

RUN npm install
