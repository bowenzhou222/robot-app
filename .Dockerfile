FROM node:18.18.2

WORKDIR /app

COPY package.json package.json
COPY yarn.lock yarn.lock

RUN yarn install

COPY . .

RUN yarn build

CMD [ "node", "./dist/src/index.js" ]