FROM node:12.7.0-alpine

RUN mkdir /app

# ADD package.json /app

WORKDIR /app

RUN apk --no-cache add git python automake make g++
RUN npm install
