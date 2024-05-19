FROM node:latest
COPY package.json /app/
COPY list.js /app/
WORKDIR /app
RUN npm install
EXPOSE 3000
CMD ["node", "list.js"]
