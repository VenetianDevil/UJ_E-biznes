FROM node:16

WORKDIR /usr/src/app

# install and cache app dependencies

COPY package*.json ./

ADD package.json /usr/src/app/package.json

RUN npm install --force

# Bundle app source

COPY . .

EXPOSE 3000

# start app
CMD ["npm", "start"]
