FROM node:18-alpine
WORKDIR /app
COPY package.json .
RUN npm install
RUN npm install chokidar
RUN npm install react-router-dom
COPY . .
EXPOSE 3000
CMD ["npm", "run", "start"]