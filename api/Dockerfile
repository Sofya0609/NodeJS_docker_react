FROM node:20.11.0-alpine3.19
RUN npm install -g nodemon
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 4000
CMD ["npm", "run", "dev"]