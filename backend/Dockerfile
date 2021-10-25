FROM node:13.12.0-alpine

WORKDIR /backend
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 8000

CMD ["npm", "start"]