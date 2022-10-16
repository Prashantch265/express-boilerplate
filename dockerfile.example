FROM node:16.5.0

COPY . ./app

WORKDIR /app

RUN npm install

EXPOSE 5000

ENV NODE_ENV local

CMD ["npm", "run", "start"]