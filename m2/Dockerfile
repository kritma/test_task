FROM node:alpine

WORKDIR /app

COPY --chown=node:node package*.json ./

RUN npm ci --omit=dev

COPY . .

CMD [ "npm", "run", "start" ]

