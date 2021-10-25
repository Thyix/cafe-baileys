FROM node:13.12.0-alpine

WORKDIR /front-end
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 8001

CMD ["npm", "start"]