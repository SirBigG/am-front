FROM node:8.15.1-alpine

RUN npm install -g gatsby-cli && \
    apk --no-cache add git

WORKDIR /app/app
