FROM node:11.14.0-alpine

RUN mkdir /app

ADD package.json /app

WORKDIR /app

RUN apk --no-cache add git &&\
    npm install

