FROM node

WORKDIR /backend3javierjacobo

COPY package.json ./
RUN npm install
COPY . .

EXPOSE 9000

CMD ["npm", "start"]