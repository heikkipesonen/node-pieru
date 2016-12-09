FROM node:latest

ADD server /server
WORKDIR /server
RUN npm install
EXPOSE 9001

CMD ["npm", "run", "dev"]
