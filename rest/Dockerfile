FROM node:latest
COPY package.json /app/
COPY rest.js /app/
WORKDIR /app
RUN npm install
EXPOSE 3000
CMD ["node", "rest.js"]
