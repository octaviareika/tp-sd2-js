FROM node:14
WORKDIR /app
COPY client1.js .
COPY client2.js .
RUN npm install uuid
CMD ["node", "client1.js"]