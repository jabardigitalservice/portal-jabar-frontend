FROM node:14.15.4-slim

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

ARG API_URL
ENV API_URL $API_URL
ENV HOST 0.0.0.0
ENV PORT 3000

RUN npm run build

EXPOSE 3000

CMD [ "npm", "start" ]
