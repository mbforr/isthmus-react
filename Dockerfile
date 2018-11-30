FROM node:v9.3.0

EXPOSE 8080

WORKDIR /bindmount

COPY package-lock.json package.json ./

RUN yarn

RUN npm rebuild node-sass

CMD yarn run dev