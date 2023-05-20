FROM node:20.2.0-alpine

RUN mkdir /app

WORKDIR /app

RUN apk --no-cache add git python3 automake make g++

ADD package.json /app

RUN npm install
