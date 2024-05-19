FROM node:latest
COPY package.json /app/
COPY  graphQl.js /app/
WORKDIR /app
RUN npm install
EXPOSE 3000
CMD ["node", "graphQl.js"]
