FROM node:7.9.0
COPY . /usr/local/groundcontrol
WORKDIR /usr/local/groundcontrol
RUN npm install
CMD ["npm", "start"]