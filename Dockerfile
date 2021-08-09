FROM node:14.15.4-slim

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

ENV HOST 0.0.0.0
ENV PORT 3000

EXPOSE 3000

CMD [ "npm", "start" ]
